import mongoose from 'mongoose';

const ArticleSchema = new mongoose.Schema({
  title: String,
  summary: String,
  category: String,
  source: String,
  url: String,
  publishedAt: Date,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Article || mongoose.model('Article', ArticleSchema);