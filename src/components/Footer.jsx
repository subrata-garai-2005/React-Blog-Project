import { useState } from 'react';

/**
 * Footer Component
 * Responsive footer featuring brand summary, navigation, interactive newsletter form, and back-to-top action
 */
export default function Footer({ onNavigate, onSubscribeNewsletter }) {
  const [email, setEmail] = useState('');
  const currentYear = new Date().getFullYear();

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim() && email.includes('@')) {
      onSubscribeNewsletter(email.trim());
      setEmail('');
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-slate-950 light:bg-slate-100 border-t border-slate-800/80 light:border-slate-200 mt-auto py-10 sm:py-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          
          {/* Brand & Description */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-600 flex items-center justify-center text-white font-bold text-sm shadow-md">
                R
              </div>
              <span className="text-lg font-bold text-white light:text-slate-900 tracking-tight">
                My React Blog
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 light:text-slate-600 leading-relaxed">
              An advanced, fully mobile-responsive React 19 frontend blog application with client-side persistence and zero backend setup.
            </p>
          </div>

          {/* Quick Navigation Links */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200 light:text-slate-800 mb-3">
              Explore
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-400 light:text-slate-600">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('home')}
                  className="hover:text-indigo-400 transition-colors"
                >
                  Home &amp; All Stories
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('about')}
                  className="hover:text-indigo-400 transition-colors"
                >
                  About This Platform
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('contact')}
                  className="hover:text-indigo-400 transition-colors"
                >
                  Contact &amp; Feedback
                </button>
              </li>
            </ul>
          </div>

          {/* Platform Highlights */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200 light:text-slate-800 mb-3">
              Architecture
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-400 light:text-slate-600">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" />
                <span>React 19 &amp; Custom Hooks</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0" />
                <span>Tailwind CSS &amp; Dark/Light Mode</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                <span>LocalStorage Client-Side State</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                <span>Web Speech Audio Narration</span>
              </li>
            </ul>
          </div>

          {/* Newsletter Subscription */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200 light:text-slate-800 mb-2">
              Stay Updated
            </h4>
            <p className="text-xs text-slate-400 light:text-slate-600 mb-3">
              Subscribe to get the latest developer insights directly in your inbox.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="flex gap-1.5">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email..."
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 light:bg-white text-white light:text-slate-900 placeholder-slate-500 text-xs border border-slate-700 light:border-slate-300 focus:border-indigo-500 outline-none"
                />
                <button
                  type="submit"
                  className="px-3 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-colors shrink-0 shadow-sm"
                >
                  Join
                </button>
              </div>
            </form>
          </div>

        </div>

        {/* Bottom copyright line & Back to top */}
        <div className="pt-6 border-t border-slate-900 light:border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400 light:text-slate-600">
          <p>© {currentYear} My React Blog. Client-Side Engineering.</p>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={scrollToTop}
              className="text-xs text-indigo-400 hover:underline flex items-center gap-1 font-medium"
            >
              <span>↑ Back to top</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
