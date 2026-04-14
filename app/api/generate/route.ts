import Anthropic from '@anthropic-ai/sdk';
import { NextRequest, NextResponse } from 'next/server';
import { SYSTEM_PROMPT, buildPrompt } from '@/app/lib/prompts';
import { RestaurantData, GeneratedLPContent } from '@/app/lib/types';

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const data: RestaurantData = await request.json();

    const message = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages: [
        {
          role: 'user',
          content: buildPrompt(data),
        },
      ],
    });

    const text = message.content[0].type === 'text' ? message.content[0].text : '';

    // Extract JSON from the response
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Invalid JSON response from Claude');
    }

    const content: GeneratedLPContent = JSON.parse(jsonMatch[0]);

    return NextResponse.json({ success: true, content });
  } catch (error) {
    console.error('Generate error:', error);
    return NextResponse.json(
      { success: false, error: 'コンテンツの生成に失敗しました' },
      { status: 500 }
    );
  }
}
