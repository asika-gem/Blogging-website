import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { Menu, X, Plus, Search } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

const NavBar = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const { currentUser, logout } = useAuth();

  const handleSearch = (e) => {
    if (e.key === "Enter" && search.trim()) {
      navigate(`/posts?search=${search}`);
      setMenuOpen(false);
    }
  };

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
  };

  const linkStyle =
    "relative text-[16px] font-medium text-gray-700 hover:text-purple-600 transition";

  const underline =
    "after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-purple-600 after:transition-all hover:after:w-full";

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-purple-100 shadow-sm">
      {/* Top Navbar */}
      <div className="flex items-center justify-between px-4 md:px-8 py-3">
        {/* Logo */}
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="Blogify Logo" className="w-8 h-8" />
            <span className="font-bold text-xl text-purple-600">Blogify</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className={`${linkStyle} ${underline}`}>
              Home
            </Link>

            {currentUser && (
              <Link to="/dashboard" className={`${linkStyle} ${underline}`}>
                Dashboard
              </Link>
            )}
          </div>
        </div>

        {/* Desktop Search */}
        <div className="hidden md:flex flex-1 justify-center px-8">
          <div className="flex items-center bg-purple-50 border border-purple-100 px-4 py-2 rounded-full w-full max-w-md focus-within:bg-white focus-within:border-purple-400 transition">
            <Search size={18} className="text-purple-500" />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handleSearch}
              placeholder="Search posts..."
              className="bg-transparent outline-none text-sm ml-2 w-full"
            />
          </div>
        </div>

        {/* Desktop Right */}
        <div className="hidden md:flex items-center gap-6">
          {currentUser && (
            <Link
              to="/dashboard/createPost"
              className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-full hover:bg-purple-700 transition"
            >
              <Plus size={16} />
              Create
            </Link>
          )}

          {!currentUser ? (
            <>
              <Link to="/login" className={`${linkStyle} ${underline}`}>
                Login
              </Link>

              <Link
                to="/register"
                className="bg-purple-600 text-white px-4 py-2 rounded-full hover:bg-purple-700 transition"
              >
                Register
              </Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className={`${linkStyle} ${underline}`}
            >
              Logout
            </button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          menuOpen ? "max-h-[500px]" : "max-h-0"
        }`}
      >
        <div className="px-5 py-5 border-t bg-white space-y-5">
          <Link
            to="/"
            onClick={() => setMenuOpen(false)}
            className="block text-lg font-medium text-gray-700 hover:text-purple-600"
          >
            Home
          </Link>

          {currentUser && (
            <Link
              to="/dashboard"
              onClick={() => setMenuOpen(false)}
              className="block text-lg font-medium text-gray-700 hover:text-purple-600"
            >
              Dashboard
            </Link>
          )}

          {/* Mobile Search */}
          <div className="flex items-center bg-purple-50 border border-purple-200 rounded-full px-4 py-2">
            <Search size={18} className="text-purple-500" />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handleSearch}
              placeholder="Search posts..."
              className="bg-transparent outline-none ml-2 w-full"
            />
          </div>

          {currentUser && (
            <Link
              to="/dashboard/createPost"
              onClick={() => setMenuOpen(false)}
              className="flex items-center justify-center gap-2 bg-purple-600 text-white py-3 rounded-full hover:bg-purple-700 transition"
            >
              <Plus size={18} />
              Create
            </Link>
          )}

          {!currentUser ? (
            <>
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="block text-lg font-medium text-gray-700 hover:text-purple-600"
              >
                Login
              </Link>

              <Link
                to="/register"
                onClick={() => setMenuOpen(false)}
                className="block text-center bg-purple-600 text-white py-3 rounded-full hover:bg-purple-700 transition"
              >
                Register
              </Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="block w-full text-left text-lg font-medium text-gray-700 hover:text-purple-600"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default NavBar;
