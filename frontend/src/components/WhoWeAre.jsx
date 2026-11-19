import React from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import "./WhoWeAre.css";

const photos = [
  { src: "/who-movie-night.png", alt: "Guests watching an outdoor movie at sunset" },
  { src: "/who-gaming-lounge.png", alt: "Guests playing games together in an esports lounge" },
  { src: "/who-heat-press.png", alt: "Guests gathered around a heat press demonstration" },
  { src: "/who-gaming-event.jpg", alt: "Guests at a large video gaming event" },
];

const WhoWeAre = () => (
  <section id="who-we-are" className="who-we-are" aria-labelledby="who-we-are-title" style={{ backgroundImage: "url('/indigo-starfield.png')" }}>
    <div className="who-we-are__card">
      <div className="who-we-are__gallery">
        <div className="who-we-are__photos">
          {photos.map(({ src, alt }) => (
            <img key={src} src={src} alt={alt} loading="lazy" decoding="async" />
          ))}
        </div>
      </div>
      <div className="who-we-are__copy">
        <h2 id="who-we-are-title" className="font-display">More Than Gaming<br />Its An Experience</h2>
        <p>
          For over a decade we've produced interactive entertainment that turns
          gatherings into stories. Every event is delivered, staffed and run by
          our own crew.
        </p>
        <Link to="/about" className="who-we-are__link">
          Learn more <ArrowRight aria-hidden="true" size={20} />
        </Link>
      </div>
      <img className="who-we-are__controller" src="/who-controller.png" alt="" loading="lazy" decoding="async" />
    </div>
  </section>
);

export default WhoWeAre;
