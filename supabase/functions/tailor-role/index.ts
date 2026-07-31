import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const ALLOWED_ORIGINS = [
  "https://nishaappanah.lovable.app",
  "https://nisha.aplica.biz",
  "https://id-preview--c3d825e8-7704-4b8d-a941-c3202d5fdff6.lovable.app",
  "http://localhost:8080",
  "http://localhost:5173",
];

function buildCorsHeaders(origin: string | null): Record<string, string> {
  const allowed = origin && ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    "Access-Control-Allow-Origin": allowed,
    "Vary": "Origin",
    "Access-Control-Allow-Headers":
      "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
  };
}

function isAllowedRequest(req: Request): boolean {
  const origin = req.headers.get("origin");
  const referer = req.headers.get("referer");
  const check = (url: string | null) =>
    !!url && ALLOWED_ORIGINS.some((o) => url === o || url.startsWith(o + "/"));
  return check(origin) || check(referer);
}

const NISHA_PROFILE = `
Nisha Appanah – Software Engineer -> Product Leader -> AI Founder

CURRENT: Founder & AI Consultant at Aplica Ltd (Nov 2024–Present) – Founded an AI consultancy helping businesses cut through hype and ship solutions that drive results. Advising on practical AI adoption, product strategy and AI-powered operational tools. Conference speaker on AI agents, robotics and implementation strategy.

EXPERIENCE:
- Product Manager — AI Team & Property Marketplace at Ringier South Africa (Jul 2019–Oct 2024): Led 3 platform migrations across 4 markets. Pitched Ally Agent to C-suite and secured executive green light to advance to next stage. Validated demand via user interviews and early sign-ups across Romania, Kenya and Slovakia. Scaled cross-functional team from 7 to 17 while delivering an ambitious roadmap. Partnered directly with CEOs across Mauritius, Kenya, Zimbabwe and Romania.
- Senior Software Developer at Ringier South Africa (Feb 2017–Jun 2019): Architected end-to-end property listing flow deployed across 5 African countries. Built a dynamic form builder that lifted landing page conversion across markets.
- Managing Director at Aplica Ltd (Mar 2015–Jan 2017): Built and maintained housing allocation systems for University of Copenhagen and DTU.
- Project Manager at Expand Technology (Feb 2013–Feb 2015): Led a team of 7 to deliver a smartcard payment solution; owned core business logic.
- CEO & Project Manager at KnowGo Ltd (Feb 2012–Jan 2013): Co-directed the company and shipped a workflow product that generated web solutions from business rules.
- Software Developer at SWTEAMS Ltd (Dec 2006–Jul 2010): Built university applications and electronic business-document systems for the EU-funded PEPPOL project.
- Programmer & Part-time Tutor at University of Mauritius (Nov 2005–Nov 2006): Programmed the I-Learn platform and trained IC3 instructors at national scale.

SKILLS:
- AI & Product: AI strategy, agent design, LLM integration, product discovery
- Leadership: Cross-functional teams, executive comms, roadmap ownership
- Engineering: Platform migrations, system architecture, web platforms
- Tools: React, TypeScript, Python, .NET, SQL, Supabase, Gemini, GPT

CERTIFICATIONS: AI Agents Fundamentals, Advanced Product Management: Vision, Strategy & Metrics, Vibe Coding, miniCON Agentic AI.

EDUCATION:
- Master of International Business at Curtin University, Australia (2014 – 2016)
- MSc Computational Science & Engineering at University of Technology, Mauritius (2005 – 2007)
- Bachelor of Information Technology at University of Canberra, Australia (2002 – 2005)

LANGUAGES: English, French, Mauritian Creole.

PORTFOLIO: PropertyCloud Mauritius, BuyRentKenya, Property Zimbabwe, Imobiliare Romania, MailEDI, PEPPOL.
`;

// Simple in-memory rate limiter (per isolate lifetime)
const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT_WINDOW_MS = 60_000; // 1 minute
const RATE_LIMIT_MAX = 5; // max requests per window per IP

serve(async (req) => {
  const origin = req.headers.get("origin");
  const corsHeaders = buildCorsHeaders(origin);

  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  // Origin/Referer allow-list — blocks calls from clients other than the site
  if (!isAllowedRequest(req)) {
    return new Response(
      JSON.stringify({ error: "Forbidden" }),
      { status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }

  try {
    // Rate limiting by client IP
    const clientIP = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    const now = Date.now();
    const timestamps = (rateLimitMap.get(clientIP) || []).filter(
      (t) => now - t < RATE_LIMIT_WINDOW_MS
    );
    if (timestamps.length >= RATE_LIMIT_MAX) {
      return new Response(
        JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }),
        { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    timestamps.push(now);
    rateLimitMap.set(clientIP, timestamps);

    const { jobDescription } = await req.json();
    if (!jobDescription || typeof jobDescription !== "string") {
      return new Response(
        JSON.stringify({ error: "Please provide a job description." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Enforce input length limit (10,000 characters)
    if (jobDescription.length > 10_000) {
      return new Response(
        JSON.stringify({ error: "Job description too long. Please limit to 10,000 characters." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const response = await fetch(
      "https://ai.gateway.lovable.dev/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-3-flash-preview",
          messages: [
            {
              role: "system",
              content: `You are a career matching assistant. Given Nisha Appanah's professional profile and a job description, analyze how well Nisha fits the role. Be specific, honest, and concise.

Structure your response as:
1. **Match Score** – A percentage (e.g. 85%) with a one-line summary.
2. **Strong Fits** – 3-5 bullet points showing where Nisha's experience directly matches requirements.
3. **Transferable Skills** – 2-3 areas where her experience applies even if not a direct match.
4. **Gaps to Address** – 1-3 areas where she may need to upskill or demonstrate capability.
5. **Suggested Talking Points** – 2-3 things Nisha should highlight in an application or interview.

Keep the tone professional and direct. Use Nisha's actual experience, not generic statements.

Here is Nisha's profile:
${NISHA_PROFILE}`,
            },
            {
              role: "user",
              content: `Here is the job description:\n\n${jobDescription}`,
            },
          ],
          stream: true,
        }),
      }
    );

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI usage limit reached. Please try again later." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(
        JSON.stringify({ error: "AI analysis failed. Please try again." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("tailor-role error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
