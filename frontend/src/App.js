import React, { lazy, Suspense } from "react";
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

const GamingEvents = lazy(() => import("./components/GamingEvents"));
const MovieNights = lazy(() => import("./components/MovieNights"));
const TriviaNights = lazy(() => import("./components/TriviaNights"));
const VirtualReality = lazy(() => import("./components/VirtualReality"));
const VideoBooth360 = lazy(() => import("./components/VideoBooth360"));
const JustDance = lazy(() => import("./components/JustDance"));
const SilentDisco = lazy(() => import("./components/SilentDisco"));
const SimRacing = lazy(() => import("./components/SimRacing"));
const Novelties = lazy(() => import("./components/Novelties"));

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
      <Suspense fallback={null}>
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
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
