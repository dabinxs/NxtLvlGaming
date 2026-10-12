import React, { useCallback, useEffect, useState } from "react";
import { CircleAlert, CircleCheck, KeyRound, LoaderCircle, Trash2, UserPlus } from "lucide-react";
import { supabase } from "../lib/supabase";

const NoveltyAccessManager = ({ adminEmail }) => {
  const [accounts, setAccounts] = useState([]);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [removing, setRemoving] = useState("");
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");

  const loadAccounts = useCallback(async () => {
    setLoading(true);
    const { data, error: loadError } = await supabase
      .from("novelty_access")
      .select("id, email, created_at, created_by")
      .order("created_at", { ascending: false });
    if (loadError) {
      setError(loadError.message || "Could not load novelty access accounts.");
      setAccounts([]);
    } else {
      setAccounts(data || []);
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

      <section className="cms-panel cms-novelty-account-list">
        <div className="cms-panel-title"><span className="cms-panel-icon"><KeyRound size={17} /></span><div><h3>Approved accounts</h3><p>Removing an email blocks entry to the customization studio.</p></div></div>
        {loading ? <p className="cms-novelty-empty"><LoaderCircle size={16} className="cms-spin" /> Loading access list…</p> : accounts.length ? (
          <div className="cms-novelty-rows">{accounts.map((account) => <article key={account.id} className="cms-novelty-row"><span className="cms-novelty-avatar">{account.email[0].toUpperCase()}</span><div><strong>{account.email}</strong><small>Access granted {new Date(account.created_at).toLocaleDateString()}</small></div><button type="button" className="cms-icon-button cms-delete-button" aria-label={`Remove novelty access for ${account.email}`} title="Remove access" disabled={removing === account.id} onClick={() => removeAccount(account)}>{removing === account.id ? <LoaderCircle size={16} className="cms-spin" /> : <Trash2 size={16} />}</button></article>)}</div>
        ) : <p className="cms-novelty-empty">No additional accounts have been granted access yet.</p>}
      </section>
      <p className="cms-novelty-access-note">The owner and CMS admins can enter the studio automatically. Added accounts need a verified email and their own password. Account passwords are never stored in this dashboard.</p>
    </section>
  );
};

export default NoveltyAccessManager;
