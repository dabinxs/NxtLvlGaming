import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { supabase } from "./supabase";

const CmsContentContext = createContext({ pages: {}, homeMedia: {}, connection: "checking", refresh: async () => {} });

function rowToPage(row) {
  const isGlowParkLegacyHero = row.slug === "glow-park" && row.hero_image_url === "/experience-silent-disco.png";
  const isGlowParkLegacyThumb = row.slug === "glow-park" && row.thumbnail_image_url === "/experience-silent-disco.png";
  const heroImageUrl = isGlowParkLegacyHero ? "/experience-glow-park.jpg" : row.hero_image_url;
  const thumbnailImageUrl = isGlowParkLegacyThumb ? "/experience-glow-park.jpg" : row.thumbnail_image_url;
  return {
    ...row,
    hero_image_url: heroImageUrl,
    thumbnail_image_url: thumbnailImageUrl,
    heroTitle: row.hero_title,
    heroSubtitle: row.hero_subtitle,
    heroImage: heroImageUrl,
    heroImagePath: row.hero_image_path,
    thumbnailImage: thumbnailImageUrl,
    thumbnailImagePath: row.thumbnail_image_path,
  };
}

export function CmsContentProvider({ children }) {
  const [pages, setPages] = useState({});
  const [connection, setConnection] = useState("checking");

  const refresh = useCallback(async () => {
    const { data, error } = await supabase.from("cms_pages").select("*");
    if (error) {
      setConnection("needs-setup");
      return { error };
    }
    setPages(Object.fromEntries((data || []).map((row) => [row.slug, rowToPage(row)])));
    setConnection("ready");
    return { data };
  }, []);

  useEffect(() => {
    let alive = true;
    const load = async () => {
      const { data, error } = await supabase.from("cms_pages").select("*");
      if (!alive) return;
      if (error) {
        setConnection("needs-setup");
        return;
      }
      setPages(Object.fromEntries((data || []).map((row) => [row.slug, rowToPage(row)])));
      setConnection("ready");
    };
    load();
    const channel = supabase
      .channel("public-cms-pages")
      .on("postgres_changes", { event: "*", schema: "public", table: "cms_pages" }, load)
      .subscribe();
    return () => {
      alive = false;
      supabase.removeChannel(channel);
    };
  }, []);

  const homeMedia = useMemo(() => Object.fromEntries(
    Object.entries(pages).filter(([, page]) => page.thumbnail_image_url).map(([slug, page]) => [slug, page.thumbnail_image_url]),
  ), [pages]);
  const value = useMemo(() => ({ pages, homeMedia, connection, refresh }), [pages, homeMedia, connection, refresh]);
  return <CmsContentContext.Provider value={value}>{children}</CmsContentContext.Provider>;
}

export function useCmsPage(slug, defaults) {
  const { pages } = useContext(CmsContentContext);
  const stored = pages[slug];

  let rawGallery = defaults?.gallery || [];
  if (stored?.gallery && Array.isArray(stored.gallery) && stored.gallery.length > 0) {
    const storedMap = new Map(
      stored.gallery.map((item) => [(item.id || item.title || "").toLowerCase(), item])
    );
    const defaultsMatched = (defaults?.gallery || []).map((def) => {
      const key = (def.id || def.title || "").toLowerCase();
      const match = storedMap.get(key);
      if (!match) return def;
      return {
        ...def,
        ...match,
        image: match.image || match.src || def.image,
        src: match.src || match.image || def.src || def.image,
      };
    });
    const defaultKeys = new Set(
      (defaults?.gallery || []).map((def) => (def.id || def.title || "").toLowerCase())
    );
    const customItems = stored.gallery.filter(
      (item) => !defaultKeys.has((item.id || item.title || "").toLowerCase())
    );
    rawGallery = [...defaultsMatched, ...customItems];
  }

  const gallery = rawGallery.map((item) => {
    const normalized = { ...item, src: item.src || item.image || "" };
    if (slug === "movie-nights" && item.id === "movie-led" && item.title === "LED") {
      normalized.title = "LED TRAILER / VIDEO WALL SCREEN SET UP";
      normalized.subtitle = "A mobile LED trailer and video wall setup for vibrant, high-visibility movie nights.";
    }
    if (slug === "movie-nights" && item.id === "movie-inflatable" && item.title === "INFLATABLE") {
      normalized.title = "INFLATABLE SCREEN SET UP";
      normalized.subtitle = "A large-format inflatable cinema screen for memorable outdoor movie nights.";
    }
    return normalized;
  });
  return {
    ...defaults,
    ...(stored || {}),
    heroTitle: stored?.hero_title || stored?.heroTitle || defaults?.heroTitle,
    heroSubtitle: stored?.hero_subtitle || stored?.heroSubtitle || defaults?.heroSubtitle,
    heroImage: stored?.hero_image_url || stored?.heroImage || defaults?.heroImage,
    thumbnailImage: stored?.thumbnail_image_url || stored?.thumbnailImage || defaults?.heroImage,
    gallery,
  };
}

export function useCmsHomeMedia() {
  return useContext(CmsContentContext).homeMedia;
}

export function useCmsContent() {
  return useContext(CmsContentContext);
}

export const CMS_CONTENT_SLUGS = ["gaming-events", "movie-nights", "trivia-nights", "virtual-reality", "photo-booth", "just-dance", "silent-disco", "sim-racing", "glow-park"];
