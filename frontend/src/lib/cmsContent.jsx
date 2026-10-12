import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { collection, doc, onSnapshot, query, where } from "firebase/firestore";
import { db } from "./firebase";
import { auth } from "./firebase";

const CmsContentContext = createContext({ pages: {}, homeMedia: {} });

export function CmsContentProvider({ children }) {
  const [pages, setPages] = useState({});
  const [homeMedia, setHomeMedia] = useState({});

  useEffect(() => {
    const homeQuery = query(collection(db, "cmsMedia"), where("pageSlug", "==", "home"), where("published", "==", true));
    const unsubscribe = onSnapshot(homeQuery, (snapshot) => {
      setHomeMedia(Object.fromEntries(snapshot.docs.map((item) => [item.data().itemId, item.data().url])));
    }, () => {});
    return unsubscribe;
  }, []);

  const value = useMemo(() => ({ pages, homeMedia }), [pages, homeMedia]);
  return <CmsContentContext.Provider value={value}>{children}</CmsContentContext.Provider>;
}

export function useCmsPage(slug, defaults) {
  const [override, setOverride] = useState({});
  useEffect(() => {
    const unsubscribePage = onSnapshot(doc(db, "cmsPages", slug), (snapshot) => {
      setOverride((current) => ({ ...current, ...(snapshot.exists() ? snapshot.data() : {}) }));
    }, () => {});
    const mediaFilters = [where("pageSlug", "==", slug)];
    if (!auth.currentUser?.emailVerified || auth.currentUser.email?.toLowerCase() !== "team@nextlevelgamingevents.com") mediaFilters.push(where("published", "==", true));
    const mediaQuery = query(collection(db, "cmsMedia"), ...mediaFilters);
    const unsubscribeMedia = onSnapshot(mediaQuery, (snapshot) => {
      setOverride((current) => ({ ...current, media: snapshot.docs.map((item) => ({ id: item.id, ...item.data() })) }));
    }, () => {});
    return () => { unsubscribePage(); unsubscribeMedia(); };
  }, [slug]);
  const media = Object.fromEntries((override.media || []).map((item) => [item.id, item.url]));
  const heroImage = media[override.heroMediaId] || defaults.heroImage;
  const galleryItems = (override.gallery || defaults.gallery).map((item) => ({
    ...item,
    src: media[item.mediaId] || item.src || defaults.gallery.find((entry) => entry.id === item.id)?.src || defaults.gallery.find((entry) => entry.id === item.id)?.image || "",
  }));
  return {
    ...defaults,
    ...override,
    heroImage,
    gallery: galleryItems,
    thumbnailImage: media[override.thumbnailMediaId] || defaults.heroImage,
  };
}

export function useCmsHomeMedia() {
  return useContext(CmsContentContext).homeMedia;
}

export const CMS_CONTENT_SLUGS = ["gaming-events", "movie-nights", "trivia-nights", "virtual-reality", "photo-booth", "just-dance", "silent-disco", "sim-racing"];
