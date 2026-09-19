
/**
 * Category color styling helper
 */
const categoryColors = {
  React: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30',
  JavaScript: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
  'Web Development': 'bg-blue-500/10 text-blue-400 border-blue-500/30',
  Programming: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
  Technology: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
};

/**
 * PostCard Component
 * Supports both Grid and List layouts with:
 * - Like reaction button & counter
 * - Bookmark button
 * - Share link action
 * - Delete action (for user created posts)
 * - Dynamic read time
 */
export default function PostCard({
  post,
  onReadMore,
  viewMode = 'grid',
  isBookmarked = false,
  onToggleBookmark,
  likesCount = 0,
  isLiked = false,
  onToggleLike,
  onShare,
  onDeletePost,
}) {
  const { id, title, author, date, category, image, excerpt, content = '', isCustom } = post;

  const badgeStyle = categoryColors[category] || 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30';

  // Calculate dynamic reading time based on 200 wpm
  const wordCount = (content || excerpt || '').split(/\s+/).filter(Boolean).length;
  const readTime = Math.max(1, Math.ceil(wordCount / 180));

  if (viewMode === 'list') {
    return (
      <article className="group flex flex-col sm:flex-row bg-slate-900/90 light:bg-white rounded-2xl overflow-hidden border border-slate-800/80 light:border-slate-200 shadow-md hover:shadow-xl hover:border-slate-700 light:hover:border-slate-400 transition-all duration-300">
        {/* List View Image */}
        <div className="relative sm:w-64 aspect-video sm:aspect-auto overflow-hidden bg-slate-800 shrink-0">
          <img
            src={image}
            alt={title}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
            onError={(e) => {
              e.target.src = 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800&auto=format&fit=crop';
            }}
          />
          <div className="absolute top-2.5 left-2.5">
            <span className={`inline-block px-2.5 py-0.5 rounded-lg text-[10px] font-bold uppercase tracking-wider border backdrop-blur-md ${badgeStyle}`}>
              {category}
            </span>
          </div>
        </div>

        {/* List View Details */}
        <div className="flex flex-col flex-1 p-4 sm:p-6 justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-400 mb-2">
              <time dateTime={date}>{date}</time>
              <span>•</span>
              <span>{readTime} min read</span>
              {isCustom && (
                <>
                  <span>•</span>
                  <span className="text-emerald-400 font-semibold text-[10px] bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
                    User Created
                  </span>
                </>
              )}
            </div>

            <h3
              onClick={() => onReadMore(post)}
              className="text-base sm:text-lg font-bold text-white light:text-slate-900 group-hover:text-indigo-400 transition-colors line-clamp-2 leading-snug mb-2 cursor-pointer"
            >
              {title}
            </h3>

            <p className="text-xs sm:text-sm text-slate-400 line-clamp-2 leading-relaxed mb-4">
              {excerpt}
            </p>
          </div>

          {/* List Card Footer Actions */}
          <div className="flex items-center justify-between pt-3 border-t border-slate-800/80 light:border-slate-200">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-xs font-bold text-white">
                {author.split(' ').map((n) => n[0]).join('')}
              </div>
              <span className="text-xs font-medium text-slate-300 light:text-slate-700 truncate max-w-[120px] sm:max-w-none">
                {author}
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              {/* Like Button */}
              <button
                type="button"
                onClick={() => onToggleLike(id)}
                className={`p-1.5 rounded-lg border text-xs flex items-center gap-1 transition-colors ${
                  isLiked
                    ? 'bg-rose-500/15 border-rose-500/30 text-rose-400'
                    : 'bg-slate-800/60 light:bg-slate-100 border-slate-700/60 light:border-slate-300 text-slate-400 hover:text-rose-400'
                }`}
                title="Like article"
                aria-label="Like article"
              >
                <svg className={`w-3.5 h-3.5 ${isLiked ? 'fill-rose-500' : ''}`} viewBox="0 0 24 24" fill={isLiked ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
                <span>{likesCount}</span>
              </button>

              {/* Bookmark Button */}
              <button
                type="button"
                onClick={() => onToggleBookmark(id)}
                className={`p-1.5 rounded-lg border text-xs transition-colors ${
                  isBookmarked
                    ? 'bg-amber-500/15 border-amber-500/30 text-amber-400'
                    : 'bg-slate-800/60 light:bg-slate-100 border-slate-700/60 light:border-slate-300 text-slate-400 hover:text-amber-400'
                }`}
                title="Bookmark article"
                aria-label="Bookmark article"
              >
                <svg className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-amber-400' : ''}`} viewBox="0 0 24 24" fill={isBookmarked ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
                  <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                </svg>
              </button>

              {/* Read More */}
              <button
                type="button"
                onClick={() => onReadMore(post)}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white transition-colors"
              >
                Read
              </button>
            </div>
          </div>
        </div>
      </article>
    );
  }

  // Grid View (Default)
  return (
    <article className="group flex flex-col bg-slate-900/90 light:bg-white rounded-3xl overflow-hidden border border-slate-800/80 light:border-slate-200 shadow-lg hover:shadow-2xl hover:border-indigo-500/40 hover:-translate-y-1.5 transition-all duration-300">
      {/* Blog Image Container */}
      <div className="relative aspect-video w-full overflow-hidden bg-slate-800">
        <img
          src={image}
          alt={title}
          loading="lazy"
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800&auto=format&fit=crop';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

        {/* Category Badge overlay */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5">
          <span className={`inline-block px-3 py-1 rounded-xl text-xs font-semibold uppercase tracking-wider border backdrop-blur-md ${badgeStyle}`}>
            {category}
          </span>
          {isCustom && (
            <span className="inline-block px-2 py-0.5 rounded-lg text-[10px] font-bold bg-emerald-500 text-slate-950">
              Custom
            </span>
          )}
        </div>

        {/* Top-Right Quick Actions */}
        <div className="absolute top-3 right-3 flex items-center gap-1.5">
          {/* Bookmark Action */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onToggleBookmark(id);
            }}
            className={`p-2 rounded-xl backdrop-blur-md transition-all ${
              isBookmarked
                ? 'bg-amber-500 text-slate-950 shadow-md scale-105'
                : 'bg-black/50 hover:bg-black/80 text-white'
            }`}
            title="Bookmark article"
            aria-label="Bookmark article"
          >
            <svg className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-current' : ''}`} viewBox="0 0 24 24" fill={isBookmarked ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2.2">
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
            </svg>
          </button>

          {/* Delete Action (only for user created posts) */}
          {isCustom && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onDeletePost(id);
              }}
              className="p-2 rounded-xl backdrop-blur-md bg-rose-500/80 hover:bg-rose-600 text-white transition-all shadow-md"
              title="Delete this custom post"
              aria-label="Delete custom post"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Card Content */}
      <div className="flex flex-col flex-1 p-5 sm:p-6">
        
        {/* Date & Reading time */}
        <div className="flex items-center gap-2 text-xs text-slate-400 mb-2.5">
          <time dateTime={date}>{date}</time>
          <span aria-hidden="true">•</span>
          <span>{readTime} min read</span>
        </div>

        {/* Title */}
        <h3
          onClick={() => onReadMore(post)}
          className="text-base sm:text-xl font-bold text-white light:text-slate-900 group-hover:text-indigo-400 transition-colors line-clamp-2 leading-snug mb-3 cursor-pointer"
        >
          {title}
        </h3>

        {/* Excerpt */}
        <p className="text-xs sm:text-sm text-slate-400 line-clamp-3 mb-5 leading-relaxed flex-1">
          {excerpt}
        </p>

        {/* Footer: Author, Likes, Share & Read More */}
        <div className="pt-4 border-t border-slate-800/80 light:border-slate-200 flex items-center justify-between gap-2 mt-auto">
          
          {/* Author info */}
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-xs font-bold text-white shrink-0 shadow-sm">
              {author.split(' ').map((n) => n[0]).join('')}
            </div>
            <span className="text-xs font-medium text-slate-300 light:text-slate-700 truncate max-w-[90px] sm:max-w-[120px]">
              {author}
            </span>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-1.5 shrink-0">
            {/* Like button */}
            <button
              type="button"
              onClick={() => onToggleLike(id)}
              className={`px-2 py-1.5 rounded-lg border text-xs flex items-center gap-1 transition-all ${
                isLiked
                  ? 'bg-rose-500/15 border-rose-500/30 text-rose-400'
                  : 'bg-slate-800/60 light:bg-slate-100 border-slate-700/60 light:border-slate-300 text-slate-400 hover:text-rose-400'
              }`}
              title="Like this article"
              aria-label="Like article"
            >
              <svg className={`w-3.5 h-3.5 ${isLiked ? 'fill-rose-500 animate-heart-pop' : ''}`} viewBox="0 0 24 24" fill={isLiked ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
              <span>{likesCount}</span>
            </button>

            {/* Share button */}
            <button
              type="button"
              onClick={() => onShare(post)}
              className="p-1.5 rounded-lg border border-slate-700/60 light:border-slate-300 bg-slate-800/60 light:bg-slate-100 text-slate-400 hover:text-white light:hover:text-slate-900 transition-colors"
              title="Copy article link"
              aria-label="Share article"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
            </button>

            {/* Read More Button */}
            <button
              type="button"
              onClick={() => onReadMore(post)}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold text-indigo-400 hover:text-white bg-indigo-500/10 hover:bg-indigo-600 border border-indigo-500/20 hover:border-transparent transition-all duration-200"
              aria-label={`Read more about ${title}`}
            >
              <span>Read</span>
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>

          </div>

        </div>

      </div>
    </article>
  );
}
