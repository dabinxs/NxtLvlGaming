const { onRequest } = require("firebase-functions/v2/https");
const { defineSecret } = require("firebase-functions/params");
const nodemailer = require("nodemailer");

const SMTP_USER = defineSecret("SMTP_USER");
const SMTP_APP_PASSWORD = defineSecret("SMTP_APP_PASSWORD");
const RECIPIENT = "kcbianzon@gmail.com";
const MAX_MESSAGE_LENGTH = 4000;
const recentSubmissions = new Map();

const text = (value, maxLength = 240) =>
  typeof value === "string"
    ? value.replace(/[\u0000-\u001f\u007f]/g, " ").trim().slice(0, maxLength)
    : "";

const validEmail = (value) =>
  value.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

const respond = (res, status, body) => {
  res.set("Cache-Control", "no-store");
  res.status(status).json(body);
};

exports.submitForm = onRequest(
  {
    region: "us-central1",
    secrets: [SMTP_USER, SMTP_APP_PASSWORD],
    cors: [
      "https://nextlevelgaming-events.web.app",
      "https://nextlevelgaming-events.firebaseapp.com",
      /^http:\/\/(localhost|127\.0\.0\.1):\d+$/,
    ],
    maxInstances: 5,
  },
  async (req, res) => {
    if (req.method !== "POST") {
      return respond(res, 405, { error: "Method not allowed." });
    }

    const body = req.body && typeof req.body === "object" ? req.body : {};
    // Silently accept bot submissions while dropping them before email delivery.
    if (text(body.website, 200)) {
      return respond(res, 200, { ok: true });
    }

    const formType = text(body.formType, 20);
    const name = text(body.name, 120);
    const email = text(body.email, 254);
    const message = text(body.message, MAX_MESSAGE_LENGTH);
    if (!name || !validEmail(email)) {
      return respond(res, 400, { error: "Enter your name and a valid email." });
    }

    let subject;
    let fields;
    if (formType === "contact") {
      const topic = text(body.topic, 100);
      if (!topic || !message) return respond(res, 400, { error: "Choose a topic and enter a message." });
      subject = `Website contact: ${topic}`;
      fields = [
        ["Topic", topic],
        ["Name", name],
        ["Email", email],
        ["Message", message],
      ];
    } else if (formType === "quote") {
      const eventType = text(body.eventType, 100);
      const guests = text(body.guests, 50);
      const date = text(body.date, 100);
      const location = text(body.location, 250);
      const experience = text(body.experience, 140);
      const phone = text(body.phone, 60);
      if (!eventType || !guests || !date || !location || !experience) {
        return respond(res, 400, { error: "Complete the required quote details and try again." });
      }
      subject = `Website quote request: ${eventType}`;
      fields = [
        ["Event type", eventType],
        ["Guests", guests],
        ["Date", date],
        ["Location", location],
        ["Experience", experience],
        ["Name", name],
        ["Email", email],
        ["Phone", phone || "Not provided"],
        ["Notes", message || "None"],
      ];
    } else {
      return respond(res, 400, { error: "Unsupported form." });
    }

    const now = Date.now();
    const ip = req.ip || "unknown";
    const previousSubmission = recentSubmissions.get(ip) || 0;
    if (now - previousSubmission < 15000) {
      return respond(res, 429, { error: "Please wait a moment before sending another request." });
    }
    recentSubmissions.set(ip, now);
    if (recentSubmissions.size > 1000) {
      for (const [key, timestamp] of recentSubmissions) {
        if (now - timestamp > 60000) recentSubmissions.delete(key);
      }
    }

    try {
      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          user: SMTP_USER.value(),
          pass: SMTP_APP_PASSWORD.value(),
        },
      });

      await transporter.sendMail({
        from: { name: "Next Level Gaming website", address: SMTP_USER.value() },
        to: RECIPIENT,
        replyTo: email,
        subject,
        text: fields.map(([label, value]) => `${label}:\n${value}`).join("\n\n"),
      });
      return respond(res, 200, { ok: true });
    } catch (error) {
      console.error("Website form email delivery failed:", error.message);
      return respond(res, 500, { error: "We could not send your request right now." });
    }
  }
);
