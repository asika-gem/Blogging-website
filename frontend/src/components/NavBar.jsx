import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { Search } from "lucide-react";

const NavBar = () => {
  return (
    <nav className="w-full bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between px-4 sm:px-6 py-3 gap-3">
        {/* Left: Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="logo" className="w-8 h-8" />
          <span className="text-lg sm:text-xl font-bold text-white bg-purple-600 px-2 py-1 rounded-md">
            Blogify
          </span>
        </Link>

        {/* Middle: Links */}
        <div className="flex flex-wrap gap-3 sm:gap-6 text-gray-600 text-sm sm:text-base">
          <Link to="/" className="px-2 py-1 hover:text-purple-700">
            Home
          </Link>

          <Link to="/explore" className="px-2 py-1 hover:text-purple-700">
            Explore
          </Link>

          
        </div>

        {/* Search (wraps on small screens instead of hiding) */}
        <div className="flex items-center bg-gray-100 px-3 py-2 rounded-lg w-full sm:w-64 md:w-72">
          <Search size={18} className="text-gray-500" />
          <input
            type="text"
            placeholder="Search posts..."
            className="bg-transparent outline-none ml-2 w-full text-sm"
          />
        </div>

        {/* Right: Auth Buttons */}
        <div className="flex gap-2 sm:gap-3 ml-auto sm:ml-0">
          <Link
            to="/signin"
            className="px-3 sm:px-4 py-2 text-sm rounded-lg hover:bg-purple-100 text-gray-600"
          >
            Login
          </Link>

          <Link
            to="/signup"
            className="px-3 sm:px-4 py-2 text-sm bg-purple-600 text-white rounded-lg hover:bg-purple-700"
          >
            Register
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
