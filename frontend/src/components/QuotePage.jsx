import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Check,
  CheckCircle2,
  Clapperboard,
  Compass,
  Gamepad2,
  Headphones,
  MapPin,
  Package,
  Search,
  Send,
  Sparkles,
  Users,
  Camera,
  X,
} from "lucide-react";
import {
  addDays,
  addMonths,
  format,
  isBefore,
  isSameDay,
  isSameMonth,
  startOfDay,
  startOfMonth,
  startOfWeek,
  subMonths,
} from "date-fns";
import Navbar from "./Navbar";
import "./QuotePage.css";

const STEPS = ["Event type", "Guests", "Date", "Location", "Experience", "Contact"];
const FORM_ENDPOINT = process.env.REACT_APP_FORM_API_URL || "/api/submit-form";
const STEP_ICONS = [Gamepad2, Users, CalendarDays, MapPin, Package, Send];
const EVENT_TYPES = [
  { title: "Gaming event", icon: Gamepad2 },
  { title: "Movie night", icon: Clapperboard },
  { title: "Photo booth", icon: Camera },
  { title: "Trivia night", icon: Sparkles },
  { title: "Virtual reality", icon: Headphones },
  { title: "Something else", icon: Compass },
];
const GUEST_COUNTS = ["1–25", "26–50", "51–100", "100+"];
const PACKAGES = [
  "Deluxe gaming",
  "Ultimate gaming",
  "Tournament production",
  "Outdoor cinema",
  "Photo booth + branding",
  "Trivia game show",
  "VR lounge",
  "Custom mix",
];
const STORAGE_KEY = "nxtlvl-quote-draft-v1";
const DEFAULT_LOCATION = { lat: 42.3601, lon: -71.0589 };

const emptyDraft = {
  eventType: "",
  guests: "",
  date: "",
  dateFlexible: false,
  location: "",
  locationFlexible: false,
  package: "",
  name: "",
  email: "",
  phone: "",
  message: "",
  mapPoint: null,
};

function readDraft() {
  try {
    return { ...emptyDraft, ...JSON.parse(sessionStorage.getItem(STORAGE_KEY) || "{}") };
  } catch {
    return emptyDraft;
  }
}

function mapEmbedUrl(point) {
  const { lat, lon } = point || DEFAULT_LOCATION;
  const span = point ? 0.045 : 1.5;
  const bbox = [lon - span, lat - span, lon + span, lat + span].join("%2C");
  const marker = point ? `&marker=${lat}%2C${lon}` : "";
  return `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik${marker}`;
}

function mapLink(point, query) {
  if (point) return `https://www.openstreetmap.org/?mlat=${point.lat}&mlon=${point.lon}#map=14/${point.lat}/${point.lon}`;
  return `https://www.openstreetmap.org/search?query=${encodeURIComponent(query || "Boston, MA")}`;
}

function QuotePage() {
  const [step, setStep] = useState(0);
  const [draft, setDraft] = useState(readDraft);
  const [lookup, setLookup] = useState({ state: "idle", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [calendarMonth, setCalendarMonth] = useState(() => startOfMonth(new Date()));
  const locationRequest = useRef(null);
  const dateValue = useMemo(() => (draft.date ? new Date(`${draft.date}T12:00:00`) : undefined), [draft.date]);
  const calendarDays = useMemo(() => {
    const firstDay = startOfWeek(startOfMonth(calendarMonth), { weekStartsOn: 0 });
    return Array.from({ length: 42 }, (_, index) => addDays(firstDay, index));
  }, [calendarMonth]);
  const mapSrc = useMemo(() => mapEmbedUrl(draft.mapPoint), [draft.mapPoint]);

  useEffect(() => {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
  }, [draft]);

  useEffect(() => () => locationRequest.current?.abort(), []);

  const update = (key, value) => setDraft((current) => ({ ...current, [key]: value }));
  const chooseLocationFlexibility = (value) => {
    setDraft((current) => ({ ...current, locationFlexible: value }));
  };

  const findLocation = async (event) => {
    event.preventDefault();
    const query = draft.location.trim();
    if (!query) {
      setLookup({ state: "error", message: "Enter a city, venue, or street address first." });
      return;
    }

    locationRequest.current?.abort();
    const controller = new AbortController();
    locationRequest.current = controller;
    setLookup({ state: "loading", message: "Finding that place…" });

    try {
      const params = new URLSearchParams({ q: query, format: "jsonv2", limit: "1", addressdetails: "1" });
      const response = await fetch(`https://nominatim.openstreetmap.org/search?${params}`, {
        signal: controller.signal,
        headers: { "Accept-Language": "en" },
      });
      if (!response.ok) throw new Error("Map lookup is unavailable right now.");
      const results = await response.json();
      if (!results.length) throw new Error("We couldn't find that place. Try a city, ZIP code, or fuller address.");
      const result = results[0];
      const lat = Number(result.lat);
      const lon = Number(result.lon);
      setDraft((current) => ({
        ...current,
        location: result.display_name || current.location,
        mapPoint: { lat, lon, label: result.display_name || query },
        locationFlexible: false,
      }));
      setLookup({ state: "success", message: "Location pinned on the map." });
    } catch (error) {
      if (error.name !== "AbortError") setLookup({ state: "error", message: error.message });
    }
  };

  const canContinue = () => {
    if (step === 0) return Boolean(draft.eventType);
    if (step === 1) return Boolean(draft.guests);
    if (step === 2) return Boolean(draft.date || draft.dateFlexible);
    if (step === 3) return Boolean(draft.location.trim() || draft.locationFlexible);
    if (step === 4) return Boolean(draft.package);
    return Boolean(draft.name.trim() && draft.email.trim());
  };

  const continueFlow = (event) => {
    event?.preventDefault();
    if (!canContinue()) return;
    if (step < STEPS.length - 1) setStep((current) => current + 1);
  };

  const selectDate = (date) => {
    if (isBefore(startOfDay(date), startOfDay(new Date()))) return;
    update("date", format(date, "yyyy-MM-dd"));
    update("dateFlexible", false);
  };

  const requestQuote = async (event) => {
    event.preventDefault();
    if (!canContinue()) return;
    setIsSubmitting(true);
    setSubmitError("");
    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formType: "quote",
          eventType: draft.eventType,
          guests: draft.guests,
          date: draft.date ? format(dateValue, "MMMM d, yyyy") : "Flexible / to be confirmed",
          location: draft.locationFlexible ? "Still deciding" : draft.mapPoint?.label || draft.location || "Still deciding",
          experience: draft.package || "Please recommend something",
          name: draft.name,
          email: draft.email,
          phone: draft.phone,
          message: draft.message,
        }),
      });
      if (!response.ok) throw new Error("Quote delivery failed");
      setSubmitted(true);
    } catch {
      setSubmitError("We couldn’t send your quote request. Please try again or contact our events team directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const progressWidth = `${((step + 1) / STEPS.length) * 100}%`;
  const displayDate = draft.date ? format(dateValue, "EEE, MMM d, yyyy") : draft.dateFlexible ? "Date is flexible" : "Choose a date";

  return (
    <main className="quote-page min-h-screen text-white">
      <Navbar topOnly />
      <div className="quote-grid" aria-hidden="true" />
      <header className="quote-topbar">
        <Link to="/" className="quote-exit-button"><X size={16} /> Exit planner</Link>
      </header>

      <section className="quote-shell">
        <div className="quote-intro">
          <p className="quote-eyebrow"><span /> YOUR EVENT, YOUR WAY <span className="quote-eyebrow-line" /></p>
          <h1>Build your <span>event</span></h1>
          <p className="quote-lede">A few quick details help us shape the right experience. You can change anything as you go.</p>
        </div>

        <nav className="quote-progress" aria-label="Quote steps">
          <div className="quote-progress-track"><span style={{ width: progressWidth }} /></div>
          {STEPS.map((label, index) => {
            const Icon = STEP_ICONS[index];
            const isDone = index < step;
            const isCurrent = index === step;
            return (
              <button
                key={label}
                type="button"
                className={`quote-step-dot ${isCurrent ? "is-current" : ""} ${isDone ? "is-done" : ""}`}
                onClick={() => index < step && setStep(index)}
                disabled={index > step}
                aria-current={isCurrent ? "step" : undefined}
                aria-label={`${label}${isDone ? ", completed. Return to step" : isCurrent ? ", current step" : ""}`}
              >
                <span className="quote-step-icon">{isDone ? <Check size={17} /> : <Icon size={16} />}</span>
                <span className="quote-step-label">{label}</span>
              </button>
            );
          })}
        </nav>

        {submitted ? (
          <section className="quote-complete-card" aria-live="polite">
            <div className="quote-complete-icon"><CheckCircle2 size={35} /></div>
            <p className="quote-step-count">REQUEST SENT <span>·</span> NEXT LEVEL STARTS HERE</p>
            <h2>Thanks, {draft.name.split(" ")[0]}!<br /><span>Your event is going to be one to remember.</span></h2>
            <p className="quote-complete-copy">Your quote request has been sent to our events team. We’ll be in touch soon to start planning with you.</p>
            <div className="quote-complete-summary">
              <div><small>EVENT</small><strong>{draft.eventType}</strong></div>
              <div><small>GUESTS</small><strong>{draft.guests}</strong></div>
              <div><small>DATE</small><strong>{draft.date ? format(dateValue, "MMM d, yyyy") : "Flexible"}</strong></div>
              <div><small>LOCATION</small><strong>{draft.locationFlexible ? "Still deciding" : draft.mapPoint?.label?.split(",")[0] || draft.location}</strong></div>
              <div><small>EXPERIENCE</small><strong>{draft.package}</strong></div>
            </div>
            <div className="quote-complete-actions">
              <Link to="/" className="quote-back-button">BACK TO HOME <ArrowRight size={16} /></Link>
            </div>
            <p className="quote-complete-footnote">We’ll take it from here.</p>
          </section>
        ) : (
        <div className="quote-main-grid">
          <section className="quote-card" aria-live="polite">
            <div className="quote-card-heading">
              <p className="quote-step-count">STEP {String(step + 1).padStart(2, "0")} <span>/</span> 06</p>
              <h2>{["Select your event type", "How many guests?", "When is the event?", "Where should we bring it?", "Choose your experience", "Your contact details"][step]}</h2>
              <p className="quote-step-helper">{[
                "Pick the kind of event you're planning. We can tailor the details later.",
                "An estimate is perfect. We can scale the setup as your guest list changes.",
                "Choose your best date or tell us you're still working it out.",
                "Add a venue or city and we’ll pin it to a map for travel planning.",
                "Choose a package or ask our team to recommend the right mix.",
                "We’ll use these details to follow up with your tailored quote.",
              ][step]}</p>
            </div>

            {step === 0 && (
              <div className="quote-choice-grid quote-event-grid">
                {EVENT_TYPES.map(({ title, icon: Icon }) => (
                  <button type="button" key={title} onClick={() => update("eventType", title)} className={`quote-choice ${draft.eventType === title ? "is-selected" : ""}`} aria-pressed={draft.eventType === title}>
                    <Icon size={21} /><span>{title}</span><CheckCircle2 className="quote-choice-check" size={17} />
                  </button>
                ))}
              </div>
            )}

            {step === 1 && (
              <div className="quote-choice-grid quote-guest-grid">
                {GUEST_COUNTS.map((count) => (
                  <button type="button" key={count} onClick={() => update("guests", count)} className={`quote-choice quote-guest-choice ${draft.guests === count ? "is-selected" : ""}`} aria-pressed={draft.guests === count}>
                    <Users size={21} /><strong>{count}</strong><small>GUESTS</small><CheckCircle2 className="quote-choice-check" size={17} />
                  </button>
                ))}
              </div>
            )}

            {step === 2 && (
              <div className="quote-date-layout">
                <div className="quote-calendar-wrap">
                  <div className="quote-field-label">PICK YOUR DATE</div>
                  <div className="quote-calendar" role="group" aria-label="Choose event date">
                    <div className="quote-calendar-header">
                      <button
                        type="button"
                        className="quote-calendar-nav"
                        onClick={() => setCalendarMonth((month) => subMonths(month, 1))}
                        disabled={!isBefore(startOfMonth(new Date()), calendarMonth)}
                        aria-label="Previous month"
                      >‹</button>
                      <strong>{format(calendarMonth, "MMMM yyyy")}</strong>
                      <button
                        type="button"
                        className="quote-calendar-nav"
                        onClick={() => setCalendarMonth((month) => addMonths(month, 1))}
                        aria-label="Next month"
                      >›</button>
                    </div>
                    <div className="quote-calendar-grid quote-calendar-weekdays" aria-hidden="true">
                      {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map((day) => <span key={day}>{day}</span>)}
                    </div>
                    <div className="quote-calendar-grid quote-calendar-days">
                      {calendarDays.map((day) => {
                        const isPast = isBefore(startOfDay(day), startOfDay(new Date()));
                        const isSelected = dateValue && isSameDay(day, dateValue);
                        return (
                          <button
                            key={day.toISOString()}
                            type="button"
                            onClick={() => selectDate(day)}
                            disabled={isPast}
                            className={`quote-calendar-day ${!isSameMonth(day, calendarMonth) ? "is-outside" : ""} ${isSelected ? "is-selected" : ""} ${isSameDay(day, new Date()) ? "is-today" : ""}`}
                            aria-label={format(day, "EEEE, MMMM d, yyyy")}
                            aria-pressed={Boolean(isSelected)}
                          >
                            {format(day, "d")}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
                <aside className="quote-date-summary">
                  <span className="quote-date-icon"><CalendarDays size={19} /></span>
                  <span className="quote-field-label">YOUR EVENT DATE</span>
                  <strong>{displayDate}</strong>
                  <p>We’ll confirm availability with you before anything is booked.</p>
                  <label className={`quote-flex-option ${draft.dateFlexible ? "is-checked" : ""}`}>
                    <input type="checkbox" checked={draft.dateFlexible} onChange={(event) => {
                      update("dateFlexible", event.target.checked);
                      if (event.target.checked) update("date", "");
                    }} />
                    <span className="quote-checkbox-mark">{draft.dateFlexible && <Check size={12} />}</span>
                    My date is flexible
                  </label>
                </aside>
              </div>
            )}

            {step === 3 && (
              <div className="quote-location-layout">
                <div className="quote-location-controls">
                  <form className="quote-location-search" onSubmit={findLocation}>
                    <label className="quote-field-label" htmlFor="quote-location">VENUE, CITY, OR ZIP CODE</label>
                    <div className="quote-input-with-action">
                      <MapPin size={18} />
                      <input id="quote-location" value={draft.location} onChange={(event) => {
                        update("location", event.target.value);
                        if (draft.mapPoint) update("mapPoint", null);
                        if (lookup.state !== "idle") setLookup({ state: "idle", message: "" });
                      }} placeholder="e.g. Harvard University, Cambridge MA" autoComplete="street-address" />
                      <button type="submit" aria-label="Find location on map" disabled={lookup.state === "loading"}>
                        {lookup.state === "loading" ? <span className="quote-spinner" /> : <Search size={17} />}
                      </button>
                    </div>
                    <p className={`quote-lookup-message is-${lookup.state}`} role="status">{lookup.message || "Search to place your venue on the map. A city or ZIP works too."}</p>
                  </form>
                  <label className={`quote-flex-option quote-location-flex ${draft.locationFlexible ? "is-checked" : ""}`}>
                    <input type="checkbox" checked={draft.locationFlexible} onChange={(event) => {
                      chooseLocationFlexibility(event.target.checked);
                      if (event.target.checked) update("location", "");
                    }} />
                    <span className="quote-checkbox-mark">{draft.locationFlexible && <Check size={12} />}</span>
                    I’m still choosing a location
                  </label>
                  <div className="quote-travel-note"><Compass size={16} /><span>Based in New England, our crew travels to your event. Sharing a location helps us plan the right setup and travel.</span></div>
                </div>
                <div className="quote-map-card">
                  <div className="quote-map-heading"><span><MapPin size={14} /> EVENT MAP</span><span className="quote-map-live"><i /> LIVE</span></div>
                  <iframe key={mapSrc} src={mapSrc} title={draft.mapPoint ? `Map showing ${draft.mapPoint.label}` : "Map centered on the New England service area"} loading="lazy" referrerPolicy="no-referrer" />
                  <div className="quote-map-caption">
                    <span className="quote-map-pin"><MapPin size={16} /></span>
                    <span><strong>{draft.mapPoint ? "Venue pinned" : draft.locationFlexible ? "Location to be confirmed" : "New England service area"}</strong><small>{draft.mapPoint?.label || (draft.locationFlexible ? "Your crew can help you plan" : "Search above to locate your venue")}</small></span>
                    <a href={mapLink(draft.mapPoint, draft.location)} target="_blank" rel="noreferrer" aria-label="Open map in OpenStreetMap"><ArrowRight size={16} /></a>
                  </div>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="quote-choice-grid quote-package-grid">
                {PACKAGES.map((name) => (
                  <button type="button" key={name} onClick={() => update("package", name)} className={`quote-choice ${draft.package === name ? "is-selected" : ""}`} aria-pressed={draft.package === name}>
                    <Package size={19} /><span>{name}</span><CheckCircle2 className="quote-choice-check" size={17} />
                  </button>
                ))}
                <button type="button" onClick={() => update("package", "Help me decide")} className={`quote-choice quote-choice-recommend ${draft.package === "Help me decide" ? "is-selected" : ""}`} aria-pressed={draft.package === "Help me decide"}>
                  <Sparkles size={19} /><span>Recommend the best fit</span><CheckCircle2 className="quote-choice-check" size={17} />
                </button>
              </div>
            )}

            {step === 5 && (
              <form id="quote-contact-form" className="quote-contact-form" onSubmit={requestQuote}>
                <label className="quote-honeypot" aria-hidden="true">Leave this field empty<input name="website" tabIndex={-1} autoComplete="off" /></label>
                <label className="quote-form-field"><span>YOUR NAME <b>*</b></span><input required autoComplete="name" value={draft.name} onChange={(event) => update("name", event.target.value)} placeholder="Full name" /></label>
                <label className="quote-form-field"><span>EMAIL ADDRESS <b>*</b></span><input required type="email" autoComplete="email" value={draft.email} onChange={(event) => update("email", event.target.value)} placeholder="you@example.com" /></label>
                <label className="quote-form-field"><span>PHONE <small>OPTIONAL</small></span><input type="tel" autoComplete="tel" value={draft.phone} onChange={(event) => update("phone", event.target.value)} placeholder="(555) 000-0000" /></label>
                <label className="quote-form-field"><span>ANYTHING ELSE? <small>OPTIONAL</small></span><input value={draft.message} onChange={(event) => update("message", event.target.value)} placeholder="Tell us what would make it special" /></label>
                <div className="quote-review-strip">
                  <span className="quote-review-icon"><CheckCircle2 size={17} /></span>
                  <span><strong>Looking good, {draft.name || "event planner"}.</strong><small>{[draft.eventType, draft.guests && `${draft.guests} guests`, draft.date ? format(dateValue, "MMM d, yyyy") : draft.dateFlexible ? "flexible date" : null, draft.locationFlexible ? "location TBD" : draft.mapPoint?.label?.split(",")[0] || draft.location, draft.package].filter(Boolean).join(" · ")}</small></span>
                </div>
                <p className="quote-email-note">Your quote request will be sent directly to our events team.</p>
                {submitError && <p className="quote-submit-error" role="alert">{submitError}</p>}
              </form>
            )}

            <div className="quote-card-footer">
              <button type="button" className="quote-back-button" onClick={() => setStep((current) => Math.max(0, current - 1))} disabled={step === 0}><ArrowLeft size={16} /> BACK</button>
              {step < STEPS.length - 1 ? (
                <button type="button" className="quote-continue-button" onClick={continueFlow} disabled={!canContinue()}>CONTINUE <ArrowRight size={16} /></button>
              ) : (
                <button type="submit" form="quote-contact-form" className="quote-continue-button quote-submit-button" disabled={!canContinue() || isSubmitting}>{isSubmitting ? "SENDING…" : "REQUEST MY QUOTE"} <Send size={16} /></button>
              )}
            </div>
            {step === 5 && !canContinue() && <p className="quote-required-note">Name and a valid email address are required.</p>}
          </section>

          <aside className="quote-summary" aria-label="Your event summary">
            <div className="quote-summary-head"><span>YOUR PLAN</span><span className="quote-summary-live"><i /> IN PROGRESS</span></div>
            <h3>One great event<br />starts here.</h3>
            <p>We’ll help make the details work for your crowd, venue, and budget.</p>
            <div className="quote-summary-list">
              <div><span className="quote-summary-icon"><Gamepad2 size={15} /></span><span><small>EVENT</small><strong>{draft.eventType || "Choose your event"}</strong></span></div>
              <div><span className="quote-summary-icon"><Users size={15} /></span><span><small>GUESTS</small><strong>{draft.guests ? `${draft.guests} guests` : "Add a guest estimate"}</strong></span></div>
              <div><span className="quote-summary-icon"><CalendarDays size={15} /></span><span><small>DATE</small><strong>{draft.date ? format(dateValue, "MMM d, yyyy") : draft.dateFlexible ? "Flexible" : "Choose a date"}</strong></span></div>
              <div><span className="quote-summary-icon"><MapPin size={15} /></span><span><small>LOCATION</small><strong>{draft.locationFlexible ? "Still deciding" : draft.mapPoint?.label?.split(",")[0] || draft.location || "Add a venue or city"}</strong></span></div>
              <div><span className="quote-summary-icon"><Package size={15} /></span><span><small>EXPERIENCE</small><strong>{draft.package || "Choose a package"}</strong></span></div>
            </div>
            <div className="quote-summary-footer"><span className="quote-sparkle"><Sparkles size={15} /></span><span>No pressure. Your request is a starting point, and our team will help shape the right fit.</span></div>
          </aside>
        </div>
        )}
        <p className="quote-privacy"><span>YOUR DETAILS STAY PRIVATE</span><span>·</span><span>NO OBLIGATION</span><span>·</span><span>BUILT AROUND YOUR EVENT</span></p>
      </section>
    </main>
  );
}

export default QuotePage;
