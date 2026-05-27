import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { Save, Trash2, ImageIcon, FileText, MessageCircle } from "lucide-react";
import Editor from "../components/RichTextEditor";

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState("");

  const [comments, setComments] = useState([]);

  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  // FETCH POST
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5001/api/posts/${id}`,
        );

        const post = response.data;

        setTitle(post.title || "");
        setDescription(post.description || "");
        setCategory(post.category || "");

        setComments(post.comments || []);

        setPreviewImage(
          post.image?.startsWith("http")
            ? post.image
            : `http://localhost:5001/${post.image}`,
        );

        setLoading(false);
      } catch (error) {
        console.log(error);
        toast.error("Failed to load post");
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  // IMAGE CHANGE
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setImage(file);

      setPreviewImage(URL.createObjectURL(file));
    }
  };

  // UPDATE POST
  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      setUpdating(true);

      const formData = new FormData();

      formData.append("title", title);
      formData.append("description", description);
      formData.append("category", category);

      if (image) {
        formData.append("image", image);
      }

      await axios.put(`http://localhost:5001/api/posts/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Post updated successfully");

      navigate(`/dashboard/posts/${id}`);
    } catch (error) {
      console.log(error);
      toast.error("Failed to update post");
    } finally {
      setUpdating(false);
    }
  };

  // DELETE POST
  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this post?",
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:5001/api/posts/${id}`);

      toast.success("Post deleted successfully");

      navigate("/dashboard/posts");
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete post");
    }
  };

  // DELETE COMMENT
  const handleDeleteComment = (commentId) => {
    const updatedComments = comments.filter(
      (comment) => comment._id !== commentId,
    );

    setComments(updatedComments);

    toast.success("Comment removed");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading...
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold text-purple-900">Edit Post</h1>

          <p className="text-gray-500 mt-2">
            Update your content and manage engagement.
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleDelete}
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 transition text-white px-5 py-3 rounded-xl"
          >
            <Trash2 size={18} />
            Delete
          </button>

          <button
            onClick={handleUpdate}
            disabled={updating}
            className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 transition text-white px-5 py-3 rounded-xl"
          >
            <Save size={18} />

            {updating ? "Updating..." : "Update Post"}
          </button>
        </div>
      </div>

      {/* MAIN GRID */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* LEFT SIDE */}
        <div className="xl:col-span-2 space-y-6">
          {/* TITLE */}
          <div className="bg-white rounded-2xl shadow-sm border p-6">
            <label className="block text-sm font-semibold mb-3 text-gray-700">
              Post Title
            </label>

            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter post title..."
              className="w-full border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none rounded-xl p-4"
            />
          </div>

          {/* DESCRIPTION */}
          <div className="bg-white rounded-2xl shadow-sm border p-6">
            <div className="flex items-center gap-2 mb-4">
              <FileText className="text-purple-600" />

              <h2 className="text-xl font-semibold">Description</h2>
            </div>

            <Editor value={description} onChange={setDescription} />
          </div>

          {/* COMMENTS */}
          <div className="bg-white rounded-2xl shadow-sm border p-6">
            <div className="flex items-center gap-2 mb-6">
              <MessageCircle className="text-blue-600" />

              <h2 className="text-2xl font-bold">
                Comments ({comments.length})
              </h2>
            </div>

            {comments.length === 0 ? (
              <p className="text-gray-500">No comments yet.</p>
            ) : (
              <div className="space-y-4">
                {comments.map((comment) => (
                  <div
                    key={comment._id}
                    className="border border-gray-100 rounded-xl p-4 bg-gray-50"
                  >
                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <h3 className="font-semibold text-gray-800">
                          {comment.author || "Anonymous"}
                        </h3>

                        <p className="text-gray-600 mt-1">{comment.text}</p>
                      </div>

                      <button
                        onClick={() => handleDeleteComment(comment._id)}
                        className="text-red-600 hover:text-red-700 text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="space-y-6">
          {/* IMAGE */}
          <div className="bg-white rounded-2xl shadow-sm border p-6">
            <div className="flex items-center gap-2 mb-4">
              <ImageIcon className="text-purple-600" />

              <h2 className="text-xl font-semibold">Featured Image</h2>
            </div>

            {previewImage && (
              <img
                src={previewImage}
                alt="Preview"
                className="w-full h-64 object-cover rounded-2xl mb-4"
              />
            )}

            <input
              type="file"
              onChange={handleImageChange}
              className="w-full border border-gray-200 rounded-xl p-3"
            />
          </div>

          {/* CATEGORY */}
          <div className="bg-white rounded-2xl shadow-sm border p-6">
            <label className="block text-sm font-semibold mb-3 text-gray-700">
              Category
            </label>

            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="Technology"
              className="w-full border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none rounded-xl p-4"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditPost;
