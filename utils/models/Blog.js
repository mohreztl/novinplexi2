import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      min: 4,
    },
    description: {
      type: String,
      required: true,
      min: 20,
    },
    excerpt: {
      type: String,
      required: true,
      min: 10,
    },
    quote: {
      type: String,
      required: true,
      min: 6,
    },
    images: [{ type: String }],
    category: {
      type: String,
      required: true,
      enum: [
        "مقاله",
        "آموزش",
        "اخبار",
      
      ],
    },
    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    likes: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User",
      default: [],
    },
    comments: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        text: {
            type: String,
            required: true
        },
        date: {
            type: Date,
            default: Date.now
        }
      },
    ],
  },
  { timestamps: true }
);

const Blog= mongoose?.models?.Blog || mongoose.model("Blog", BlogSchema);
export default Blog;