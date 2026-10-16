import React, { useCallback, useEffect, useState } from "react";
import { CircleAlert, CircleCheck, KeyRound, LoaderCircle, Trash2, UserPlus } from "lucide-react";
import { supabase } from "../lib/supabase";
import "./NoveltyAccessManager.css";

const NoveltyAccessManager = ({ adminEmail }) => {
  const [accounts, setAccounts] = useState([]);
  const [quickAccounts, setQuickAccounts] = useState([]);
  const [email, setEmail] = useState("");
  const [quickUsername, setQuickUsername] = useState("");
  const [quickPassword, setQuickPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [removing, setRemoving] = useState("");
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");

  const loadAccounts = useCallback(async () => {
    setLoading(true);
    const [emailResult, quickResult] = await Promise.all([
      supabase.from("novelty_access").select("id, email, created_at, created_by").order("created_at", { ascending: false }),
      supabase.from("novelty_quick_access").select("id, username, created_at, created_by").order("created_at", { ascending: false }),
    ]);
    if (emailResult.error || quickResult.error) {
      setError(emailResult.error?.message || `${quickResult.error?.message || "Could not load quick access accounts."} Run the latest supabase/cms_setup.sql setup script.`);
      setAccounts([]);
      setQuickAccounts([]);
    } else {
      setAccounts(emailResult.data || []);
      setQuickAccounts(quickResult.data || []);
      setError("");
    }
    setLoading(false);
  }, []);

  useEffect(() => { loadAccounts(); }, [loadAccounts]);

  const addAccount = async (event) => {
    event.preventDefault();
    const normalizedEmail = email.trim().toLowerCase();
    if (!normalizedEmail) return;
    setSaving(true);
    setNotice("");
    setError("");
    const { error: insertError } = await supabase.from("novelty_access").insert({
      email: normalizedEmail,
      created_by: adminEmail,
    });
    if (insertError) {
      setError(insertError.code === "23505" ? "That email already has novelty access." : insertError.message || "Could not grant access.");
    } else {
      setEmail("");
      setNotice(`Access granted to ${normalizedEmail}. They can create their account with their own password from the customization sign-in page.`);
      await loadAccounts();
    }
    setSaving(false);
  };

  const removeAccount = async (account) => {
    setRemoving(account.id);
    setNotice("");
    setError("");
    const { error: deleteError } = await supabase.from("novelty_access").delete().eq("id", account.id);
    if (deleteError) {
      setError(deleteError.message || "Could not remove access.");
    } else {
      setNotice(`Novelty access removed for ${account.email}.`);
      setAccounts((current) => current.filter((entry) => entry.id !== account.id));
    }
    setRemoving("");
  };

  const addQuickAccount = async (event) => {
    event.preventDefault();
    setSaving(true); setNotice(""); setError("");
    const normalizedUsername = quickUsername.trim().toLowerCase();
    const { error: createError } = await supabase.rpc("create_novelty_quick_access", {
      p_username: normalizedUsername,
      p_password: quickPassword,
    });
    if (createError) {
      setError(createError.message || "Could not create quick access credentials.");
    } else {
      setQuickUsername("");
      setQuickPassword("");
      setNotice(`Quick access is ready for “${normalizedUsername}”. Share the password you just entered with the customer; it cannot be viewed again in the CMS.`);
      await loadAccounts();
    }
    setSaving(false);
  };

  const removeQuickAccount = async (account) => {
    if (!window.confirm(`Remove quick access for “${account.username}”? Any current session for this username will be revoked.`)) return;
    setRemoving(account.id); setNotice(""); setError("");
    const { error: deleteError } = await supabase.from("novelty_quick_access").delete().eq("id", account.id);
    if (deleteError) setError(deleteError.message || "Could not remove quick access.");
    else {
      setQuickAccounts((current) => current.filter((entry) => entry.id !== account.id));
      setNotice(`Quick access removed for “${account.username}”.`);
    }
    setRemoving("");
  };

  return (
    <section className="cms-novelty-access">
      <div className="cms-editor-heading">
        <div><p className="cms-eyebrow">RESTRICTED TOOL / NOVELTIES</p><h2>Customization access</h2><p>Grant or remove access to the novelty design studio.</p></div>
      </div>
      {notice && <p className="cms-success cms-editor-notice"><CircleCheck size={16} />{notice}</p>}
      {error && <p className="cms-error cms-editor-notice" role="alert"><CircleAlert size={16} />{error}</p>}

      <section className="cms-panel cms-novelty-access-panel">
        <div className="cms-panel-title"><span className="cms-panel-icon"><UserPlus size={17} /></span><div><h3>Give someone access</h3><p>Add their email address. They create and keep their own password securely through Supabase.</p></div></div>
        <form className="cms-novelty-access-form" onSubmit={addAccount}>
          <label htmlFor="novelty-access-email">Approved email</label>
          <div><input id="novelty-access-email" type="email" autoComplete="off" required placeholder="name@example.com" value={email} onChange={(event) => setEmail(event.target.value)} /><button className="cms-primary-button" disabled={saving}><UserPlus size={15} />{saving ? "ADDING…" : "GRANT ACCESS"}</button></div>
        </form>
      </section>

      <section className="cms-panel cms-novelty-access-panel">
        <div className="cms-panel-title"><span className="cms-panel-icon"><KeyRound size={17} /></span><div><h3>Create quick username and password access</h3><p>For customers who need to enter the studio right away without creating an account or verifying email.</p></div></div>
        <form className="cms-novelty-access-form cms-quick-access-form" onSubmit={addQuickAccount}>
          <label htmlFor="novelty-quick-username">Username and password</label>
          <div className="cms-quick-access-fields"><input id="novelty-quick-username" type="text" autoComplete="off" minLength={3} maxLength={32} pattern="[A-Za-z0-9][A-Za-z0-9._-]{2,31}" title="3–32 letters, numbers, dots, dashes, or underscores" required placeholder="Choose a username" value={quickUsername} onChange={(event) => setQuickUsername(event.target.value)} /><input aria-label="Quick access password" type="password" autoComplete="new-password" minLength={10} maxLength={72} required placeholder="Set a password (10+ characters)" value={quickPassword} onChange={(event) => setQuickPassword(event.target.value)} /><button className="cms-primary-button" disabled={saving}><KeyRound size={15} />{saving ? "SAVING…" : "CREATE / RESET LOGIN"}</button></div>
        </form>
        <p className="cms-novelty-access-note">The password is saved as a secure hash and is shown only while you type it. Creating a username that already exists replaces its password and invalidates its existing sessions.</p>
      </section>

      <section className="cms-panel cms-novelty-account-list">
        <div className="cms-panel-title"><span className="cms-panel-icon"><KeyRound size={17} /></span><div><h3>Quick access usernames</h3><p>Each quick-access session expires after eight hours. Removing an account signs out its active sessions.</p></div></div>
        {loading ? <p className="cms-novelty-empty"><LoaderCircle size={16} className="cms-spin" /> Loading quick access list…</p> : quickAccounts.length ? <div className="cms-novelty-rows">{quickAccounts.map((account) => <article key={account.id} className="cms-novelty-row"><span className="cms-novelty-avatar">{account.username[0].toUpperCase()}</span><div><strong>{account.username}</strong><small>Created {new Date(account.created_at).toLocaleDateString()} · password is not retrievable</small></div><button type="button" className="cms-icon-button cms-delete-button" aria-label={`Remove quick novelty access for ${account.username}`} title="Remove quick access" disabled={removing === account.id} onClick={() => removeQuickAccount(account)}>{removing === account.id ? <LoaderCircle size={16} className="cms-spin" /> : <Trash2 size={16} />}</button></article>)}</div> : <p className="cms-novelty-empty">No quick-access usernames created yet.</p>}
      </section>

      <section className="cms-panel cms-novelty-account-list">
        <div className="cms-panel-title"><span className="cms-panel-icon"><KeyRound size={17} /></span><div><h3>Approved accounts</h3><p>Removing an email blocks entry to the customization studio.</p></div></div>
        {loading ? <p className="cms-novelty-empty"><LoaderCircle size={16} className="cms-spin" /> Loading access list…</p> : accounts.length ? (
          <div className="cms-novelty-rows">{accounts.map((account) => <article key={account.id} className="cms-novelty-row"><span className="cms-novelty-avatar">{account.email[0].toUpperCase()}</span><div><strong>{account.email}</strong><small>Access granted {new Date(account.created_at).toLocaleDateString()}</small></div><button type="button" className="cms-icon-button cms-delete-button" aria-label={`Remove novelty access for ${account.email}`} title="Remove access" disabled={removing === account.id} onClick={() => removeAccount(account)}>{removing === account.id ? <LoaderCircle size={16} className="cms-spin" /> : <Trash2 size={16} />}</button></article>)}</div>
        ) : <p className="cms-novelty-empty">No additional accounts have been granted access yet.</p>}
      </section>
      <p className="cms-novelty-access-note">The owner and CMS admins can enter automatically. Verified email accounts keep their current sign-in flow. Quick-access users need no email account; their passwords are hashed, their sessions expire after eight hours, and admins can remove access at any time.</p>
    </section>
  );
};

export default NoveltyAccessManager;
