import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Article from '@/models/Article';

export async function GET(request) {
  await connectDB();
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category') || 'geopolitics';
  const articles = await Article.find({ category }).sort({ publishedAt: -1 }).limit(10);
  return NextResponse.json(articles);
}