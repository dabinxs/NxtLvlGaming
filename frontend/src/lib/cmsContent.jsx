import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { supabase } from "./supabase";

const CmsContentContext = createContext({ pages: {}, homeMedia: {}, connection: "checking", refresh: async () => {} });

function rowToPage(row) {
  return {
    ...row,
    heroTitle: row.hero_title,
    heroSubtitle: row.hero_subtitle,
    heroImage: row.hero_image_url,
    heroImagePath: row.hero_image_path,
    thumbnailImage: row.thumbnail_image_url,
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
  const gallery = (stored?.gallery || defaults.gallery).map((item) => ({ ...item, src: item.src || item.image || "" }));
  return {
    ...defaults,
    ...(stored || {}),
    heroTitle: stored?.hero_title || stored?.heroTitle || defaults.heroTitle,
    heroSubtitle: stored?.hero_subtitle || stored?.heroSubtitle || defaults.heroSubtitle,
    heroImage: stored?.hero_image_url || stored?.heroImage || defaults.heroImage,
    thumbnailImage: stored?.thumbnail_image_url || stored?.thumbnailImage || defaults.heroImage,
    gallery,
  };
}

export function useCmsHomeMedia() {
  return useContext(CmsContentContext).homeMedia;
}

export function useCmsContent() {
  return useContext(CmsContentContext);
}

export const CMS_CONTENT_SLUGS = ["gaming-events", "movie-nights", "trivia-nights", "virtual-reality", "photo-booth", "just-dance", "silent-disco", "sim-racing"];
