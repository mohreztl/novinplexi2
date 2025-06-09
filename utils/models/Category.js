import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    parent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      default: null,
    },
    icon: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

const Category = mongoose?.models?.Category || mongoose.model("Category", CategorySchema);

export default Category;
