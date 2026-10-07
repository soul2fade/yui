// Copies webinar registrations into Mailchimp. Netlify runs a function with this
// exact name after every verified (non-spam) Netlify Forms submission, so the
// /webinar page needs no client-side changes and Netlify Forms keeps its own
// record if Mailchimp is down.
//
// Env (Functions scope): MAILCHIMP_API_KEY, MAILCHIMP_AUDIENCE_ID.
// The audience needs text fields with merge tags BUSINESS and CITY; if they are
// missing the contact is still added, without those two values.

import { createHash } from "node:crypto";

const FORM = "webinar";

export function splitName(name) {
  const parts = String(name || "").trim().split(/\s+/).filter(Boolean);
  return { FNAME: parts[0] || "", LNAME: parts.slice(1).join(" ") };
}

// "Wed Nov 4, 11:45am PT" -> "Webinar: Wed Nov 4"
export function sessionTag(session) {
  const day = String(session || "").split(",")[0].trim();
  return day ? `Webinar: ${day}` : "Webinar";
}

async function mailchimp(apiKey, path, method, body) {
  const dc = apiKey.split("-").pop();
  const res = await fetch(`https://${dc}.api.mailchimp.com/3.0${path}`, {
    method,
    headers: {
      Authorization: `Basic ${Buffer.from(`yui:${apiKey}`).toString("base64")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const detail = await res.text();
    throw new Error(`Mailchimp ${method} ${path} -> ${res.status}: ${detail}`);
  }
}

export async function addRegistrant(data, { apiKey, audienceId }) {
  const email = String(data.email || "").trim().toLowerCase();
  if (!email) throw new Error("Submission has no email");

  const hash = createHash("md5").update(email).digest("hex");
  const member = `/lists/${audienceId}/members/${hash}`;
  const base = {
    email_address: email,
    // Only new contacts are subscribed. Someone who unsubscribed earlier stays
    // unsubscribed; they still get the session tag.
    status_if_new: "subscribed",
  };
  const merge = { ...splitName(data.name), BUSINESS: data.business || "", CITY: data.city || "" };

  try {
    await mailchimp(apiKey, member, "PUT", { ...base, merge_fields: merge });
  } catch (err) {
    if (!/merge/i.test(err.message)) throw err;
    console.warn("BUSINESS/CITY fields missing in the audience; adding without them");
    const { FNAME, LNAME } = merge;
    await mailchimp(apiKey, member, "PUT", { ...base, merge_fields: { FNAME, LNAME } });
  }

  await mailchimp(apiKey, `${member}/tags`, "POST", {
    tags: [{ name: sessionTag(data.session), status: "active" }],
  });
}

export default async (req) => {
  const { payload } = await req.json();
  if (payload?.form_name !== FORM) return new Response("ignored");

  const apiKey = process.env.MAILCHIMP_API_KEY;
  const audienceId = process.env.MAILCHIMP_AUDIENCE_ID;
  if (!apiKey || !audienceId) {
    console.error("MAILCHIMP_API_KEY or MAILCHIMP_AUDIENCE_ID is not set; registration not synced");
    return new Response("not configured");
  }

  try {
    await addRegistrant(payload.data || {}, { apiKey, audienceId });
  } catch (err) {
    // The submission is already saved in Netlify Forms, so log and move on.
    console.error("Mailchimp sync failed:", err.message);
  }
  return new Response("ok");
};
