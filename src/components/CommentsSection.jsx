import { useState } from 'react';

/**
 * CommentsSection Component
 * Client-side comment board per post with localStorage persistence
 */
export default function CommentsSection({ postId, comments = [], onAddComment, onDeleteComment }) {
  const [authorName, setAuthorName] = useState('');
  const [commentText, setCommentText] = useState('');
  const [error, setError] = useState('');

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!authorName.trim()) {
      setError('Please enter your name.');
      return;
    }
    if (!commentText.trim()) {
      setError('Please write a comment.');
      return;
    }

    const newComment = {
      id: Date.now(),
      postId,
      author: authorName.trim(),
      text: commentText.trim(),
      date: 'Just now',
    };

    onAddComment(postId, newComment);
    setCommentText('');
    setError('');
  };

  const postComments = comments.filter((c) => c.postId === postId);

  return (
    <div className="space-y-6 pt-6 border-t border-slate-800">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <span>Discussion &amp; Comments</span>
          <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
            {postComments.length}
          </span>
        </h3>
        <span className="text-xs text-slate-400">Live Client-Side Board</span>
      </div>

      {/* New Comment Input Form */}
      <form onSubmit={handleCommentSubmit} className="space-y-3 bg-slate-800/60 p-4 rounded-2xl border border-slate-700/60">
        {error && (
          <p className="text-xs text-rose-400">{error}</p>
        )}
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={authorName}
            onChange={(e) => {
              setAuthorName(e.target.value);
              setError('');
            }}
            placeholder="Your Name (e.g. Alex)"
            className="sm:w-1/3 px-3 py-2 rounded-xl bg-slate-900 text-white placeholder-slate-500 text-xs sm:text-sm border border-slate-700 focus:border-indigo-500 outline-none"
          />
          <input
            type="text"
            value={commentText}
            onChange={(e) => {
              setCommentText(e.target.value);
              setError('');
            }}
            placeholder="What are your thoughts on this article?"
            className="flex-1 px-3 py-2 rounded-xl bg-slate-900 text-white placeholder-slate-500 text-xs sm:text-sm border border-slate-700 focus:border-indigo-500 outline-none"
          />
          <button
            type="submit"
            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs sm:text-sm font-semibold transition-colors shrink-0 shadow-sm"
          >
            Post Comment
          </button>
        </div>
      </form>

      {/* Comment List */}
      <div className="space-y-3">
        {postComments.length === 0 ? (
          <p className="text-xs sm:text-sm text-slate-400 italic py-3 text-center bg-slate-900/40 rounded-xl border border-slate-800/60">
            No comments yet. Be the first to share your thoughts!
          </p>
        ) : (
          postComments.map((comment) => (
            <div
              key={comment.id}
              className="p-3.5 rounded-xl bg-slate-800/40 border border-slate-800 flex gap-3 items-start justify-between group"
            >
              <div className="flex gap-3 items-start min-w-0">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-cyan-500 flex items-center justify-center text-xs font-bold text-white shrink-0">
                  {comment.author.charAt(0).toUpperCase()}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs sm:text-sm font-semibold text-white truncate">
                      {comment.author}
                    </span>
                    <span className="text-[10px] text-slate-400">{comment.date}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 mt-1 break-words">
                    {comment.text}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => onDeleteComment(comment.id)}
                className="opacity-60 hover:opacity-100 p-1 text-slate-400 hover:text-rose-400 rounded-lg transition-all"
                title="Delete comment"
                aria-label="Delete comment"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
