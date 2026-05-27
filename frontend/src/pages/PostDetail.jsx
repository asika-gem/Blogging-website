import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { CalendarDays, User, ArrowLeft } from "lucide-react";
import axios from "axios";

const PostDetail = () => {
  const { id } = useParams();

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5001/api/posts/${id}`,
        );

        console.log(response.data);

        setPost(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

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

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 mb-6"
        >
          <ArrowLeft size={18} />
          Back
        </Link>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Image */}
          <img
            src={
              post.image?.startsWith("http")
                ? post.image
                : `http://localhost:5001/${post.image}`
            }
            alt={post.title}
            className="w-full h-64 md:h-96 object-contain bg-gray-100 "
          />
          {/* Content */}
          <div className="p-6 md:p-10">
            {/* Status */}
            <span
              className={`inline-block px-4 py-1 rounded-full text-sm font-semibold mb-4 ${
                post.status === "Published"
                  ? "bg-green-100 text-green-700"
                  : "bg-orange-100 text-orange-700"
              }`}
            >
              {post.status}
            </span>
            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              {post.title}
            </h1>
            {/* Meta */}
            <div className="flex flex-col sm:flex-row gap-4 text-gray-500 mb-8">
              <div className="flex items-center gap-2">
                <User size={18} />
                <span>{post.author}</span>
              </div>

              <div className="flex items-center gap-2">
                <CalendarDays size={18} />
                <span>{new Date(post.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
            {/* Description: RENDER HTML CONTENT */}
            <div
              className="text-gray-700 leading-8 text-lg"
              dangerouslySetInnerHTML={{ __html: post.description }}
            />
            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-10">
              <Link
                to={`/dashboard/EditPost/${post._id}`}
                className="bg-blue-600 hover:bg-blue-700 transition text-white px-6 py-3 rounded-lg"
              >
                Edit Post
              </Link>

              <button className="bg-red-600 hover:bg-red-700 transition text-white px-6 py-3 rounded-lg">
                Delete Post
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
