import React from 'react';

const HowItWorks = () => {
  return (
    <section className="py-20 md:py-28 px-6 md:px-16 bg-white border-t border-b border-gray-100" id="how">
      <div className="max-w-[1100px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        
        {/* Left Content (Steps) */}
        <div>
          <div className="text-sm font-medium tracking-wider uppercase text-indigo-500 mb-3 reveal">
            How it works
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 mb-8 reveal">
            From GitHub to <br /> hired — in 3 steps.
          </h2>

          <div className="flex flex-col">
            {/* Step 01 */}
            <div className="flex gap-6 py-7 border-b border-gray-100 reveal">
              <div className="w-9 h-9 rounded-xl bg-indigo-50/50 border border-indigo-500/30 flex items-center justify-center text-xs font-bold font-mono text-indigo-600 flex-shrink-0">
                01
              </div>
              <div>
                <div className="text-base font-semibold text-gray-900 mb-1.5">Connect your GitHub</div>
                <div className="text-sm font-light text-gray-600 leading-relaxed">
                  OAuth login in one click. We pull your public repositories,
                  commit history, and language data instantly.
                </div>
              </div>
            </div>

            {/* Step 02 */}
            <div className="flex gap-6 py-7 border-b border-gray-100 reveal">
              <div className="w-9 h-9 rounded-xl bg-indigo-50/50 border border-indigo-500/30 flex items-center justify-center text-xs font-bold font-mono text-indigo-600 flex-shrink-0">
                02
              </div>
              <div>
                <div className="text-base font-semibold text-gray-900 mb-1.5">Dashboard auto-generates</div>
                <div className="text-sm font-light text-gray-600 leading-relaxed">
                  Skills, heatmap, top projects, and AI recommendations are
                  calculated and rendered in seconds — zero manual input.
                </div>
              </div>
            </div>

            {/* Step 03 */}
            <div className="flex gap-6 py-7 reveal">
              <div className="w-9 h-9 rounded-xl bg-indigo-50/50 border border-indigo-500/30 flex items-center justify-center text-xs font-bold font-mono text-indigo-600 flex-shrink-0">
                03
              </div>
              <div>
                <div className="text-base font-semibold text-gray-900 mb-1.5">Share your profile link</div>
                <div className="text-sm font-light text-gray-600 leading-relaxed">
                  Send recruiters to devtrack.io/yourname. They see your live
                  stats, download your resume, and know exactly who they're
                  hiring.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Content (Code Visual) */}
<div className="relative reveal w-full max-w-xl mx-auto lg:max-w-none">
  <div className="bg-[#0D1117] border border-white/10 rounded-2xl overflow-hidden shadow-[0_40px_80px_rgba(0,0,0,0.35)]">
    {/* Window Titlebar */}
    <div className="flex items-center gap-1.5 px-4 py-3 border-b border-white/5 bg-white/[0.02]">
      <div className="w-2 h-2 rounded-full" style={{ background: "#FF5F57" }}></div>
      <div className="w-2 h-2 rounded-full" style={{ background: "#FEBC2E" }}></div>
      <div className="w-2 h-2 rounded-full" style={{ background: "#28C840" }}></div>
      <span className="font-mono text-[11px] text-gray-500 ml-2">githubService.js</span>
    </div>

    {/* Code Body */}
    <div className="p-6 font-mono text-xs text-gray-300 leading-relaxed whitespace-pre overflow-x-auto">
      <span className="text-[#8B949E]">// Fetch & analyze GitHub profile</span>{'\n'}
      <span className="text-[#FF7B72]">import</span> {'{ githubApi, skillEngine, geminiClient }'} <span className="text-[#FF7B72]">from</span> <span className="text-[#A5D6FF]">'./services'</span>;{'\n\n'}

      <span className="text-[#FF7B72]">export const</span> <span className="text-[#D2A8FF]">analyzeProfile</span> = <span className="text-[#FF7B72]">async</span> (<span className="text-[#FFA657]">username</span>) =&gt; {'{\n'}
      {'  '}<span className="text-[#FF7B72]">try</span> {'{\n'}
      {'    '}<span className="text-[#FF7B72]">const</span> repos = <span className="text-[#FF7B72]">await</span> githubApi.<span className="text-[#D2A8FF]">getRepos</span>(username);{'\n'}
      {'    '}<span className="text-[#FF7B72]">const</span> skills = skillEngine{'\n'}
      {'      '}.<span className="text-[#D2A8FF]">calculate</span>(repos){'\n'}
      {'      '}.<span className="text-[#D2A8FF]">sortByProficiency</span>();{'\n\n'}

      {'    '}<span className="text-[#FF7B72]">const</span> aiInsights = <span className="text-[#FF7B72]">await</span> geminiClient.<span className="text-[#D2A8FF]">suggest</span>(skills);{'\n\n'}

      {'    '}<span className="text-[#FF7B72]">return</span> {'{\n'}
      {'      '}reposCount: repos.<span className="text-[#79C0FF]">length</span>,{'\n'}
      {'      '}skills,{'\n'}
      {'      '}aiSuggestions: aiInsights,{'\n'}
      {'      '}updatedAt: <span className="text-[#FF7B72]">new</span> <span className="text-[#D2A8FF]">Date</span>(){'\n'}
      {'    '}{'};\n'}
      {'  '}{'}'} <span className="text-[#FF7B72]">catch</span> (error) {'{\n'}
      {'    '}console.<span className="text-[#D2A8FF]">error</span>(<span className="text-[#A5D6FF]">'Analysis failed:'</span>, error);{'\n'}
      {'  '}{'}'}{'\n'}
      {'};'}
    </div>
  </div>
</div>
   

      </div>
    </section>
  );
};

export default HowItWorks;