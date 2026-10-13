export const DEFAULT_NOVELTY_CONTENT = {
  heroTitle: "Make Room",
  heroHighlight: "For Wonder.",
  heroSubtitle: "Not every great event needs a screen. Discover tactile, social and surprising experiences designed to give your guests something to talk about long after the night is over.",
  heroImage: "/novelties-bg.png",
  introHeading: "THE ART OF THE UNEXPECTED.",
  introBody: "Our Novelties collection brings hands-on creativity to your event. These unique, interactive experiences give guests the chance to make, personalize, and take home something special — turning moments into lasting memories.",
  stepsHeading: "START WITH A FEELING.",
  stepsIntro: "Choose a mood, a memory or simply something your guests have never tried. We will shape the details around it.",
  steps: [
    { id: "01", title: "THINK", desc: "Start with an idea. Tell us what you want to create, the occasion, your style, and the kind of novelty that would make your event memorable." },
    { id: "02", title: "DESIGN", desc: "Make it personal. Choose your colors, designs, materials, and details. Customize your novelty to match your event, theme, or personality." },
    { id: "03", title: "CREATE", desc: "Bring it to life. From custom hats and bracelets to pillows, keychains, rings, and plush bags, turn your idea into something unique your guests can enjoy and take home." },
  ],
  workshopsHeading: "CREATIVE WORKSHOPS",
  workshops: [
    { id: "01", productId: "trucker-hats", tag: "HATS & BEANIES", title: "(PATCHED CITY) Trucker Hats & Beanies", desc: "Customize your own trucker hat or beanie with unique patches and designs.", image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=600&q=80", rotation: "sm:-rotate-1" },
    { id: "02", productId: "trucker-hats", tag: "HAT CUSTOMIZATION", title: "Custom Trucker Hats", desc: "Design and personalize your own trucker hat to match your style.", image: "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?auto=format&fit=crop&w=600&q=80", rotation: "sm:rotate-2" },
    { id: "03", productId: "custom-socks", tag: "SOCKS", title: "Custom Socks", desc: "Create your own custom socks with patterns, logos or text.", image: "https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?auto=format&fit=crop&w=600&q=80", rotation: "sm:-rotate-2" },
    { id: "04", productId: "custom-bracelets", tag: "BRACELETS", title: "Bead-tastics Custom Bracelets", desc: "Fun, hand-crafted bracelets designed by you, for you.", image: "https://images.unsplash.com/photo-1611591475879-c5ec2b810d7a?auto=format&fit=crop&w=600&q=80", rotation: "sm:rotate-1" },
    { id: "05", productId: "pillow-dolls", tag: "PILLOW DOLLS", title: "Custom Pillow Dolls", desc: "Turn your favorite photos, characters or ideas into custom pillow dolls.", image: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=600&q=80", rotation: "sm:-rotate-1" },
    { id: "06", productId: "sequence-pillows", tag: "SEQUENCE PILLOWS", title: "Custom Sequence Pillows", desc: "Create your own sequin pillow with colors, text or images that change.", image: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=600&q=80", rotation: "sm:rotate-2" },
    { id: "07", productId: "intention-bracelets", tag: "BRACELETS", title: "Intention Bracelet", desc: "Design a meaningful bracelet with intention, style and purpose.", image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=600&q=80", rotation: "sm:-rotate-1" },
    { id: "08", productId: "laser-keychains", tag: "KEYCHAINS", title: "Laser-Engraved Wood & Metal Keychains", desc: "Personalize high-quality wooden or metal keychains with your own design.", image: "https://images.unsplash.com/photo-1622434641406-a158123450f9?auto=format&fit=crop&w=600&q=80", rotation: "sm:rotate-1" },
    { id: "09", productId: "stamped-rings", tag: "CUSTOM RINGS", title: "Stamped Custom Rings / Hammerless Ring Press", desc: "Create your own custom stamped ring with our easy hammerless ring press.", image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=600&q=80", rotation: "sm:-rotate-2" },
    { id: "10", productId: "plush-bags", tag: "PLUSH BAGS", title: "Silly Sacks (Custom Character Plush Bags)", desc: "Bring your imagination to life with custom character plush bags.", image: "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?auto=format&fit=crop&w=600&q=80", rotation: "sm:rotate-1" },
  ],
};

export const NOVELTY_BUILDER_OPTIONS = [
  { id: "trucker-hats", label: "Trucker Hats" },
  { id: "hats-beanies", label: "Hats & Beanies" },
  { id: "custom-socks", label: "Custom Socks" },
  { id: "custom-bracelets", label: "Custom Bracelets" },
  { id: "pillow-dolls", label: "Pillow Dolls" },
  { id: "sequence-pillows", label: "Sequence Pillows" },
  { id: "intention-bracelets", label: "Intention Bracelets" },
  { id: "laser-keychains", label: "Laser Keychains" },
  { id: "stamped-rings", label: "Stamped Rings" },
  { id: "plush-bags", label: "Plush Bags" },
];

export function noveltyContentFromRow(row) {
  const data = row?.gallery && !Array.isArray(row.gallery) ? row.gallery : {};
  return {
    ...DEFAULT_NOVELTY_CONTENT,
    heroTitle: row?.hero_title || DEFAULT_NOVELTY_CONTENT.heroTitle,
    heroHighlight: data.heroHighlight || DEFAULT_NOVELTY_CONTENT.heroHighlight,
    heroSubtitle: row?.hero_subtitle || DEFAULT_NOVELTY_CONTENT.heroSubtitle,
    heroImage: row?.hero_image_url || DEFAULT_NOVELTY_CONTENT.heroImage,
    introHeading: data.introHeading || DEFAULT_NOVELTY_CONTENT.introHeading,
    introBody: data.introBody || DEFAULT_NOVELTY_CONTENT.introBody,
    stepsHeading: data.stepsHeading || DEFAULT_NOVELTY_CONTENT.stepsHeading,
    stepsIntro: data.stepsIntro || DEFAULT_NOVELTY_CONTENT.stepsIntro,
    steps: Array.isArray(data.steps) ? data.steps : DEFAULT_NOVELTY_CONTENT.steps,
    workshopsHeading: data.workshopsHeading || DEFAULT_NOVELTY_CONTENT.workshopsHeading,
    workshops: Array.isArray(data.workshops) ? data.workshops : DEFAULT_NOVELTY_CONTENT.workshops,
    heroImagePath: row?.hero_image_path || "",
  };
}
