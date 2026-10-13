import React, { useCallback, useEffect, useState } from "react";
import { ArrowLeft, CircleAlert, KeyRound, LogOut, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "../lib/supabase";
import BuildNovelty from "./BuildNovelty";
import Footer from "./Footer";
import Navbar from "./Navbar";
import "./NoveltyAccess.css";

const NoveltyAccess = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [status, setStatus] = useState("checking");
  const [creating, setCreating] = useState(false);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const checkAccess = useCallback(async (candidate) => {
    if (!candidate) {
      setUser(null);
      setStatus("login");
      return false;
    }
    if (!candidate.email_confirmed_at) {
      setUser(null);
      setStatus("login");
      setError("Please confirm your email address before entering the customization studio.");
      return false;
    }
    setUser(candidate);
    const { data, error: accessError } = await supabase.rpc("has_novelty_access");
    if (accessError) {
      setStatus("setup-error");
      setError("Novelty access needs its database setup. Please contact the site admin.");
      return false;
    }
    if (!data) {
      await supabase.auth.signOut();
      setUser(null);
      setStatus("login");
      setError("This account has not been granted access to the Novelty Customization Studio.");
      return false;
    }
    setError("");
    setStatus("allowed");
    return true;
  }, []);

  useEffect(() => {
    let active = true;
    const initialize = async () => {
      const { data, error: sessionError } = await supabase.auth.getSession();
      if (!active) return;
      if (sessionError) {
        setStatus("login");
        setError(sessionError.message);
      } else {
        await checkAccess(data.session?.user || null);
      }
    };
    initialize();
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session?.user) {
        setUser(null);
        setStatus("login");
      }
    });
    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, [checkAccess]);

  useEffect(() => {
    if (status !== "allowed") return undefined;
    const timer = window.setInterval(async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session?.user) {
        setUser(null);
        setStatus("login");
        return;
      }
      await checkAccess(data.session.user);
    }, 45000);
    return () => window.clearInterval(timer);
  }, [status, checkAccess]);

  const authenticate = async (event) => {
    event.preventDefault();
    setBusy(true);
    setError("");
    setMessage("");
    const normalizedEmail = email.trim().toLowerCase();
    try {
      if (creating) {
        const { data, error: signUpError } = await supabase.auth.signUp({
          email: normalizedEmail,
          password,
          options: { emailRedirectTo: window.location.origin },
        });
        if (signUpError) throw signUpError;
        if (data.session) await supabase.auth.signOut();
        setCreating(false);
        setMessage(`Account created. Check ${normalizedEmail} for the verification link. After confirming, sign in here.`);
      } else {
        const { data, error: signInError } = await supabase.auth.signInWithPassword({ email: normalizedEmail, password });
        if (signInError) throw signInError;
        await checkAccess(data.user);
      }
    } catch (authError) {
      const messages = {
        "User already registered": "This email already has a Supabase account. Sign in with that account instead.",
        "Invalid login credentials": "The email or password is incorrect.",
        "Email not confirmed": "Confirm the link sent to your email before signing in.",
        "Password should be at least 6 characters": "Use a password with at least 6 characters.",
      };
      setError(messages[authError.message] || authError.message || "Could not sign in.");
    } finally {
      setBusy(false);
    }
  };

  if (status === "checking") return <div className="novelty-access-loading">Checking studio access…</div>;
  if (status === "allowed") return <BuildNovelty />;

  return (
    <div className="novelty-access-page">
      <Navbar />
      <main className="novelty-access-main">
        <section className="novelty-access-card">
          <Link to="/novelties" className="novelty-access-back"><ArrowLeft size={16} /> Back to novelties</Link>
          <div className="novelty-access-icon"><KeyRound size={25} /></div>
          <p className="novelty-access-kicker">LIMITED ACCESS · NOVELTIES</p>
          <h1>Customization Studio</h1>
          <p className="novelty-access-copy">This private design studio is available to accounts approved by the site admin. Ask the admin to add your email, then create your own password or sign in.</p>
          <form className="novelty-access-form" onSubmit={authenticate}>
            <label>Email address<input type="email" value={email} onChange={(event) => setEmail(event.target.value)} autoComplete="username" required /></label>
            <label>Password<input type="password" value={password} onChange={(event) => setPassword(event.target.value)} autoComplete={creating ? "new-password" : "current-password"} minLength={6} required /></label>
            {error && <p className="novelty-access-error" role="alert"><CircleAlert size={16} />{error}</p>}
            {message && <p className="novelty-access-success" role="status">{message}</p>}
            <button className="novelty-access-submit" disabled={busy}>{busy ? "PLEASE WAIT…" : creating ? "CREATE ACCESS ACCOUNT" : "SIGN IN TO CUSTOMIZE"}</button>
          </form>
          <button className="novelty-access-toggle" type="button" onClick={() => { setCreating((value) => !value); setError(""); setMessage(""); }}>
            {creating ? "Already have an account? Sign in" : "Have admin approval? Create your account"}
          </button>
          {user && <button className="novelty-access-signout" type="button" onClick={() => supabase.auth.signOut()}><LogOut size={14} /> Sign out {user.email}</button>}
          <div className="novelty-access-note"><ShieldCheck size={16} /> The admin controls which confirmed accounts may enter this studio.</div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default NoveltyAccess;
