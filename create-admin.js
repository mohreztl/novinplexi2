import mongoose from 'mongoose';
import dotenv from 'dotenv';

// بارگذاری متغیرهای محیطی
dotenv.config({ path: '.env.local' });

// Schema موقت
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phoneNumber: { type: String, required: true, unique: true },
  admin: { type: Boolean, default: false },
  notificationPreferences: {
    orderUpdates: { type: Boolean, default: true },
    promotions: { type: Boolean, default: false }
  }
});

const User = mongoose.models.User || mongoose.model('User', userSchema);

async function createAdminUser() {
  try {
    // اتصال به دیتابیس
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');
    
    // چک کنیم که آیا کاربر admin قبلاً وجود دارد
    const existingAdmin = await User.findOne({ phoneNumber: '09123456789' });
    
    if (existingAdmin) {
      // اگر وجود دارد، فقط admin status را true کنیم
      existingAdmin.admin = true;
      await existingAdmin.save();
      console.log('Existing user updated to admin!');
      console.log('Phone:', existingAdmin.phoneNumber);
      console.log('Admin status:', existingAdmin.admin);
    } else {
      const adminUser = new User({
        name: 'Admin User',
        phoneNumber: '09123456789',
        admin: true,
        notificationPreferences: {
          orderUpdates: true,
          promotions: false
        }
      });
      
      await adminUser.save();
      console.log('New admin user created successfully!');
      console.log('Phone: 09123456789');
      console.log('Admin status:', adminUser.admin);
    }
    
    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

createAdminUser();
