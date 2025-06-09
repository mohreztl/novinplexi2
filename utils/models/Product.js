import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a name"],
    },
    slug: {
      type: String,
      required: [true, "Please provide a slug"],
      unique: true,
    },
    categories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }],
    description: {
      type: String,
    },
    fullDescription: {
      type: String,
    },
    images: [{ type: String }],
    price: {
      type: Number,
    },
    originalPrice: {
      type: Number,
    },
    brand: {
      type: String,
    },
    material: {
      type: String,
    },
    washable: {
      type: String,
      enum: ["دارد" ,"ندارد"]
    },
    condition: {
      type: String,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
    averageRating: { type: Number, default: 0 },
    numReviews: { type: Number, default: 0 },
    featured: {
      type: Boolean,
      default: false,
    },
    place: {
      type: String,

    },
    weight: {
      type: String,
      default: "148",
    },
    color: {
      type: String,
     
    },

    weight: {
      type: String,
      default: "12mm",
    },
 
    strong: {
      type: String,
      default: "Screwed",
    },
    antistatic: {
      type: String,
      default: "14.5cm - 22.5cm adjustable",
    },
    other: {
      type: String,
      default: "20mm",
    },
    country: {
      type: String,
      default: "3 ATM",
    },
  },
  { timestamps: true }
);

productSchema.methods.hasUserPurchased = async function (userId){
    const Order = mongoose.model("Order");
    const order = await Order.findOne({
        user: userId,
        cartProducts: this._id,
        status: "delivered",
        paid: true,
    }); return !!order;
}

export const Product = mongoose.models.Product || mongoose.model("Product", productSchema);
