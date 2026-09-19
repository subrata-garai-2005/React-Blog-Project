import { useEffect, useRef } from 'react';


export default function SearchBar({ searchTerm, onSearchChange, onClearSearch }) {
  const inputRef = useRef(null);
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === '/' && document.activeElement !== inputRef.current) {
        e.preventDefault();
        inputRef.current?.focus();
      } else if (e.key === 'Escape' && document.activeElement === inputRef.current) {
        onClearSearch();
        inputRef.current?.blur();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClearSearch]);

  return (
    <div className="w-full">
      <label htmlFor="blog-search-input" className="sr-only">
        Search blog posts
      </label>
      <div className="relative group">
        
        <div className="absolute inset-y-0 left-0 pl-3.5 sm:pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-400 transition-colors">
          <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

     
        <input
          ref={inputRef}
          id="blog-search-input"
          type="text"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search by title, topic, or author..."
          className="w-full pl-10 sm:pl-11 pr-14 sm:pr-16 py-2.5 sm:py-3.5 rounded-2xl bg-slate-900/90 light:bg-white text-white light:text-slate-900 placeholder-slate-400 text-xs sm:text-sm md:text-base border border-slate-800 light:border-slate-300 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 shadow-inner transition-all duration-200"
        />

        <div className="absolute inset-y-0 right-0 pr-3 flex items-center gap-1.5">
          {searchTerm ? (
            <button
              type="button"
              onClick={onClearSearch}
              className="text-slate-400 hover:text-white p-1 rounded-lg transition-colors"
              title="Clear search"
              aria-label="Clear search input"
            >
              <svg className="w-4 h-4 bg-slate-800 rounded-full p-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          ) : (
            <kbd className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-semibold text-slate-500 bg-slate-800 light:bg-slate-200 rounded border border-slate-700 light:border-slate-300">
              /
            </kbd>
          )}
        </div>

      </div>
    </div>
  );
}
