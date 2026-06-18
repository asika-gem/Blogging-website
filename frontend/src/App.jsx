import { Routes, Route, Link, useLocation, Navigate } from "react-router-dom";
import ProtectedRoute from "./routes/ProctectedRoute";
import { useAuth } from "./context/AuthContext";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import CreatePost from "./pages/CreatePost";
import Dashboard from "./pages/DashBoard";
import EditPost from "./pages/EditPost";
import PostDetail from "./pages/PostDetail";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PostCard from "./components/PostCard";
import Overview from "./pages/Overview";
import Register from "./pages/Register";
import MyPosts from "./pages/MyPosts";
import About from "./components/AboutUs";
import Contact from "./components/ContactUs";

function App() {
  const location = useLocation();
  const { isLoggedIn } = useAuth();

  const hideLayout =
    location.pathname === "/login" ||
    location.pathname.startsWith("/dashboard");

  return (
    <>
      {/* TOAST */}

      <ToastContainer position="top-center" autoClose={3000} />

      <div>
        {/* NAVBAR */}
        {!hideLayout && <NavBar />}

        <Routes>
          {/* LOGIN */}
          <Route
            path="/login"
            element={isLoggedIn ? <Navigate to="/dashboard" /> : <Login />}
          />

          {/* SIGN UP */}
          <Route
            path="/register"
            element={isLoggedIn ? <Navigate to="/dashboard" /> : <Register />}
          />

          {/* HOME */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />

          {/* PUBLIC POSTS */}
          <Route path="/posts" element={<PostCard />} />
          <Route path="/posts/:id" element={<PostDetail />} />

          {/* DASHBOARD */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          >
            {/* Overview */}
            <Route index element={<Overview />} />

            {/* Protected Pages */}
            <Route path="createPost" element={<CreatePost />} />
            <Route path="posts/:id" element={<PostDetail />} />
            <Route path="posts" element={<PostCard />} />
            <Route path="my-posts" element={<MyPosts />} />
            <Route path="EditPost/:id" element={<EditPost />} />
          </Route>

          {/* 404 */}
          <Route
            path="*"
            element={
              <div className="min-h-screen flex flex-col justify-center items-center">
                <h1 className="text-7xl font-bold text-purple-600">404</h1>

                <h2 className="text-3xl mt-4">Page Not Found</h2>

                <Link
                  to="/"
                  className="mt-6 bg-purple-600 text-white px-6 py-3 rounded-lg"
                >
                  Go Back Home
                </Link>
              </div>
            }
          />
        </Routes>
        {/* FOOTER */}
        {!hideLayout && <Footer />}
      </div>
    </>
  );
}

export default App;
