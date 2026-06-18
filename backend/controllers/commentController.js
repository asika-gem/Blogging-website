import Comment from "../models/commentModel.js";
import Post from "../models/postModel.js";

export const addComment = async (req, res) => {
  try {
    console.log("USER:", req.user);
    console.log("BODY:", req.body);
    console.log("POSTID:", req.params.postId);

    const comment = await Comment.create({
      text: req.body.text,
      author: req.user.id,
      post: req.params.postId,
    });

    console.log("COMMENT CREATED:", comment);

    await Post.findByIdAndUpdate(req.params.postId, {
      $push: { comments: comment._id },
    });

    console.log("POST UPDATED");

    res.status(201).json(comment);
  } catch (error) {
    console.error("ERROR:", error);
    res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);

    if (!comment) {
      return res.status(404).json({
        message: "Comment not found",
      });
    }

    const post = await Post.findById(comment.post);

    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    const isCommentOwner = comment.author.toString() === req.user.id;

    const isPostOwner = post.author.toString() === req.user.id;

    const isAdmin = req.user.role === "admin";

    if (!isCommentOwner && !isPostOwner && !isAdmin) {
      return res.status(403).json({
        message: "Unauthorized",
      });
    }

    await comment.deleteOne();

    //
    await Post.findByIdAndUpdate(post._id, {
      $pull: { comments: comment._id },
    });

    res.json({
      success: true,
      message: "Comment deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const updateComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    const isOwner = comment.author.toString() === req.user.id;
    const isAdmin = req.user.role === "admin";

    if (!isOwner && !isAdmin) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    comment.text = req.body.text;
    await comment.save();

    res.json(comment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
