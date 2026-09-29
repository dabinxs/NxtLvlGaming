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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
