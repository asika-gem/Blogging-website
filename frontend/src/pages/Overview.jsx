import { useEffect, useState } from "react";
import axios from "axios";
import { FileText, MessageCircle, Heart, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

const Overview = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://localhost:5001/api/posts");

        setPosts(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPosts();
  }, []);

  // TOTAL POSTS
  const totalPosts = posts.length;

  // TOTAL REACTIONS
  const totalReactions = posts.reduce(
    (acc, post) => acc + (post.reactions || 0),
    0,
  );

  // TOTAL COMMENTS
  const totalComments = posts.reduce(
    (acc, post) => acc + (post.comments?.length || 0),
    0,
  );

  // RECENT POSTS
  const recentPosts = posts.slice(0, 5);

  return (
    <div className="space-y-8">
      {/* PAGE HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-purple-900">
            Dashboard Overview
          </h1>

          <p className="text-purple-600 mt-1">
            Welcome back 👋 Manage your blog content easily.
          </p>
        </div>

        <Link
          to="/dashboard/createPost"
          className="bg-purple-600 hover:bg-purple-700 transition text-white px-5 py-3 rounded-xl font-medium w-fit"
        >
          + Create New Post
        </Link>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {/* TOTAL POSTS */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-purple-100 hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Total Posts</p>

              <h2 className="text-3xl font-bold text-gray-800">{totalPosts}</h2>
            </div>

            <div className="bg-purple-100 p-3 rounded-xl">
              <FileText className="text-purple-700" size={24} />
            </div>
          </div>
        </div>

        {/* REACTIONS */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-pink-100 hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Total Reactions</p>

              <h2 className="text-3xl font-bold text-gray-800">
                {totalReactions}
              </h2>
            </div>

            <div className="bg-pink-100 p-3 rounded-xl">
              <Heart className="text-pink-600" size={24} />
            </div>
          </div>
        </div>

        {/* COMMENTS */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-blue-100 hover:shadow-md transition">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">Total Comments</p>

              <h2 className="text-3xl font-bold text-gray-800">
                {totalComments}
              </h2>
            </div>

            <div className="bg-blue-100 p-3 rounded-xl">
              <MessageCircle className="text-blue-600" size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* RECENT POSTS */}
      <div className="bg-white rounded-2xl shadow-sm border border-purple-100 overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <TrendingUp className="text-purple-700" />

            <h2 className="text-2xl font-bold text-gray-800">Recent Posts</h2>
          </div>

          <Link
            to="/dashboard/posts"
            className="text-purple-600 hover:text-purple-700 font-medium"
          >
            View All
          </Link>
        </div>

        <div className="divide-y divide-gray-100">
          {recentPosts.map((post) => (
            <div key={post._id} className="p-5 hover:bg-purple-50 transition">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {post.title}
                  </h3>

                  <p className="text-sm text-gray-500 mt-1">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1 text-pink-600 text-sm">
                    <Heart size={16} />
                    {post.reactions || 0}
                  </div>

                  <div className="flex items-center gap-1 text-blue-600 text-sm">
                    <MessageCircle size={16} />
                    {post.comments?.length || 0}
                  </div>

                  <Link
                    to={`/dashboard/posts/${post._id}`}
                    className="bg-purple-600 hover:bg-purple-700 transition text-white px-4 py-2 rounded-lg text-sm"
                  >
                    View
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Overview;
