import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    author: {
      type: String,
      default: "Anonymous",
    },
    text: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    image: {
      type: String,
      required: true,
    },

    likes: {
      type: Number,
      default: 0,
    },

    // 💬 upgraded comments
    comments: [commentSchema],
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Post", postSchema);
