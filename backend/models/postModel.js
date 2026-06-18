import mongoose from "mongoose";
//  Post Schema
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
      required: false,
    },

    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    published: {
      type: Boolean,
      default: true,
    },

    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Post", postSchema);
