// Scores the Operations Health Check. Carried over from an earlier project and
// kept as a raw fetch (rather than the SDK) so the real Anthropic error —
// including request-id — reaches the client instead of a wrapped message.

const MODEL = "claude-opus-5";

const SYSTEM_PROMPT = `You are an operations diagnostic engine for Yui, an AI-integration and operations-management practice that serves small businesses.

You will receive a JSON object with a business's answers to an operations audit. Your job is to produce a short, diagnostic analysis — NOT solutions, NOT recommendations, NOT a sales pitch.

You must respond with ONLY a single raw JSON object (no prose, no markdown fences, no preamble, no commentary) in exactly this shape:

{
  "score": <integer 0-100, where 100 = fully optimized operations and 0 = entirely manual chaos>,
  "estimated_hours_lost_per_week": <integer: best-estimate hours the owner and team lose weekly to manual/inefficient processes>,
  "critical_gaps": [<2-4 short category labels from this list only: "Scheduling", "Invoicing & Cash Flow", "Job Tracking", "Reporting & Visibility", "Customer Communication", "Profit Visibility", "Admin Overhead">],
  "diagnosis": "<2-3 sentences describing WHAT is broken and WHAT it is costing them, in plain language. Do NOT suggest fixes. Do NOT mention software or products. End with a sentence that creates urgency.>"
}

Scoring guidance:
- Paper/whiteboard/memory-based systems => very low scores (10-35)
- Spreadsheets as primary tool => low-mid scores (30-55)
- Accounting or single-purpose tools but disconnected => mid scores (45-65)
- Integrated service or CRM software => mid-high scores (60-85)
- Fully integrated stack with automation => high scores (80-95)

Hours lost estimation:
- Factor in team size (larger teams = more hours lost when processes are manual)
- Owner admin hours are a strong signal
- Manual scheduling + manual invoicing + no job tracking typically costs 15-25+ hours/week
- Be realistic — do not exaggerate. Round to nearest whole hour.

Diagnosis tone:
- Direct, confident, slightly urgent
- Speaks to the owner, not about them
- No jargon, no tech names, no buzzwords

Return ONLY the JSON object. Start with { and end with }.`;

function extractJson(text) {
  let cleaned = text.trim();
  cleaned = cleaned.replace(/^```(?:json)?\s*/i, "").replace(/```\s*$/i, "").trim();
  try {
    return JSON.parse(cleaned);
  } catch {
    const start = cleaned.indexOf("{");
    const end = cleaned.lastIndexOf("}");
    if (start >= 0 && end > start) {
      try {
        return JSON.parse(cleaned.slice(start, end + 1));
      } catch {
        return null;
      }
    }
    return null;
  }
}

function validateAudit(obj) {
  if (!obj || typeof obj !== "object") return "Not an object";
  if (typeof obj.score !== "number" || obj.score < 0 || obj.score > 100) return "Invalid score";
  if (typeof obj.estimated_hours_lost_per_week !== "number") return "Invalid hours";
  if (!Array.isArray(obj.critical_gaps) || obj.critical_gaps.length === 0) return "Invalid critical_gaps";
  if (typeof obj.diagnosis !== "string" || obj.diagnosis.length < 10) return "Invalid diagnosis";
  return null;
}

export default async (req) => {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }

  const rawKey = process.env.ANTHROPIC_API_KEY;
  if (!rawKey) {
    return new Response(
      JSON.stringify({ error: "Server is not configured. Missing API key." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }

  // Trim in case the env var has trailing whitespace/newlines.
  const apiKey = rawKey.trim();

  let answers;
  try {
    const body = await req.json();
    answers = body.answers;
    if (!answers || typeof answers !== "object") throw new Error("Invalid answers");
  } catch {
    return new Response(JSON.stringify({ error: "Invalid request body" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const requestBody = {
    model: MODEL,
    max_tokens: 4096,
    // Adaptive thinking is on by default for this model; medium effort keeps the
    // wait short for what is a small, well-specified scoring task.
    output_config: { effort: "medium" },
    system: SYSTEM_PROMPT,
    messages: [
      {
        role: "user",
        content: `Here are the business's audit answers:\n\n${JSON.stringify(
          answers,
          null,
          2
        )}\n\nReturn only the diagnostic JSON object.`,
      },
    ],
  };

  let apiResponse;
  try {
    apiResponse = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify(requestBody),
    });
  } catch (netErr) {
    console.error("Network error calling Anthropic:", netErr);
    return new Response(
      JSON.stringify({
        error: "Network error reaching Anthropic.",
        detail: String(netErr?.message || netErr).slice(0, 400),
      }),
      { status: 502, headers: { "Content-Type": "application/json" } }
    );
  }

  const requestId =
    apiResponse.headers.get("request-id") || apiResponse.headers.get("x-request-id");
  const rawText = await apiResponse.text();

  if (!apiResponse.ok) {
    let bodySummary = rawText;
    try {
      const asJson = JSON.parse(rawText);
      bodySummary = asJson?.error?.message || JSON.stringify(asJson);
    } catch {
      // Response wasn't JSON — likely HTML from an edge proxy. Keep raw.
      bodySummary = rawText.replace(/\s+/g, " ").slice(0, 300);
    }

    console.error("Anthropic API error:", {
      status: apiResponse.status,
      requestId,
      bodySummary: bodySummary.slice(0, 800),
    });

    return new Response(
      JSON.stringify({
        error: "Anthropic API rejected the request.",
        detail: `HTTP ${apiResponse.status} | request-id: ${requestId || "(none)"} | ${bodySummary.slice(0, 300)}`,
      }),
      { status: 502, headers: { "Content-Type": "application/json" } }
    );
  }

  let data;
  try {
    data = JSON.parse(rawText);
  } catch (parseErr) {
    console.error("Failed to parse Anthropic response JSON:", parseErr, rawText.slice(0, 500));
    return new Response(
      JSON.stringify({
        error: "Anthropic returned a non-JSON response.",
        detail: rawText.slice(0, 300),
      }),
      { status: 502, headers: { "Content-Type": "application/json" } }
    );
  }

  if (data.stop_reason === "refusal") {
    console.error("Anthropic declined the request:", data.stop_details);
    return new Response(
      JSON.stringify({ error: "The model declined to answer this one." }),
      { status: 502, headers: { "Content-Type": "application/json" } }
    );
  }

  const text = (data.content || [])
    .filter((b) => b.type === "text")
    .map((b) => b.text)
    .join("")
    .trim();

  const parsed = extractJson(text);
  const validationError = validateAudit(parsed);

  if (validationError) {
    console.error("Audit validate failed:", validationError, "raw:", text.slice(0, 1000));
    return new Response(
      JSON.stringify({
        error: "Model returned an unusable response.",
        detail: `${validationError} — raw: ${text.slice(0, 200)}`,
      }),
      { status: 502, headers: { "Content-Type": "application/json" } }
    );
  }

  return new Response(JSON.stringify(parsed), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};
