import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { mode, prompt } = await req.json();

    if (!process.env.GROQ_API_KEY) {
      return NextResponse.json({ error: "GROQ_API_KEY is not configured." }, { status: 500 });
    }

    let systemPrompt = "";
    
    switch (mode) {
      case "magic-fill-vcard":
        systemPrompt = "You are an expert contact parser. Extract contact information from the user's messy text. Return ONLY a valid JSON object with these exact keys: vName, vCompany, vTitle, vPhone, vEmail, vWebsite, vAddress. If a field is not found, leave it as an empty string. Do not include markdown formatting or backticks.";
        break;
      case "magic-fill-event":
        systemPrompt = "You are an expert event parser. Extract event details from the user's messy text. Return ONLY a valid JSON object with these exact keys: calTitle, calStart, calEnd, calLocation, calDesc. Format dates strictly as YYYY-MM-DDTHH:MM (e.g., 2026-10-31T18:00). If no end time is specified, guess 1 hour after start. If a field is not found, leave it as an empty string. Do not include markdown formatting or backticks.";
        break;
      case "generate-copy-sms":
        systemPrompt = "You are an expert SMS marketing copywriter. The user will tell you what they are promoting. Write a single, short, punchy, engaging SMS message (max 160 characters). Do not include quotes, hashtags, or any intro text. Just the exact message.";
        break;
      case "generate-copy-email":
        systemPrompt = "You are an expert Email marketer. The user will tell you what they are promoting. Return ONLY a valid JSON object with two keys: subject (a catchy email subject line), body (a short, engaging email body). Do not include markdown formatting or backticks.";
        break;
      case "generate-style":
        systemPrompt = "You are an expert UI/UX color designer. The user will provide a theme or vibe. Return ONLY a valid JSON object with these keys representing hex color codes: fgColor (a primary dark/vibrant color), fgColor2 (a secondary color for gradients), bgColor (a complementary light/dark background color). Also include eyeDotStyle which must be one of: 'square', 'dot', 'extra-rounded'. Do not include markdown formatting or backticks.";
        break;
      default:
        return NextResponse.json({ error: "Invalid mode." }, { status: 400 });
    }

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: prompt }
        ],
        temperature: 0.7,
        max_tokens: 500,
        response_format: mode.includes("generate-copy-sms") ? undefined : { type: "json_object" }
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Groq API Error:", errorText);
      return NextResponse.json({ error: "Failed to generate AI response." }, { status: 500 });
    }

    const data = await response.json();
    let content = data.choices[0].message.content;
    
    // For non-JSON responses (like SMS)
    if (mode === "generate-copy-sms") {
      return NextResponse.json({ result: content.trim() });
    }

    // For JSON responses
    try {
      // Sometimes models wrap json in markdown even when asked not to
      content = content.replace(/```json/g, "").replace(/```/g, "").trim();
      const parsed = JSON.parse(content);
      return NextResponse.json({ result: parsed });
    } catch (e) {
      console.error("Failed to parse JSON from AI:", content);
      return NextResponse.json({ error: "AI returned invalid format." }, { status: 500 });
    }
  } catch (error) {
    console.error("AI Route Error:", error);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}
