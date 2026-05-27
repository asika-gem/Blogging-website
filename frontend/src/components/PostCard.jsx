import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const PostCard = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5001/api/posts")
      .then((res) => res.json())
      .then((data) => {
        setPosts(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="w-full px-4 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 bg-purple-50">
        {Array(8)
          .fill(0)
          .map((_, i) => (
            <div
              key={i}
              className="h-64 bg-purple-100 animate-pulse rounded-xl"
            />
          ))}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-purple-50">
      {/* HEADER */}
      <div className="text-center py-10">
        <h1 className="text-4xl font-bold text-purple-900">🌿 Blog</h1>
        <p className="text-purple-600 mt-2">
          Explore stories, places and experiences
        </p>
      </div>

      {/* GRID */}
      <div className="w-full px-4 pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {posts.map((post) => (
            <Link
              key={post._id}
              to={`/dashboard/posts/${post._id}`}
              className="bg-white/90 backdrop-blur rounded-2xl shadow-md overflow-hidden 
                         hover:shadow-xl hover:-translate-y-1 transition duration-300"
            >
              {/* IMAGE */}
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-52 object-cover hover:scale-105 transition duration-500"
                onError={(e) => {
                  e.target.src =
                    "https://via.placeholder.com/400x200?text=Image+Not+Found";
                }}
              />
              

              {/* CONTENT */}
              <div className="p-5">
                <h2 className="text-xl font-bold text-purple-900">
                  {post.title}
                </h2>

                <div
                  className="text-sm text-gray-600 mt-2 line-clamp-3"
                  dangerouslySetInnerHTML={{ __html: post.description }}
                />

                {/* META */}
                <div className="flex justify-between items-center mt-4 text-sm text-purple-700">
                  <span>❤️ {post.likes || 0}</span>
                  <span>💬 {post.comments?.length || 0}</span>
                </div>

                <div className="mt-3 text-xs text-purple-400">
                  {post.date ? new Date(post.date).toLocaleDateString() : ""}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PostCard;
