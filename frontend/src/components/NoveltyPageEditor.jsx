import React, { useEffect, useRef, useState } from "react";
import { Camera, CircleAlert, CircleCheck, FileImage, ImagePlus, Plus, Save, Trash2, Upload } from "lucide-react";
import { useCmsContent } from "../lib/cmsContent";
import { CMS_MEDIA_BUCKET, supabase } from "../lib/supabase";
import { DEFAULT_NOVELTY_CONTENT, NOVELTY_BUILDER_OPTIONS, noveltyContentFromRow } from "../lib/noveltyContent";
import "./NoveltyPageEditor.css";

async function compressNoveltyImage(file) {
  const bitmap = await createImageBitmap(file);
  const canvas = document.createElement("canvas");
  const scale = Math.min(1, 1500 / Math.max(bitmap.width, bitmap.height));
  canvas.width = Math.max(1, Math.round(bitmap.width * scale));
  canvas.height = Math.max(1, Math.round(bitmap.height * scale));
  const context = canvas.getContext("2d");
  context.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  bitmap.close();
  const blob = await new Promise((resolve) => canvas.toBlob(resolve, "image/jpeg", 0.8));
  if (!blob) throw new Error("The image could not be processed.");
  return blob;
}

function createDraft(row) {
  return noveltyContentFromRow(row);
}

function ThumbnailCropDialog({ file, onCancel, onConfirm }) {
  const frameRef = useRef(null);
  const dragRef = useRef(null);
  const [frameSize, setFrameSize] = useState(320);
  const [imageSize, setImageSize] = useState(null);
  const [zoom, setZoom] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [processing, setProcessing] = useState(false);
  const [cropError, setCropError] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");

  useEffect(() => {
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  useEffect(() => {
    if (!frameRef.current) return undefined;
    const observer = new ResizeObserver(([entry]) => setFrameSize(entry.contentRect.width));
    observer.observe(frameRef.current);
    return () => observer.disconnect();
  }, []);

  const baseScale = imageSize ? Math.max(frameSize / imageSize.width, frameSize / imageSize.height) : 1;
  const scale = baseScale * zoom;
  const renderedWidth = imageSize ? imageSize.width * scale : 0;
  const renderedHeight = imageSize ? imageSize.height * scale : 0;
  const left = (frameSize - renderedWidth) / 2 + position.x;
  const top = (frameSize - renderedHeight) / 2 + position.y;

  const clampPosition = (next, nextZoom = zoom) => {
    if (!imageSize) return next;
    const nextScale = baseScale * nextZoom;
    const maxX = Math.max(0, (imageSize.width * nextScale - frameSize) / 2);
    const maxY = Math.max(0, (imageSize.height * nextScale - frameSize) / 2);
    return { x: Math.max(-maxX, Math.min(maxX, next.x)), y: Math.max(-maxY, Math.min(maxY, next.y)) };
  };

  const changeZoom = (value) => {
    const nextZoom = Number(value);
    setZoom(nextZoom);
    setPosition((current) => clampPosition(current, nextZoom));
  };

  const confirmCrop = async () => {
    if (!imageSize) return;
    setProcessing(true);
    setCropError("");
    try {
      const bitmap = await createImageBitmap(file);
      const sourceSize = frameSize / scale;
      const sourceX = Math.max(0, Math.min(imageSize.width - sourceSize, -left / scale));
      const sourceY = Math.max(0, Math.min(imageSize.height - sourceSize, -top / scale));
      const canvas = document.createElement("canvas");
      canvas.width = 1200;
      canvas.height = 1200;
      const context = canvas.getContext("2d");
      context.drawImage(bitmap, sourceX, sourceY, sourceSize, sourceSize, 0, 0, canvas.width, canvas.height);
      bitmap.close();
      const blob = await new Promise((resolve) => canvas.toBlob(resolve, "image/jpeg", 0.88));
      if (!blob) throw new Error("The crop could not be processed.");
      await onConfirm(blob);
    } catch (error) {
      setCropError(error.message || "The crop could not be processed.");
      setProcessing(false);
    }
  };

  const startDrag = (event) => {
    if (processing) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    dragRef.current = { x: event.clientX, y: event.clientY, position };
  };
  const drag = (event) => {
    if (!dragRef.current) return;
    setPosition(clampPosition({
      x: dragRef.current.position.x + event.clientX - dragRef.current.x,
      y: dragRef.current.position.y + event.clientY - dragRef.current.y,
    }));
  };

  return (
    <div className="cms-crop-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget && !processing) onCancel(); }}>
      <section className="cms-crop-dialog" role="dialog" aria-modal="true" aria-labelledby="cms-crop-title">
        <div className="cms-crop-heading"><div><p className="cms-eyebrow">NOVELTY THUMBNAIL</p><h3 id="cms-crop-title">Adjust your image</h3><p>Drag to reposition and zoom until the square shows what you want.</p></div><button type="button" className="cms-crop-close" onClick={onCancel} disabled={processing} aria-label="Cancel crop">×</button></div>
        <div ref={frameRef} className="cms-crop-frame" onPointerDown={startDrag} onPointerMove={drag} onPointerUp={() => { dragRef.current = null; }} onPointerCancel={() => { dragRef.current = null; }}>
          {previewUrl && <img src={previewUrl} alt="Image being cropped" onLoad={(event) => setImageSize({ width: event.currentTarget.naturalWidth, height: event.currentTarget.naturalHeight })} style={{ width: renderedWidth, height: renderedHeight, left, top }} draggable="false" />}
          <span className="cms-crop-frame-outline" aria-hidden="true" />
        </div>
        <label className="cms-crop-zoom">Zoom<input type="range" min="1" max="3" step="0.01" value={zoom} onChange={(event) => changeZoom(event.target.value)} disabled={!imageSize || processing} /><span>{zoom.toFixed(1)}×</span></label>
        {cropError && <p className="cms-error" role="alert"><CircleAlert size={15} />{cropError}</p>}
        <div className="cms-crop-actions"><button type="button" className="cms-secondary-button" onClick={onCancel} disabled={processing}>Cancel</button><button type="button" className="cms-primary-button" onClick={confirmCrop} disabled={!imageSize || processing}><ImagePlus size={15} />{processing ? "Uploading…" : "Use this crop"}</button></div>
      </section>
    </div>
  );
}

export default function NoveltyPageEditor({ adminEmail }) {
  const { pages, refresh } = useCmsContent();
  const stored = pages.novelties || null;
  const [draft, setDraft] = useState(() => createDraft(stored));
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState("");
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");
  const [removedPaths, setRemovedPaths] = useState([]);
  const [cropRequest, setCropRequest] = useState(null);

  useEffect(() => {
    setDraft(createDraft(stored));
    setNotice("");
    setError("");
    setRemovedPaths([]);
  }, [stored]);

  const patch = (key, value) => setDraft((current) => ({ ...current, [key]: value }));
  const patchStep = (index, key, value) => setDraft((current) => ({
    ...current,
    steps: current.steps.map((step, itemIndex) => itemIndex === index ? { ...step, [key]: value } : step),
  }));
  const patchWorkshop = (index, key, value) => setDraft((current) => ({
    ...current,
    workshops: current.workshops.map((item, itemIndex) => itemIndex === index ? { ...item, [key]: value } : item),
  }));

  const upload = async (file, key, pathPrefix) => {
    if (!file) return;
    setError("");
    if (key !== "hero") {
      setCropRequest({ file, key, pathPrefix });
      return;
    }
    try {
      const blob = await compressNoveltyImage(file);
      await persistUpload(blob, key, pathPrefix);
    } catch (uploadError) {
      setError(uploadError.message || "Image upload failed.");
    }
  };

  const persistUpload = async (blob, key, pathPrefix) => {
    setUploading(key);
    setError("");
    try {
      const path = `novelties/${pathPrefix}/${crypto.randomUUID()}.jpg`;
      const { error: uploadError } = await supabase.storage.from(CMS_MEDIA_BUCKET).upload(path, blob, {
        contentType: "image/jpeg", cacheControl: "3600", upsert: false,
      });
      if (uploadError) throw uploadError;
      const { data } = supabase.storage.from(CMS_MEDIA_BUCKET).getPublicUrl(path);
      if (key === "hero") {
        if (draft.heroImagePath) setRemovedPaths((current) => [...current, draft.heroImagePath]);
        setDraft((current) => ({ ...current, heroImage: data.publicUrl, heroImagePath: path }));
      } else {
        const index = Number(key);
        const oldPath = draft.workshops[index]?.mediaPath;
        if (oldPath) setRemovedPaths((current) => [...current, oldPath]);
        patchWorkshop(index, "image", data.publicUrl);
        patchWorkshop(index, "mediaPath", path);
      }
    } catch (uploadError) {
      setError(uploadError.message || "Image upload failed.");
    } finally {
      setUploading("");
    }
  };

  const addWorkshop = () => setDraft((current) => ({
    ...current,
    workshops: [...current.workshops, {
      id: crypto.randomUUID(), number: String(current.workshops.length + 1).padStart(2, "0"),
      productId: NOVELTY_BUILDER_OPTIONS[0].id, tag: "NEW NOVELTY", title: "New novelty", desc: "Add a short description.",
      image: DEFAULT_NOVELTY_CONTENT.workshops[0].image, mediaPath: "", rotation: "",
    }],
  }));

  const removeWorkshop = (index) => {
    const mediaPath = draft.workshops[index]?.mediaPath;
    if (mediaPath) setRemovedPaths((current) => [...current, mediaPath]);
    setDraft((current) => ({ ...current, workshops: current.workshops.filter((_, itemIndex) => itemIndex !== index) }));
  };

  const save = async () => {
    setSaving(true);
    setError("");
    setNotice("");
    const gallery = {
      heroHighlight: draft.heroHighlight,
      introHeading: draft.introHeading,
      introBody: draft.introBody,
      stepsHeading: draft.stepsHeading,
      stepsIntro: draft.stepsIntro,
      steps: draft.steps,
      workshopsHeading: draft.workshopsHeading,
      workshops: draft.workshops,
    };
    try {
      const { error: saveError } = await supabase.from("cms_pages").upsert({
        slug: "novelties",
        title: "Novelties",
        hero_title: draft.heroTitle.trim(),
        hero_subtitle: draft.heroSubtitle.trim(),
        hero_image_url: draft.heroImage,
        hero_image_path: draft.heroImagePath || null,
        gallery,
        updated_at: new Date().toISOString(),
        updated_by: adminEmail,
      });
      if (saveError) throw saveError;
      if (removedPaths.length) {
        const uniquePaths = [...new Set(removedPaths)];
        const { error: cleanupError } = await supabase.storage.from(CMS_MEDIA_BUCKET).remove(uniquePaths);
        if (cleanupError) throw cleanupError;
      }
      setRemovedPaths([]);
      setNotice("Novelties page changes are live.");
      await refresh();
    } catch (saveError) {
      setError(saveError.message || "Could not save the Novelties page.");
    } finally {
      setSaving(false);
    }
  };

  const field = (label, key, multiline = false) => {
    const Input = multiline ? "textarea" : "input";
    return <label key={key}>{label}<Input value={draft[key] || ""} rows={multiline ? 3 : undefined} onChange={(event) => patch(key, event.target.value)} /></label>;
  };

  return (
    <div className="cms-editor cms-novelties-editor">
      <section className="cms-editor-heading">
        <div><p className="cms-eyebrow">CONTENT MANAGEMENT / NOVELTIES</p><h2>Novelties page</h2><p>Edit page text and each novelty card, including its thumbnail image.</p></div>
        <button onClick={save} disabled={saving || Boolean(uploading)} className="cms-primary-button cms-save-button"><Save size={16} />{saving ? "SAVING…" : "SAVE & PUBLISH"}</button>
      </section>
      {notice && <p className="cms-success cms-editor-notice"><CircleCheck size={16} />{notice}</p>}
      {error && <p className="cms-error cms-editor-notice" role="alert"><CircleAlert size={16} />{error}</p>}

      <section className="cms-panel">
        <div className="cms-panel-title"><span className="cms-panel-icon"><FileImage size={17} /></span><div><h3>Hero and page introduction</h3><p>Update the Novelties page heading, descriptions, and hero image.</p></div></div>
        <div className="cms-novelty-fields">
          {field("Hero title", "heroTitle")}{field("Hero highlighted line", "heroHighlight")}
          {field("Hero description", "heroSubtitle", true)}{field("Introduction heading", "introHeading")}
          {field("Introduction description", "introBody", true)}{field("Steps section heading", "stepsHeading")}
          {field("Steps section introduction", "stepsIntro", true)}{field("Novelty cards section heading", "workshopsHeading")}
        </div>
        <div className="cms-novelty-hero-row">
          <img src={draft.heroImage || DEFAULT_NOVELTY_CONTENT.heroImage} alt="Novelties page hero preview" />
          <label className="cms-upload-button"><Upload size={16} />{uploading === "hero" ? "Uploading…" : "Replace hero image"}<input type="file" accept="image/*" disabled={Boolean(uploading)} onChange={(event) => upload(event.target.files?.[0], "hero", "hero")} /></label>
        </div>
      </section>

      <section className="cms-panel cms-novelty-steps-panel">
        <div className="cms-panel-title"><span className="cms-panel-icon"><Camera size={17} /></span><div><h3>How it works</h3><p>Edit the three steps shown between the intro and novelty cards.</p></div></div>
        <div className="cms-novelty-steps">
          {draft.steps.map((step, index) => <div className="cms-novelty-step" key={step.id || index}>
            <label>Step {index + 1} title<input value={step.title} onChange={(event) => patchStep(index, "title", event.target.value)} /></label>
            <label>Description<textarea rows="3" value={step.desc} onChange={(event) => patchStep(index, "desc", event.target.value)} /></label>
          </div>)}
        </div>
      </section>

      <section className="cms-panel cms-novelty-workshops">
        <div className="cms-gallery-heading"><div className="cms-panel-title"><span className="cms-panel-icon"><ImagePlus size={17} /></span><div><h3>Novelty cards</h3><p>Edit details and thumbnails, or add and remove offerings.</p></div></div><button className="cms-secondary-button" onClick={addWorkshop}><Plus size={16} /> Add novelty</button></div>
        <div className="cms-novelty-workshop-list">
          {draft.workshops.map((item, index) => <article className="cms-novelty-workshop" key={item.id || index}>
            <div className="cms-novelty-card-image"><img src={item.image || DEFAULT_NOVELTY_CONTENT.workshops[index % DEFAULT_NOVELTY_CONTENT.workshops.length].image} alt={`${item.title || "Novelty"} thumbnail preview`} /></div>
            <div className="cms-novelty-card-fields">
              <div className="cms-novelty-fields">
                <label>Card number<input value={item.number || String(index + 1).padStart(2, "0")} onChange={(event) => patchWorkshop(index, "number", event.target.value)} /></label>
                <label>Category label<input value={item.tag || ""} onChange={(event) => patchWorkshop(index, "tag", event.target.value)} /></label>
                <label>Card title<input value={item.title || ""} onChange={(event) => patchWorkshop(index, "title", event.target.value)} /></label>
                <label>Builder destination<select value={item.productId || NOVELTY_BUILDER_OPTIONS[0].id} onChange={(event) => patchWorkshop(index, "productId", event.target.value)}>{NOVELTY_BUILDER_OPTIONS.map((option) => <option key={option.id} value={option.id}>{option.label}</option>)}</select></label>
                <label className="cms-novelty-wide">Description<textarea rows="2" value={item.desc || ""} onChange={(event) => patchWorkshop(index, "desc", event.target.value)} /></label>
              </div>
              <div className="cms-novelty-card-actions">
                <label className="cms-upload-button"><Upload size={14} />{uploading === String(index) ? "Uploading…" : "Change thumbnail"}<input type="file" accept="image/*" disabled={Boolean(uploading)} aria-label={`Change thumbnail for ${item.title || `novelty ${index + 1}`}`} onChange={(event) => upload(event.target.files?.[0], String(index), "cards")} /></label>
                <button className="cms-icon-button cms-delete-button" aria-label={`Remove ${item.title || `novelty ${index + 1}`}`} title="Remove novelty" onClick={() => removeWorkshop(index)}><Trash2 size={17} /></button>
              </div>
            </div>
          </article>)}
          {draft.workshops.length === 0 && <div className="cms-empty-gallery"><ImagePlus size={22} /><p>No novelties are listed. Add a novelty card to show one on the page.</p></div>}
        </div>
        <p className="cms-image-note">Uploaded images are compressed in your browser and saved in Supabase Storage.</p>
      </section>
    </div>
  );
}
