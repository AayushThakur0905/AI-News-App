# AI Daily News 📰

An AI-powered news aggregator that automatically fetches, summarizes, and categorizes daily news using Groq AI.

## 🌐 Live Demo
[https://ai-news-app-t863.vercel.app](https://ai-news-app-t863.vercel.app)

## ✨ Features
- 🤖 AI-generated summaries using Groq (Llama 3)
- 📂 5 categories: Geopolitics, Entertainment, Crime, Technology, Sports
- 🔐 Google & GitHub OAuth login
- 💬 Comment on articles
- ⏰ Auto daily news fetch via Vercel Cron Jobs
- 📱 Responsive design with Tailwind CSS

## 🛠️ Tech Stack
- **Frontend**: Next.js, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: MongoDB Atlas
- **AI**: Groq API (Llama 3.3)
- **Auth**: NextAuth.js
- **News Source**: NewsAPI.org
- **Deployment**: Vercel

## 🚀 Getting Started

1. Clone the repo
2. Install dependencies: `npm install`
3. Create `.env.local` with your API keys
4. Run locally: `npm run dev`

## 📝 Environment Variables
NEWS_API_KEY=
GROQ_API_KEY=
MONGODB_URI=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
NEXTAUTH_SECRET=
NEXTAUTH_URL=

## 👨‍💻 Developer
Made by Aayush Thakur