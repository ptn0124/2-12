import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const boardSchema = new Schema({
  category: {
    type: String,
    required: true,
    enum: ['공지', '수행평가', '일반'],
    default: '일반'
  },
  title: { type: String, required: true },
  content: { type: String, required: true },
  nickname: { type: String },
  deadline: { type: Date, required: false },
  dDayAlarm: { type: Number, default: 3 },
  authorId: { type: String, required: true },
  authorName: { type: String, required: true },
  isDeleted: { type: Boolean, default: false },
  editHistory: [{
    title: String,
    content: String,
    deadline: Date,
    editedAt: { type: Date, default: Date.now }
  }],
  createdAt: { type: Date, default: Date.now }
});

export default model('Board', boardSchema);
