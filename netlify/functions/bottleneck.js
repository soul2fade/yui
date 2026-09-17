// Server-side proxy for the "Find My Bottleneck" diagnostic. Carried over from
// an earlier project. Raw fetch rather than the SDK so the real Anthropic error
// — including request-id — reaches the client, and so the function bundle stays
// dependency-free. Keeps the API key off the client either way.

const MODEL = "claude-opus-5";

const SYSTEM_PROMPT = `You are an operations consultant for small nonprofits, trade businesses, food trucks, and youth sports organizations.

Write a focused diagnosis of their biggest operational bottleneck in exactly 3 short paragraphs:

Paragraph 1: Name and describe the real bottleneck plainly — what it actually is, not just their stated symptom. 2–3 sentences.

Paragraph 2: Why this specific bottleneck compounds over time for this type of organization. Be specific to their org type and team size. 2–3 sentences.

Paragraph 3: One concrete action they can take this week to start addressing it. Make it specific enough to act on without any additional help. 2–3 sentences.

Rules: No sales pitch. No mention of hiring anyone. No jargon. Plain, direct language only. Three paragraphs separated by a blank line, no headers, no bullet points.`;

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
  const apiKey = rawKey.trim();

  let answers;
  try {
    const body = await req.json();
    answers = body.answers;
    if (!Array.isArray(answers) || answers.length !== 5) {
      throw new Error("Expected answers to be an array of 5 strings");
    }
    if (!answers.every((a) => typeof a === "string" && a.length > 0 && a.length < 300)) {
      throw new Error("Invalid answer values");
    }
  } catch (e) {
    return new Response(
      JSON.stringify({ error: "Invalid request body", detail: String(e?.message || e) }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  const userMsg = `Someone answered 5 diagnostic questions:
- Organization type: ${answers[0]}
- Biggest time drain: ${answers[1]}
- Team size: ${answers[2]}
- Current tracking method: ${answers[3]}
- How often things fall through the cracks: ${answers[4]}

Generate the diagnosis as instructed.`;

  let apiResponse;
  try {
    apiResponse = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: 4096,
        // Adaptive thinking is on by default for this model; medium effort keeps
        // the wait short for a three-paragraph answer.
        output_config: { effort: "medium" },
        system: SYSTEM_PROMPT,
        messages: [{ role: "user", content: userMsg }],
      }),
    });
  } catch (netErr) {
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
      bodySummary = rawText.replace(/\s+/g, " ").slice(0, 300);
    }
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
  } catch {
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

  if (!text) {
    return new Response(JSON.stringify({ error: "Empty response from model." }), {
      status: 502,
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response(JSON.stringify({ text }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};
