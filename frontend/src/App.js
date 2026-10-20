import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import TrustedCollaborations from "./components/TrustedCollaborations";
import ChooseExperience from "./components/ChooseExperience";
import LevelUp from "./components/LevelUp";
import Testimonials from "./components/Testimonials";
import WhoWeAre from "./components/WhoWeAre";
import ReadyCTA from "./components/ReadyCTA";
import Footer from "./components/Footer";

import GamingEvents from "./components/GamingEvents";
import MovieNights from "./components/MovieNights";
import TriviaNights from "./components/TriviaNights";
import VirtualReality from "./components/VirtualReality";
import VideoBooth360 from "./components/VideoBooth360";
import JustDance from "./components/JustDance";
import SilentDisco from "./components/SilentDisco";
import SimRacing from "./components/SimRacing";
import GlowPark from "./components/GlowPark";
import Novelties from "./components/Novelties";
import NoveltyAccess from "./components/NoveltyAccess";
import QuotePage from "./components/QuotePage";
import NoveltyOrder from "./components/NoveltyOrder";
import ContactPage from "./components/ContactPage";
import AboutPage from "./components/AboutPage";
import AdminPage from "./components/AdminPage";
import SeoManager from "./components/SeoManager";
import { CmsContentProvider, useCmsHomeMedia } from "./lib/cmsContent";
import { Settings2 } from "lucide-react";
import { Link } from "react-router-dom";
import { experiences } from "./mock";

const EXPERIENCE_SLUGS = ["gaming-events", "movie-nights", "trivia-nights", "virtual-reality", "just-dance", "silent-disco", "sim-racing", "photo-booth", "glow-park"];

const LandingContent = () => {
  const homeMedia = useCmsHomeMedia();
  const homeExperiences = experiences.map((experience, index) => ({
    ...experience,
    image: homeMedia[EXPERIENCE_SLUGS[index]] || experience.image,
  }));
  return (
  <div className="App text-foreground">
    <Navbar />
    <main>
      <Hero />
      <TrustedCollaborations />
      <ChooseExperience experiences={homeExperiences} />
      <LevelUp />
      <Testimonials />
      <WhoWeAre />
      <ReadyCTA />
    </main>
    <Footer />
  </div>
  );
};

const Landing = () => <LandingContent />;

function App() {
  return (
    <BrowserRouter>
      <SeoManager />
      <CmsContentProvider>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/quote" element={<QuotePage />} />
        <Route path="/novelty-order" element={<NoveltyOrder />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/gaming-events" element={<GamingEvents />} />
        <Route path="/movie-nights" element={<MovieNights />} />
        <Route path="/trivia-nights" element={<TriviaNights />} />
        <Route path="/virtual-reality" element={<VirtualReality />} />
        <Route path="/photo-booth" element={<VideoBooth360 />} />
        <Route path="/360-video-booth" element={<VideoBooth360 />} />
        <Route path="/360-booth" element={<VideoBooth360 />} />
        <Route path="/just-dance" element={<JustDance />} />
        <Route path="/silent-disco" element={<SilentDisco />} />
        <Route path="/sim-racing" element={<SimRacing />} />
        <Route path="/glow-park" element={<GlowPark />} />
        <Route path="/novelties" element={<Novelties />} />
        <Route path="/north-carolina-event-rentals" element={<Landing />} />
        <Route path="/new-hampshire-massachusetts-event-rentals" element={<Landing />} />
        <Route path="/college-school-corporate-events" element={<Landing />} />
        <Route path="/build-novelty" element={<NoveltyAccess />} />
        <Route path="/build" element={<NoveltyAccess />} />
        <Route path="/cms" element={<AdminPage />} />
        {/* Legacy Wix URL redirects */}
        <Route path="/video-gaming-events" element={<Navigate to="/gaming-events" replace />} />
        <Route path="/art" element={<Navigate to="/novelties" replace />} />
        <Route path="/360videobooth" element={<Navigate to="/photo-booth" replace />} />
        <Route path="/just-dance-party" element={<Navigate to="/just-dance" replace />} />
        <Route path="/copy-of-glow-park" element={<Navigate to="/glow-park" replace />} />
        <Route path="/copy-of-exiciting-new-offer" element={<Navigate to="/glow-park" replace />} />
        <Route path="/sim-racing-experience" element={<Navigate to="/sim-racing" replace />} />
        <Route path="/trivia-night" element={<Navigate to="/trivia-nights" replace />} />
        <Route path="/movie-night" element={<Navigate to="/movie-nights" replace />} />
        <Route path="/covid-19-information" element={<Navigate to="/" replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Link to="/cms" rel="nofollow" aria-label="Open website CMS" title="Website admin dashboard" className="cms-access-button">
        <Settings2 size={19} />
        <span>Admin</span>
      </Link>
      </CmsContentProvider>
    </BrowserRouter>
  );
}


export default App;
