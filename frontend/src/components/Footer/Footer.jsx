
const Footer = () => {
  return (
    <footer class="bg-slate-900 text-slate-400 border-t border-slate-800 px-6 py-8 md:px-12 md:py-6">
  <div class="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
    
    <div class="flex items-center gap-3 font-semibold text-white tracking-wide">
      <div class="w-6 h-6 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-md flex items-center justify-center overflow-hidden">
        <img src="src/assets/logo.png" alt="DevTrack Logo" class="w-full h-full object-cover" />
      </div>
      <span>DevTrack</span>
    </div>

    <div class="text-sm text-center md:text-left order-3 md:order-none">
      &copy; 2026 DevTrack. Built for developers, by developers.
    </div>

    <div class="flex items-center gap-6 text-sm font-medium">
      <a href="#" class="hover:text-indigo-400 transition-colors duration-200">Privacy</a>
      <a href="#" class="hover:text-indigo-400 transition-colors duration-200">Terms</a>
      <a href="#" class="hover:text-indigo-400 transition-colors duration-200">GitHub</a>
    </div>

  </div>
</footer>
  )
}

export default Footer