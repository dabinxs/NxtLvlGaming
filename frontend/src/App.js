import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import Novelties from "./components/Novelties";
import BuildNovelty from "./components/BuildNovelty";
import NoveltyAccess from "./components/NoveltyAccess";
import QuotePage from "./components/QuotePage";
import ContactPage from "./components/ContactPage";
import AboutPage from "./components/AboutPage";
import AdminPage from "./components/AdminPage";
import { CmsContentProvider, useCmsHomeMedia } from "./lib/cmsContent";
import { Settings2 } from "lucide-react";
import { Link } from "react-router-dom";
import { experiences } from "./mock";

const EXPERIENCE_SLUGS = ["gaming-events", "movie-nights", "trivia-nights", "virtual-reality", "just-dance", "silent-disco", "sim-racing", "photo-booth"];

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
      <CmsContentProvider>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/quote" element={<QuotePage />} />
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
        <Route path="/novelties" element={<Novelties />} />
        <Route path="/build-novelty" element={<NoveltyAccess />} />
        <Route path="/build" element={<NoveltyAccess />} />
        <Route path="/cms" element={<AdminPage />} />
      </Routes>
      <Link to="/cms" aria-label="Open website CMS" title="Website admin dashboard" className="cms-access-button">
        <Settings2 size={19} />
        <span>Admin</span>
      </Link>
      </CmsContentProvider>
    </BrowserRouter>
  );
}


export default App;
