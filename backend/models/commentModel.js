import mongoose from "mongoose";
//  Comment Schema
const commentSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },

    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
  },
  {
    timestamps: true,
  },
);

 
export default mongoose.model("Comment", commentSchema);;


