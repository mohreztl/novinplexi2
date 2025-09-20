import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  excerpt: {
    type: String,
    required: true,
    maxLength: 300,
    default: 'خلاصه مقاله'
  },
  content: {
    type: String,
    required: true
  },
  featuredImage: {
    type: String,
    required: false,
    default: '/placeholder.webp'
  },
  images: [{
    type: String
  }],
  author: {
    name: {
      type: String,
      required: true,
      default: 'نوین پلکسی'
    },
    avatar: {
      type: String,
      default: '/default-avatar.png'
    },
    bio: {
      type: String,
      default: 'نویسنده مقالات نوین پلکسی'
    }
  },
  category: {
    type: String,
    required: true,
    enum: ['tutorial', 'article']
  },
  tags: [{
    type: String,
    trim: true
  }],
  status: {
    type: String,
    enum: ['draft', 'published', 'archived'],
    default: 'draft'
  },
  featured: {
    type: Boolean,
    default: false
  },
  views: {
    type: Number,
    default: 0
  },
  likes: {
    type: Number,
    default: 0
  },
  readTime: {
    type: Number, // in minutes
    default: 5
  },
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
    }]
  },
  publishedAt: {
    type: Date
  },
  relatedProducts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  }]
}, {
  timestamps: true
});

// Auto-generate slug from title
blogSchema.pre('save', function(next) {
  if (this.isModified('title') && !this.slug) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF\u200C\u200D\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim('-');
  }
  
  // Set publishedAt when status changes to published
  if (this.isModified('status') && this.status === 'published' && !this.publishedAt) {
    this.publishedAt = new Date();
  }
  
  next();
});

// Calculate read time based on content
blogSchema.pre('save', function(next) {
  if (this.isModified('content')) {
    const wordsPerMinute = 200;
    const wordCount = this.content.split(/\s+/).length;
    this.readTime = Math.ceil(wordCount / wordsPerMinute);
  }
  next();
});

// Index for search
blogSchema.index({ title: 'text', content: 'text', tags: 'text' });
blogSchema.index({ status: 1, publishedAt: -1 });
blogSchema.index({ category: 1, publishedAt: -1 });
blogSchema.index({ featured: 1, publishedAt: -1 });

export default mongoose.models.Blog || mongoose.model('Blog', blogSchema);
