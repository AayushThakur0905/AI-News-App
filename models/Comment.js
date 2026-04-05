import mongoose from 'mongoose';

const CommentSchema = new mongoose.Schema({
  articleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Article' },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  userName: String,
  userImage: String,
  text: String,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Comment || mongoose.model('Comment', CommentSchema);