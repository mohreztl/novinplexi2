import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    required: true,
    unique: true
  },
  description: String,
  image: String,
  parent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

export default mongoose.models.Category || mongoose.model('Category', categorySchema);
