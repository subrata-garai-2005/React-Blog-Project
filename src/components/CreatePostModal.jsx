import { useState, useEffect } from 'react';

const PRESET_IMAGES = [
  { label: 'React Code', url: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=800&auto=format&fit=crop' },
  { label: 'JavaScript', url: 'https://images.unsplash.com/photo-1579468118864-ddb9ea429e71?q=80&w=800&auto=format&fit=crop' },
  { label: 'Web Design', url: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=800&auto=format&fit=crop' },
  { label: 'AI & Tech', url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop' },
  { label: 'Dev Workspace', url: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=800&auto=format&fit=crop' },
];

/**
 * CreatePostModal Component
 * Allows users to write and publish client-side articles with live preview
 */
export default function CreatePostModal({ isOpen, onClose, onCreatePost, existingCategories = [] }) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [category, setCategory] = useState(existingCategories[0] || 'React');
  const [customCategory, setCustomCategory] = useState('');
  const [image, setImage] = useState(PRESET_IMAGES[0].url);
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [activeTab, setActiveTab] = useState('write'); // 'write' or 'preview'
  const [error, setError] = useState('');

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Please provide an article title.');
      return;
    }
    if (!author.trim()) {
      setError('Please provide an author name.');
      return;
    }
    if (!excerpt.trim()) {
      setError('Please write a short excerpt.');
      return;
    }
    if (!content.trim()) {
      setError('Please write article content.');
      return;
    }

    const finalCategory = category === 'Custom' ? (customCategory.trim() || 'General') : category;
    
    // Format today's date
    const today = new Date();
    const dateFormatted = today.toLocaleDateString('en-US', {
      month: 'long',
      day: '2-digit',
      year: 'numeric',
    });

    const newPost = {
      id: Date.now(),
      title: title.trim(),
      author: author.trim(),
      date: dateFormatted,
      category: finalCategory,
      image: image.trim() || PRESET_IMAGES[0].url,
      excerpt: excerpt.trim(),
      content: content.trim(),
      isCustom: true, // flag indicating user-created post
    };

    onCreatePost(newPost);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="relative w-full max-w-3xl bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden my-6 max-h-[92vh] flex flex-col animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-slate-800 bg-slate-900/90 backdrop-blur sticky top-0 z-10">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-600/20 text-indigo-400 flex items-center justify-center font-bold">
              ✍️
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white leading-tight">
                Write New Article
              </h3>
              <p className="text-xs text-slate-400">Save and preview locally in your browser</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Mobile Tab Switcher */}
            <div className="flex rounded-lg bg-slate-800 p-0.5 border border-slate-700">
              <button
                type="button"
                onClick={() => setActiveTab('write')}
                className={`px-3 py-1 rounded-md text-xs font-semibold transition-colors ${
                  activeTab === 'write' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
                }`}
              >
                Write
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('preview')}
                className={`px-3 py-1 rounded-md text-xs font-semibold transition-colors ${
                  activeTab === 'preview' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
                }`}
              >
                Preview
              </button>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              aria-label="Close modal"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="overflow-y-auto p-4 sm:p-6 flex-1">
          {error && (
            <div className="mb-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-xs sm:text-sm text-rose-400 flex items-center gap-2">
              <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <span>{error}</span>
            </div>
          )}

          {activeTab === 'write' ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Title */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                  Article Title *
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                    setError('');
                  }}
                  placeholder="e.g. Building Next-Gen Web UIs with React and Tailwind"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800/80 text-white placeholder-slate-500 border border-slate-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 text-sm outline-none transition-colors"
                />
              </div>

              {/* Author & Category Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                    Author Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    placeholder="e.g. Jane Doe"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800/80 text-white placeholder-slate-500 border border-slate-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 text-sm outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                    Category *
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 text-white border border-slate-700 focus:border-indigo-500 text-sm outline-none"
                  >
                    {existingCategories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                    <option value="Custom">+ Custom Category</option>
                  </select>
                </div>
              </div>

              {category === 'Custom' && (
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                    Enter Custom Category
                  </label>
                  <input
                    type="text"
                    value={customCategory}
                    onChange={(e) => setCustomCategory(e.target.value)}
                    placeholder="e.g. DevOps, Mobile, Design"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800/80 text-white placeholder-slate-500 border border-slate-700 focus:border-indigo-500 text-sm outline-none"
                  />
                </div>
              )}

              {/* Cover Image & Presets */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
                    Cover Image URL
                  </label>
                  <span className="text-[11px] text-slate-400">Pick a preset or paste custom URL</span>
                </div>
                <input
                  type="url"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800/80 text-white placeholder-slate-500 border border-slate-700 focus:border-indigo-500 text-sm outline-none mb-2"
                />
                <div className="flex flex-wrap items-center gap-1.5">
                  {PRESET_IMAGES.map((preset) => (
                    <button
                      key={preset.label}
                      type="button"
                      onClick={() => setImage(preset.url)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-medium border transition-colors ${
                        image === preset.url
                          ? 'bg-indigo-600 text-white border-indigo-500 shadow-sm'
                          : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'
                      }`}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Excerpt */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                  Summary Excerpt *
                </label>
                <textarea
                  rows={2}
                  required
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  placeholder="A concise, punchy 1-2 sentence preview of the article..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800/80 text-white placeholder-slate-500 border border-slate-700 focus:border-indigo-500 text-sm outline-none resize-none"
                />
              </div>

              {/* Full Content */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                  Full Article Content (Markdown / Multi-paragraph) *
                </label>
                <textarea
                  rows={6}
                  required
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Write your article paragraphs here. Separate paragraphs with double newlines..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800/80 text-white placeholder-slate-500 border border-slate-700 focus:border-indigo-500 text-sm outline-none"
                />
              </div>
            </form>
          ) : (
            /* Live Preview Mode */
            <div className="space-y-4">
              <div className="p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-xs text-indigo-300">
                ✨ <strong>Live Card Preview:</strong> This is how your new article will appear in the feed.
              </div>
              <div className="max-w-md mx-auto rounded-2xl overflow-hidden bg-slate-800 border border-slate-700 shadow-xl">
                <div className="aspect-video w-full bg-slate-900 overflow-hidden relative">
                  <img
                    src={image || PRESET_IMAGES[0].url}
                    alt={title || 'Preview'}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-indigo-600/90 text-white text-xs font-bold uppercase">
                    {category === 'Custom' ? customCategory || 'General' : category}
                  </div>
                </div>
                <div className="p-5 space-y-2.5">
                  <div className="text-xs text-slate-400 flex items-center gap-2">
                    <span>Just now</span>
                    <span>•</span>
                    <span>3 min read</span>
                  </div>
                  <h4 className="text-lg font-bold text-white leading-snug">
                    {title || 'Your Article Title Goes Here'}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-300 line-clamp-2">
                    {excerpt || 'Your article summary excerpt will appear here...'}
                  </p>
                  <div className="pt-3 border-t border-slate-700 flex items-center justify-between text-xs text-slate-400">
                    <span className="font-medium text-slate-300">{author || 'Anonymous Author'}</span>
                    <span className="text-indigo-400 font-semibold">Read More →</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-4 sm:px-6 py-4 border-t border-slate-800 bg-slate-900/90 flex items-center justify-between">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs sm:text-sm font-medium text-slate-400 hover:text-white transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30 transition-all hover:scale-102 flex items-center gap-1.5"
          >
            <span>Publish Article</span>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
