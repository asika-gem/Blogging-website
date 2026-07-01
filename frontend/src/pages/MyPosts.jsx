import { useEffect, useState } from "react";
import { apiRequest } from "../services/api";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const MyPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchMyPosts = async () => {
      try {
        const res = await apiRequest.get("/posts/user/me");
        setPosts(res.data);
      } catch (error) {
        console.log(error);
        toast.error("Failed to load posts");
      } finally {
        setLoading(false);
      }
    };

    fetchMyPosts();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-purple-500">
        Loading...
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* PROFILE HEADER */}
      <div className="flex items-center gap-6 bg-white p-6 rounded-2xl shadow-md border border-purple-100 mb-10">
        <div className="w-20 h-20 rounded-full bg-linear-to-br from-purple-500 to-purple-700 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
          {user?.username?.charAt(0).toUpperCase()}
        </div>

        <div>
          <h1 className="text-2xl font-bold text-purple-900">
            {user?.username}
          </h1>
          <p className="text-gray-500">{user?.email}</p>
          <p className="text-sm text-purple-600 capitalize font-medium">
            {user?.role}
          </p>
        </div>

        <div className="ml-auto text-right">
          <p className="text-2xl font-bold text-purple-700">{posts.length}</p>
          <p className="text-sm text-gray-500">Posts</p>
        </div>
      </div>

      {/* POSTS GRID */}
      {posts.length === 0 ? (
        <p className="text-center text-gray-500">No posts yet</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {posts.map((post) => (
            <div
              key={post._id}
              onClick={() => navigate(`/dashboard/posts/${post._id}`)}
              className="cursor-pointer bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition group"
            >
              {/* IMAGE */}

              {post.image && (
                <img
                  src={
                    post.image.startsWith("http")
                      ? post.image
                      : `${apiRequest.defaults.baseURL.replace("/api", "")}/${post.image}`
                  }
                  className="h-56 w-full object-cover group-hover:scale-105 transition duration-300"
                  alt="post"
                />
              )}

              {/* CONTENT */}
              <div className="p-3">
                <h2 className="font-semibold text-purple-900 truncate">
                  {post.title}
                </h2>
                <p className="text-xs text-gray-500">{post.category}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyPosts;
