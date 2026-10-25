import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import "./BackToHomeCTA.css";

const BackToHomeCTA = ({ mobileOnly = false }) => (
  <Link
    to="/"
    className={`back-home-cta${mobileOnly ? " back-home-cta--mobile-only" : ""}`}
    aria-label="Back to the homepage"
  >
    <ArrowLeft size={16} aria-hidden="true" />
    <span className="back-home-cta__label-full">Back to homepage</span>
    <span className="back-home-cta__label-short">Back</span>
  </Link>
);

export default BackToHomeCTA;
