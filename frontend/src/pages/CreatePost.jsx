import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Editor from "../components/RichTextEditor";
import { apiRequest } from "../services/api";

const CreatePost = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description || !image || !category) {
      toast.error("All fields are required!");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("category", category);
      formData.append("image", image);

      const res = await apiRequest.post("/posts", formData);

      console.log(res.data);

      toast.success("Post created successfully!");

      setTitle("");
      setDescription("");
      setImage(null);
      setCategory("");

      navigate("/");
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-purple-50 min-h-screen p-6">
      <div className="bg-white max-w-4xl mx-auto rounded-2xl shadow-sm border border-purple-100 p-8">
        {/* HEADER */}
        <div className="mb-6">
          <div className="h-1 w-20 bg-purple-600 rounded-full mb-3"></div>

          <h1 className="text-3xl font-bold text-purple-900">
            Create New Post
          </h1>

          <p className="text-purple-700 mt-1">
            Share your thoughts with the world
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* TITLE */}
          <div>
            <label className="text-purple-900 font-medium">Title</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Post title..."
              className="w-full border border-purple-100 rounded-lg p-3 mt-2 focus:ring-2 focus:ring-purple-500 outline-none"
            />
          </div>

          {/* CATEGORY */}
          <div>
            <label className="text-purple-900 font-medium">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border border-purple-100 rounded-lg p-3 mt-2 focus:ring-2 focus:ring-purple-500 outline-none"
            >
              <option value="">Select Category</option>
              <option>Technology</option>
              <option>Travel</option>
              <option>Lifestyle</option>
              <option>Business</option>
            </select>
          </div>

          {/* IMAGE */}
          <div>
            <label className="text-purple-900 font-medium">
              Featured Image
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              className="w-full border border-purple-100 rounded-lg p-3 mt-2 focus:ring-2 focus:ring-purple-500 outline-none"
            />
          </div>

          {/* CONTENT */}
          <div>
            <label className="text-purple-900 font-medium">Content</label>
            <div className="mt-2 border border-purple-100 rounded-lg bg-white">
              <Editor value={description} setValue={setDescription} />
            </div>
          </div>

          {/* BUTTONS */}
          <div className="flex justify-end gap-4">

            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 rounded-lg bg-purple-700 text-white hover:bg-purple-800 transition"
            >
              {loading ? "Publishing..." : "Publish"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
