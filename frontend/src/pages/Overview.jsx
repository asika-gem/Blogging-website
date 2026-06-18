import { Link } from "react-router-dom";
import {
  Sparkles,
  Plus,
  BookOpen,
  Lightbulb,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

const Overview = () => {
  const today = new Date().toDateString();

  const steps = [
    {
      title: "Create your first post",
      desc: "Share your ideas with the world in minutes.",
      icon: Plus,
      link: "/dashboard/createPost",
      action: "Create Post",
    },
    {
      title: "Explore your posts",
      desc: "Manage, edit and organize your content.",
      icon: BookOpen,
      link: "/dashboard/my-posts",
      action: "View Posts",
    },
    {
      title: "Improve engagement",
      desc: "Write better titles and structure your content.",
      icon: Lightbulb,
      link: "/dashboard/createPost",
      action: "Learn Tips",
    },
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-purple-50 via-white to-purple-50 p-6 space-y-8">
      {/* HERO */}
      <div className="bg-white border border-purple-100 rounded-3xl p-8 shadow-sm">
        <div className="flex items-center gap-2 text-purple-600 mb-3">
          <Sparkles size={18} />
          <span className="font-medium">Welcome Dashboard</span>
        </div>

        <h1 className="text-3xl font-bold text-gray-900">
          Welcome to your workspace
        </h1>

        <p className="text-gray-500 mt-2">
          Today is <span className="font-medium">{today}</span>. Let’s build
          something meaningful step by step.
        </p>

        <div className="mt-6 flex gap-3 flex-wrap">
          <Link
            to="/dashboard/createPost"
            className="bg-purple-600 text-white px-5 py-3 rounded-xl flex items-center gap-2 hover:bg-purple-700"
          >
            <Plus size={18} />
            Start Writing
          </Link>
        </div>
      </div>

      {/* GUIDED STEPS */}
      <div className="grid md:grid-cols-3 gap-6">
        {steps.map((step, i) => {
          const Icon = step.icon;

          return (
            <div
              key={i}
              className="bg-white border border-purple-100 rounded-2xl p-6 hover:shadow-md transition"
            >
              <Icon className="text-purple-600" />

              <h2 className="text-lg font-semibold mt-3">{step.title}</h2>

              <p className="text-gray-500 text-sm mt-2">{step.desc}</p>

              <Link
                to={step.link}
                className="inline-flex items-center gap-1 mt-4 text-purple-600 font-medium"
              >
                {step.action}
                <ArrowRight size={16} />
              </Link>
            </div>
          );
        })}
      </div>

      {/* LEARNING PANEL */}
      <div className="bg-white border border-purple-100 rounded-3xl p-8">
        <div className="flex items-center gap-2 text-purple-600 mb-4">
          <Lightbulb size={18} />
          <span className="font-medium">Quick Tips</span>
        </div>

        <div className="space-y-3 text-gray-600">
          <p className="flex items-start gap-2">
            <CheckCircle2 className="text-green-500 mt-1" size={18} />
            Use clear titles to increase engagement
          </p>

          <p className="flex items-start gap-2">
            <CheckCircle2 className="text-green-500 mt-1" size={18} />
            Add images to make posts more attractive
          </p>

          <p className="flex items-start gap-2">
            <CheckCircle2 className="text-green-500 mt-1" size={18} />
            Write short paragraphs for better readability
          </p>
        </div>
      </div>

      {/* FOOTER WELCOME BANNER */}
      <div className="bg-purple-600 text-white rounded-3xl p-8 text-center">
        <h2 className="text-2xl font-bold">You are building something great</h2>

        <p className="mt-2 text-purple-100">
          Focus on writing, not complexity. Keep going step by step.
        </p>
      </div>
    </div>
  );
};

export default Overview;
