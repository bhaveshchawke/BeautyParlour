export const SearchBar = ({ oncloseSerch }) => {
  return (
    // Fixed Full-screen Overlay with heavy Glassmorphism
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4 bg-black/60 backdrop-blur-md font-sans">
      {/* Main Floating Search Container (Dark Theme) */}
      <div className="w-full max-w-3xl bg-[#121212] rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden animate-fade-in-down border border-white/10 relative">
        {/* Decorative Top Glow (Subtle Pink) */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-10 bg-pink-600/20 blur-2xl pointer-events-none"></div>

        {/* ================= INPUT SECTION ================= */}
        <div className="flex items-center px-6 py-4 border-b border-white/10 relative z-10">
          {/* Search Icon (Pink for contrast) */}
          <svg
            className="w-6 h-6 text-pink-500 flex-shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>

          {/* Search Input (Dark Theme) */}
          <input
            type="text"
            placeholder="Search for premium services, cosmetics..."
            className="w-full px-4 py-3 text-lg font-light text-white bg-transparent outline-none placeholder-gray-500"
            autoFocus
          />

          {/* Close Button (X) */}
          <button
            onClick={oncloseSerch}
            type="button"
            className="p-2 text-gray-400 hover:text-pink-500 transition-colors rounded-full hover:bg-white/5 flex-shrink-0 cursor-pointer"
            title="Close Search"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* ================= SUGGESTIONS SECTION ================= */}
        <div className="p-6 bg-[#0a0a0a]/50 relative z-10">
          <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-4">
            Trending Searches
          </h4>

          <div className="flex flex-wrap gap-3">
            {/* Quick Link Pills (Dark Mode) */}
            {[
              "Hair Spa",
              "Bridal Makeup",
              "Matte Lipstick",
              "Vitamin C Serum",
              "L'Oréal Paris",
              "Nail Art",
            ].map((term, idx) => (
              <span
                key={idx}
                className="px-4 py-2 text-sm font-light text-gray-300 bg-white/5 border border-white/10 rounded-full cursor-pointer hover:border-pink-500 hover:bg-pink-500/10 hover:text-pink-400 transition-all shadow-sm"
              >
                {term}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
