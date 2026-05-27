import { Outlet, Link, useLocation } from "react-router-dom";
import { Layout, FileText, Home, PlusCircle } from "lucide-react";

const Dashboard = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <div className="flex min-h-screen bg-purple-50">
      {/* SIDEBAR */}
      <div className="w-64 bg-white border-r border-purple-100">
        <div className="p-5 bg-purple-50 border-b border-purple-100">
          <h2 className="text-2xl font-bold text-purple-900">Dashboard</h2>
          <p className="text-sm text-purple-700">Manage your posts</p>
        </div>

        <nav className="p-4 flex flex-col gap-2">
          <Link
            to="/dashboard"
            className={`flex items-center gap-3 p-3 rounded-lg transition ${
              isActive("/dashboard/Overview")
                ? "bg-purple-100 text-purple-900 font-medium border border-purple-200"
                : "text-purple-700 hover:bg-purple-50"
            }`}
          >
            <Layout size={18} />
            Overview
          </Link>
          <Link
            to="/dashboard/createPost"
            className={`flex items-center gap-3 p-3 rounded-lg transition ${
              isActive("/dashboard/createPost")
                ? "bg-purple-100 text-purple-900 font-medium border border-purple-200"
                : "text-purple-700 hover:bg-purple-50"
            }`}
          >
            <PlusCircle size={18} />
            Create Post
          </Link>

          {/*  LIST PAGE (NOT SINGLE POST) */}
          <Link
            to="/dashboard/posts"
            className={`flex items-center gap-3 p-3 rounded-lg transition ${
              isActive("/dashboard/posts")
                ? "bg-purple-100 text-purple-900 font-medium border border-purple-200"
                : "text-purple-700 hover:bg-purple-50"
            }`}
          >
            <FileText size={18} />
            Posts
          </Link>

          <Link
            to="/"
            className="flex items-center gap-3 p-3 rounded-lg text-purple-700 hover:bg-purple-50 transition"
          >
            <Home size={18} />
            Back to Home
          </Link>
        </nav>
      </div>

      {/* CONTENT */}
      <div className="flex-1 p-6 bg-purple-50">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-purple-100">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
