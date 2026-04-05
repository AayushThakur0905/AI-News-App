import { NextResponse } from 'next/server';
import axios from 'axios';
import Groq from 'groq-sdk';
import { connectDB } from '@/lib/mongodb';
import Article from '@/models/Article';

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function GET() {
  await connectDB();

  const queries = {
    geopolitics: 'world politics international relations',
    entertainment: 'movies celebrity music entertainment',
    crime: 'crime arrest police investigation',
    technology: 'AI technology startup innovation',
    sports: 'sports football cricket IPL'
  };

  for (const category of Object.keys(queries)) {
    const newsRes = await axios.get('https://newsapi.org/v2/everything', {
      params: {
        q: queries[category],
        pageSize: 20,
        sortBy: 'publishedAt',
        apiKey: process.env.NEWS_API_KEY
      }
    });

    for (const article of newsRes.data.articles) {
      const completion = await groq.chat.completions.create({
        model: 'llama-3.3-70b-versatile',
        messages: [{
          role: 'user',
          content: `Summarize this news article in 2-3 sentences:
Title: ${article.title}
Description: ${article.description}`
        }],
        max_tokens: 200
      });

      await Article.create({
        title: article.title,
        summary: completion.choices[0].message.content,
        category,
        source: article.source.name,
        url: article.url,
        publishedAt: new Date(article.publishedAt)
      });
    }
  }

  return NextResponse.json({ success: true });
}