import { useState } from "react";
import Navbar from "../../components/dashboard/Navbar";
import Sidebar from "../../components/dashboard/sidebar";
import ResumePreview from "../../components/resume/ResumePreview";
import ResumeControls from "../../components/resume/ResumeControls";

const Resume = () => {
  const [activeTemplate, setActiveTemplate] = useState("professional");

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#111625] flex text-slate-800 dark:text-gray-100 font-sans transition-colors duration-300">
      <Sidebar />
      <div className="flex-1 pl-64">
        <Navbar />
        <main className="p-8 pt-24 max-w-7xl mx-auto">
          <div className="grid grid-cols-[1fr_300px] gap-6 items-start">
            <ResumePreview activeTemplate={activeTemplate} />
            <ResumeControls
              activeTemplate={activeTemplate}
              setActiveTemplate={setActiveTemplate}
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Resume;