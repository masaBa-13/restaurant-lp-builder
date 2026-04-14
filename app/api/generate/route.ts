import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextRequest, NextResponse } from 'next/server';
import { SYSTEM_PROMPT, buildPrompt } from '@/app/lib/prompts';
import { RestaurantData, GeneratedLPContent } from '@/app/lib/types';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(request: NextRequest) {
  try {
    const data: RestaurantData = await request.json();

    const model = genAI.getGenerativeModel({
      model: 'gemini-2.5-flash',
      systemInstruction: SYSTEM_PROMPT,
    });

    const result = await model.generateContent(buildPrompt(data));
    const text = result.response.text();

    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Invalid JSON response from Gemini');
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
