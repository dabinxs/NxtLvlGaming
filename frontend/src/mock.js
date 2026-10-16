// Mock data for the Next Level Gaming Events landing page (frontend-only)

export const navLinks = [
  { label: "EVENTS", href: "#experience", menu: "events" },
  { label: "EXPERIENCE", href: "#gaming-division", menu: "experience" },
  { label: "NOVELTIES", href: "/novelties" },
  { label: "ABOUT", href: "/about" },
  { label: "CONTACT", href: "/contact" },
];

// Mega panel content for the EVENTS / EXPERIENCE dropdowns
export const megaMenus = {
  events: {
    label: "EVENTS",
    items: [
      {
        title: "Gaming Events",
        icon: "Gamepad2",
        desc: "Competitive and social gaming experiences.",
        href: "/gaming-events",
      },
      {
        title: "Movie Nights",
        icon: "Clapperboard",
        desc: "Cinema-style entertainment for any event.",
        href: "/movie-nights",
      },
      {
        title: "Trivia Nights",
        icon: "Brain",
        desc: "Interactive trivia for groups and crowds.",
        href: "/trivia-nights",
      },
    ],
  },
  experience: {
    label: "EXPERIENCE",
    items: [
      {
        title: "Virtual Reality",
        icon: "Glasses",
        desc: "Immersive VR games for individuals or groups.",
        href: "/virtual-reality",
      },
      {
        title: "Just Dance",
        icon: "Music",
        desc: "Follow the on-screen choreography, earn points, and challenge friends.",
        href: "/just-dance",
      },
      {
        title: "Silent Disco",
        icon: "Headphones",
        desc: "LED headphones with multiple music channels.",
        href: "/silent-disco",
      },
      {
        title: "Sim Racing",
        icon: "Car",
        desc: "Pro simulators with competitive racing.",
        href: "/sim-racing",
      },
      {
        title: "Photo Booth",
        icon: "Camera",
        desc: "360 video and mirror booth experiences guests can enjoy and share.",
        href: "/photo-booth",
      },
      {
        title: "Glow Park Experience",
        icon: "Sparkles",
        desc: "Glow swings, seesaws, uplighting, and glowing mini golf.",
        href: "/glow-park",
      },
    ],
  },
};

export const collaborationLogos = [
  { name: "Albertus Magnus",            logo: "/logos/collab_1.png" },
  { name: "Springfield College",        logo: "/logos/collab_2.png" },
  { name: "Babson College",             logo: "/logos/collab_3.png" },
  { name: "Quinnipiac University",      logo: "/logos/collab_4.png" },
  { name: "Penn State",                 logo: "/logos/collab_5.png" },
  { name: "SUNY Polytechnic",           logo: "/logos/collab_6.png" },
  { name: "Seton Hall",                 logo: "/logos/collab_7.png" },
  { name: "College of Staten Island",   logo: "/logos/collab_8.png" },
  { name: "Western Connecticut State",  logo: "/logos/collab_9.png" },
  { name: "Emmanuel College",           logo: "/logos/collab_10.png" },
  { name: "Framingham State",           logo: "/logos/collab_11.png" },
  { name: "Connecticut College",        logo: "/logos/collab_12.png" },
  { name: "Boston University",          logo: "/logos/collab_13.png" },
  { name: "Harvard",                    logo: "/logos/collab_14.png" },
  { name: "John Jay",                   logo: "/logos/collab_15.png" },
  { name: "Fisher College",             logo: "/logos/collab_16.png" },
  { name: "Florida Tech",               logo: "/logos/collab_17.png" },
  { name: "Mercyhurst",                 logo: "/logos/collab_18.png" },
  { name: "Dean College",               logo: "/logos/collab_19.png" },
  { name: "Fairleigh Dickinson",        logo: "/logos/collab_20.png" },
  { name: "Holy Cross",                 logo: "/logos/collab_21.png" },
  { name: "Salve Regina",               logo: "/logos/collab_22.png" },
  { name: "Brookdale",                  logo: "/logos/collab_23.png" },
];

export const collaborations = collaborationLogos.map((c) => c.name);

export const experiences = [
  {
    id: 1,
    slug: "gaming-events",
    title: "Gaming",
    highlight: "Events",
    desc: "Full-scale multiplayer setups, consoles and giant screens for any crowd.",
    image: "/experience-gaming-events.avif",
  },
  {
    id: 2,
    slug: "movie-nights",
    title: "Movie",
    highlight: "Nights",
    desc: "32-foot inflatable screens under the stars for movie nights that draw a crowd.",
    image: "/experience-movie-nights.png",
  },
  {
    id: 3,
    slug: "trivia-nights",
    title: "Trivia",
    highlight: "Nights",
    desc: "Interactive trivia for groups and crowds with live hosts and scoring.",
    image: "/experience-trivia-nights.png",
  },
  {
    id: 4,
    slug: "virtual-reality",
    title: "Virtual",
    highlight: "Reality",
    desc: "Room-scale VR stations and immersive experiences that wow every guest.",
    image: "/experience-virtual-reality.png",
  },
  {
    id: 5,
    slug: "just-dance",
    title: "Just",
    highlight: "Dance",
    desc: "Follow the on-screen choreography, earn points, and challenge friends.",
    image: "/experience-just-dance.png",
  },
  {
    id: 6,
    slug: "silent-disco",
    title: "Silent",
    highlight: "Disco",
    desc: "LED headphones with multiple music channels for an unforgettable dance experience.",
    image: "/experience-silent-disco.png",
  },
  {
    id: 7,
    slug: "sim-racing",
    title: "Sim",
    highlight: "Racing",
    desc: "Pro simulators with competitive racing that brings the track to your event.",
    image: "/experience-sim-racing.png",
  },
  {
    id: 8,
    slug: "photo-booth",
    title: "Photo",
    highlight: "Booth",
    desc: "Make your events more fun and memorable with our photobooth experiences. Capture, create, and share amazing moments instantly.",
    image: "/experience-360-video-booth.png",
  },
  {
    id: 9,
    slug: "glow-park",
    title: "Glow Park",
    highlight: "Experience",
    desc: "Eight glow swings, four glow seesaws, colorful uplighting, and glowing mini golf.",
    image: "/experience-silent-disco.png",
  },
];

export const testimonials = [
  {
    id: "dean-college",
    name: "Dean College",
    quote: "We had an incredibly fun time at the Next Level Gaming event filled with dancing and music, and we enthusiastically plan to participate again.",
    video: "/dean-college.mp4",
  },
  {
    id: "new-england-college",
    name: "New England College",
    quote: "We praise Next Level Gaming for hosting an awesome Just Dance event that brought students together and encouraged more people to participate.",
    video: "/new-england-college.mp4",
  },
  {
    id: "bridgewater-state-university",
    name: "Bridgewater State University",
    quote: "I loved working with Next Level Gaming, whose engaging setup made our Bridgewater State event a success, and I look forward to collaborating again.",
    video: "/bridgewater-state-university.mp4",
  },
  {
    id: "fisher-college",
    name: "Fisher College",
    quote: "I loved hosting Next Level Gaming because the students had a blast, and it was an affordable, fun way for them to interact indoors.",
    video: "/fisher-college.mp4",
  },
  {
    id: "springfield-college",
    name: "Springfield College",
    quote: "We've had a lot of fun tonight doing just Dance in a large scale, it's even better with Jenz! Thank Next Level Gaming!",
    video: "/springfield-college.mp4",
  },
  {
    id: "emmanuel-college",
    name: "Emmanuel College",
    quote: "It was an incredible experience filled with fun, music, dancing, and unforgettable moments. Everyone had a great time, and we’re excited to come back and enjoy another Next Level Gaming event!",
    video: "/emmanuel-college.mp4",
  },
];

export const footerColumns = [
  {
    title: "EVENTS",
    links: ["Gaming events", "Movie Nights", "Trivia Nights"],
  },
  {
    title: "EXPERIENCE",
    links: ["Photo Booth", "Virtual Reality", "Just Dance", "Silent Disco", "Sim Racing"],
  },
  {
    title: "COMPANY",
    links: ["About", "Novelties", "FAQ", "Contact"],
  },
];
