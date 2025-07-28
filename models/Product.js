import mongoose from 'mongoose';

const variantSchema = new mongoose.Schema({
  size: {
    type: String,
    required: true
  },
  color: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  stock: {
    type: Number,
    default: 0
  }
});

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  basePrice: {
    type: Number,
    required: true
  },
  images: [{
    type: String
  }],
  category: {
    type: String,
    required: true
  },
  variants: [variantSchema],
  colors: [{
    name: {
      type: String,
      required: true
    },
    code: {
      type: String,
      required: true
    }
  }],
  sizes: [{
    type: String
  }],
  isNew: {
    type: Boolean,
    default: false
  },
  discount: {
    type: Number,
    default: 0
  },
  stock: {
    type: Number,
    default: 0
  },
  specifications: [{
    key: String,
    value: String
  }],
  tags: [String],
  isPublished: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

export default mongoose.models.Product || mongoose.model('Product', productSchema);
