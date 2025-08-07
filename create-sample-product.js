// Test script to create a sample product
const mongoose = require('mongoose');

const dbConnect = async () => {
  try {
    if (mongoose.connections[0].readyState) {
      return;
    }
    await mongoose.connect('mongodb://localhost:27017/nikoodecor');
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
};

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
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
  variants: [{
    size: String,
    color: String,
    price: Number,
    stock: Number
  }],
  colors: [{
    name: String,
    code: String
  }],
  sizes: [String],
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
  isPublished: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

const createSampleProduct = async () => {
  await dbConnect();
  
  // Check if product already exists and delete it
  const existingProduct = await Product.findOne({ slug: "wallpaper-modern-golden-v2" });
  if (existingProduct) {
    await Product.findByIdAndDelete(existingProduct._id);
    console.log('Existing product deleted');
  }
  
  const sampleProduct = new Product({
    title: "کاغذ دیواری مدرن طلایی نسخه 2",
    slug: "wallpaper-modern-golden-v2",
    description: "کاغذ دیواری با طرح مدرن و رنگ طلایی مناسب برای تزیین اتاق پذیرایی و اتاق خواب. از جنس با کیفیت و مقاوم در برابر رطوبت.",
    basePrice: 150000,
    images: [
      "/placeholder.webp",
      "/placeholder.webp",
      "/placeholder.webp"
    ],
    category: "کاغذ دیواری",
    colors: [
      { name: "طلایی", code: "#FFD700" },
      { name: "نقره‌ای", code: "#C0C0C0" },
      { name: "مشکی", code: "#000000" },
      { name: "سفید", code: "#FFFFFF" },
      { name: "قرمز", code: "#FF0000" },
      { name: "آبی", code: "#0000FF" }
    ],
    sizes: ["50x70", "60x80", "70x90", "80x100"],
    thicknesses: ["2mm", "3mm", "5mm", "8mm"],
    variants: [
      { size: "50x70", color: "#FFD700", thickness: "2mm", price: 150000, stock: 10 },
      { size: "60x80", color: "#FFD700", thickness: "3mm", price: 180000, stock: 8 },
      { size: "70x90", color: "#C0C0C0", thickness: "5mm", price: 200000, stock: 5 },
      { size: "80x100", color: "#000000", thickness: "8mm", price: 250000, stock: 3 }
    ],
    isNewProduct: true,
    discount: 15,
    stock: 26,
    specifications: [
      { key: "جنس", value: "PVC" },
      { key: "ضدآب", value: "بله" },
      { key: "قابل شستشو", value: "بله" },
      { key: "مقاومت در برابر نور", value: "بالا" },
      { key: "کشور سازنده", value: "ایران" }
    ],
    tags: ["کاغذ دیواری", "مدرن", "طلایی", "ضدآب"],
    isPublished: true
  });
  
  try {
    const savedProduct = await sampleProduct.save();
    console.log('Sample product created:', savedProduct._id);
    console.log('Product URL: /product/' + savedProduct.slug);
  } catch (error) {
    console.error('Error creating sample product:', error);
  }
  
  process.exit(0);
};

createSampleProduct();
