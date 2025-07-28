import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  excerpt: {
    type: String
  },
  slug: {
    type: String,
    required: true,
    unique: true
  },
  category: {
    type: String,
    required: true
  },
  image: {
    type: String
  },
  author: {
    name: {
      type: String,
      required: true
    },
    image: String
  },
  tags: [String],
  isPublished: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

export default mongoose.models.Post || mongoose.model('Post', postSchema);
