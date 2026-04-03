import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const commentSchema = new Schema({
  boardId: { type: Schema.Types.ObjectId, ref: 'Board', required: true },
  content: { type: String, required: true },
  nickname: { type: String, required: true },
  authorId: { type: String, required: true },
  isDeleted: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

export default model('Comment', commentSchema);
