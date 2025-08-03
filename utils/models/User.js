import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "please provide your full name"],
  },
  email: {
    type: String, 


  },
  phoneNumber:{
    type: String,
    required: [true, "please provide your email"],
    unique: true,
  },
  password: {
    type: String,
  },
  admin: {
    type: Boolean,
    default: false,
  },
  
  notificationPreferences: {
    orderUpdates: {type: Boolean, default: true},
    promotions: {type: Boolean, default: false},
  },
  reviews: [
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review"
    },
    
  ],   createdAt: {
    type: Date,
    default: Date.now,
  },
 
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
