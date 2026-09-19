
/**
 * Filter Component
 * Fully mobile responsive with:
 * - Horizontal swipeable category pills
 * - Sorting dropdown (Latest, Most Liked, Quick Reads, A-Z)
 * - View mode switcher (Grid vs List)
 * - Saved articles toggle
 */
export default function Filter({
  categories,
  selectedCategory,
  onSelectCategory,
  categoryCounts = {},
  sortBy,
  onSortChange,
  viewMode,
  onViewModeChange,
  showSavedOnly,
  onToggleShowSavedOnly,
  savedCount = 0,
}) {
  return (
    <div className="w-full space-y-4">
      {/* Category Pills Bar (Horizontal scroll on mobile, wrap on desktop) */}
      <div className="relative">
        <div
          className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1.5 scroll-smooth"
          role="radiogroup"
          aria-label="Blog categories"
        >
          {/* 'All' button */}
          <button
            type="button"
            role="radio"
            aria-checked={selectedCategory === 'All' && !showSavedOnly}
            onClick={() => {
              if (showSavedOnly) onToggleShowSavedOnly();
              onSelectCategory('All');
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 flex items-center gap-1.5 shrink-0 select-none ${
              selectedCategory === 'All' && !showSavedOnly
                ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-md shadow-indigo-600/30 scale-102 ring-1 ring-indigo-400/50'
                : 'bg-slate-900/90 light:bg-slate-200 text-slate-300 light:text-slate-700 hover:text-white light:hover:text-slate-900 hover:bg-slate-800 border border-slate-800 light:border-slate-300'
            }`}
          >
            <span>All Topics</span>
            {categoryCounts['All'] !== undefined && (
              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-white/15 text-white">
                {categoryCounts['All']}
              </span>
            )}
          </button>

          {/* Saved Articles Toggle Pill */}
          <button
            type="button"
            onClick={onToggleShowSavedOnly}
            className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 flex items-center gap-1.5 shrink-0 select-none ${
              showSavedOnly
                ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/25 ring-1 ring-amber-300'
                : 'bg-slate-900/90 light:bg-slate-200 text-slate-300 light:text-slate-700 hover:text-amber-400 hover:bg-slate-800 border border-slate-800 light:border-slate-300'
            }`}
          >
            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
            </svg>
            <span>Saved</span>
            <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${showSavedOnly ? 'bg-slate-950/20 text-slate-950' : 'bg-slate-800 text-slate-400'}`}>
              {savedCount}
            </span>
          </button>

          {/* Dynamic Category buttons */}
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat && !showSavedOnly;
            const count = categoryCounts[cat] || 0;

            return (
              <button
                key={cat}
                type="button"
                role="radio"
                aria-checked={isSelected}
                onClick={() => {
                  if (showSavedOnly) onToggleShowSavedOnly();
                  onSelectCategory(cat);
                }}
                className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 flex items-center gap-1.5 shrink-0 select-none ${
                  isSelected
                    ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-md shadow-indigo-600/30 scale-102 ring-1 ring-indigo-400/50'
                    : 'bg-slate-900/90 light:bg-slate-200 text-slate-300 light:text-slate-700 hover:text-white light:hover:text-slate-900 hover:bg-slate-800 border border-slate-800 light:border-slate-300'
                }`}
              >
                <span>{cat}</span>
                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-white/10 text-white">
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Sorting & Layout Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
        {/* Sort selector */}
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <span>Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="px-2.5 py-1.5 rounded-xl bg-slate-900 light:bg-white text-white light:text-slate-900 text-xs font-semibold border border-slate-700 light:border-slate-300 focus:outline-none focus:border-indigo-500"
          >
            <option value="latest">Latest Published</option>
            <option value="oldest">Oldest First</option>
            <option value="popular">Most Liked (Popular)</option>
            <option value="quick">Quick Reads</option>
            <option value="az">Title (A - Z)</option>
          </select>
        </div>

        {/* View mode toggle (Grid vs List) */}
        <div className="flex items-center gap-1 rounded-xl bg-slate-900 light:bg-slate-200 p-1 border border-slate-800 light:border-slate-300">
          <button
            type="button"
            onClick={() => onViewModeChange('grid')}
            className={`p-1.5 rounded-lg text-xs transition-colors flex items-center gap-1 ${
              viewMode === 'grid'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
            title="Grid view"
            aria-label="Grid layout view"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
            <span className="hidden sm:inline text-[11px] font-medium">Grid</span>
          </button>
          <button
            type="button"
            onClick={() => onViewModeChange('list')}
            className={`p-1.5 rounded-lg text-xs transition-colors flex items-center gap-1 ${
              viewMode === 'list'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
            title="List view"
            aria-label="List layout view"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <span className="hidden sm:inline text-[11px] font-medium">List</span>
          </button>
        </div>
      </div>
    </div>
  );
}
