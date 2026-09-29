// Mock data for the Next Level Gaming Events landing page (frontend-only)

export const navLinks = [
  { label: "EVENTS", href: "#experience", menu: "events" },
  { label: "EXPERIENCE", href: "#gaming-division", menu: "experience" },
  { label: "NOVELTIES", href: "#who-we-are" },
  { label: "ABOUT", href: "#who-we-are" },
  { label: "CONTACT", href: "#footer" },
];

// Mega panel content for the EVENTS / EXPERIENCE dropdowns
export const megaMenus = {
  events: {
    label: "EVENTS",
    groups: [
      {
        title: "Gaming Events",
        icon: "Gamepad2",
        items: [
          {
            title: "Gaming Parties",
            icon: "Gamepad2",
            desc: "Multiplayer gaming setups, consoles, giant screens, and entertainment for any crowd.",
          },
          {
            title: "Gaming Tournaments",
            icon: "Trophy",
            desc: "Full-scale competitive gaming events with tournament setups, multiple stations, and organized gameplay.",
          },
          {
            title: "Social Gaming",
            icon: "Users",
            desc: "Casual multiplayer experiences designed to bring guests together and keep everyone engaged.",
          },
        ],
      },
      {
        title: "Movie Nights",
        icon: "Clapperboard",
        items: [
          {
            title: "Outdoor Movie Nights",
            icon: "Projector",
            desc: "Large-screen outdoor cinema experiences with professional projection, sound, and comfortable event setups.",
          },
          {
            title: "Indoor Movie Nights",
            icon: "Film",
            desc: "Cinema-style entertainment brought directly to schools, venues, parties, and private events.",
          },
        ],
      },
      {
        title: "Trivia Nights",
        icon: "Brain",
        items: [
          {
            title: "Interactive Trivia",
            icon: "Lightbulb",
            desc: "Live trivia experiences with questions, giant screens, and interactive gameplay for groups and events.",
          },
          {
            title: "Custom Trivia",
            icon: "ListChecks",
            desc: "Custom categories and questions tailored to your event, audience, or organization.",
          },
        ],
      },
    ],
    spotlight: {
      tag: "MOST BOOKED",
      title: "Gaming Tournaments",
      desc: "Tournament stages, casters and multiple stations — built for a live crowd.",
      cta: "Plan a tournament",
    },
  },
  experience: {
    label: "EXPERIENCE",
    groups: [
      {
        title: "Virtual Reality",
        icon: "Glasses",
        items: [
          {
            title: "VR Experiences",
            icon: "Glasses",
            desc: "Immersive virtual reality games and experiences designed for individual players or groups.",
          },
        ],
      },
      {
        title: "Just Dance",
        icon: "Music",
        items: [
          {
            title: "Just Dance Party",
            icon: "Music",
            desc: "High-energy dance experiences with giant-screen choreography, premium sound, and party lighting.",
          },
        ],
      },
      {
        title: "Silent Disco",
        icon: "Headphones",
        items: [
          {
            title: "Silent Disco",
            icon: "Headphones",
            desc: "Wireless LED headphones, multiple music channels, and a unique party experience without traditional speakers.",
          },
        ],
      },
      {
        title: "Sim Racing",
        icon: "Car",
        items: [
          {
            title: "Sim Racing Experience",
            icon: "Car",
            desc: "Immersive racing with professional simulators, responsive steering wheels, realistic pedals, and competitive gameplay.",
          },
        ],
      },
      {
        title: "360 Video Booth",
        icon: "Camera",
        items: [
          {
            title: "360 Video Booth",
            icon: "Camera",
            desc: "Interactive 360° video experiences with event-ready lighting, effects, and shareable videos.",
          },
        ],
      },
    ],
    spotlight: {
      tag: "CROWD FAVOURITE",
      title: "360 Video Booth",
      desc: "Shareable 360° clips with event lighting and effects your guests keep posting.",
      cta: "Book the booth",
    },
  },
};

export const collaborations = [
  "HARVARD",
  "MIT",
  "BOSTON UNIVERSITY",
  "RED SOX",
  "BROOKDALE",
  "QUINCY",
  "FRAMINGHAM STATE",
  "EMMANUEL COLLEGE",
  "NORTHEASTERN",
  "TUFTS",
];

export const experiences = [
  {
    id: 1,
    title: "Outdoor Cinema",
    highlight: "Nights",
    desc: "32-foot inflatable screens under the stars for movie nights that draw a crowd.",
    image: "https://images.unsplash.com/photo-1587095951604-b9d924a3fda0?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 2,
    title: "Esports",
    highlight: "Arena",
    desc: "Full tournament stages with giant screens, casters and a live audience.",
    image: "https://images.unsplash.com/photo-1504450758481-7338eba7524a?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 3,
    title: "Gaming",
    highlight: "Event",
    desc: "Full-scale multiplayer setups, consoles and giant screens for any crowd.",
    image: "https://images.unsplash.com/photo-1593305841991-05c297ba4575?auto=format&fit=crop&w=1400&q=80",
  },
  {
    id: 4,
    title: "Virtual",
    highlight: "Reality",
    desc: "Room-scale VR stations and immersive experiences that wow every guest.",
    image: "https://images.unsplash.com/photo-1633545495735-25df17fb9f31?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 5,
    title: "LED",
    highlight: "Takeover",
    desc: "Rainbow LED gaming lounges that transform any venue into a playground.",
    image: "https://images.unsplash.com/photo-1626218174358-7769486c4b79?auto=format&fit=crop&w=1200&q=80",
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
