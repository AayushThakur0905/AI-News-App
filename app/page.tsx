'use client';
import { useSession, signIn, signOut } from 'next-auth/react';
import { useEffect, useState } from 'react';

export default function Home() {
  const { data: session } = useSession();
  const [articles, setArticles] = useState([]);
  const [category, setCategory] = useState('geopolitics');
  const [comments, setComments] = useState({});
  const [commentText, setCommentText] = useState({});

  const categories = ['geopolitics', 'entertainment', 'crime', 'technology', 'sports'];

  useEffect(() => {
    fetch(`/api/articles?category=${category}`)
      .then(res => res.json())
      .then(data => setArticles(data));
  }, [category]);

  const loadComments = async (articleId) => {
    const res = await fetch(`/api/comments?articleId=${articleId}`);
    const data = await res.json();
    setComments(prev => ({ ...prev, [articleId]: data }));
  };

  const postComment = async (articleId) => {
    if (!commentText[articleId]) return;
    await fetch('/api/comments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ articleId, text: commentText[articleId] })
    });
    setCommentText(prev => ({ ...prev, [articleId]: '' }));
    loadComments(articleId);
  };

  return (
    <main className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">AI Daily News</h1>
        {session ? (
          <div className="flex items-center gap-3">
            <img src={session.user.image} className="w-8 h-8 rounded-full" />
            <span className="text-sm">{session.user.name}</span>
            <button onClick={() => signOut()} className="text-sm text-red-500">Sign out</button>
          </div>
        ) : (
          <div className="flex gap-2">
            <button onClick={() => signIn('google')} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm">Sign in with Google</button>
            <button onClick={() => signIn('github')} className="px-4 py-2 bg-gray-800 text-white rounded-lg text-sm">Sign in with GitHub</button>
          </div>
        )}
      </div>

      <div className="flex gap-2 mb-8 flex-wrap">
        {categories.map(cat => (
          <button key={cat} onClick={() => setCategory(cat)}
            className={`px-4 py-2 rounded-full capitalize text-sm font-medium
              ${cat === category ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'}`}>
            {cat}
          </button>
        ))}
      </div>

      <div className="space-y-6">
        {articles.map(article => (
          <div key={article._id} className="border rounded-xl p-5">
            <span className="text-xs uppercase font-semibold text-blue-500">{article.source}</span>
            <h2 className="font-semibold text-lg mt-1">{article.title}</h2>
            <p className="text-gray-600 mt-2 text-sm">{article.summary}</p>
            <a href={article.url} target="_blank" className="text-blue-600 text-sm mt-3 inline-block hover:underline">
              Read full article →
            </a>

            <div className="mt-4">
              <button onClick={() => loadComments(article._id)} className="text-sm text-gray-500 hover:underline">
                Show comments
              </button>
              <div className="mt-2 space-y-2">
                {(comments[article._id] || []).map(c => (
                  <div key={c._id} className="flex gap-2 items-start">
                    <img src={c.userImage} className="w-6 h-6 rounded-full mt-1" />
                    <div>
                      <span className="text-xs font-semibold">{c.userName}</span>
                      <p className="text-sm text-gray-600">{c.text}</p>
                    </div>
                  </div>
                ))}
              </div>
              {session && (
                <div className="flex gap-2 mt-3">
                  <input
                    type="text"
                    placeholder="Write a comment..."
                    value={commentText[article._id] || ''}
                    onChange={e => setCommentText(prev => ({ ...prev, [article._id]: e.target.value }))}
                    className="flex-1 border rounded-lg px-3 py-1 text-sm"
                  />
                  <button onClick={() => postComment(article._id)}
                    className="px-3 py-1 bg-blue-600 text-white rounded-lg text-sm">
                    Post
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}