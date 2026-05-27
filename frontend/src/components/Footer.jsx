import { Link } from "react-router-dom";
import { Mail as MailIcon } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-purple-950 text-purple-200 mt-10">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h2 className="text-white text-lg font-semibold mb-3">Blogify</h2>
            <p className="text-sm text-purple-200/80">
              VidBlogify platform to share your ideas and connect with the
              world.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h2 className="text-white text-lg font-semibold mb-3">
              Quick Links
            </h2>
            <ul className="space-y-2 text-sm">
              {["Home", "Explore", "About", "Disclaimer"].map((item) => (
                <li key={item}>
                  <Link
                    to={`/${item.toLowerCase()}`}
                    className="hover:text-white transition"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h2 className="text-white text-lg font-semibold mb-3">
              Categories
            </h2>
            <ul className="space-y-2 text-sm">
              <li>Technology</li>
              <li>Lifestyle</li>
              <li>Travel</li>
              <li>Business</li>
            </ul>
          </div>

          {/* Legal + Contact */}
          <div>
            <h2 className="text-white text-lg font-semibold mb-3">Legal</h2>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/privacy-policy" className="hover:text-white">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-white">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white">
                  Contact Us
                </Link>
              </li>
            </ul>

            {/* Contact Icon */}
            <div className="flex gap-4 mt-4">
              <a href="mailto:support@blogify.com">
                <MailIcon className="hover:text-white transition" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-purple-800 mt-8 pt-4 text-center text-sm text-purple-300">
          © 2026 Blogify. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
