import { useMemo } from "react";

export default function TemplateProfessional({ user, githubProfile, repos }) {
  const isManoj = !!(user && (
    (user.firstName && user.firstName.toLowerCase().includes("manoj")) ||
    (user.lastName && user.lastName.toLowerCase().includes("katuwal"))
  ));

  const name = user ? `${user.firstName} ${user.lastName}` : (isManoj ? "MANOJ KATUWAL" : "Developer Name");
  const email = user?.email || (isManoj ? "katwalmanoj67@gmail.com" : "developer@example.com");
  const phone = user?.phone || (isManoj ? "+977-9804064003" : "+1-123-456-7890");
  const location = user?.location || (isManoj ? "Dharan, Nepal" : "City, Country");
  const github = user?.githubUsername || (isManoj ? "katwalmanoj67" : "github-username");
  const website = user?.website || (isManoj ? "https://manojkatuwal.com.np" : "https://yourportfolio.dev");

  const projectList = useMemo(() => {
    if (repos && repos.length > 0) {
      return repos.slice(0, 3).map((r) => ({
        name: r.name,
        date: r.created_at ? new Date(r.created_at).getFullYear().toString() : "2025",
        tech: r.language || "JavaScript",
        bullets: [
          r.description || "GitHub project repository.",
          "Designed and built responsive user interface components.",
          "Optimized application performance and structure.",
        ],
      }));
    }
    return isManoj ? [
      {
        name: "Travel Agency Admin Dashboard",
        date: "2025",
        tech: "React.js",
        bullets: [
          "Built an admin dashboard using React with routing for navigation.",
          "Designed an analytics dashboard with sidebar and summary cards.",
          "Structured project using a clean and scalable folder structure.",
        ],
      },
      {
        name: "MeroBazar — Full-Stack E-Commerce Platform",
        date: "2026 – Ongoing",
        tech: "MongoDB, Express.js, React.js, Node.js (MERN)",
        bullets: [
          "Developed a full-stack e-commerce platform using the MERN stack.",
          "Built a responsive frontend using React and implemented REST APIs.",
          "Implemented CRUD operations with MongoDB and working on authentication.",
        ],
      },
    ] : [
      {
        name: "DevTrack AI Developer Analytics",
        date: "2025",
        tech: "React.js, Node.js, Express, MySQL",
        bullets: [
          "Developed a full-stack developer analytics platform with GitHub integration.",
          "Built interactive charts and visualizations for repository activity.",
          "Designed clean and responsive user interface components.",
        ],
      },
      {
        name: "Full-Stack Web Application",
        date: "2026",
        tech: "React.js, Express.js, MongoDB",
        bullets: [
          "Built a responsive frontend and implemented RESTful APIs.",
          "Implemented secure authentication and CRUD database operations.",
          "Optimized application load times and performance.",
        ],
      },
    ];
  }, [repos, isManoj]);

  const primaryLanguages = useMemo(() => {
    if (githubProfile?.languages && Object.keys(githubProfile.languages).length > 0) {
      return Object.keys(githubProfile.languages).slice(0, 4).join(", ");
    }
    return isManoj ? "Java, Python, JavaScript" : "JavaScript, HTML/CSS, Node.js";
  }, [githubProfile, isManoj]);

  return (
    <div className="w-full bg-white text-slate-800 p-10 font-sans leading-relaxed text-left">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-[28px] font-bold text-[#1E3A8A] uppercase tracking-wide">
          {name}
        </h1>
        <div className="text-[12.5px] text-slate-700 mt-1.5 font-medium">
          {phone} | {email} | {location}
        </div>
        <div className="text-[12.5px] text-[#1E3A8A] font-semibold mt-1 flex justify-center gap-2">
          <a href={website} target="_blank" rel="noreferrer" className="underline hover:text-blue-800">Portfolio</a>
          <span>|</span>
          <a href={`https://github.com/${github}`} target="_blank" rel="noreferrer" className="underline hover:text-blue-800">GitHub</a>
        </div>
      </div>

      {/* Career Objective */}
      <div className="mb-5">
        <h2 className="text-[14px] font-bold text-[#1E3A8A] uppercase tracking-wider border-b border-[#1E3A8A] pb-0.5 mb-2">
          CAREER OBJECTIVE
        </h2>
        <p className="text-[13px] text-slate-700 text-justify leading-relaxed">
          {user?.bio || (isManoj 
            ? "I am Manoj Katuwal, a Computer Science student at Itahari International College. I am passionate about software development and enjoy working on projects like Gym Management Systems and Inventory Systems. I am currently developing my skills in Java, Python, and React, with a goal of becoming a full-stack developer"
            : "I am a passionate software developer dedicated to building efficient, scalable, and user-friendly web applications. Experienced in modern frontend and backend technologies, with a strong focus on clean code and continuous learning."
          )}
        </p>
      </div>

      {/* Education */}
      <div className="mb-5">
        <h2 className="text-[14px] font-bold text-[#1E3A8A] uppercase tracking-wider border-b border-[#1E3A8A] pb-0.5 mb-2">
          EDUCATION
        </h2>
        <div className="space-y-3">
          {isManoj ? (
            <>
              <div className="flex justify-between items-start text-[13px]">
                <div>
                  <div className="font-bold text-slate-800">BSc (Hons) Computing</div>
                  <div className="text-slate-650 italic">Itahari International College | Itahari, Nepal</div>
                </div>
                <div className="text-slate-600 italic font-medium">2023 – Present</div>
              </div>
              <div className="flex justify-between items-start text-[13px]">
                <div>
                  <div className="font-bold text-slate-800">Higher Secondary Education (Science)</div>
                  <div className="text-slate-650 italic">Aims Academy | Dharan, Nepal</div>
                </div>
                <div className="text-slate-600 italic font-medium">2020 – 2022</div>
              </div>
            </>
          ) : (
            <>
              <div className="flex justify-between items-start text-[13px]">
                <div>
                  <div className="font-bold text-slate-800">Bachelor of Science in Computer Science</div>
                  <div className="text-slate-600 italic">Your University Name | City, Country</div>
                </div>
                <div className="text-slate-600 italic font-medium">2023 – Present</div>
              </div>
              <div className="flex justify-between items-start text-[13px]">
                <div>
                  <div className="font-bold text-slate-800">High School Diploma</div>
                  <div className="text-slate-600 italic">Your High School | City, Country</div>
                </div>
                <div className="text-slate-600 italic font-medium">2020 – 2022</div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Projects */}
      <div className="mb-5">
        <h2 className="text-[14px] font-bold text-[#1E3A8A] uppercase tracking-wider border-b border-[#1E3A8A] pb-0.5 mb-2">
          PROJECTS
        </h2>
        <div className="space-y-4">
          {projectList.map((p, i) => (
            <div key={i} className="text-[13px]">
              <div className="flex justify-between items-baseline font-bold text-slate-800">
                <div>{p.name}</div>
                <div className="text-slate-600 italic font-medium">{p.date}</div>
              </div>
              <div className="text-slate-600 italic mb-1.5">Stack: {p.tech}</div>
              <ul className="list-disc pl-5 space-y-1 text-slate-700 text-justify">
                {p.bullets.map((bullet, idx) => (
                  <li key={idx} className="leading-relaxed">
                    {bullet}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Skills */}
      <div className="mb-5">
        <h2 className="text-[14px] font-bold text-[#1E3A8A] uppercase tracking-wider border-b border-[#1E3A8A] pb-0.5 mb-2">
          SKILLS
        </h2>
        <div className="space-y-3 text-[13px]">
          <div>
            <div className="font-bold text-[#1E3A8A] mb-1">Technical Skills</div>
            <div className="space-y-1 pl-1">
              <div><span className="font-semibold text-slate-800">Languages:</span> <span className="text-slate-700">{primaryLanguages}</span></div>
              <div><span className="font-semibold text-slate-800">Frontend:</span> <span className="text-slate-700">React.js, HTML5, CSS3</span></div>
              <div><span className="font-semibold text-slate-800">Backend:</span> <span className="text-slate-700">Node.js, Express.js, REST APIs</span></div>
              <div><span className="font-semibold text-slate-800">Database:</span> <span className="text-slate-700">MongoDB</span></div>
              <div><span className="font-semibold text-slate-800">Tools:</span> <span className="text-slate-700">Git, GitHub, IntelliJ IDEA, VS Code</span></div>
            </div>
          </div>
          <div>
            <div className="font-bold text-[#1E3A8A] mb-1">Soft Skills</div>
            <div className="text-slate-700 pl-1">
              Problem-Solving | Teamwork | Communication | Time Management
            </div>
          </div>
        </div>
      </div>

      {/* Languages */}
      <div className="mb-5">
        <h2 className="text-[14px] font-bold text-[#1E3A8A] uppercase tracking-wider border-b border-[#1E3A8A] pb-0.5 mb-2">
          LANGUAGES
        </h2>
        <div className="text-[13px] font-semibold text-slate-800">
          Nepali and Hindi <span className="font-normal text-slate-600">| English</span>
        </div>
      </div>

      {/* References */}
      <div>
        <h2 className="text-[14px] font-bold text-[#1E3A8A] uppercase tracking-wider border-b border-[#1E3A8A] pb-0.5 mb-2">
          REFERENCES
        </h2>
        <div className="text-[13px]">
          {isManoj ? (
            <>
              <div className="font-bold text-slate-800">Nishes Bishwas</div>
              <div className="text-slate-700">
                Lecturer, Itahari International College |{" "}
                <a href="mailto:nishwas.bishwas@iic.edu.np" className="underline text-blue-600 hover:text-blue-800">
                  nishwas.bishwas@iic.edu.np
                </a>
              </div>
            </>
          ) : (
            <>
              <div className="font-bold text-slate-800">Professional Reference</div>
              <div className="text-slate-700">
                Position, Company / Institution |{" "}
                <span className="text-slate-600">reference@example.com</span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}