import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiRequest } from "../services/api";
import { AuthContext } from "../context/AuthContext";
import Footer from "../components/Footer";
import { User, Lock, Home, Eye, EyeOff } from "lucide-react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { updateUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    if (!username || !password) {
      setError("Username and password are required");
      setIsLoading(false);
      return;
    }

    try {
      const res = await apiRequest.post("/auth/login", {
        username,
        password,
      });

      const userData = {
        id: res.data.user.id,
        username: res.data.user.username,
        email: res.data.user.email,
        role: res.data.user.role,
      };

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(userData));
      updateUser(userData);

      // Role-based redirect
      if (res.data.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (error) {
      setError(error.response?.data?.message || "Something went wrong");
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-linear-to-r from-purple-100 via-pink-100 to-purple-200">
      {/* Header */}
      <div className="w-full text-center p-12">
        <h1 className="text-5xl font-bold text-purple-700 mb-6">
          Log in to Blogify
        </h1>
        <p className="text-2xl text-purple-600">
          Sign in to continue your journey and unlock all features.
        </p>
      </div>

      {/* Form */}
      <div className="grow flex items-center justify-center p-12">
        <div className="bg-white p-12 rounded-2xl shadow-xl w-full max-w-lg">
          <h2 className="text-4xl font-extrabold text-center text-purple-700 mb-8">
            Log In
          </h2>

          {error && (
            <div className="bg-purple-50 border border-purple-400 text-purple-700 px-6 py-4 rounded mb-6 text-lg text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username */}
            <div>
              <label className="block text-gray-700 mb-3 text-lg font-semibold">
                Username
              </label>
              <div className="flex items-center bg-purple-50 rounded-xl border focus-within:ring-2 focus-within:ring-purple-400 transition-all">
                <User className="ml-4 text-purple-500" size={24} />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username"
                  className="w-full px-4 py-4 text-lg bg-transparent focus:outline-none"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-gray-700 mb-3 text-lg font-semibold">
                Password
              </label>
              <div className="flex items-center bg-purple-50 rounded-xl border focus-within:ring-2 focus-within:ring-purple-400 transition-all">
                <Lock className="ml-4 text-purple-500" size={24} />

                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full px-4 py-4 text-lg bg-transparent focus:outline-none"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="mr-4"
                >
                  {showPassword ? (
                    <EyeOff className="text-purple-500" size={22} />
                  ) : (
                    <Eye className="text-purple-500" size={22} />
                  )}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full bg-purple-600 hover:bg-purple-700 text-white py-4 rounded-xl text-xl font-bold transition ${
                isLoading
                  ? "opacity-70 cursor-not-allowed"
                  : "hover:scale-[1.02]"
              }`}
            >
              {isLoading ? "Loging in..." : "Log In"}
            </button>
          </form>

          {/* Links */}
          <p className="text-center text-lg text-gray-600 mt-8">
            Don’t have an account?{" "}
            <Link
              to="/logup"
              className="text-purple-600 font-semibold hover:underline"
            >
              Log Up
            </Link>
          </p>

          <p className="text-center text-lg text-gray-600 mt-3 flex items-center justify-center gap-2">
            <Home size={20} className="text-purple-600" />
            <Link
              to="/"
              className="text-purple-600 font-semibold hover:underline"
            >
              Back to Home
            </Link>
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Login;
