import { Mail, Phone, MapPin, User } from "lucide-react";

function Contact() {
  return (
    <div className="min-h-screen bg-linear-to-b from-purple-100 via-purple-200 to-purple-300 flex items-center justify-center px-6 py-12">
      <div className="max-w-3xl w-full bg-white rounded-3xl shadow-xl p-8 md:p-12">
        <h1 className="text-4xl font-bold text-center text-purple-700 mb-4">
          Contact
        </h1>

        <p className="text-center text-gray-600 mb-10">
          Feel free to reach out for questions, feedback, collaboration, or
          internship opportunities.
        </p>

        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <User className="text-purple-600" />
            <span>Aashika Adhikari</span>
          </div>

          <div className="flex items-center gap-4">
            <Mail className="text-purple-600" />
            <a
              href="mailto:aashikaadhikari815@gmail.com"
              className="hover:text-purple-700"
            >
              aashikaadhikari815@gmail.com
            </a>
          </div>

          <div className="flex items-center gap-4">
            <Phone className="text-purple-600" />
            <a href="tel:+97798XXXXXXXX" className="hover:text-purple-700">
              +977-98XXXXXXXX
            </a>
          </div>

          <div className="flex items-center gap-4">
            <MapPin className="text-purple-600" />
            <span>Pokhara, Nepal</span>
          </div>
        </div>

        <div className="border-t mt-10 pt-8">
          <h2 className="text-lg font-semibold mb-6 text-center text-purple-700">
            Professional
          </h2>

          <div className="space-y-4 text-center">
            <a
              href="https://github.com/asika-gem"
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-700 hover:underline"
            >
              GitHub
            </a>

            <br />

            <a
              href="https://linkedin.com/in/aashika-adhikari815"
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-700 hover:underline"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
