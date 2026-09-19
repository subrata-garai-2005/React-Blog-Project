import { useEffect } from 'react';

/**
 * BookmarksDrawer Component
 * Slide-over drawer showing user's saved/bookmarked articles
 */
export default function BookmarksDrawer({
  isOpen,
  onClose,
  bookmarkedPosts = [],
  onSelectPost,
  onRemoveBookmark,
}) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-slate-900 border-l border-slate-800 shadow-2xl flex flex-col animate-slide-in-right">
          {/* Header */}
          <div className="p-4 sm:p-6 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <svg className="w-5 h-5 fill-amber-400" viewBox="0 0 24 24">
                  <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                </svg>
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-white leading-tight">
                  Saved Articles
                </h3>
                <p className="text-xs text-slate-400">
                  {bookmarkedPosts.length} {bookmarkedPosts.length === 1 ? 'article' : 'articles'} in your reading list
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              aria-label="Close saved articles drawer"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* List Content */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
            {bookmarkedPosts.length === 0 ? (
              <div className="py-16 text-center">
                <div className="w-14 h-14 mx-auto mb-3 rounded-2xl bg-slate-800/80 border border-slate-700/60 flex items-center justify-center text-slate-400">
                  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                  </svg>
                </div>
                <h4 className="text-base font-semibold text-white mb-1">No saved articles yet</h4>
                <p className="text-xs text-slate-400 max-w-xs mx-auto">
                  Click the bookmark icon on any blog card or modal to save it for reading later!
                </p>
              </div>
            ) : (
              bookmarkedPosts.map((post) => (
                <div
                  key={post.id}
                  className="group relative flex gap-3 p-3 sm:p-4 rounded-2xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700/50 hover:border-indigo-500/30 transition-all duration-200"
                >
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl object-cover shrink-0 bg-slate-700"
                  />
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-indigo-400 tracking-wider">
                        {post.category}
                      </span>
                      <h4
                        onClick={() => {
                          onSelectPost(post);
                          onClose();
                        }}
                        className="text-xs sm:text-sm font-semibold text-white group-hover:text-indigo-300 transition-colors line-clamp-2 cursor-pointer mt-0.5 leading-snug"
                      >
                        {post.title}
                      </h4>
                    </div>

                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-700/40">
                      <span className="text-[10px] text-slate-400">{post.date}</span>
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => {
                            onSelectPost(post);
                            onClose();
                          }}
                          className="px-2.5 py-1 rounded-lg text-xs font-medium text-indigo-300 bg-indigo-500/15 hover:bg-indigo-500/25 transition-colors"
                        >
                          Read
                        </button>
                        <button
                          type="button"
                          onClick={() => onRemoveBookmark(post.id)}
                          className="p-1 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                          title="Remove bookmark"
                          aria-label="Remove bookmark"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {bookmarkedPosts.length > 0 && (
            <div className="p-4 border-t border-slate-800 bg-slate-900/90 flex justify-between items-center text-xs text-slate-400">
              <span>Saved locally in browser</span>
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-medium transition-colors"
              >
                Close
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
