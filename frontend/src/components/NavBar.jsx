import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { Menu, X, Plus, Search  } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

const NavBar = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const { currentUser, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleSearch = (e) => {
    if (e.key === "Enter" && search.trim()) {
      navigate(`/posts?search=${search}`);
    }
  };

  const linkStyle =
    "relative text-[16px] font-medium text-gray-700 hover:text-purple-600 transition";

  const underline =
    "after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-purple-600 after:transition-all hover:after:w-full";

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-purple-100 shadow-sm">
      <div className="flex items-center px-4 md:px-8 py-3">
        {/* LEFT */}
        <div className="hidden md:flex items-center gap-10 shrink-0">
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} className="w-8 h-8" />
            <span className="font-bold text-xl text-purple-600">Blogify</span>
          </Link>

          <Link to="/" className={`${linkStyle} ${underline}`}>
            Home
          </Link>

          {currentUser && (
            <Link to="/dashboard" className={`${linkStyle} ${underline}`}>
              Dashboard
            </Link>
          )}
        </div>
        {/* Mobile menu button */}
     <button
     className="md:hidden"
     onClick={() => setMenuOpen(!menuOpen)}
   >
    {menuOpen ? <X size={24} /> : <Menu size={24} />}
  </button>

        {/* CENTER SEARCH */}
        <div className="hidden md:flex flex-1 justify-center">
          <div className="flex items-center bg-purple-50 border border-purple-100 px-4 py-2 rounded-full w-full max-w-md focus-within:bg-white focus-within:border-purple-400 transition">
            <Search size={16} className="text-purple-500" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handleSearch}
              placeholder="Search posts..."
              className="bg-transparent outline-none text-sm ml-2 w-full"
            />
          </div>
        </div>

        <div className="flex items-center gap-10 shrink-0">
          {/* CREATE */}
          {currentUser && (
            <Link
              to="/dashboard/createPost"
              className="flex items-center gap-1 bg-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-purple-700 transition"
            >
              <Plus size={16} />
              Create
            </Link>
          )}

          {/* AUTH */}
          {!currentUser ? (
            <>
              <Link className={`${linkStyle} ${underline}`} to="/login">
                Login
              </Link>

              <Link
                to="/register"
                className="text-sm bg-purple-600 text-white px-4 py-2 rounded-full hover:bg-purple-700 transition"
              >
                Register
              </Link>
            </>
          ) : (
            <button className={`${linkStyle} ${underline}`} onClick={logout}>
              Logout
            </button>
          )}
        </div>
      </div>     

      {menuOpen && (
        <div className="md:hidden border-t bg-white p-4 space-y-4">

          <Link to="/" onClick={() => setMenuOpen(false)}>
            Home
          </Link>

          {currentUser && (
            <Link
              to="/dashboard"
              onClick={() => setMenuOpen(false)}
            >
              Dashboard
            </Link>
          )}

          <div className="flex items-center bg-purple-50 border rounded-full px-3 py-2">
            <Search size={18} />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handleSearch}
              placeholder="Search..."
              className="bg-transparent outline-none ml-2 w-full"
            />
          </div>

          {currentUser && (
            <Link
              to="/dashboard/createPost"
              onClick={() => setMenuOpen(false)}
              className="flex justify-center bg-purple-600 text-white py-2 rounded-full"
            >
              Create
            </Link>
          )}

          {!currentUser ? (
            <>
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
              >
                Login
              </Link>

              <Link
                to="/register"
                onClick={() => setMenuOpen(false)}
                className="block bg-purple-600 text-white text-center py-2 rounded-full"
              >
                Register
              </Link>
            </>
          ) : (
            <button
              onClick={() => {
                logout();
                setMenuOpen(false);
              }}
            >
              Logout
            </button>
          )}
        </div>
      )}

    </header>
    
  );
};

export default NavBar;
