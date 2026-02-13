import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const NISHA_PROFILE = `
Nisha Appanah – 20-Year Technology Leader

CURRENT: Founder at Aplica Ltd (Nov 2024–Present) – Helping businesses unlock growth through practical AI solutions.

EXPERIENCE:
- Product Manager, AI Team at Ringier South Africa (Jun–Oct 2024): Pitched Ally Agent, an AI-powered solution matching property seekers to listings.
- Product Manager, Property Marketplace at Ringier South Africa (Jul 2019–Oct 2024): Led a 17-member cross-functional team, 2 major platform migrations, collaborated across multiple international markets, partnered with CEOs.
- Senior Software Developer at Ringier South Africa (Feb 2017–Jun 2019): Architected end-to-end property listing flow, built features deployed across 5 African countries, created dynamic form builder.
- Managing Director at Aplica Ltd (Mar 2015–Jan 2017): Built and maintained housing systems for University of Copenhagen and Technical University of Denmark.
- Project Manager at Expand Technology (Feb 2013–Feb 2015): Managed team of 7, smartcard payment solution development.
- CEO & Project Manager at KnowGo Ltd (Feb 2012–Jan 2012): Co-directed company, led workflow product development.
- Software Developer at SWTEAMS Ltd (Dec 2006–Jul 2010): University applications, EU-funded PEPPOL project, rule engine modules.
- Programmer & Part-time Tutor at University of Mauritius (Nov 2005–Nov 2006).

SKILLS: AI Agents, Generative AI, Vibe Coding, Agentic AI, AI Strategy, Product Roadmap, Platform Migration, Online Marketplace, Product Development, Vision & Metrics, Cross-functional Teams, CEO Partnership, Sprint Planning, Scrum, Stakeholder Management, Multi-market Deployment.

CERTIFICATIONS: AI Agents Fundamentals, Advanced Product Management: Vision Strategy & Metrics, Vibe Coding, miniCON Agentic AI.

EDUCATION: MSc Computer Science (University of Mauritius), BSc Computer Science & Engineering (University of Mauritius).

LANGUAGES: English, French, Mauritian Creole.

PORTFOLIO: PropertyCloud Mauritius, BuyRentKenya, Property Zimbabwe, Imobiliare Romania, MailEDI, PEPPOL.
`;

// Simple in-memory rate limiter (per isolate lifetime)
const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT_WINDOW_MS = 60_000; // 1 minute
const RATE_LIMIT_MAX = 5; // max requests per window per IP

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
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
