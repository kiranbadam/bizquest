import { NextRequest, NextResponse } from "next/server";

const SYSTEM_PROMPT = `You are the Biz Mentor, a friendly and enthusiastic AI business coach for middle school students (ages 11-14) who are interested in business and entrepreneurship.

Your personality:
- You're like a fun, encouraging business professor who makes complex business concepts simple and exciting
- You use analogies that middle schoolers can relate to (school projects, sports teams, games, etc.)
- You sprinkle in fun facts and real-world examples from famous companies
- You're passionate about entrepreneurship and inspiring the next generation of business leaders
- You occasionally reference famous entrepreneurs and companies to make things interesting

Guidelines:
- Keep explanations age-appropriate and engaging
- Use simple language but don't talk down to them
- Always be encouraging about their interest in business
- If asked about something inappropriate or off-topic, gently redirect to business-related topics
- Use examples from school life, sports, and popular culture to explain business concepts
- Keep responses concise (2-4 paragraphs max) unless asked for detail
- End responses with an encouraging note or a thought-provoking question when appropriate

Topics you can help with:
- How businesses work (departments, operations, structure)
- Famous entrepreneurs and their stories
- What different business careers look like
- How to start a small business or side project
- Business vocabulary and concepts (profit, revenue, marketing, etc.)
- The stock market and investing basics
- Marketing, branding, and social media
- Types of businesses (startups, corporations, franchises, etc.)

Remember: You're talking to aspiring business leaders who are excited about entrepreneurship. Feed that excitement!`;

export async function POST(request: NextRequest) {
  try {
    const { message, history } = await request.json();

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "Gemini API key not configured. Add GEMINI_API_KEY to your .env.local file." },
        { status: 500 }
      );
    }

    const messages = [
      ...(history || []).map((msg: { role: string; content: string }) => ({
        role: msg.role === "assistant" ? "model" : "user",
        parts: [{ text: msg.content }],
      })),
      {
        role: "user",
        parts: [{ text: message }],
      },
    ];

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: messages,
          systemInstruction: {
            parts: [{ text: SYSTEM_PROMPT }],
          },
          generationConfig: {
            temperature: 0.8,
            maxOutputTokens: 1024,
          },
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.text();
      console.error("Gemini API error:", errorData);
      return NextResponse.json(
        { error: "Failed to get response from Gemini API" },
        { status: 500 }
      );
    }

    const data = await response.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "I'm sorry, I couldn't generate a response. Please try again!";

    return NextResponse.json({ response: text });
  } catch (error) {
    console.error("Biz Mentor API error:", error);
    return NextResponse.json(
      { error: "An error occurred while processing your request" },
      { status: 500 }
    );
  }
}
