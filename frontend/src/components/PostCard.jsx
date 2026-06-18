import { MessageSquare } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const PostCard = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Get search query from URL
  const location = useLocation();

  const query = new URLSearchParams(location.search);

  const search = query.get("search") || "";

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

  // Filter posts
  const filteredPosts = posts.filter((post) => {
    const title = post.title?.toLowerCase() || "";

    const description =
      post.description?.replace(/<[^>]*>/g, "").toLowerCase() || "";

    return (
      title.includes(search.toLowerCase()) ||
      description.includes(search.toLowerCase())
    );
  });

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

        {/* Search Text */}
        {search && (
          <p className="mt-3 text-sm text-gray-600">
            Showing results for:
            <span className="font-semibold"> {search}</span>
          </p>
        )}
      </div>

      {/* GRID */}
      <div className="w-full px-4 pb-10">
        {filteredPosts.length === 0 ? (
          <div className="text-center text-gray-500 text-lg">
            No posts found
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredPosts.map((post) => (
              <Link
                key={post._id}
                to={`/posts/${post._id}`}
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
                    dangerouslySetInnerHTML={{
                      __html: post.description,
                    }}
                  />

                  {/* META */}
                  <div className="flex justify-between items-center mt-4 text-sm text-purple-700">
                    <span>By {post.author?.username || "Unknown"}</span>
                    <div className="flex items-center gap-1">
                      <MessageSquare size={14} className="text-purple-700" />
                      <span> {post.comments?.length || 0}</span>
                    </div>
                  </div>

                  <div className="mt-3 text-xs text-purple-400">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PostCard;
