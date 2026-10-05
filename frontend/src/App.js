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

const Landing = () => (
  <div className="App text-foreground">
    <Navbar />
    <main>
      <Hero />
      <TrustedCollaborations />
      <ChooseExperience />
      <LevelUp />
      <Testimonials />
      <WhoWeAre />
      <ReadyCTA />
    </main>
    <Footer />
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/gaming-events" element={<GamingEvents />} />
        <Route path="/movie-nights" element={<MovieNights />} />
        <Route path="/trivia-nights" element={<TriviaNights />} />
        <Route path="/virtual-reality" element={<VirtualReality />} />
        <Route path="/360-video-booth" element={<VideoBooth360 />} />
        <Route path="/360-booth" element={<VideoBooth360 />} />
        <Route path="/just-dance" element={<JustDance />} />
        <Route path="/silent-disco" element={<SilentDisco />} />
        <Route path="/sim-racing" element={<SimRacing />} />
        <Route path="/novelties" element={<Novelties />} />
        <Route path="/build-novelty" element={<BuildNovelty />} />
        <Route path="/build" element={<BuildNovelty />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
