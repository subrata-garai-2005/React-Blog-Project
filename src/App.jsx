import { useState, useMemo, useEffect } from 'react';

// Hooks & LocalStorage
import { useLocalStorage } from './hooks/useLocalStorage';

// Components
import Header from './components/Header';
import Hero from './components/Hero';
import TrendingSpotlight from './components/TrendingSpotlight';
import SearchBar from './components/SearchBar';
import Filter from './components/Filter';
import PostList from './components/PostList';
import PostModal from './components/PostModal';
import CreatePostModal from './components/CreatePostModal';
import BookmarksDrawer from './components/BookmarksDrawer';
import AboutModal from './components/AboutModal';
import Footer from './components/Footer';
import Toast from './components/Toast';

// Initial local JSON blog data
import initialPosts from './data/posts.json';

// Seed sample comments for richness
const initialComments = [
  {
    id: 101,
    postId: 1,
    author: 'Elena',
    text: 'React 19 compiler optimizations are indeed game-changing. Great summary!',
    date: 'Yesterday',
  },
  {
    id: 102,
    postId: 1,
    author: 'DevKavya',
    text: 'Actions in React 19 make forms so much cleaner without manual pending state.',
    date: '2 days ago',
  },
  {
    id: 103,
    postId: 2,
    author: 'Samir',
    text: 'Array methods like .map and .filter are 90% of daily React work. Very clear explanation!',
    date: '3 days ago',
  },
];

// Seed initial like counts
const initialLikesMap = {
  1: 48,
  2: 35,
  3: 29,
  4: 19,
  5: 54,
  6: 22,
  7: 15,
  8: 31,
  9: 27,
  10: 40,
};

/**
 * Main App Component
 * Upgraded with:
 * - 100% Mobile Responsive Layout
 * - Dark / Light Theme Engine with LocalStorage sync
 * - Bookmarks / Saved Reading List Slide-over Drawer
 * - Likes system with Heart animations & Persistence
 * - Client-Side Create Article Modal with Live Card Preview
 * - Text-to-Speech Web Speech Narration in Post Reader
 * - Multi-criteria sorting & deep multi-field search
 * - Grid View vs List View layout toggling
 * - Interactive Commenting Board
 * - Toast notification feedback
 */
export default function App() {
  // --- PERSISTENT STATE VIA LOCALSTORAGE ---
  const [posts, setPosts] = useLocalStorage('blog_posts_v2', initialPosts);
  const [bookmarkedIds, setBookmarkedIds] = useLocalStorage('blog_bookmarks', [1, 5]);
  const [userLikedIds, setUserLikedIds] = useLocalStorage('blog_user_likes', [1]);
  const [likesMap, setLikesMap] = useLocalStorage('blog_likes_map', initialLikesMap);
  const [comments, setComments] = useLocalStorage('blog_comments', initialComments);
  const [theme, setTheme] = useLocalStorage('blog_theme', 'dark');

  // --- COMPONENT & FILTER STATE ---
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('latest');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [showSavedOnly, setShowSavedOnly] = useState(false);

  // --- MODAL & DRAWER TOGGLES ---
  const [selectedPost, setSelectedPost] = useState(null);
  const [isBookmarksOpen, setIsBookmarksOpen] = useState(false);
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);
  const [navModalType, setNavModalType] = useState(null); // 'about', 'contact', or null

  // --- TOAST NOTIFICATIONS ---
  const [toast, setToast] = useState(null); // { message, type }

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  // --- THEME SYNCHRONIZATION ---
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'light') {
      root.classList.add('light');
    } else {
      root.classList.remove('light');
    }
  }, [theme]);

  const handleToggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    showToast(`Switched to ${newTheme === 'dark' ? 'Dark' : 'Light'} Mode`, 'info');
  };

  // --- DYNAMIC DATA EXTRACTION ---
  const categories = useMemo(() => {
    const uniqueCats = new Set(posts.map((post) => post.category));
    return Array.from(uniqueCats);
  }, [posts]);

  // Compute category counts
  const categoryCounts = useMemo(() => {
    const counts = { All: posts.length };
    posts.forEach((post) => {
      counts[post.category] = (counts[post.category] || 0) + 1;
    });
    return counts;
  }, [posts]);

  // Total likes across all posts
  const totalLikes = useMemo(() => {
    return Object.values(likesMap).reduce((acc, count) => acc + count, 0);
  }, [likesMap]);

  // List of bookmarked post objects
  const bookmarkedPosts = useMemo(() => {
    return posts.filter((post) => bookmarkedIds.includes(post.id));
  }, [posts, bookmarkedIds]);

  // Trending spotlight post (highest likes)
  const spotlightPost = useMemo(() => {
    if (posts.length === 0) return null;
    let highestPost = posts[0];
    let highestLikes = likesMap[highestPost.id] || 0;
    for (const post of posts) {
      const likes = likesMap[post.id] || 0;
      if (likes > highestLikes) {
        highestLikes = likes;
        highestPost = post;
      }
    }
    return highestPost;
  }, [posts, likesMap]);

  // --- ADVANCED FILTERING & SORTING ---
  const processedPosts = useMemo(() => {
    let result = posts.filter((post) => {
      // 1. Saved articles toggle
      if (showSavedOnly && !bookmarkedIds.includes(post.id)) {
        return false;
      }

      // 2. Category matching
      if (selectedCategory !== 'All' && post.category !== selectedCategory) {
        return false;
      }

      // 3. Deep multi-field search (title, excerpt, content, author)
      const cleanSearch = searchTerm.trim().toLowerCase();
      if (cleanSearch !== '') {
        const matchesTitle = post.title?.toLowerCase().includes(cleanSearch);
        const matchesExcerpt = post.excerpt?.toLowerCase().includes(cleanSearch);
        const matchesAuthor = post.author?.toLowerCase().includes(cleanSearch);
        const matchesContent = post.content?.toLowerCase().includes(cleanSearch);
        const matchesCategory = post.category?.toLowerCase().includes(cleanSearch);
        return matchesTitle || matchesExcerpt || matchesAuthor || matchesContent || matchesCategory;
      }

      return true;
    });

    // 4. Sorting logic
    result = [...result].sort((a, b) => {
      if (sortBy === 'popular') {
        const likesA = likesMap[a.id] || 0;
        const likesB = likesMap[b.id] || 0;
        return likesB - likesA;
      }
      if (sortBy === 'oldest') {
        return a.id - b.id;
      }
      if (sortBy === 'quick') {
        const wordsA = (a.content || a.excerpt || '').split(/\s+/).length;
        const wordsB = (b.content || b.excerpt || '').split(/\s+/).length;
        return wordsA - wordsB;
      }
      if (sortBy === 'az') {
        return a.title.localeCompare(b.title);
      }
      // 'latest' by default
      return b.id - a.id;
    });

    return result;
  }, [posts, showSavedOnly, bookmarkedIds, selectedCategory, searchTerm, sortBy, likesMap]);

  // --- LIKE HANDLER ---
  const handleToggleLike = (postId) => {
    const isCurrentlyLiked = userLikedIds.includes(postId);
    const currentCount = likesMap[postId] || 0;

    if (isCurrentlyLiked) {
      setUserLikedIds(userLikedIds.filter((id) => id !== postId));
      setLikesMap({ ...likesMap, [postId]: Math.max(0, currentCount - 1) });
      showToast('Removed like', 'info');
    } else {
      setUserLikedIds([...userLikedIds, postId]);
      setLikesMap({ ...likesMap, [postId]: currentCount + 1 });
      showToast('Liked this article! ❤️', 'heart');
    }
  };

  // --- BOOKMARK HANDLER ---
  const handleToggleBookmark = (postId) => {
    const isBookmarked = bookmarkedIds.includes(postId);
    if (isBookmarked) {
      setBookmarkedIds(bookmarkedIds.filter((id) => id !== postId));
      showToast('Removed from bookmarks', 'info');
    } else {
      setBookmarkedIds([...bookmarkedIds, postId]);
      showToast('Saved to your reading list! 🔖', 'bookmark');
    }
  };

  // --- CREATE NEW ARTICLE ---
  const handleCreatePost = (newPost) => {
    setPosts([newPost, ...posts]);
    setLikesMap({ ...likesMap, [newPost.id]: 0 });
    showToast('Your new article has been published!', 'success');
  };

  // --- DELETE CUSTOM ARTICLE ---
  const handleDeletePost = (postId) => {
    setPosts(posts.filter((p) => p.id !== postId));
    setBookmarkedIds(bookmarkedIds.filter((id) => id !== postId));
    setUserLikedIds(userLikedIds.filter((id) => id !== postId));
    showToast('Article deleted successfully', 'info');
  };

  // --- RESET DEMO DATA ---
  const handleResetDemoData = () => {
    if (window.confirm('Reset all posts to default demo articles?')) {
      setPosts(initialPosts);
      setLikesMap(initialLikesMap);
      setBookmarkedIds([1, 5]);
      setUserLikedIds([1]);
      setComments(initialComments);
      setSelectedCategory('All');
      setShowSavedOnly(false);
      setSearchTerm('');
      showToast('Default demo articles restored!', 'success');
    }
  };

  // --- SHARE / COPY LINK ---
  const handleShare = async (post) => {
    try {
      const shareUrl = window.location.href.split('#')[0] + `#post-${post.id}`;
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(shareUrl);
        showToast('Link copied to clipboard!', 'success');
      } else {
        showToast(`Article link: ${post.title}`, 'info');
      }
    } catch {
      showToast('Link copied to clipboard!', 'success');
    }
  };

  // --- COMMENTS HANDLERS ---
  const handleAddComment = (postId, comment) => {
    setComments([comment, ...comments]);
    showToast('Your comment was posted!', 'success');
  };

  const handleDeleteComment = (commentId) => {
    setComments(comments.filter((c) => c.id !== commentId));
    showToast('Comment removed', 'info');
  };

  // --- NAVIGATION HANDLER ---
  const handleNavigate = (section) => {
    if (section === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (section === 'about' || section === 'contact') {
      setNavModalType(section);
    }
  };

  // Reset filters
  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('All');
    setShowSavedOnly(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 light:bg-slate-50 text-slate-100 light:text-slate-900 selection:bg-indigo-500 selection:text-white transition-colors duration-300">
      
      {/* 1. Navbar */}
      <Header
        onNavigate={handleNavigate}
        activeSection={navModalType || 'home'}
        bookmarkCount={bookmarkedIds.length}
        onOpenBookmarks={() => setIsBookmarksOpen(true)}
        onOpenCreatePost={() => setIsCreatePostOpen(true)}
        theme={theme}
        onToggleTheme={handleToggleTheme}
      />

      {/* 2. Hero Section with Live Stats */}
      <Hero
        totalPosts={posts.length}
        totalLikes={totalLikes}
        totalCategories={categories.length}
        onResetDemoData={handleResetDemoData}
      />

      {/* 3. Main Content Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        
        {/* Featured / Trending Spotlight Banner (When not filtering or searching) */}
        {!searchTerm && selectedCategory === 'All' && !showSavedOnly && spotlightPost && (
          <TrendingSpotlight
            post={spotlightPost}
            onReadMore={(post) => setSelectedPost(post)}
            isBookmarked={bookmarkedIds.includes(spotlightPost.id)}
            onToggleBookmark={handleToggleBookmark}
            likesCount={likesMap[spotlightPost.id] || 0}
            isLiked={userLikedIds.includes(spotlightPost.id)}
            onToggleLike={handleToggleLike}
          />
        )}

        {/* Controls Section: Search & Filter Toolbar */}
        <section aria-label="Search and Filter Controls" className="space-y-4 mb-6 sm:mb-8">
          
          <div className="flex flex-col md:flex-row gap-3 sm:gap-4 items-stretch md:items-center justify-between">
            {/* Real-time search bar with '/' keyboard shortcut */}
            <div className="w-full md:max-w-md">
              <SearchBar
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                onClearSearch={() => setSearchTerm('')}
              />
            </div>

            {/* Results Counter & Quick Reset */}
            <div className="text-xs sm:text-sm text-slate-400 font-medium flex items-center justify-between md:justify-end gap-2 shrink-0">
              <div className="flex items-center gap-1.5">
                <span>Showing</span>
                <span className="px-2 py-0.5 rounded-md bg-indigo-500/15 light:bg-indigo-100 text-indigo-400 light:text-indigo-700 font-bold border border-indigo-500/20">
                  {processedPosts.length}
                </span>
                <span>of {posts.length} articles</span>
              </div>
              {(searchTerm || selectedCategory !== 'All' || showSavedOnly) && (
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="text-xs text-indigo-400 hover:text-indigo-300 underline font-normal transition-colors"
                >
                  Reset all
                </button>
              )}
            </div>
          </div>

          {/* Dynamic Category Filter Pills & Sort Controls */}
          <Filter
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            categoryCounts={categoryCounts}
            sortBy={sortBy}
            onSortChange={setSortBy}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
            showSavedOnly={showSavedOnly}
            onToggleShowSavedOnly={() => setShowSavedOnly(!showSavedOnly)}
            savedCount={bookmarkedIds.length}
          />
        </section>

        {/* 4. Responsive Post Grid / List */}
        <section aria-label="Blog Articles Feed">
          <PostList
            posts={processedPosts}
            viewMode={viewMode}
            onReadMore={(post) => setSelectedPost(post)}
            onResetFilters={handleResetFilters}
            bookmarkedIds={bookmarkedIds}
            onToggleBookmark={handleToggleBookmark}
            likesMap={likesMap}
            userLikedIds={userLikedIds}
            onToggleLike={handleToggleLike}
            onShare={handleShare}
            onDeletePost={handleDeletePost}
          />
        </section>

      </main>

      {/* 5. Footer */}
      <Footer
        onNavigate={handleNavigate}
        onSubscribeNewsletter={(email) =>
          showToast(`Subscribed ${email}! Welcome to our newsletter.`, 'success')
        }
      />

      {/* 6. Post Reader Modal with Text-to-Speech & Comments */}
      {selectedPost && (
        <PostModal
          post={selectedPost}
          onClose={() => setSelectedPost(null)}
          isBookmarked={bookmarkedIds.includes(selectedPost.id)}
          onToggleBookmark={handleToggleBookmark}
          likesCount={likesMap[selectedPost.id] || 0}
          isLiked={userLikedIds.includes(selectedPost.id)}
          onToggleLike={handleToggleLike}
          onShare={handleShare}
          comments={comments}
          onAddComment={handleAddComment}
          onDeleteComment={handleDeleteComment}
        />
      )}

      {/* 7. Bookmarks / Saved Reading List Drawer */}
      <BookmarksDrawer
        isOpen={isBookmarksOpen}
        onClose={() => setIsBookmarksOpen(false)}
        bookmarkedPosts={bookmarkedPosts}
        onSelectPost={(post) => setSelectedPost(post)}
        onRemoveBookmark={handleToggleBookmark}
      />

      {/* 8. Write / Create Post Modal */}
      <CreatePostModal
        isOpen={isCreatePostOpen}
        onClose={() => setIsCreatePostOpen(false)}
        onCreatePost={handleCreatePost}
        existingCategories={categories}
      />

      {/* 9. About & Contact Modals */}
      {navModalType && (
        <AboutModal
          type={navModalType}
          onClose={() => setNavModalType(null)}
        />
      )}

      {/* 10. Floating Toast Notifications */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

    </div>
  );
}
