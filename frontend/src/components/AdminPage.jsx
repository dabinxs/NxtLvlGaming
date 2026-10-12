import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import {
  Activity, ArrowLeft, ArrowUpRight, BarChart3, Camera, Check, ChevronDown,
  CircleAlert, CircleCheck, Clock3, Cloud, FileImage, ImagePlus, LayoutDashboard,
  LogOut, MonitorCog, PanelsTopLeft, Plus, Save, ShieldCheck, Trash2, Upload,
  Users, X,
} from "lucide-react";
import { auth, db } from "../lib/firebase";
import { CMS_PAGES } from "../lib/cmsPages";
import { useCmsHomeMedia } from "../lib/cmsContent";
import "./AdminPage.css";

const CMS_ADMIN_EMAIL = "team@nextlevelgamingevents.com";
const DEFAULTS = Object.fromEntries(CMS_PAGES.map((page) => [page.slug, page]));

function makeDraft(page, stored) {
  const gallery = stored?.gallery || page.gallery.map(({ id, title, subtitle, image }) => ({ id, title, subtitle, src: image }));
  return {
    title: stored?.title || page.title,
    heroTitle: stored?.heroTitle || page.heroTitle,
    heroSubtitle: stored?.heroSubtitle || page.heroSubtitle,
    heroMediaId: stored?.heroMediaId || "",
    thumbnailMediaId: stored?.thumbnailMediaId || "",
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
  while (url.length > 780_000 && quality > 0.42) {
    quality -= 0.08;
    url = canvas.toDataURL("image/jpeg", quality);
  }
  if (url.length > 780_000) throw new Error("That image is too large for the free CMS. Please choose a smaller image.");
  return url;
}

function CmsLogin({ user, onUser }) {
  const [email, setEmail] = useState(CMS_ADMIN_EMAIL);
  const [password, setPassword] = useState("");
  const [creating, setCreating] = useState(false);
  const [pendingVerify, setPendingVerify] = useState(false);
  const [authSetupNeeded, setAuthSetupNeeded] = useState(false);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => onAuthStateChanged(auth, onUser), [onUser]);

  const authenticate = async (event) => {
    event.preventDefault();
    setError("");
    setPendingVerify(false);
    setAuthSetupNeeded(false);
    if (email.trim().toLowerCase() !== CMS_ADMIN_EMAIL) {
      setError("This email address is not on the CMS access list.");
      return;
    }
    setBusy(true);
    try {
      if (creating) {
        const credential = await createUserWithEmailAndPassword(auth, CMS_ADMIN_EMAIL, password);
        await sendEmailVerification(credential.user);
        await signOut(auth);
        setPendingVerify(true);
        setCreating(false);
      } else {
        const credential = await signInWithEmailAndPassword(auth, CMS_ADMIN_EMAIL, password);
        if (!credential.user.emailVerified) {
          await sendEmailVerification(credential.user);
          await signOut(auth);
          setPendingVerify(true);
          throw new Error("Verify the link we sent to the admin inbox, then sign in again.");
        }
      }
    } catch (authError) {
      const messages = {
        "auth/configuration-not-found": "Firebase Authentication has not been started for this project yet. A project owner needs to finish the one-time setup below.",
        "auth/operation-not-allowed": "Email and password sign-in is not enabled for this project yet. A project owner needs to enable it below.",
        "auth/email-already-in-use": "This admin account already exists. Sign in with its password.",
        "auth/weak-password": "Use a password with at least 6 characters.",
        "auth/invalid-credential": "The email or password is incorrect.",
        "auth/too-many-requests": "Too many attempts. Wait a little and try again.",
      };
      setAuthSetupNeeded(authError.code === "auth/configuration-not-found" || authError.code === "auth/operation-not-allowed");
      setError(authError.message?.startsWith("Verify") ? authError.message : messages[authError.code] || authError.message || "Could not sign in.");
    } finally {
      setBusy(false);
    }
  };

  if (user?.emailVerified && user.email?.toLowerCase() === CMS_ADMIN_EMAIL) return null;

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
          {authSetupNeeded && <a className="cms-setup-link" href="https://console.firebase.google.com/project/nextlevelgaming-events/authentication/providers" target="_blank" rel="noreferrer">Open Authentication setup <ArrowUpRight size={14} /></a>}
          {pendingVerify && <p className="cms-success" role="status"><Check size={15} /> Check {CMS_ADMIN_EMAIL} for the verification link before you sign in.</p>}
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
  const homeMedia = useCmsHomeMedia();
  const defaults = DEFAULTS[activeSlug];
  const [draft, setDraft] = useState(() => makeDraft(defaults, activePage.data));
  const [media, setMedia] = useState(activePage.media);
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");
  const [removedMediaIds, setRemovedMediaIds] = useState([]);
  const [thumbnailPreview, setThumbnailPreview] = useState("");

  useEffect(() => {
    setDraft(makeDraft(defaults, activePage.data));
    setNotice("");
    setError("");
    setRemovedMediaIds([]);
    setThumbnailPreview("");
  }, [activeSlug, activePage.data, defaults]);

  useEffect(() => setMedia(activePage.media), [activePage.media]);

  const mediaUrl = (id, fallback) => media.find((item) => item.id === id)?.url || fallback;
  const patchDraft = (field, value) => setDraft((current) => ({ ...current, [field]: value }));

  const save = async () => {
    setSaving(true);
    setError("");
    setNotice("");
    try {
      await setDoc(doc(db, "cmsPages", activeSlug), {
        title: draft.title.trim(),
        heroTitle: draft.heroTitle.trim(),
        heroSubtitle: draft.heroSubtitle.trim(),
        heroMediaId: draft.heroMediaId,
        thumbnailMediaId: draft.thumbnailMediaId,
        gallery: draft.gallery,
        updatedAt: serverTimestamp(),
        updatedBy: auth.currentUser.email,
      });
      await Promise.all(removedMediaIds.map((mediaId) => deleteDoc(doc(db, "cmsMedia", mediaId))));
      const pageMediaUpdates = [draft.heroMediaId, ...draft.gallery.map((item) => item.mediaId)].filter(Boolean).map((mediaId) => updateDoc(doc(db, "cmsMedia", mediaId), { published: true }));
      await Promise.all(pageMediaUpdates);
      const homeImages = await getDocs(query(collection(db, "cmsMedia"), where("pageSlug", "==", "home")));
      const thumbnailChanges = homeImages.docs.filter((item) => item.data().itemId === activeSlug).map((item) => updateDoc(item.ref, { published: item.id === draft.thumbnailMediaId }));
      await Promise.all(thumbnailChanges);
      setNotice("Changes published to the live website.");
      onSave();
    } catch (saveError) {
      setError(saveError.code === "permission-denied"
        ? "CMS database access is not ready yet. Ask the Firebase project owner to finish the setup steps."
        : saveError.message || "Could not save these changes.");
    } finally {
      setSaving(false);
    }
  };

  const uploadMedia = async (file, pageSlug, itemId) => {
    if (!file) return "";
    setError("");
    try {
      const url = await compressImage(file);
      const saved = await addDoc(collection(db, "cmsMedia"), {
        pageSlug,
        itemId,
        url,
        filename: file.name,
        updatedAt: serverTimestamp(),
        updatedBy: auth.currentUser.email,
        published: false,
      });
      return { id: saved.id, url };
    } catch (uploadError) {
      setError(uploadError.message || "Image upload failed.");
      return "";
    }
  };

  const chooseHero = async (file) => {
    const saved = await uploadMedia(file, activeSlug, "hero");
    if (saved?.id) patchDraft("heroMediaId", saved.id);
  };

  const chooseThumbnail = async (file) => {
    const saved = await uploadMedia(file, "home", activeSlug);
    if (saved?.id) { patchDraft("thumbnailMediaId", saved.id); setThumbnailPreview(saved.url); }
  };

  const chooseGalleryImage = async (index, file) => {
    const saved = await uploadMedia(file, activeSlug, `gallery-${index}`);
    if (saved?.id) setDraft((current) => ({ ...current, gallery: current.gallery.map((item, itemIndex) => itemIndex === index ? { ...item, mediaId: saved.id } : item) }));
  };

  const addGalleryCard = () => setDraft((current) => ({
    ...current,
    gallery: [...current.gallery, { id: crypto.randomUUID(), title: "New photo", subtitle: "Add a short description.", src: "", mediaId: "" }],
  }));

  const removeGalleryCard = async (index) => {
    const item = draft.gallery[index];
    if (item.mediaId) setRemovedMediaIds((current) => [...current, item.mediaId]);
    setDraft((current) => ({ ...current, gallery: current.gallery.filter((_, itemIndex) => itemIndex !== index) }));
  };

  const pageImage = mediaUrl(draft.heroMediaId, defaults.heroImage);
  const thumbnailImage = thumbnailPreview || homeMedia[activeSlug] || pageImage;

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
                <div className="cms-gallery-image"><img src={mediaUrl(image.mediaId, fallback)} alt={image.title || "Gallery"} /></div>
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
        <p className="cms-image-note">Images are resized in your browser and stored in Firebase’s free Firestore database. Use images up to about 2 MB for best results.</p>
      </section>
    </div>
  );
}

function AdminPage() {
  const [user, setUser] = useState(null);
  const [authReady, setAuthReady] = useState(false);
  const [tab, setTab] = useState("overview");
  const [activeSlug, setActiveSlug] = useState(CMS_PAGES[0].slug);
  const [activePage, setActivePage] = useState({ data: null, media: [] });
  const [contentCount, setContentCount] = useState({ pages: 0, images: 0, lastUpdate: null });
  const [connection, setConnection] = useState("checking");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthReady(true);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (!user?.emailVerified || user.email?.toLowerCase() !== CMS_ADMIN_EMAIL) return undefined;
    const activeRef = doc(db, "cmsPages", activeSlug);
    const mediaQuery = query(collection(db, "cmsMedia"), where("pageSlug", "==", activeSlug));
    const unsubscribePage = onSnapshot(activeRef, (snapshot) => {
      setActivePage((current) => ({ ...current, data: snapshot.exists() ? snapshot.data() : null }));
      setConnection("ready");
    }, () => setConnection("needs-setup"));
    const unsubscribeMedia = onSnapshot(mediaQuery, (snapshot) => {
      setActivePage((current) => ({ ...current, media: snapshot.docs.map((item) => ({ id: item.id, ...item.data() })) }));
    }, () => setConnection("needs-setup"));
    getDocs(collection(db, "cmsPages")).then((snapshot) => {
      const pages = snapshot.docs.map((page) => page.data());
      setContentCount({
        pages: CMS_PAGES.length,
        images: snapshot.docs.reduce((total, page) => total + (page.data().gallery?.length || DEFAULTS[page.id]?.gallery?.length || 0), 0),
        lastUpdate: pages.map((page) => page.updatedAt?.toDate?.()).filter(Boolean).sort((a, b) => b - a)[0] || null,
      });
      setConnection("ready");
    }).catch(() => setConnection("needs-setup"));
    return () => { unsubscribePage(); unsubscribeMedia(); };
  }, [activeSlug, user]);

  const mediaCount = contentCount.images;
  const tabOptions = useMemo(() => [
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "content", label: "Events & experiences", icon: PanelsTopLeft },
    { id: "maintenance", label: "Maintenance", icon: MonitorCog },
  ], []);

  if (!authReady) return <div className="cms-loading">Loading secure dashboard…</div>;
  if (!user?.emailVerified || user.email?.toLowerCase() !== CMS_ADMIN_EMAIL) {
    return <CmsLogin user={user} onUser={setUser} />;
  }

  const signOutAdmin = async () => { await signOut(auth); };

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
            {connection === "needs-setup" && <div className="cms-setup-banner"><CircleAlert size={19} /><div><strong>One-time Firebase setup is required</strong><p>A Firebase project owner needs to create the Firestore database and enable email/password sign-in. Content will sync to the live site once complete.</p></div></div>}
            <div className="cms-stat-grid">
              <article className="cms-stat-card"><span className="cms-stat-icon blue"><PanelsTopLeft size={18} /></span><small>MANAGED PAGES</small><strong>{CMS_PAGES.length}</strong><span>Events and experiences</span></article>
              <article className="cms-stat-card"><span className="cms-stat-icon purple"><Camera size={18} /></span><small>EXPERIENCE PHOTOS</small><strong>{mediaCount || CMS_PAGES.reduce((sum, page) => sum + page.gallery.length, 0)}</strong><span>Across the experience pages</span></article>
              <article className="cms-stat-card"><span className="cms-stat-icon green"><ShieldCheck size={18} /></span><small>ADMIN ACCESS</small><strong>1</strong><span>Verified owner account</span></article>
              <article className="cms-stat-card"><span className="cms-stat-icon orange"><Activity size={18} /></span><small>VISITOR ANALYTICS</small><strong>—</strong><span>Google Analytics setup needed</span></article>
            </div>
            <div className="cms-overview-grid">
              <section className="cms-panel cms-overview-content"><div className="cms-panel-heading"><div><p className="cms-eyebrow">CONTENT SNAPSHOT</p><h2>Your event pages</h2></div><button className="cms-text-button" onClick={() => setTab("content")}>Manage pages <ArrowUpRight size={14} /></button></div><div className="cms-page-list">{CMS_PAGES.map((page) => <button key={page.slug} onClick={() => { setActiveSlug(page.slug); setTab("content"); }}><img src={page.heroImage} alt="" /><span><strong>{page.title}</strong><small>{page.kind} · {page.gallery.length} gallery photos</small></span><ArrowUpRight size={15} /></button>)}</div></section>
              <section className="cms-panel cms-system-panel"><div className="cms-panel-heading"><div><p className="cms-eyebrow">SYSTEM STATUS</p><h2>Site maintenance</h2></div><MonitorCog size={20} /></div><div className="cms-health-row"><span><Cloud size={17} /> Firebase connection</span><strong className={connection === "ready" ? "good" : "needs-attention"}>{connection === "ready" ? "Ready" : "Needs setup"}</strong></div><div className="cms-health-row"><span><ShieldCheck size={17} /> Admin protection</span><strong className="good">Email restricted</strong></div><div className="cms-health-row"><span><Clock3 size={17} /> Last content edit</span><strong>{contentCount.lastUpdate ? contentCount.lastUpdate.toLocaleDateString() : "No edits yet"}</strong></div><button className="cms-secondary-button cms-maintenance-link" onClick={() => setTab("maintenance")}>Open maintenance <ArrowUpRight size={15} /></button></section>
            </div>
          </>}
          {tab === "content" && <CmsEditor activeSlug={activeSlug} activePage={activePage} onSave={() => getDocs(collection(db, "cmsPages")).then((snapshot) => setContentCount((current) => ({ ...current, pages: CMS_PAGES.length, images: snapshot.docs.reduce((total, page) => total + (page.data().gallery?.length || 0), 0) })))} />}
          {tab === "analytics" && <section className="cms-analytics-page"><p className="cms-eyebrow">PERFORMANCE & ENGAGEMENT</p><h1>Analytics</h1><p className="cms-analytics-intro">Connect Google Analytics to measure visits, popular pages, and how people find your experiences.</p><div className="cms-analytics-empty"><div><BarChart3 size={24} /></div><h2>Visitor tracking isn’t connected yet</h2><p>This Firebase project has no Google Analytics property linked, so the CMS has no real visitor metrics to display. Link a Google Analytics property in Firebase to enable traffic reports. This won’t change the quote or contact forms.</p><a className="cms-primary-button" href="https://console.firebase.google.com/project/nextlevelgaming-events/analytics" target="_blank" rel="noreferrer">OPEN FIREBASE ANALYTICS <ArrowUpRight size={15} /></a></div><div className="cms-stat-grid cms-analytics-foot-cards"><article className="cms-stat-card"><small>EDITABLE OFFERINGS</small><strong>{CMS_PAGES.length}</strong><span>Page content managed here</span></article><article className="cms-stat-card"><small>CMS ADMINS</small><strong>1</strong><span>Verified team inbox</span></article><article className="cms-stat-card"><small>LAST CONTENT CHANGE</small><strong className="cms-date-stat">{contentCount.lastUpdate ? contentCount.lastUpdate.toLocaleDateString() : "—"}</strong><span>Saved from this dashboard</span></article></div></section>}
          {tab === "maintenance" && <section className="cms-maintenance-page"><p className="cms-eyebrow">HEALTH & SITE CONTROLS</p><h1>Maintenance</h1><p>Check the CMS connection and keep event content in good shape.</p><div className="cms-maintenance-grid"><article className="cms-panel"><span className="cms-stat-icon green"><Cloud size={18} /></span><h2>Content database</h2><p>Shared live content syncs through Cloud Firestore. It stays on Firebase’s free tier within its daily limits.</p><span className={`cms-maintenance-state ${connection === "ready" ? "good" : "needs-attention"}`}>{connection === "ready" ? <><CircleCheck size={15} /> Connected</> : <><CircleAlert size={15} /> Requires setup</>}</span></article><article className="cms-panel"><span className="cms-stat-icon blue"><ShieldCheck size={18} /></span><h2>Admin security</h2><p>Editing access requires a verified sign-in from the approved team inbox. Public visitors can read published content.</p><span className="cms-maintenance-state good"><CircleCheck size={15} /> Restricted</span></article><article className="cms-panel"><span className="cms-stat-icon purple"><ImagePlus size={18} /></span><h2>Image storage</h2><p>Images are resized in the browser before upload. The CMS keeps uploaded media in individual records to fit the free database document size limit.</p><span className="cms-maintenance-state good"><CircleCheck size={15} /> Ready</span></article><article className="cms-panel"><span className="cms-stat-icon orange"><BarChart3 size={18} /></span><h2>Visitor reporting</h2><p>Link Google Analytics in Firebase to see traffic totals and popular site pages.</p><button className="cms-text-button" onClick={() => setTab("analytics")}>Open analytics setup <ArrowUpRight size={14} /></button></article></div></section>}
        </div>
      </section>
    </main>
  );
}

export default AdminPage;
