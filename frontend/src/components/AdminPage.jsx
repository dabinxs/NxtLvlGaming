import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Activity, ArrowLeft, ArrowUpRight, BarChart3, Camera, Check, ChevronDown,
  CircleAlert, CircleCheck, Clock3, Cloud, FileImage, ImagePlus, LayoutDashboard,
  KeyRound, LogOut, MonitorCog, PanelsTopLeft, Plus, Save, ShieldCheck, Trash2, Upload,
  Users, X,
} from "lucide-react";
import { CMS_ADMIN_EMAIL, CMS_ADMIN_EMAILS, CMS_MEDIA_BUCKET, supabase } from "../lib/supabase";
import { CMS_PAGES } from "../lib/cmsPages";
import { useCmsContent } from "../lib/cmsContent";
import NoveltyAccessManager from "./NoveltyAccessManager";
import "./AdminPage.css";

const DEFAULTS = Object.fromEntries(CMS_PAGES.map((page) => [page.slug, page]));

function makeDraft(page, stored) {
  const gallery = stored?.gallery || page.gallery.map(({ id, title, subtitle, image }) => ({ id, title, subtitle, src: image, mediaPath: "" }));
  return {
    title: stored?.title || page.title,
    heroTitle: stored?.hero_title || page.heroTitle,
    heroSubtitle: stored?.hero_subtitle || page.heroSubtitle,
    heroImageUrl: stored?.hero_image_url || page.heroImage,
    heroImagePath: stored?.hero_image_path || "",
    thumbnailImageUrl: stored?.thumbnail_image_url || page.heroImage,
    thumbnailImagePath: stored?.thumbnail_image_path || "",
    gallery: gallery.map((item) => ({ ...item })),
  };
}

async function compressImage(file) {
  const bitmap = await createImageBitmap(file);
  const canvas = document.createElement("canvas");
  const scale = Math.min(1, 1500 / Math.max(bitmap.width, bitmap.height));
  canvas.width = Math.max(1, Math.round(bitmap.width * scale));
  canvas.height = Math.max(1, Math.round(bitmap.height * scale));
  const context = canvas.getContext("2d");
  context.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  bitmap.close();
  let quality = 0.78;
  let url = canvas.toDataURL("image/jpeg", quality);
  while (url.length > 4_500_000 && quality > 0.42) {
    quality -= 0.08;
    url = canvas.toDataURL("image/jpeg", quality);
  }
  if (url.length > 4_500_000) throw new Error("That image is too large. Please choose a smaller image.");
  return fetch(url).then((response) => response.blob());
}

function CmsLogin({ user, onUser }) {
  const [email, setEmail] = useState(CMS_ADMIN_EMAIL);
  const [password, setPassword] = useState("");
  const [creating, setCreating] = useState(false);
  const [pendingVerify, setPendingVerify] = useState(false);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => onUser(session?.user || null));
    return () => subscription.unsubscribe();
  }, [onUser]);

  const authenticate = async (event) => {
    event.preventDefault();
    setError("");
    setPendingVerify(false);
    const adminEmail = email.trim().toLowerCase();
    if (!CMS_ADMIN_EMAILS.includes(adminEmail)) {
      setError(`Only these admin addresses can access the CMS: ${CMS_ADMIN_EMAILS.join(" and ")}.`);
      return;
    }
    setBusy(true);
    try {
      if (creating) {
        const { data, error: signUpError } = await supabase.auth.signUp({
          email: adminEmail,
          password,
          options: { emailRedirectTo: `${window.location.origin}/cms` },
        });
        if (signUpError) throw signUpError;
        if (data.session) await supabase.auth.signOut();
        setPendingVerify(!data.user?.email_confirmed_at);
        setCreating(false);
      } else {
        const { data, error: signInError } = await supabase.auth.signInWithPassword({ email: adminEmail, password });
        if (signInError) throw signInError;
        if (!data.user?.email_confirmed_at) {
          await supabase.auth.signOut();
          setPendingVerify(true);
          throw new Error(`Verify the confirmation link sent to ${adminEmail}, then sign in again.`);
        }
      }
    } catch (authError) {
      const messages = {
        "User already registered": "This admin account already exists. Sign in with its password.",
        "Password should be at least 6 characters": "Use a password with at least 6 characters.",
        "Invalid login credentials": "The email or password is incorrect.",
        "Email not confirmed": "Verify the confirmation link sent to the admin inbox, then sign in again.",
      };
      setError(authError.message?.startsWith("Verify") ? authError.message : messages[authError.message] || authError.message || "Could not sign in.");
    } finally {
      setBusy(false);
    }
  };

  if (user?.email_confirmed_at && CMS_ADMIN_EMAILS.includes(user.email?.toLowerCase())) return null;

  return (
    <main className="cms-login-page">
      <Link className="cms-back-link" to="/"><ArrowLeft size={16} /> Back to website</Link>
      <section className="cms-login-card">
        <div className="cms-brand-mark"><LayoutDashboard size={23} /></div>
        <p className="cms-eyebrow">NEXT LEVEL GAMING · PRIVATE AREA</p>
        <h1>{creating ? "Create owner access" : "Website dashboard"}</h1>
        <p className="cms-login-lede">Sign in to manage event and experience pages, images, and website content.</p>
        <form onSubmit={authenticate} className="cms-login-form">
          <label>Admin email<input type="email" value={email} onChange={(event) => setEmail(event.target.value)} autoComplete="username" required /></label>
          <label>Password<input type="password" value={password} onChange={(event) => setPassword(event.target.value)} autoComplete={creating ? "new-password" : "current-password"} minLength={6} required /></label>
          {error && <p className="cms-error" role="alert"><CircleAlert size={15} />{error}</p>}
          {pendingVerify && <p className="cms-success" role="status"><Check size={15} /> Check {adminEmail} for the verification link before you sign in.</p>}
          <button className="cms-primary-button" disabled={busy}>{busy ? "PLEASE WAIT…" : creating ? "CREATE SECURE ACCOUNT" : "SIGN IN TO CMS"}</button>
        </form>
        <button className="cms-link-button" onClick={() => { setCreating((value) => !value); setError(""); }}>
          {creating ? "Already have an account? Sign in" : "First time? Create the owner account"}
        </button>
        <div className="cms-login-security"><ShieldCheck size={17} /> Only approved, email-verified admins can edit the website.</div>
      </section>
    </main>
  );
}

function CmsEditor({ activeSlug, activePage, onSave }) {
  const { homeMedia, refresh } = useCmsContent();
  const defaults = DEFAULTS[activeSlug];
  const [draft, setDraft] = useState(() => makeDraft(defaults, activePage.data));
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");
  const [removedMediaPaths, setRemovedMediaPaths] = useState([]);

  useEffect(() => {
    setDraft(makeDraft(defaults, activePage.data));
    setNotice("");
    setError("");
    setRemovedMediaPaths([]);
  }, [activeSlug, activePage.data, defaults]);

  const patchDraft = (field, value) => setDraft((current) => ({ ...current, [field]: value }));

  const save = async () => {
    setSaving(true);
    setError("");
    setNotice("");
    try {
      const { error: saveError } = await supabase.from("cms_pages").upsert({
        slug: activeSlug,
        title: draft.title.trim(),
        hero_title: draft.heroTitle.trim(),
        hero_subtitle: draft.heroSubtitle.trim(),
        hero_image_url: draft.heroImageUrl,
        hero_image_path: draft.heroImagePath || null,
        thumbnail_image_url: draft.thumbnailImageUrl,
        thumbnail_image_path: draft.thumbnailImagePath || null,
        gallery: draft.gallery,
        updated_at: new Date().toISOString(),
        updated_by: CMS_ADMIN_EMAIL,
      });
      if (saveError) throw saveError;
      if (removedMediaPaths.length) {
        const { error: cleanupError } = await supabase.storage.from(CMS_MEDIA_BUCKET).remove(removedMediaPaths);
        if (cleanupError) throw cleanupError;
      }
      setNotice("Changes published to the live website.");
      await refresh();
      onSave();
    } catch (saveError) {
      setError(saveError.message || "Could not save these changes.");
    } finally {
      setSaving(false);
    }
  };

  const uploadMedia = async (file, pathPrefix) => {
    if (!file) return null;
    setError("");
    try {
      const blob = await compressImage(file);
      const path = `${pathPrefix}/${crypto.randomUUID()}.jpg`;
      const { error: uploadError } = await supabase.storage.from(CMS_MEDIA_BUCKET).upload(path, blob, {
        contentType: "image/jpeg",
        cacheControl: "3600",
        upsert: false,
      });
      if (uploadError) throw uploadError;
      const { data } = supabase.storage.from(CMS_MEDIA_BUCKET).getPublicUrl(path);
      return { path, url: data.publicUrl };
    } catch (uploadError) {
      setError(uploadError.message || "Image upload failed.");
      return null;
    }
  };

  const chooseHero = async (file) => {
    const saved = await uploadMedia(file, `${activeSlug}/hero`);
    if (saved) {
      if (draft.heroImagePath) setRemovedMediaPaths((current) => [...current, draft.heroImagePath]);
      setDraft((current) => ({ ...current, heroImageUrl: saved.url, heroImagePath: saved.path }));
    }
  };

  const chooseThumbnail = async (file) => {
    const saved = await uploadMedia(file, `${activeSlug}/thumbnail`);
    if (saved) {
      if (draft.thumbnailImagePath) setRemovedMediaPaths((current) => [...current, draft.thumbnailImagePath]);
      setDraft((current) => ({ ...current, thumbnailImageUrl: saved.url, thumbnailImagePath: saved.path }));
    }
  };

  const chooseGalleryImage = async (index, file) => {
    const saved = await uploadMedia(file, `${activeSlug}/gallery`);
    if (!saved) return;
    const oldPath = draft.gallery[index]?.mediaPath;
    if (oldPath) setRemovedMediaPaths((paths) => [...paths, oldPath]);
    setDraft((current) => ({
      ...current,
      gallery: current.gallery.map((item, itemIndex) => itemIndex === index ? { ...item, src: saved.url, mediaPath: saved.path } : item),
    }));
  };

  const addGalleryCard = () => setDraft((current) => ({
    ...current,
    gallery: [...current.gallery, { id: crypto.randomUUID(), title: "New photo", subtitle: "Add a short description.", src: "", mediaPath: "" }],
  }));

  const removeGalleryCard = async (index) => {
    const item = draft.gallery[index];
    if (item.mediaPath) setRemovedMediaPaths((current) => [...current, item.mediaPath]);
    setDraft((current) => ({ ...current, gallery: current.gallery.filter((_, itemIndex) => itemIndex !== index) }));
  };

  const pageImage = draft.heroImageUrl || defaults.heroImage;
  const thumbnailImage = draft.thumbnailImageUrl || homeMedia[activeSlug] || pageImage;

  return (
    <div className="cms-editor">
      <section className="cms-editor-heading">
        <div><p className="cms-eyebrow">CONTENT MANAGEMENT / {defaults.kind.toUpperCase()}</p><h2>{defaults.title}</h2><p>Changes appear on the public page as soon as you save.</p></div>
        <button onClick={save} disabled={saving} className="cms-primary-button cms-save-button"><Save size={16} />{saving ? "SAVING…" : "SAVE & PUBLISH"}</button>
      </section>
      {notice && <p className="cms-success cms-editor-notice"><CircleCheck size={16} />{notice}</p>}
      {error && <p className="cms-error cms-editor-notice" role="alert"><CircleAlert size={16} />{error}</p>}

      <section className="cms-panel cms-fields-panel">
        <div className="cms-panel-title"><span className="cms-panel-icon"><PanelsTopLeft size={17} /></span><div><h3>Page details</h3><p>Edit how this offering is presented.</p></div></div>
        <div className="cms-fields-grid">
          <label>Offering name<input value={draft.title} onChange={(event) => patchDraft("title", event.target.value)} /></label>
          <label>Hero heading<input value={draft.heroTitle} onChange={(event) => patchDraft("heroTitle", event.target.value)} /></label>
          <label className="cms-field-wide">Hero description<textarea rows="3" value={draft.heroSubtitle} onChange={(event) => patchDraft("heroSubtitle", event.target.value)} /></label>
        </div>
      </section>

      <div className="cms-image-edit-grid">
        <section className="cms-panel">
          <div className="cms-panel-title"><span className="cms-panel-icon"><FileImage size={17} /></span><div><h3>Hero image</h3><p>Top image on this page.</p></div></div>
          <div className="cms-image-preview"><img src={pageImage} alt="Current hero" /></div>
          <label className="cms-upload-button"><Upload size={16} /> Replace hero image<input type="file" accept="image/*" onChange={(event) => chooseHero(event.target.files?.[0])} /></label>
        </section>
        <section className="cms-panel">
          <div className="cms-panel-title"><span className="cms-panel-icon"><ImagePlus size={17} /></span><div><h3>Homepage thumbnail</h3><p>Card image in “Choose your experience.”</p></div></div>
          <div className="cms-image-preview"><img src={thumbnailImage} alt="Current home card thumbnail" /></div>
          <label className="cms-upload-button"><Upload size={16} /> Replace homepage thumbnail<input type="file" accept="image/*" onChange={(event) => chooseThumbnail(event.target.files?.[0])} /></label>
        </section>
      </div>

      <section className="cms-panel cms-gallery-panel">
        <div className="cms-gallery-heading"><div className="cms-panel-title"><span className="cms-panel-icon"><Camera size={17} /></span><div><h3>Page gallery</h3><p>Add, remove, and edit the pictures under “The Experience.”</p></div></div><button className="cms-secondary-button" onClick={addGalleryCard}><Plus size={16} /> Add photo</button></div>
        <div className="cms-gallery-list">
          {draft.gallery.map((image, index) => {
            const fallback = defaults.gallery.find((item) => item.id === image.id)?.image || defaults.gallery.find((item) => item.id === image.id)?.src || "";
            return (
              <article className="cms-gallery-row" key={image.id}>
                <div className="cms-gallery-image"><img src={image.src || fallback} alt={image.title || "Gallery"} /></div>
                <div className="cms-gallery-fields">
                  <label>Image title<input value={image.title} onChange={(event) => setDraft((current) => ({ ...current, gallery: current.gallery.map((item, itemIndex) => itemIndex === index ? { ...item, title: event.target.value } : item) }))} /></label>
                  <label>Description<input value={image.subtitle} onChange={(event) => setDraft((current) => ({ ...current, gallery: current.gallery.map((item, itemIndex) => itemIndex === index ? { ...item, subtitle: event.target.value } : item) }))} /></label>
                  <label className="cms-upload-button cms-row-upload"><Upload size={14} /> Change picture<input type="file" accept="image/*" onChange={(event) => chooseGalleryImage(index, event.target.files?.[0])} /></label>
                </div>
                <button className="cms-icon-button cms-delete-button" aria-label={`Remove ${image.title}`} title="Remove photo" onClick={() => removeGalleryCard(index)}><Trash2 size={17} /></button>
              </article>
            );
          })}
          {draft.gallery.length === 0 && <div className="cms-empty-gallery"><ImagePlus size={22} /><p>No gallery photos yet. Add a photo to build the experience gallery.</p></div>}
        </div>
        <p className="cms-image-note">Images are resized in your browser and stored in your Supabase media library.</p>
      </section>
    </div>
  );
}

function AdminPage() {
  const [user, setUser] = useState(null);
  const [authReady, setAuthReady] = useState(false);
  const [tab, setTab] = useState("overview");
  const [activeSlug, setActiveSlug] = useState(CMS_PAGES[0].slug);
  const { pages, connection, refresh } = useCmsContent();
  const activePage = { data: pages[activeSlug] || null, media: [] };
  const contentCount = useMemo(() => {
    const savedPages = Object.values(pages);
    const timestamps = savedPages.map((page) => page.updated_at ? new Date(page.updated_at) : null).filter(Boolean).sort((a, b) => b - a);
    return {
      pages: CMS_PAGES.length,
      images: CMS_PAGES.reduce((total, page) => total + (pages[page.slug]?.gallery?.length || page.gallery.length), 0),
      lastUpdate: timestamps[0] || null,
    };
  }, [pages]);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
      setAuthReady(true);
    });
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user || null);
      setAuthReady(true);
    });
    return () => subscription.unsubscribe();
  }, []);

  const mediaCount = contentCount.images;
  const tabOptions = useMemo(() => [
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "content", label: "Events & experiences", icon: PanelsTopLeft },
    { id: "novelty-access", label: "Novelty access", icon: KeyRound },
    { id: "maintenance", label: "Maintenance", icon: MonitorCog },
  ], []);

  if (!authReady) return <div className="cms-loading">Loading secure dashboard…</div>;
  if (!user?.email_confirmed_at || !CMS_ADMIN_EMAILS.includes(user.email?.toLowerCase())) {
    return <CmsLogin user={user} onUser={setUser} />;
  }

  const signOutAdmin = async () => { await supabase.auth.signOut(); };

  return (
    <main className="cms-shell">
      <aside className="cms-sidebar">
        <Link to="/" className="cms-sidebar-brand"><span><LayoutDashboard size={19} /></span><div><strong>NEXT LEVEL</strong><small>WEBSITE CMS</small></div></Link>
        <p className="cms-nav-label">WORKSPACE</p>
        <nav className="cms-sidebar-nav">
          {tabOptions.map(({ id, label, icon: Icon }) => <button key={id} className={tab === id ? "active" : ""} onClick={() => setTab(id)}><Icon size={17} />{label}{id === "content" && <ChevronDown className="cms-nav-chevron" size={15} />}</button>)}
        </nav>
        {tab === "content" && <div className="cms-sidebar-pages">
          {CMS_PAGES.map((page) => <button key={page.slug} className={activeSlug === page.slug ? "active" : ""} onClick={() => setActiveSlug(page.slug)}><span className={`cms-page-dot ${page.kind === "Event" ? "event" : "experience"}`} />{page.title}</button>)}
        </div>}
        <div className="cms-sidebar-spacer" />
        <div className="cms-sidebar-admin"><span className="cms-admin-avatar">{user.email[0].toUpperCase()}</span><div><strong>Site admin</strong><small>{user.email}</small></div><button onClick={signOutAdmin} aria-label="Sign out"><LogOut size={16} /></button></div>
      </aside>

      <section className="cms-main">
        <header className="cms-topbar"><div><span className="cms-breadcrumb">WEBSITE</span><span className="cms-breadcrumb-divider">/</span><span>{tabOptions.find((option) => option.id === tab)?.label}</span></div><div className="cms-topbar-right"><span className={`cms-status-pill ${connection === "ready" ? "connected" : connection === "needs-setup" ? "setup" : ""}`}><span />{connection === "ready" ? "CONNECTED" : connection === "needs-setup" ? "SETUP REQUIRED" : "CONNECTING"}</span><Link to="/" target="_blank">View website <ArrowUpRight size={14} /></Link></div></header>
        <div className="cms-content-area">
          {tab === "overview" && <>
            <div className="cms-page-intro"><div><p className="cms-eyebrow">MONDAY MORNING, MADE SIMPLE</p><h1>Website overview</h1><p>Manage the public site and keep every experience up to date.</p></div><button className="cms-primary-button" onClick={() => setTab("content")}><PanelsTopLeft size={16} /> EDIT WEBSITE CONTENT</button></div>
            {connection === "needs-setup" && <div className="cms-setup-banner"><CircleAlert size={19} /><div><strong>Supabase content tables need setup</strong><p>Run the one-time SQL in <code>supabase/cms_setup.sql</code> from your Supabase project’s SQL Editor. The site and login are already connected to that project.</p></div></div>}
            <div className="cms-stat-grid">
              <article className="cms-stat-card"><span className="cms-stat-icon blue"><PanelsTopLeft size={18} /></span><small>MANAGED PAGES</small><strong>{CMS_PAGES.length}</strong><span>Events and experiences</span></article>
              <article className="cms-stat-card"><span className="cms-stat-icon purple"><Camera size={18} /></span><small>EXPERIENCE PHOTOS</small><strong>{mediaCount || CMS_PAGES.reduce((sum, page) => sum + page.gallery.length, 0)}</strong><span>Across the experience pages</span></article>
              <article className="cms-stat-card"><span className="cms-stat-icon green"><ShieldCheck size={18} /></span><small>ADMIN ACCESS</small><strong>{CMS_ADMIN_EMAILS.length}</strong><span>Approved admin accounts</span></article>
              <article className="cms-stat-card"><span className="cms-stat-icon orange"><Activity size={18} /></span><small>VISITOR ANALYTICS</small><strong>—</strong><span>Google Analytics setup needed</span></article>
            </div>
            <div className="cms-overview-grid">
              <section className="cms-panel cms-overview-content"><div className="cms-panel-heading"><div><p className="cms-eyebrow">CONTENT SNAPSHOT</p><h2>Your event pages</h2></div><button className="cms-text-button" onClick={() => setTab("content")}>Manage pages <ArrowUpRight size={14} /></button></div><div className="cms-page-list">{CMS_PAGES.map((page) => <button key={page.slug} onClick={() => { setActiveSlug(page.slug); setTab("content"); }}><img src={page.heroImage} alt="" /><span><strong>{page.title}</strong><small>{page.kind} · {page.gallery.length} gallery photos</small></span><ArrowUpRight size={15} /></button>)}</div></section>
              <section className="cms-panel cms-system-panel"><div className="cms-panel-heading"><div><p className="cms-eyebrow">SYSTEM STATUS</p><h2>Site maintenance</h2></div><MonitorCog size={20} /></div><div className="cms-health-row"><span><Cloud size={17} /> Supabase connection</span><strong className={connection === "ready" ? "good" : "needs-attention"}>{connection === "ready" ? "Ready" : "Needs setup"}</strong></div><div className="cms-health-row"><span><ShieldCheck size={17} /> Admin protection</span><strong className="good">Email restricted</strong></div><div className="cms-health-row"><span><Clock3 size={17} /> Last content edit</span><strong>{contentCount.lastUpdate ? contentCount.lastUpdate.toLocaleDateString() : "No edits yet"}</strong></div><button className="cms-secondary-button cms-maintenance-link" onClick={() => setTab("maintenance")}>Open maintenance <ArrowUpRight size={15} /></button></section>
            </div>
          </>}
          {tab === "content" && <CmsEditor activeSlug={activeSlug} activePage={activePage} onSave={refresh} />}
          {tab === "novelty-access" && <NoveltyAccessManager adminEmail={user.email} />}
          {tab === "analytics" && <section className="cms-analytics-page"><p className="cms-eyebrow">PERFORMANCE & ENGAGEMENT</p><h1>Analytics</h1><p className="cms-analytics-intro">Connect Google Analytics to measure visits, popular pages, and how people find your experiences.</p><div className="cms-analytics-empty"><div><BarChart3 size={24} /></div><h2>Visitor tracking isn’t connected yet</h2><p>No Google Analytics property is linked, so the CMS has no real visitor metrics to display. Link an Analytics property to enable traffic reports. This does not affect the quote or contact forms.</p><a className="cms-primary-button" href="https://analytics.google.com/" target="_blank" rel="noreferrer">OPEN GOOGLE ANALYTICS <ArrowUpRight size={15} /></a></div><div className="cms-stat-grid cms-analytics-foot-cards"><article className="cms-stat-card"><small>EDITABLE OFFERINGS</small><strong>{CMS_PAGES.length}</strong><span>Page content managed here</span></article><article className="cms-stat-card"><small>CMS ADMINS</small><strong>1</strong><span>Verified team inbox</span></article><article className="cms-stat-card"><small>LAST CONTENT CHANGE</small><strong className="cms-date-stat">{contentCount.lastUpdate ? contentCount.lastUpdate.toLocaleDateString() : "—"}</strong><span>Saved from this dashboard</span></article></div></section>}
          {tab === "maintenance" && <section className="cms-maintenance-page"><p className="cms-eyebrow">HEALTH & SITE CONTROLS</p><h1>Maintenance</h1><p>Check the CMS connection and keep event content in good shape.</p><div className="cms-maintenance-grid"><article className="cms-panel"><span className="cms-stat-icon green"><Cloud size={18} /></span><h2>Content database</h2><p>Shared live content syncs through Supabase Postgres. Its free plan has usage and storage limits.</p><span className={`cms-maintenance-state ${connection === "ready" ? "good" : "needs-attention"}`}>{connection === "ready" ? <><CircleCheck size={15} /> Connected</> : <><CircleAlert size={15} /> Requires setup</>}</span></article><article className="cms-panel"><span className="cms-stat-icon blue"><ShieldCheck size={18} /></span><h2>Admin security</h2><p>Editing access requires a verified sign-in from the approved team inbox. Public visitors can read published content.</p><span className="cms-maintenance-state good"><CircleCheck size={15} /> Restricted</span></article><article className="cms-panel"><span className="cms-stat-icon purple"><ImagePlus size={18} /></span><h2>Image storage</h2><p>Images are resized in your browser before upload. The CMS stores them in its public image bucket with admin-only upload and deletion.</p><span className="cms-maintenance-state good"><CircleCheck size={15} /> Ready</span></article><article className="cms-panel"><span className="cms-stat-icon orange"><BarChart3 size={18} /></span><h2>Visitor reporting</h2><p>Connect Google Analytics to see traffic totals and popular site pages.</p><button className="cms-text-button" onClick={() => setTab("analytics")}>Open analytics setup <ArrowUpRight size={14} /></button></article></div></section>}
        </div>
      </section>
    </main>
  );
}

export default AdminPage;
