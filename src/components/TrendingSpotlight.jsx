
/**
 * TrendingSpotlight Component
 * Highlighted featured or top-trending article banner with ambient gradient styling
 */
export default function TrendingSpotlight({
  post,
  onReadMore,
  isBookmarked,
  onToggleBookmark,
  likesCount,
  isLiked,
  onToggleLike,
}) {
  if (!post) return null;

  return (
    <section aria-label="Featured Story" className="mb-10">
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-indigo-950/80 via-slate-900/90 to-purple-950/80 border border-indigo-500/20 shadow-2xl p-4 sm:p-8">
        {/* Ambient glow in background */}
        <div
          className="absolute -top-12 -right-12 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none"
          aria-hidden="true"
        />

        <div className="relative flex flex-col lg:flex-row items-center gap-6 sm:gap-8">
          {/* Post Image with dynamic zoom */}
          <div className="w-full lg:w-1/2 aspect-video sm:aspect-[16/10] rounded-2xl overflow-hidden relative group shadow-lg bg-slate-800">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute top-3 left-3 flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-[11px] sm:text-xs font-bold uppercase tracking-wider bg-indigo-600 text-white shadow-md">
                ★ Editor&apos;s Choice
              </span>
              <span className="px-2.5 py-1 rounded-full text-[11px] sm:text-xs font-medium bg-black/60 backdrop-blur-md text-slate-200 border border-white/10">
                {post.category}
              </span>
            </div>
          </div>

          {/* Post Content */}
          <div className="w-full lg:w-1/2 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2.5 text-xs text-indigo-300 font-medium mb-2.5">
                <span>{post.date}</span>
                <span>•</span>
                <span>5 min read</span>
                <span>•</span>
                <span className="flex items-center gap-1 text-rose-400">
                  <svg className="w-3.5 h-3.5 fill-rose-400" viewBox="0 0 24 24">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                  {likesCount} likes
                </span>
              </div>

              <h2
                onClick={() => onReadMore(post)}
                className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white hover:text-indigo-300 transition-colors cursor-pointer leading-tight mb-3"
              >
                {post.title}
              </h2>

              <p className="text-sm sm:text-base text-slate-300 line-clamp-3 mb-6 leading-relaxed">
                {post.excerpt}
              </p>
            </div>

            {/* Bottom bar with author & actions */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-800/80">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-sm font-bold text-white shadow-md">
                  {post.author.split(' ').map((n) => n[0]).join('')}
                </div>
                <div>
                  <p className="text-sm font-semibold text-white leading-tight">{post.author}</p>
                  <p className="text-xs text-slate-400">Featured Author</p>
                </div>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                {/* Like Button */}
                <button
                  type="button"
                  onClick={() => onToggleLike(post.id)}
                  className={`p-2.5 rounded-xl border transition-all flex items-center gap-1.5 text-xs font-semibold ${
                    isLiked
                      ? 'bg-rose-500/15 border-rose-500/30 text-rose-400'
                      : 'bg-slate-800/70 border-slate-700/60 text-slate-300 hover:text-rose-400'
                  }`}
                  aria-label="Like article"
                >
                  <svg className={`w-4 h-4 ${isLiked ? 'fill-rose-500' : ''}`} viewBox="0 0 24 24" fill={isLiked ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                  <span>{likesCount}</span>
                </button>

                {/* Bookmark Button */}
                <button
                  type="button"
                  onClick={() => onToggleBookmark(post.id)}
                  className={`p-2.5 rounded-xl border transition-all ${
                    isBookmarked
                      ? 'bg-amber-500/15 border-amber-500/30 text-amber-400'
                      : 'bg-slate-800/70 border-slate-700/60 text-slate-300 hover:text-amber-400'
                  }`}
                  aria-label="Bookmark article"
                >
                  <svg className={`w-4 h-4 ${isBookmarked ? 'fill-amber-400' : ''}`} viewBox="0 0 24 24" fill={isBookmarked ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
                    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                  </svg>
                </button>

                {/* Read Full Story Button */}
                <button
                  type="button"
                  onClick={() => onReadMore(post)}
                  className="px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30 transition-all flex items-center gap-1.5"
                >
                  <span>Read Article</span>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
