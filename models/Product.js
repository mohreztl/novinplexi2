import mongoose from 'mongoose';

// schema برای گزینه‌های variant
const variantOptionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  extraPrice: {
    type: Number,
    default: 0
  }
}, { _id: false });

// schema برای variants
const variantsSchema = new mongoose.Schema({
  thicknesses: [variantOptionSchema],
  sizes: [variantOptionSchema],
  colors: [variantOptionSchema]
}, { _id: false });

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: false // تغییر به اختیاری
  },
  slug: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true
  },
  fullDescription: {
    type: String,
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
  variants: variantsSchema,
  isNewProduct: {
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
  seo: {
    metaTitle: {
      type: String,
      maxLength: 60
    },
    metaDescription: {
      type: String,
      maxLength: 160
    },
    keywords: [{
      type: String
    }],
    focusKeyword: {
      type: String
    }
  },
  isPublished: {
    type: Boolean,
    default: true
  },
  featured: {
    type: Boolean,
    default: false
  },
  brand: {
    type: String,
  },
  material: {
    type: String,
  },
  washable: {
    type: String,
    enum: ["دارد", "ندارد"]
  },
  condition: {
    type: String,
  },
  reviews: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Review" 
  }],
  averageRating: { 
    type: Number, 
    default: 0 
  },
  numReviews: { 
    type: Number, 
    default: 0 
  },
  weight: {
    type: String,
    default: "148",
  },
  color: {
    type: String,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  }
}, {
  timestamps: true
});

// Middleware برای تنظیم name اگر ارسال نشده باشد
productSchema.pre('save', function(next) {
  if (!this.name && this.title) {
    this.name = this.title;
  }
  next();
});

productSchema.pre('findOneAndUpdate', function(next) {
  const update = this.getUpdate();
  if (update.title && !update.name) {
    update.name = update.title;
  }
  next();
});

export default mongoose.models.Product || mongoose.model('Product', productSchema);
