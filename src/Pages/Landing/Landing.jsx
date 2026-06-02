import Navbar from "../../components/Navbar/Navbar";

const Landing = () => {
  return (
    <div>
      <Navbar />

      <section className="bg-gray-50 text-gray-900 min-h-screen flex flex-col items-center justify-center pt-20">
        <div className="mb-4 text-sm text-indigo-600 font-semibold">
          Now in public beta — 2,400+ developers
        </div>

        <h1 className="text-4xl md:text-6xl font-bold text-center mb-6">
          <span className="block">Showcase Your Developer Journey,</span>
          <span className="bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
            Auto-Magically.
          </span>
        </h1>

        <p className="max-w-2xl text-center text-lg text-gray-600 mb-8">
          Connect GitHub once. Get a live portfolio that tracks your skills,
          visualizes your growth, and impresses recruiters — automatically.
        </p>

        <div className="flex gap-4">
          <a
            href="#"
            className="flex items-center gap-2 px-6 py-3 bg-black text-white rounded-lg"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37..." />
            </svg>
            <span>Connect GitHub — it's free</span>
          </a>
          <button className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-100">
            Watch demo →
          </button>
        </div>

        <div className="flex gap-8 mt-12 text-center">
          <div>
            <div className="text-2xl font-bold">24K+</div>
            <div className="text-gray-500">Developers</div>
          </div>
          <div>
            <div className="text-2xl font-bold">98%</div>
            <div className="text-gray-500">Recruiter approval</div>
          </div>
          <div>
            <div className="text-2xl font-bold">3 min</div>
            <div className="text-gray-500">Setup time</div>
          </div>
        </div>
      </section>

      {/* Features Section */}

      <section className="px-16 py-30 border border-solid border-black">
        <div className="border border-solid border-black mb-[72px] text-center">
          <div className="flex justify-center text-sm font-medium tracking-wider uppercase text-indigo-500 ">Core Features</div>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl  ">
            Everthing a recruiter needs <br /> to say yes.
          </h2>
          <p className="mx-auto mt-4 max-wd-xl text-gray-600 ">
            Our platform provides everything you need to showcase your skills
            and stand out to recruiters.
          </p>
        </div>
        <div className=" border border-solid border-black mx-auto grid max-w-[1100px] grid-cols-1 gap-6 md:grid-cols-3">
          <div className=" border border-solid border-black group relative">
            <div className="feat-icon">
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.8"
              >
                <path
                  d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"
                  fill="currentColor"
                  stroke="none"
                />
              </svg>
            </div>
            <h3>Github Analytics</h3>
            <p>
              Get detailed insights into your GitHub activity and contributions.
            </p>
            <div className="featTags">
              <span className="featTag">commits</span>
              <span className="featTag">pull requests</span>
              <span className="featTag">issues</span>
              <span className="featTag">repos</span>
            </div>
          </div>
          <div className="feature-card">
            <div className="feat-icon">
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.8"
              >
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
              </svg>
            </div>
            <h3>Skill Tracking</h3>
            <p>
              Automatically track and visualize your skills growth over time.
            </p>
            <div className="featTags">
              <span className="featTag">Java </span>
              <span className="featTag">Python</span>
              <span className="featTag">JavaScript</span>
              <span className="featTag">React</span>
              <span className="featTag">Node.js</span>
              <span className="featTag">Docker</span>
              <span className="featTag">Kubernetes</span>
              <span className="featTag">AWS</span>
              <span className="featTag">Azure</span>
              <span className="featTag">GCP</span>
            </div>
          </div>
          <div className="feature-card">
            <div className="feat-icon">
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.8"
              >
                <path d="M12 2a10 10 0 1 0 10 10H12V2z" />
                <path d="M12 2a10 10 0 0 1 10 10" />
                <path d="M12 12l-4 4" />
                <circle cx="12" cy="12" r="1" />
              </svg>
            </div>
            <h3>AI Career Suggestions</h3>
            <p>
              Get personalized career advice based on your GitHub activity and
              skill growth.
            </p>
            <div className="featTags">
              <span className="featTag">Gemini AI</span>
              <span className="featTag">Skill gaps</span>
              <span className="featTag">Interview prep</span>
              <span className="featTag">Resume optimization</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
