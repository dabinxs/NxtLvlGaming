// Mock data for the Next Level Gaming Events landing page (frontend-only)

export const navLinks = [
  { label: "EVENTS", href: "#experience", menu: "events" },
  { label: "EXPERIENCE", href: "#gaming-division", menu: "experience" },
  { label: "NOVELTIES", href: "/novelties" },
  { label: "ABOUT", href: "#who-we-are" },
  { label: "CONTACT", href: "#footer" },
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
        desc: "High-energy dance parties on giant screens.",
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
        title: "360 Video Booth",
        icon: "Camera",
        desc: "Interactive 360° videos guests can share.",
        href: "/360-video-booth",
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
    title: "Gaming",
    highlight: "Events",
    desc: "Full-scale multiplayer setups, consoles and giant screens for any crowd.",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: 2,
    title: "Movie",
    highlight: "Nights",
    desc: "32-foot inflatable screens under the stars for movie nights that draw a crowd.",
    image: "https://images.unsplash.com/photo-1587095951604-b9d924a3fda0?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: 3,
    title: "Trivia",
    highlight: "Nights",
    desc: "Interactive trivia for groups and crowds with live hosts and scoring.",
    image: "https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: 4,
    title: "Virtual",
    highlight: "Reality",
    desc: "Room-scale VR stations and immersive experiences that wow every guest.",
    image: "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: 5,
    title: "Just",
    highlight: "Dance",
    desc: "High-energy dance parties on giant screens that get everyone moving.",
    image: "https://images.unsplash.com/photo-1545128485-c400e7702796?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: 6,
    title: "Silent",
    highlight: "Disco",
    desc: "LED headphones with multiple music channels for an unforgettable dance experience.",
    image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: 7,
    title: "Sim",
    highlight: "Racing",
    desc: "Pro simulators with competitive racing that brings the track to your event.",
    image: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: 8,
    title: "360 Video",
    highlight: "Booth",
    desc: "Interactive 360° videos guests can share instantly on social media.",
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1400&q=80",
  },
];

// A shared mock testimonial video (YouTube embed used in modal)
const SAMPLE_VIDEO = "https://www.youtube.com/embed/dQw4w9WgXcQ";

const names = [
  { name: "Sarah Mitchell", role: "Event Director, Harvard", stars: 5 },
  { name: "James Carter", role: "MIT Student Union", stars: 5 },
  { name: "Elena Rodriguez", role: "Corporate Events, Red Sox", stars: 5 },
  { name: "Michael Chen", role: "Brookdale Activities", stars: 4 },
  { name: "Aisha Thompson", role: "Framingham State", stars: 5 },
  { name: "David Okafor", role: "Northeastern Athletics", stars: 5 },
  { name: "Priya Sharma", role: "Tufts Programming", stars: 5 },
  { name: "Lucas Bennett", role: "Emmanuel College", stars: 4 },
];

export const testimonials = names.map((n, i) => ({
  id: i + 1,
  ...n,
  quote: "Amazing experience from setup to the event itself. Everything felt professional and engaging.",
  video: SAMPLE_VIDEO,
  thumb: experiences[i % experiences.length].image,
}));

export const footerColumns = [
  {
    title: "EVENTS",
    links: ["Gaming events", "Movie Nights", "Trivia Nights"],
  },
  {
    title: "EXPERIENCE",
    links: ["360 Booth", "Virtual Reality", "Just Dance", "Silent Disco", "Sim Racing"],
  },
  {
    title: "COMPANY",
    links: ["About", "Novelties", "FAQ", "Contact"],
  },
];
