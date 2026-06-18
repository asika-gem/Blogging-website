function About() {
  return (
    <div className="min-h-screen bg-linear-to-b from-purple-900 via-purple-800 to-purple-950 text-gray-100">
      <div className="max-w-5xl mx-auto px-6 py-16">
        {/* Header */}
        <h1 className="text-4xl md:text-5xl font-extrabold mb-8 text-center text-purple-200">
          About Us
        </h1>

        {/* Content */}
        <div className="space-y-6 text-lg leading-relaxed">
          <p>
            Welcome to{" "}
            <span className="font-semibold text-purple-300">Blogify</span> —
            your creative hub for sharing ideas, stories, and knowledge with the
            world.
          </p>
          <p>
            Built on the <span className="text-purple-400">MERN stack</span>,
            Blogify combines speed, scalability, and simplicity to give writers
            and readers a seamless experience. Whether you’re a seasoned blogger
            or just starting out, our platform is designed to empower your
            voice.
          </p>
          <p>
            Our mission is to foster a vibrant community of thinkers, creators,
            and storytellers. We believe in the power of words to inspire,
            inform, and connect people across the globe.
          </p>
        </div>

        {/* Responsive Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          <div className="bg-purple-700/40 rounded-xl p-6 shadow-lg hover:scale-105 transition">
            <h2 className="text-xl font-semibold text-purple-200 mb-3">
              Our Vision
            </h2>
            <p className="text-sm text-gray-300">
              To make blogging accessible, engaging, and impactful for everyone.
            </p>
          </div>
          <div className="bg-purple-700/40 rounded-xl p-6 shadow-lg hover:scale-105 transition">
            <h2 className="text-xl font-semibold text-purple-200 mb-3">
              Our Mission
            </h2>
            <p className="text-sm text-gray-300">
              Empower creators with tools to publish, connect, and grow their
              audience.
            </p>
          </div>
          <div className="bg-purple-700/40 rounded-xl p-6 shadow-lg hover:scale-105 transition">
            <h2 className="text-xl font-semibold text-purple-200 mb-3">
              Our Community
            </h2>
            <p className="text-sm text-gray-300">
              A global network of storytellers inspiring change through words.
            </p>
          </div>
        </div>

        {/* Footer */}
        <p className="mt-16 text-center text-sm text-gray-400">
          Thank you for being part of{" "}
          <span className="text-purple-300">Blogify</span>.
        </p>
      </div>
    </div>
  );
}

export default About;
