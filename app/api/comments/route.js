import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { connectDB } from '@/lib/mongodb';
import Comment from '@/models/Comment';

export async function GET(request) {
  await connectDB();
  const { searchParams } = new URL(request.url);
  const articleId = searchParams.get('articleId');
  const comments = await Comment.find({ articleId }).sort({ createdAt: -1 });
  return NextResponse.json(comments);
}

export async function POST(request) {
  const session = await getServerSession();
  if (!session) return NextResponse.json({ error: 'Not logged in' }, { status: 401 });

  await connectDB();
  const { articleId, text } = await request.json();

  const comment = await Comment.create({
    articleId,
    userName: session.user.name,
    userImage: session.user.image,
    text,
  });

  return NextResponse.json(comment);
}