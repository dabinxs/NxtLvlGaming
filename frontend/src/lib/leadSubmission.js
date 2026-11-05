import { supabase } from "./supabase";

export const GOOGLE_SCRIPT_WEBHOOK_URL =
  "https://script.google.com/macros/s/AKfycbwPPvJaC92plubIah6cAuDmnrFbzKbpDGsy1AlKGkDAeH1Kg3Kippd9qrJDQZy095sMZA/exec";

export const WEB3FORMS_QUOTE_KEY = "ec459370-8ad6-41e8-babf-0a35156b2890";
export const WEB3FORMS_CONTACT_KEY = "041df103-39af-4df3-bdba-300e17ed9dfd";

/**
 * Submits lead data with multi-tier failsafe:
 * 1. Supabase database: Recorded immediately for persistence.
 * 2. Web3Forms: Attempted first for email notification.
 * 3. Google Workspace Webhook: Automatic fallback when Web3Forms is exhausted,
 *    rate-limited, or encounters any error.
 */
export async function submitLeadWithFailover({
  formType,
  web3Key,
  subject,
  botcheck,
  data,
}) {
  let dbSaved = false;
  let web3Delivered = false;
  let googleDelivered = false;
  let primaryError = null;

  // 1. Silent Failsafe: Save to Supabase database table
  try {
    const { error: dbError } = await supabase.from("lead_submissions").insert([
      {
        form_type: formType,
        name: data.name || "",
        email: data.email || "",
        phone: data.phone || "",
        payload: {
          ...data,
          submitted_at: new Date().toISOString(),
        },
      },
    ]);
    if (!dbError) {
      dbSaved = true;
    } else {
      console.warn("Supabase lead backup notice:", dbError.message);
    }
  } catch (err) {
    console.warn("Supabase lead backup offline:", err);
  }

  // 2. Primary Provider: Web3Forms
  try {
    const web3Payload = {
      access_key: web3Key,
      subject: subject || `Website ${formType}: ${data.name || "New Lead"}`,
      replyto: data.email,
      ...(botcheck ? { botcheck } : {}),
      ...data,
    };

    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(web3Payload),
    });

    const result = await res.json().catch(() => ({}));
    if (res.ok && (result.success === true || result.success === "true")) {
      web3Delivered = true;
    } else {
      primaryError = new Error(result.message || "Web3Forms submission limit reached or failed");
      console.warn("Web3Forms unavailable, failing over to Google Workspace:", primaryError.message);
    }
  } catch (err) {
    primaryError = err;
    console.warn("Web3Forms network error, failing over to Google Workspace:", err);
  }

  // 3. Automatic Failover: If Web3Forms failed / exhausted, submit via Google Workspace Web App
  if (!web3Delivered) {
    try {
      const googlePayload = {
        form_type: formType,
        ...data,
      };

      const res = await fetch(GOOGLE_SCRIPT_WEBHOOK_URL, {
        method: "POST",
        mode: "cors",
        redirect: "follow",
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
        body: JSON.stringify(googlePayload),
      });

      const result = await res.json().catch(() => ({}));
      if (res.ok && (result.status === "success" || result.success === true)) {
        googleDelivered = true;
      } else {
        console.warn("Google Workspace webhook response:", result);
      }
    } catch (err) {
      console.error("Google Workspace webhook error:", err);
    }
  }

  // If at least one delivery channel (Web3Forms, Google Workspace, or Supabase DB) succeeded:
  if (web3Delivered || googleDelivered || dbSaved) {
    return {
      success: true,
      provider: web3Delivered ? "web3forms" : googleDelivered ? "google_workspace" : "supabase_backup",
    };
  }

  // If everything failed, throw the captured error so the form shows user feedback
  throw primaryError || new Error("Lead submission failed on all channels.");
}
