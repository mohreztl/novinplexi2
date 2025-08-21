import mongoose from 'mongoose';

const verifySchema = new mongoose.Schema({
  phoneNumber: {
    type: String,
    required: true,
    match: /^\d{10,14}$/, // اعتبارسنجی شماره تلفن
  },
  code: {
    type: Number,
    required: true,
    min: 1000, // حداقل مقدار کد
    max: 9999, // حداکثر مقدار کد
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  expiresAt: {
    type: Date,
    required: true,
  },
});

// حذف رکوردهای منقضی‌شده به صورت خودکار
verifySchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export default mongoose.models.Verify||
  mongoose.model('Verify', verifySchema);
