import { useEffect } from 'react';

/**
 * AboutModal Component
 * Provides responsive modal views for 'About' and 'Contact'
 */
export default function AboutModal({ type = 'about', onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="relative w-full max-w-lg bg-slate-900 light:bg-white border border-slate-700/80 light:border-slate-300 rounded-3xl shadow-2xl p-5 sm:p-8 animate-fade-in max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 sm:top-5 right-4 sm:right-5 p-2 rounded-xl text-slate-400 hover:text-white light:hover:text-slate-900 hover:bg-slate-800 light:hover:bg-slate-100 transition-colors"
          aria-label="Close modal"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {type === 'about' ? (
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center mb-4">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white light:text-slate-900">About My React Blog</h3>
            <p className="text-xs sm:text-sm text-slate-300 light:text-slate-600 leading-relaxed">
              <strong>My React Blog</strong> is an advanced, fully mobile-responsive frontend web application built with React 19, Vite, and Tailwind CSS.
            </p>
            <div className="p-4 rounded-xl bg-slate-800/60 light:bg-slate-100 border border-slate-700/60 light:border-slate-300 text-xs text-slate-300 light:text-slate-700 space-y-2">
              <p className="font-semibold text-indigo-400 light:text-indigo-600">Advanced Features Included:</p>
              <ul className="list-disc list-inside space-y-1 text-slate-400 light:text-slate-600">
                <li>100% Mobile Responsive layout with touch interactions</li>
                <li>Dark / Light theme switcher with automatic persistence</li>
                <li>Write &amp; Publish client-side articles with live card preview</li>
                <li>Bookmarks &amp; Saved reading list slide-over drawer</li>
                <li>Likes reaction counter with heart pop animations</li>
                <li>Text-to-Speech audio reader using browser speech synthesis</li>
                <li>Real-time comment discussion board on every post</li>
                <li>Reading progress bar &amp; font size customizer</li>
                <li>Multi-criteria sorting (Popular, Latest, Quick Reads, A-Z)</li>
                <li>Grid View vs List View layout toggling</li>
                <li>Zero backend server needed — all saved in localStorage!</li>
              </ul>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center mb-4">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white light:text-slate-900">Get In Touch</h3>
            <p className="text-xs sm:text-sm text-slate-300 light:text-slate-600 leading-relaxed">
              Have questions, feedback, or would like to contribute an article? Connect with our developer team.
            </p>
            <div className="p-4 rounded-xl bg-slate-800/60 light:bg-slate-100 border border-slate-700/60 light:border-slate-300 text-xs text-slate-300 light:text-slate-700 space-y-2">
              <p><strong>GitHub:</strong> <span className="text-indigo-400">github.com/my-react-blog</span></p>
              <p><strong>Email:</strong> <span className="text-indigo-400">contact@reactblogui.dev</span></p>
              <p><strong>Location:</strong> Built with ❤️ for frontend developers worldwide</p>
            </div>
          </div>
        )}

        <div className="mt-6 pt-4 border-t border-slate-800 light:border-slate-200 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 light:bg-slate-200 hover:bg-slate-700 light:hover:bg-slate-300 text-white light:text-slate-900 text-xs sm:text-sm font-semibold transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
