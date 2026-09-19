
/**
 * Hero Component
 * Displays modern welcome banner with live stats chips, ambient glow, and quick reset
 */
export default function Hero({ totalPosts = 10, totalLikes = 0, totalCategories = 5, onResetDemoData }) {
  return (
    <section className="relative overflow-hidden py-10 sm:py-16 lg:py-20 border-b border-slate-800/60 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 light:from-slate-100 light:via-white light:to-white transition-colors">
      
      {/* Decorative ambient background glows */}
      <div 
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 sm:w-[540px] h-60 sm:h-80 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none animate-pulse-glow" 
        aria-hidden="true" 
      />
      <div 
        className="absolute top-1/3 left-1/4 w-60 h-60 bg-violet-600/10 rounded-full blur-3xl pointer-events-none" 
        aria-hidden="true" 
      />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Release / Category Badge */}
        <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-indigo-500/10 light:bg-indigo-100 border border-indigo-500/20 text-indigo-300 light:text-indigo-700 text-xs sm:text-sm font-medium mb-5 shadow-sm hover:border-indigo-500/40 transition-colors animate-fade-in">
          <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
          <span>Interactive React 19 Frontend Platform</span>
        </div>

        {/* Main Heading */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white light:text-slate-900 mb-4 sm:mb-6 leading-tight">
          Explore Ideas on{' '}
          <span className="bg-gradient-to-r from-indigo-400 via-violet-300 to-cyan-300 light:from-indigo-600 light:to-violet-600 bg-clip-text text-transparent">
            My React Blog
          </span>
        </h1>

        {/* Short Description */}
        <p className="max-w-2xl mx-auto text-sm sm:text-base lg:text-lg text-slate-300 light:text-slate-600 leading-relaxed font-normal mb-8 px-2">
          Discover hand-crafted tech articles, write your own stories, listen via text-to-speech, and bookmark favorites. Fully client-side with persistent storage.
        </p>

        {/* Quick Highlights / Live Stats Badges */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 text-xs sm:text-sm text-slate-300 light:text-slate-700">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/80 light:bg-slate-100 border border-slate-800 light:border-slate-300">
            <span className="font-bold text-indigo-400">{totalPosts}</span>
            <span>Articles</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/80 light:bg-slate-100 border border-slate-800 light:border-slate-300">
            <span className="font-bold text-rose-400">♥ {totalLikes}</span>
            <span>Likes</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/80 light:bg-slate-100 border border-slate-800 light:border-slate-300">
            <span className="font-bold text-cyan-400">{totalCategories}</span>
            <span>Topics</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/80 light:bg-slate-100 border border-slate-800 light:border-slate-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>100% Offline Ready</span>
          </div>
        </div>

        {/* Reset Demo Data link */}
        <div className="mt-4">
          <button
            type="button"
            onClick={onResetDemoData}
            className="text-[11px] sm:text-xs text-slate-500 hover:text-indigo-400 transition-colors underline"
          >
            ↻ Reset to original demo posts
          </button>
        </div>

      </div>
    </section>
  );
}
