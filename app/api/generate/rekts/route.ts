import { NextResponse } from 'next/server';

const LANGUAGE_NAMES: Record<string, string> = {
  en: "English",
  ro: "Romanian",
  es: "Spanish",
  fr: "French",
  de: "German",
  it: "Italian",
  pt: "Portuguese",
  ar: "Arabic",
  hi: "Hindi",
  ja: "Japanese",
  ko: "Korean",
  tr: "Turkish",
};

export async function POST(request: Request) {
  console.log('=== MULTI-LANGUAGE ROAST API CALLED ===');

  try {
    const { platform, tone, post, language = "en" } = await request.json();

    if (!post || post.trim().length === 0) {
      return NextResponse.json({ error: 'Post content is required' }, { status: 400 });
    }

    const apiKey = process.env.GROQ_API_KEY?.trim();
    
    if (!apiKey) {
      console.error('No Groq API key found');
      return fallbackResponse();
    }

    const langName = LANGUAGE_NAMES[language] || "English";

    const groqResponse = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',        // Best model for quality + multilingual
        messages: [
          {
            role: 'system',
            content: `You are a professional viral roast and comeback generator for ${platform}.
Generate exactly 6 savage, funny, and clever roasts in ${langName} language.
Use natural ${langName} slang, cultural references, and internet style that native speakers would use.
Tone: ${tone || 'savage and funny'}.
Return ONLY the 6 roasts, one per line. No numbers, no explanations, no English unless necessary.`
          },
          {
            role: 'user',
            content: `Post: "${post}"`
          }
        ],
        temperature: 1.0,
        max_tokens: 700,
      }),
    });

    if (!groqResponse.ok) {
      const errorText = await groqResponse.text();
      console.error('Groq Multi-Language Error:', errorText);
      return fallbackResponse();
    }

    const data = await groqResponse.json();
    const content = data.choices?.[0]?.message?.content || '';

    const rekts = content
      .split('\n')
      .map((line: string) => line.trim())
      .filter((line: string) => line.length > 5)
      .slice(0, 6);

    return NextResponse.json({ rekts });

  } catch (error) {
    console.error('Multi-Language Roast API Error:', error);
    return fallbackResponse();
  }
}

// Fallback function
function fallbackResponse() {
  return NextResponse.json({
    rekts: [
      "bro really thought they ate with this one 💀",
      "this is giving 2016 vibes and not in a good way",
      "the confidence is crazy for this mid content",
      "somebody come get their uncle from the comments",
      "this ain't it chief, maybe delete and try again",
      "the secondhand embarrassment is real rn"
    ],
    error: 'Using sample roasts'
  });
}