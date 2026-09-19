import PostCard from './PostCard';

/**
 * PostList Component
 * Renders list of articles in either Grid or List mode with full interaction support
 */
export default function PostList({
  posts,
  viewMode = 'grid',
  onReadMore,
  onResetFilters,
  bookmarkedIds = [],
  onToggleBookmark,
  likesMap = {},
  userLikedIds = [],
  onToggleLike,
  onShare,
  onDeletePost,
}) {
  // Empty State
  if (posts.length === 0) {
    return (
      <div className="py-12 sm:py-16 px-4 text-center bg-slate-900/60 light:bg-white rounded-3xl border border-slate-800/80 light:border-slate-200 my-8">
        <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-4 rounded-2xl bg-slate-800/80 light:bg-slate-100 flex items-center justify-center text-slate-400 border border-slate-700/60 light:border-slate-300">
          <svg className="w-7 h-7 sm:w-8 sm:h-8 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 className="text-lg sm:text-xl font-bold text-white light:text-slate-900 mb-2">No articles found</h3>
        <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto mb-6 px-2">
          We couldn&apos;t find any stories matching your current filters or search keywords.
        </p>
        <button
          type="button"
          onClick={onResetFilters}
          className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs sm:text-sm font-semibold shadow-lg shadow-indigo-600/30 transition-all duration-200"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          <span>Reset Search &amp; Filters</span>
        </button>
      </div>
    );
  }

  return (
    <div
      className={
        viewMode === 'list'
          ? 'flex flex-col gap-4 sm:gap-6 my-6 sm:my-8'
          : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 my-6 sm:my-8'
      }
    >
      {posts.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          viewMode={viewMode}
          onReadMore={onReadMore}
          isBookmarked={bookmarkedIds.includes(post.id)}
          onToggleBookmark={onToggleBookmark}
          likesCount={likesMap[post.id] || 0}
          isLiked={userLikedIds.includes(post.id)}
          onToggleLike={onToggleLike}
          onShare={onShare}
          onDeletePost={onDeletePost}
        />
      ))}
    </div>
  );
}
