import mongoose from 'mongoose';

const BrandSchema = new mongoose.Schema({
  name: String,
});

export default mongoose.models.Brand || mongoose.model('Brand', BrandSchema);