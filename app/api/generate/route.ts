import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  console.log('=== API GENERATE CALLED ===');

  try {
    const body = await request.json();
    const { platform, tone, post } = body;

    if (!post || post.trim().length === 0) {
      return NextResponse.json({ error: 'Post content is required' }, { status: 400 });
    }

    const apiKey = process.env.GROQ_API_KEY;

    if (!apiKey) {
      console.error('No Groq API key found');
      return fallbackResponse();
    }

  const groqResponse = await fetch('https://api.groq.com/openai/v1/chat/completions', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${apiKey}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    model: 'llama-3.3-70b-versatile',
    messages: [
      {
        role: 'system',
        content: `You are a native ${platform} user. Write 6 ${tone} comments. 
        Formatting: No quotes, no numbers, one per line. 
        Tone Guide: ${tone === 'Gen Z' ? 'Use lowercase, skull emojis, and slang like "no cap" or "ate".' : 'Be engaging.'}`
      },
      {
        role: 'user',
        content: `Post Content: ${post}`
      }
    ],
    temperature: 0.9, // Higher for more creative/viral feel
    presence_penalty: 0.5, // Reduces repetitive phrasing
    max_tokens: 500,
  }),
});
    if (!groqResponse.ok) {
      console.error('Groq failed, using fallback');
      return fallbackResponse();
    }

    const data = await groqResponse.json();
    const content = data.choices?.[0]?.message?.content || '';

    const comments = content
      .split('\n')
      .map((line: string) => line.trim())
      .filter((line: string) => line.length > 3)
      .slice(0, 6);

    return NextResponse.json({ comments });

  } catch (error) {
    console.error('API Route Error:', error);
    return fallbackResponse();
  }
}

function fallbackResponse() {
  const fallbackComments = [
    "bro is on a whole different level 💀",
    "this needs to go viral immediately",
    "the energy in this is unmatched",
    "main character vibes only",
    "no cap this is fire",
    "the internet won today"
  ];

  return NextResponse.json({ 
    comments: fallbackComments,
    error: 'Using sample comments' 
  });
}