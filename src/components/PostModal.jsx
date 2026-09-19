import { useState, useEffect, useRef } from 'react';
import CommentsSection from './CommentsSection';

/**
 * PostModal Component
 * Advanced reader modal featuring:
 * - Scroll-based reading progress bar
 * - Text-to-Speech (Audio Reader) with Play/Pause/Stop
 * - Font-size customizer (A- / A / A+)
 * - Likes & Bookmark interaction
 * - Comments Section integration
 * - Mobile responsive full-height layout
 */
export default function PostModal({
  post,
  onClose,
  isBookmarked = false,
  onToggleBookmark,
  likesCount = 0,
  isLiked = false,
  onToggleLike,
  onShare,
  comments = [],
  onAddComment,
  onDeleteComment,
}) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [fontSize, setFontSize] = useState('text-base'); // 'text-sm', 'text-base', 'text-lg'
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [isAudioPaused, setIsAudioPaused] = useState(false);
  const scrollRef = useRef(null);

  // Handle ESC key and prevent body scroll
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
      // Stop speech synthesis if modal closes
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [onClose]);

  // Track scroll depth for progress bar
  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
    const totalScroll = scrollHeight - clientHeight;
    if (totalScroll > 0) {
      setScrollProgress((scrollTop / totalScroll) * 100);
    }
  };

  // Text to speech controls
  const handleToggleAudio = () => {
    if (!('speechSynthesis' in window)) {
      alert('Text-to-speech is not supported in this browser.');
      return;
    }

    if (isPlayingAudio) {
      if (isAudioPaused) {
        window.speechSynthesis.resume();
        setIsAudioPaused(false);
      } else {
        window.speechSynthesis.pause();
        setIsAudioPaused(true);
      }
    } else {
      window.speechSynthesis.cancel();
      const textToRead = `${post.title}. Written by ${post.author}. ${post.content}`;
      const utterance = new SpeechSynthesisUtterance(textToRead);
      utterance.rate = 1.0;
      utterance.pitch = 1.0;

      utterance.onend = () => {
        setIsPlayingAudio(false);
        setIsAudioPaused(false);
      };

      utterance.onerror = () => {
        setIsPlayingAudio(false);
        setIsAudioPaused(false);
      };

      window.speechSynthesis.speak(utterance);
      setIsPlayingAudio(true);
      setIsAudioPaused(false);
    }
  };

  const handleStopAudio = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsPlayingAudio(false);
    setIsAudioPaused(false);
  };

  if (!post) return null;

  const { id, title, author, date, category, image, content = '' } = post;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto bg-slate-950/80 backdrop-blur-md animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-post-title"
    >
      {/* Modal Container */}
      <div
        className="relative w-full max-w-3xl bg-slate-900 light:bg-white border border-slate-700/80 light:border-slate-300 rounded-3xl shadow-2xl overflow-hidden my-4 max-h-[94vh] flex flex-col transition-all transform"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Dynamic Reading Progress Bar */}
        <div className="w-full bg-slate-800 light:bg-slate-200 h-1.5 shrink-0">
          <div
            className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-400 transition-all duration-150"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>

        {/* Modal Sticky Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 border-b border-slate-800 light:border-slate-200 bg-slate-900/95 light:bg-white/95 backdrop-blur sticky top-0 z-20">
          <div className="flex items-center gap-2 min-w-0">
            <span className="px-2.5 py-0.5 rounded-lg text-xs font-bold uppercase tracking-wider bg-indigo-500/10 text-indigo-400 border border-indigo-500/30 shrink-0">
              {category}
            </span>
            <span className="text-xs text-slate-400 hidden sm:inline">•</span>
            <span className="text-xs text-slate-400 hidden sm:inline truncate">{date}</span>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Font size controller */}
            <div className="hidden sm:flex items-center rounded-lg bg-slate-800 light:bg-slate-100 p-0.5 border border-slate-700 light:border-slate-300 text-xs">
              <button
                type="button"
                onClick={() => setFontSize('text-sm')}
                className={`px-2 py-0.5 rounded ${fontSize === 'text-sm' ? 'bg-indigo-600 text-white' : 'text-slate-400'}`}
                title="Small text"
              >
                A-
              </button>
              <button
                type="button"
                onClick={() => setFontSize('text-base')}
                className={`px-2 py-0.5 rounded ${fontSize === 'text-base' ? 'bg-indigo-600 text-white' : 'text-slate-400'}`}
                title="Default text"
              >
                A
              </button>
              <button
                type="button"
                onClick={() => setFontSize('text-lg')}
                className={`px-2 py-0.5 rounded ${fontSize === 'text-lg' ? 'bg-indigo-600 text-white' : 'text-slate-400'}`}
                title="Large text"
              >
                A+
              </button>
            </div>

            {/* Like button */}
            <button
              type="button"
              onClick={() => onToggleLike(id)}
              className={`p-2 rounded-xl border text-xs flex items-center gap-1 transition-colors ${
                isLiked
                  ? 'bg-rose-500/15 border-rose-500/30 text-rose-400'
                  : 'bg-slate-800 light:bg-slate-100 border-slate-700 light:border-slate-300 text-slate-400 hover:text-rose-400'
              }`}
              title="Like story"
            >
              <svg className={`w-4 h-4 ${isLiked ? 'fill-rose-500' : ''}`} viewBox="0 0 24 24" fill={isLiked ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
              <span>{likesCount}</span>
            </button>

            {/* Bookmark button */}
            <button
              type="button"
              onClick={() => onToggleBookmark(id)}
              className={`p-2 rounded-xl border text-xs transition-colors ${
                isBookmarked
                  ? 'bg-amber-500/15 border-amber-500/30 text-amber-400'
                  : 'bg-slate-800 light:bg-slate-100 border-slate-700 light:border-slate-300 text-slate-400 hover:text-amber-400'
              }`}
              title="Bookmark story"
            >
              <svg className={`w-4 h-4 ${isBookmarked ? 'fill-amber-400' : ''}`} viewBox="0 0 24 24" fill={isBookmarked ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
              </svg>
            </button>

            {/* Share button */}
            <button
              type="button"
              onClick={() => onShare(post)}
              className="p-2 rounded-xl border border-slate-700 light:border-slate-300 bg-slate-800 light:bg-slate-100 text-slate-400 hover:text-white transition-colors"
              title="Share article link"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
            </button>

            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white light:hover:text-slate-900 hover:bg-slate-800 light:hover:bg-slate-200 transition-colors"
              aria-label="Close modal"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Scrollable Modal Body */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="overflow-y-auto p-4 sm:p-6 md:p-8 space-y-6 flex-1"
        >
          {/* Post Image */}
          <div className="rounded-2xl overflow-hidden aspect-video w-full bg-slate-800 shadow-md relative">
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Audio Reader Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-3 sm:p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/20">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                </svg>
              </div>
              <div>
                <p className="text-xs sm:text-sm font-bold text-white light:text-slate-900 leading-tight">
                  Audio Narration (Text-to-Speech)
                </p>
                <p className="text-[11px] text-indigo-300 light:text-indigo-600">
                  {isPlayingAudio
                    ? isAudioPaused
                      ? 'Paused'
                      : 'Playing story...'
                    : 'Listen to this article read aloud'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleToggleAudio}
                className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white transition-colors flex items-center gap-1.5 shadow-sm"
              >
                {isPlayingAudio && !isAudioPaused ? (
                  <>
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                    </svg>
                    <span>Pause</span>
                  </>
                ) : (
                  <>
                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                    <span>{isAudioPaused ? 'Resume' : 'Listen Now'}</span>
                  </>
                )}
              </button>

              {isPlayingAudio && (
                <button
                  type="button"
                  onClick={handleStopAudio}
                  className="px-2.5 py-1.5 rounded-xl text-xs font-semibold bg-slate-800 text-slate-300 hover:text-white transition-colors"
                >
                  Stop
                </button>
              )}
            </div>
          </div>

          {/* Title */}
          <h2 id="modal-post-title" className="text-2xl sm:text-3xl font-extrabold text-white light:text-slate-900 leading-tight">
            {title}
          </h2>

          {/* Author info bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 py-3.5 border-y border-slate-800/80 light:border-slate-200 text-xs sm:text-sm text-slate-300 light:text-slate-600">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center font-bold text-white shadow-sm">
                {author.split(' ').map((n) => n[0]).join('')}
              </div>
              <div>
                <p className="font-semibold text-white light:text-slate-900 leading-none mb-1">{author}</p>
                <p className="text-[11px] text-slate-400">Technical Writer &amp; Frontend Engineer</p>
              </div>
            </div>
            <div className="text-right text-[11px] sm:text-xs text-slate-400">
              <p>Published on {date}</p>
              <p className="text-indigo-400 font-medium">Verified Article</p>
            </div>
          </div>

          {/* Full Content */}
          <div className={`space-y-4 ${fontSize} leading-relaxed text-slate-300 light:text-slate-700`}>
            {content.split('\n\n').map((paragraph, index) => (
              <p key={index} className="leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Callout box */}
          <div className="p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex gap-3 items-start">
            <svg className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-xs sm:text-sm text-indigo-200 light:text-indigo-800">
              Enjoyed this article? Leave a reaction, save it to your bookmarks, or share your thoughts in the comment board below!
            </p>
          </div>

          {/* Comments Section */}
          <CommentsSection
            postId={id}
            comments={comments}
            onAddComment={onAddComment}
            onDeleteComment={onDeleteComment}
          />
        </div>

        {/* Modal Footer */}
        <div className="px-4 sm:px-6 py-3.5 border-t border-slate-800 light:border-slate-200 bg-slate-900 light:bg-white flex items-center justify-between">
          <button
            type="button"
            onClick={() => onShare(post)}
            className="text-xs text-indigo-400 hover:underline flex items-center gap-1"
          >
            <span>🔗 Copy Share Link</span>
          </button>
          <button
            type="button"
            onClick={onClose}
            className="px-4 sm:px-5 py-2 rounded-xl bg-slate-800 light:bg-slate-200 hover:bg-slate-700 light:hover:bg-slate-300 text-white light:text-slate-900 text-xs sm:text-sm font-semibold transition-all duration-200"
          >
            ← Back to Articles
          </button>
        </div>
      </div>
    </div>
  );
}
