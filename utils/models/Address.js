// models/Address.js
import mongoose from "mongoose";

const AddressSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  province: { type: String, required: true },
  city: { type: String, required: true },
  street: { type: String, required: true },
  postalCode: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Address || mongoose.model("Address", AddressSchema);
