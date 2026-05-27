import { Link, useNavigate } from "react-router-dom";
import PostCard from "../components/PostCard";
import { useAuth } from "../context/AuthContext";

const Home = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  const handleStartWriting = () => {
    if (isLoggedIn) {
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  };

  return (
    <div>
      {/* HERO */}
      <section className="px-10 py-16 flex flex-col md:flex-row items-center justify-between gap-10">
        <div className="max-w-xl">
          <h1 className="text-5xl font-bold leading-tight">
            Share Your Thoughts. Inspire the World.
          </h1>

          <p className="text-gray-500 mt-5">
            Your voice matters. Write, share and connect with readers around the
            globe.
          </p>

          <button
            onClick={handleStartWriting}
            className="mt-6 bg-purple-600 text-white px-6 py-3 rounded-lg"
          >
            Start Writing
          </button>
        </div>

        <img
          src="https://illustrations.popsy.co/purple/web-design.svg"
          alt="hero"
          className="w-100"
        />
      </section>

      {/* POSTS */}
      <section className="px-10 py-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-8">
          <h2 className="text-2xl md:text-3xl font-bold">Latest Posts</h2>

          <Link to="/explore" className="text-purple-600 font-medium">
            View all →
          </Link>
        </div>

        {/* POSTS COMPONENT */}
        <PostCard />
      </section>
    </div>
  );
};

export default Home;
