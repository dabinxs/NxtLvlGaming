import React, { useState } from "react";
import { ArrowDown, ArrowRight, ArrowUpRight, Check, Mail, MapPin, Phone, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "./ContactPage.css";

const CONTACT_EMAIL = "sales@nextlevelgamingevents.com";
const CONTACT_PHONE = "978-601-5473";
const topics = ["Plan an event", "Custom novelties", "Partnership", "Something else"];

const ContactPage = () => {
  const [form, setForm] = useState({ name: "", email: "", topic: topics[0], message: "" });
  const [notice, setNotice] = useState("");
  const reduceMotion = useReducedMotion();
  const reveal = (delay = 0) => reduceMotion
    ? {}
    : { initial: { opacity: 0, y: 24 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.18 }, transition: { duration: 0.72, delay, ease: [0.22, 1, 0.36, 1] } };

  const update = (field) => (event) => {
    setNotice("");
    setForm((current) => ({ ...current, [field]: event.target.value }));
  };

  const sendMessage = (event) => {
    event.preventDefault();
    const subject = `${form.topic} — ${form.name}`;
    const body = [`Name: ${form.name}`, `Email: ${form.email}`, `Topic: ${form.topic}`, "", form.message].join("\n");
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setNotice("Your email app is opening with your message ready to send.");
  };

  return (
    <div className="contact-page min-h-screen text-white">
      <Navbar />
      <main>
        <section className="contact-hero" aria-labelledby="contact-title">
          <div className="contact-hero-art" aria-hidden="true">
            <img src="/hero-bg.png" alt="" />
            <div className="contact-hero-image-shade" />
            <div className="contact-hero-sweep" />
            <span className="contact-art-cross contact-art-cross-one" />
            <span className="contact-art-cross contact-art-cross-two" />
            <div className="contact-image-caption"><span>01 / 03</span><span>THE ROOM IS YOURS</span></div>
          </div>
          <div className="contact-hero-content">
            <motion.p className="contact-eyebrow" {...reveal(0.02)}><span className="contact-live-dot" /> NEXT LEVEL STARTS WITH A HELLO</motion.p>
            <motion.h1 id="contact-title" {...reveal(0.09)}>LET’S MAKE<br /><span>IT HAPPEN.</span></motion.h1>
            <motion.p className="contact-intro" {...reveal(0.16)}>One message gets the ball rolling. Tell us about the event, the idea, or the question — we’ll help you figure out the next move.</motion.p>
            <motion.div className="contact-hero-actions" {...reveal(0.23)}>
              <a className="contact-primary-cta" href="#contact-form">START A CONVERSATION <ArrowDown size={15} /></a>
              <a className="contact-email-cta" href={`mailto:${CONTACT_EMAIL}`}>OR EMAIL US DIRECTLY <ArrowUpRight size={14} /></a>
            </motion.div>
            <motion.div className="contact-hero-note" {...reveal(0.3)}>
              <span className="contact-note-icon"><Sparkles size={16} /></span>
              <span><strong>Good ideas welcome.</strong><small>They don’t have to be fully formed.</small></span>
            </motion.div>
          </div>
          <div className="contact-hero-index" aria-hidden="true"><span>NL / CONTACT</span><i /></div>
        </section>

        <section className="contact-details" aria-label="Ways to reach us">
          <motion.a className="contact-detail" href={`mailto:${CONTACT_EMAIL}`} {...reveal(0)}>
            <span className="contact-detail-icon"><Mail size={19} /></span>
            <span className="contact-detail-copy"><small>DROP US A LINE</small><strong>{CONTACT_EMAIL}</strong></span>
            <ArrowUpRight className="contact-detail-arrow" size={17} />
          </motion.a>
          <motion.a className="contact-detail" href="tel:9786015473" {...reveal(0.07)}>
            <span className="contact-detail-icon"><Phone size={19} /></span>
            <span className="contact-detail-copy"><small>GIVE US A CALL</small><strong>{CONTACT_PHONE}</strong></span>
            <ArrowUpRight className="contact-detail-arrow" size={17} />
          </motion.a>
          <motion.div className="contact-detail contact-detail-location" {...reveal(0.14)}>
            <span className="contact-detail-icon"><MapPin size={19} /></span>
            <span className="contact-detail-copy"><small>OUR HOME BASE</small><strong>East Coast. Your venue.</strong></span>
            <span className="contact-location-pulse" aria-hidden="true" />
          </motion.div>
        </section>

        <section className="contact-form-section" id="contact-form">
          <motion.div className="contact-form-heading" {...reveal(0)}>
            <p className="contact-eyebrow"><span className="contact-section-number">01</span> THE FIRST DETAILS</p>
            <h2>What are we<br /><em>dreaming up?</em></h2>
            <p>Give us the short version. We’ll take it from there.</p>
            <div className="contact-form-aside"><span className="contact-aside-line" /><span>Not sure yet? That’s a perfectly good place to start.</span></div>
          </motion.div>

          <motion.form className="contact-form-card" onSubmit={sendMessage} {...reveal(0.1)}>
            <div className="contact-form-card-top"><span>HELLO, HUMAN</span><span>01 <i /> 03</span></div>
            <div className="contact-topic-field">
              <span className="contact-field-label">WHAT’S ON YOUR MIND?</span>
              <div className="contact-topic-options" role="group" aria-label="What are you contacting us about?">
                {topics.map((topic, index) => (
                  <button key={topic} type="button" className={`contact-topic-option ${form.topic === topic ? "is-selected" : ""}`} onClick={() => { setNotice(""); setForm((current) => ({ ...current, topic })); }} aria-pressed={form.topic === topic}>
                    <span className="contact-topic-index">0{index + 1}</span>{topic}{form.topic === topic && <Check size={14} />}
                  </button>
                ))}
              </div>
            </div>

            <div className="contact-fields-grid">
              <label className="contact-field"><span className="contact-field-label">YOUR NAME</span><input autoComplete="name" name="name" value={form.name} onChange={update("name")} placeholder="What should we call you?" required /></label>
              <label className="contact-field"><span className="contact-field-label">EMAIL ADDRESS</span><input autoComplete="email" name="email" type="email" value={form.email} onChange={update("email")} placeholder="you@example.com" required /></label>
              <label className="contact-field contact-message-field"><span className="contact-field-label">TELL US A LITTLE MORE</span><textarea name="message" value={form.message} onChange={update("message")} placeholder="The occasion, the vision, the question — whatever you have so far." rows={4} required /></label>
            </div>

            <div className="contact-form-bottom">
              <p aria-live="polite">{notice || "This opens a ready-to-send email in your email app."}</p>
              <button className="contact-send-button" type="submit"><span>SEND YOUR MESSAGE</span><ArrowRight size={17} /></button>
            </div>
          </motion.form>
        </section>

        <motion.section className="contact-quote-bridge" {...reveal(0)}>
          <div className="contact-bridge-orb" aria-hidden="true" />
          <div className="contact-bridge-copy"><span>ALREADY HAVE THE PLAN?</span><h2>Let’s put a number<br /><em>on the good stuff.</em></h2></div>
          <Link to="/quote">BUILD YOUR EVENT <ArrowUpRight size={17} /></Link>
          <span className="contact-bridge-index" aria-hidden="true">02 — QUOTE PLANNER</span>
        </motion.section>
      </main>
      <Footer />
    </div>
  );
};

export default ContactPage;
