import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { CalendarDays, User, ArrowLeft, Pencil } from "lucide-react";
import { toast } from "react-hot-toast";
import { apiRequest } from "../services/api";
import { useAuth } from "../context/AuthContext";

const PostDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { currentUser } = useAuth();

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [commentText, setCommentText] = useState("");

  // FETCH POST
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await apiRequest.get(`/posts/${id}`);
        setPost(response.data);
      } catch (error) {
        console.error("Failed to fetch post", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  // DELETE POST
  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure?");

    if (!confirmDelete) return;

    try {
      await apiRequest.delete(`/posts/${id}`);
      toast.success("Post deleted");
      navigate("/dashboard");
    } catch (error) {
      console.error("Failed to delete post", error);
    }
  };

  // ADD COMMENT
  const handleComment = async () => {
    if (!commentText.trim()) return;

    try {
      await apiRequest.post(`/comments/${id}`, {
        text: commentText,
      });

      const res = await apiRequest.get(`/posts/${id}`);
      setPost(res.data);

      setCommentText("");
      toast.success("Comment added");
    } catch (_error) {
      console.error("Failed to add comment", _error);
      toast.error("Failed to add comment");
    }
  };

  // DELETE COMMENT
  const handleDeleteComment = async (commentId) => {
    try {
      await apiRequest.delete(`/comments/${commentId}`);

      const res = await apiRequest.get(`/posts/${id}`);
      setPost(res.data);

      toast.success("Comment deleted successfully 💜");
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Failed to delete comment");
    }
  };

  // EDIT COMMENT
  const handleEditComment = async (comment) => {
    const newText = prompt("Edit comment:", comment.text);

    if (!newText || !newText.trim()) return;

    try {
      await apiRequest.put(`/comments/${comment._id}`, {
        text: newText,
      });

      const res = await apiRequest.get(`/posts/${id}`);
      setPost(res.data);

      toast.success("Comment updated");
    } catch (err) {
      console.error("Failed to update comment", err);
      
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading...
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        Post not found
      </div>
    );
  }

  const isOwner =
    currentUser?.id === post?.author?._id || currentUser?.id === post?.author;

  const isAdmin = currentUser?.role === "admin";
  const canEditDelete = isOwner || isAdmin;

  return (
    <div className="min-h-screen bg-linear-to-br from-purple-50 via-white to-purple-100 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* BACK */}
        <Link to="/" className="text-purple-700 flex items-center gap-2 mb-6">
          <ArrowLeft size={18} /> Back
        </Link>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* IMAGE */}
          <img
            src={
              post.image?.startsWith("http")
                ? post.image
                : `http://localhost:5001/${post.image}`
            }
            className="w-full h-64 md:h-96 object-contain bg-gray-100"
          />

          <div className="p-6 md:p-10">
            {/* TITLE */}
            <h1 className="text-3xl font-bold text-purple-900 mb-4">
              {post.title}
            </h1>

            {/* AUTHOR */}
            <div className="flex gap-4 text-gray-500 mb-6">
              <User size={18} />
              <span>{post.author?.username}</span>
              <CalendarDays size={18} />
              <span>{new Date(post.createdAt).toLocaleDateString()}</span>
            </div>

            {/* DESCRIPTION */}
            <div
              dangerouslySetInnerHTML={{ __html: post.description }}
              className="text-gray-700 leading-7"
            />

            {/* 💜 COMMENTS */}
            <div className="mt-10 border-t pt-6">
              <h2 className="text-lg font-semibold text-purple-800 mb-4">
                Comments ({post.comments?.length || 0})
              </h2>

              {/* INPUT */}
              <div className="flex gap-3 mb-6">
                <input
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  className="flex-1 border border-purple-200 rounded-full px-4 py-2 text-sm outline-none"
                  placeholder="Write a comment..."
                />

                <button
                  onClick={handleComment}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-full text-sm"
                >
                  Post
                </button>
              </div>

              {/* LIST */}
              <div className="space-y-4 max-h-100 overflow-y-auto pr-2">
                {post.comments?.length > 0 ? (
                  post.comments.map((comment) => {
                    const isCommentOwner =
                      currentUser?.id === comment.author?._id ||
                      currentUser?.id === comment.author;

                    const isAdmin = currentUser?.role === "admin";

                    const canEditDeleteComment = isCommentOwner || isAdmin;

                    return (
                      <div key={comment._id} className="flex gap-3">
                        {/* avatar */}
                        <div className="w-9 h-9 rounded-full bg-purple-600 text-white flex items-center justify-center text-xs font-bold">
                          {comment.author?.username?.charAt(0).toUpperCase() ||
                            "U"}
                        </div>

                        {/* comment */}
                        <div className="bg-white border border-purple-100 rounded-xl px-3 py-2 w-full">
                          <div className="flex justify-between">
                            <div>
                              <p className="font-semibold text-sm text-purple-900">
                                {comment.author?.username || "user"}
                              </p>
                              <p className="text-xs text-gray-400">
                                {new Date(
                                  comment.createdAt,
                                ).toLocaleDateString()}
                              </p>
                            </div>

                            {/* actions */}
                            {canEditDeleteComment && (
                              <div className="flex gap-2 text-xs">
                                <button
                                  onClick={() => handleEditComment(comment)}
                                  className="text-purple-600"
                                >
                                  Edit
                                </button>

                                <button
                                  onClick={() =>
                                    handleDeleteComment(comment._id)
                                  }
                                  className="text-red-700"
                                >
                                  Delete
                                </button>
                              </div>
                            )}
                          </div>

                          <p className="text-sm text-gray-700 mt-1">
                            {comment.text}
                          </p>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <p className="text-gray-400 text-sm">No comments yet 💬</p>
                )}
              </div>
            </div>

            {/* POST ACTIONS */}
            {canEditDelete && (
              <div className="mt-10 pt-6 border-t">
                <div className="flex items-center justify-between bg-gradient-to-r from-purple-50 to-white border border-purple-100 rounded-xl p-4 shadow-sm">
                  {/* LEFT TEXT */}
                  <div>
                    <h3 className="text-sm font-semibold text-purple-900">
                      Post Actions
                    </h3>
                    <p className="text-xs text-gray-500">
                      You can edit or remove this post
                    </p>
                  </div>

                  {/* BUTTONS */}
                  <div className="flex gap-3">
                    <Link
                      to={`/dashboard/EditPost/${post._id}`}
                      className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-sm transition"
                    >
                      <Pencil size={16} />
                      Edit
                    </Link>

                    <button
                      onClick={handleDelete}
                      className="flex items-center gap-2 bg-red-700 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-sm transition"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
