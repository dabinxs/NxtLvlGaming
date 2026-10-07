import React, { useState } from "react";
import { ArrowDownRight, ArrowRight, ArrowUpRight, Check, Mail, MapPin, Phone, Sparkles } from "lucide-react";
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
    : { initial: { opacity: 0, y: 22 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.2 }, transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] } };

  const update = (field) => (event) => {
    setNotice("");
    setForm((current) => ({ ...current, [field]: event.target.value }));
  };

  const sendMessage = (event) => {
    event.preventDefault();
    const subject = `${form.topic} — ${form.name}`;
    const body = [
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      `Topic: ${form.topic}`,
      "",
      form.message,
    ].join("\n");
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setNotice("Your email app is opening with your message ready to send.");
  };

  return (
    <div className="contact-page min-h-screen text-white">
      <Navbar />
      <div className="contact-grid" aria-hidden="true" />

      <main className="contact-main">
        <section className="contact-hero">
          <motion.div className="contact-hero-copy" {...reveal(0.05)}>
            <p className="contact-eyebrow"><span className="contact-live-dot" /> LET’S MAKE SOMETHING HAPPEN</p>
            <h1>Good events<br /><span>start here.</span></h1>
            <p className="contact-intro">Tell us what you’re dreaming up. We’ll help turn the first idea into a plan people can’t stop talking about.</p>
            <a className="contact-scroll-link" href="#contact-form">START A CONVERSATION <ArrowDownRight size={15} /></a>
          </motion.div>

          <motion.aside className="contact-direct-card" {...reveal(0.18)}>
            <div className="contact-card-topline"><Sparkles size={16} /><span>HERE WHEN YOU NEED US</span></div>
            <h2>Prefer the<br />direct route?</h2>
            <p>Reach our team by email or phone and tell us a little about what you need.</p>
            <a href={`mailto:${CONTACT_EMAIL}`} className="contact-direct-link"><span className="contact-direct-icon"><Mail size={17} /></span><span><small>EMAIL OUR TEAM</small><strong>{CONTACT_EMAIL}</strong></span><ArrowUpRight size={17} /></a>
            <a href="tel:9786015473" className="contact-direct-link"><span className="contact-direct-icon"><Phone size={17} /></span><span><small>CALL US</small><strong>{CONTACT_PHONE}</strong></span><ArrowUpRight size={17} /></a>
            <div className="contact-region"><MapPin size={15} /><span>East Coast based. We travel to you.</span></div>
          </motion.aside>
        </section>

        <section className="contact-form-section" id="contact-form">
          <motion.div className="contact-form-heading" {...reveal(0)}>
            <p className="contact-eyebrow">YOUR NEXT MOVE</p>
            <h2>What can we help<br className="contact-mobile-break" /> you bring to life?</h2>
            <p>Share the essentials. We’ll take it from there.</p>
          </motion.div>

          <motion.form className="contact-form-card" onSubmit={sendMessage} {...reveal(0.1)}>
            <div className="contact-topic-field">
              <span className="contact-field-label">I’M GETTING IN TOUCH ABOUT</span>
              <div className="contact-topic-options" role="group" aria-label="What are you contacting us about?">
                {topics.map((topic) => (
                  <button key={topic} type="button" className={`contact-topic-option ${form.topic === topic ? "is-selected" : ""}`} onClick={() => { setNotice(""); setForm((current) => ({ ...current, topic })); }} aria-pressed={form.topic === topic}>
                    {form.topic === topic && <Check size={14} />}{topic}
                  </button>
                ))}
              </div>
            </div>

            <div className="contact-fields-grid">
              <label className="contact-field"><span className="contact-field-label">YOUR NAME</span><input autoComplete="name" name="name" value={form.name} onChange={update("name")} placeholder="Name" required /></label>
              <label className="contact-field"><span className="contact-field-label">EMAIL ADDRESS</span><input autoComplete="email" name="email" type="email" value={form.email} onChange={update("email")} placeholder="you@example.com" required /></label>
              <label className="contact-field contact-message-field"><span className="contact-field-label">A LITTLE ABOUT IT</span><textarea name="message" value={form.message} onChange={update("message")} placeholder="The occasion, the vision, the question — whatever you have so far." rows={4} required /></label>
            </div>

            <div className="contact-form-bottom">
              <p aria-live="polite">{notice || "No pressure to have every detail figured out."}</p>
              <button className="contact-send-button" type="submit">SEND YOUR MESSAGE <ArrowRight size={16} /></button>
            </div>
          </motion.form>
        </section>

        <motion.section className="contact-quote-bridge" {...reveal(0)}>
          <div><span>ALREADY KNOW WHAT YOU NEED?</span><h2>Skip the small talk.<br /><em>Build your event.</em></h2></div>
          <Link to="/quote">GET A CUSTOM QUOTE <ArrowUpRight size={17} /></Link>
        </motion.section>
      </main>
      <Footer />
    </div>
  );
};

export default ContactPage;
