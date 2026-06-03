import { ProductCard } from "../components/specific/ProductCard";
export const ShopPage = () => {
  const products = [
    {
      id: 1,
      brand: "L'Oréal Paris",
      name: "Professional Hair Spa Mask",
      price: "₹749",
      image:
        "https://images.pexels.com/photos/2587370/pexels-photo-2587370.jpeg?auto=compress&cs=tinysrgb&w=600",
      isNew: false,
    },
    {
      id: 2,
      brand: "MAC Cosmetics",
      name: "Velvet Teddy Matte Lipstick",
      price: "₹1950",
      image:
        "https://images.pexels.com/photos/2533266/pexels-photo-2533266.jpeg?auto=compress&cs=tinysrgb&w=600",
      isNew: true,
    },
    {
      id: 3,
      brand: "Minimalist",
      name: "10% Vitamin C Face Serum",
      price: "₹699",
      image:
        "https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg?auto=compress&cs=tinysrgb&w=600",
      isNew: false,
    },
    {
      id: 4,
      brand: "Cetaphil",
      name: "Gentle Skin Cleanser",
      price: "₹333",
      image:
        "https://images.pexels.com/photos/3685530/pexels-photo-3685530.jpeg?auto=compress&cs=tinysrgb&w=600",
      isNew: false,
    },
    {
      id: 5,
      brand: "Estée Lauder",
      name: "Advanced Night Repair Serum",
      price: "₹5900",
      image:
        "https://images.pexels.com/photos/3685523/pexels-photo-3685523.jpeg?auto=compress&cs=tinysrgb&w=600",
      isNew: true,
    },
    {
      id: 6,
      brand: "Clinique",
      name: "Moisture Surge 100H Auto-Replenishing",
      price: "₹2950",
      image:
        "https://images.pexels.com/photos/2587329/pexels-photo-2587329.jpeg?auto=compress&cs=tinysrgb&w=600",
      isNew: false,
    },
  ];

  return (
    // बैकग्राउंड को एकदम वाइट रखने के बजाय हल्का सा स्टोन (Stone) टोन दिया है
    <div className="bg-stone-50 min-h-screen font-sans pb-24">
      {/* 1. Shop Banner (Dark Theme for Premium Feel) */}
      <section className="bg-[#0a0a0a] py-16 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <span className="text-pink-500 font-medium tracking-[0.3em] uppercase text-xs block mb-3">
            Premium Cosmetics
          </span>
          <h1 className="text-4xl lg:text-5xl font-light text-white tracking-tight mb-4">
            Shop Our <span className="font-semibold">Collection</span>
          </h1>
          <p className="text-gray-400 font-light text-sm lg:text-base">
            Discover carefully curated beauty products used and recommended by
            our expert stylists.
          </p>
        </div>
      </section>

      {/* 2. Main Shop Layout */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 mt-12 flex flex-col lg:flex-row gap-12">
        {/* ================= SIDEBAR (Filters) ================= */}
        {/* यहाँ आप अपने useState और onChange लॉजिक लगाएंगे */}
        <aside className="w-full lg:w-1/4 flex flex-col gap-10">
          {/* Categories Filter */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-widest mb-5 border-b border-gray-200 pb-3">
              Categories
            </h3>
            <div className="flex flex-col gap-3">
              {[
                "Skin Care",
                "Hair Care",
                "Makeup",
                "Fragrances",
                "Tools & Brushes",
              ].map((category, idx) => (
                <label
                  key={idx}
                  className="flex items-center gap-3 cursor-pointer group"
                >
                  <input
                    type="checkbox"
                    className="w-4 h-4 accent-pink-600 cursor-pointer border-gray-300 rounded-sm"
                    /* onChange={(e) => handleCategoryFilter(e)} */
                  />
                  <span className="text-sm text-gray-600 group-hover:text-black transition-colors font-light">
                    {category}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Brand Filter */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-widest mb-5 border-b border-gray-200 pb-3">
              Brands
            </h3>
            <div className="flex flex-col gap-3">
              {[
                "L'Oréal Paris",
                "MAC Cosmetics",
                "Minimalist",
                "Estée Lauder",
                "Clinique",
              ].map((brand, idx) => (
                <label
                  key={idx}
                  className="flex items-center gap-3 cursor-pointer group"
                >
                  <input
                    type="checkbox"
                    className="w-4 h-4 accent-pink-600 cursor-pointer border-gray-300 rounded-sm"
                  />
                  <span className="text-sm text-gray-600 group-hover:text-black transition-colors font-light">
                    {brand}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Price Range Filter (Minimalist Line) */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-widest mb-5 border-b border-gray-200 pb-3">
              Price Range
            </h3>
            <input
              type="range"
              min="0"
              max="10000"
              className="w-full accent-pink-600"
              /* onChange={(e) => setPriceRange(e.target.value)} */
            />
            <div className="flex justify-between text-xs text-gray-500 mt-2 font-light">
              <span>₹0</span>
              <span>₹10,000+</span>
            </div>
          </div>
        </aside>

        {/* ================= MAIN CONTENT (Products) ================= */}
        <main className="w-full lg:w-3/4">
          {/* Toolbar: Results Count & Sorting */}
          <div className="flex flex-col sm:flex-row justify-between items-center mb-8 pb-4 border-b border-gray-200 gap-4">
            <p className="text-sm text-gray-500 font-light">
              Showing{" "}
              <span className="font-medium text-black">{products.length}</span>{" "}
              results
            </p>

            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500 font-light">Sort by:</span>
              <select
                className="bg-transparent text-sm font-medium text-black border-none outline-none cursor-pointer p-1"
                /* onChange={(e) => handleSort(e.target.value)} */
              >
                <option value="newest">Newest Arrivals</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
            {products.map((product) => (
              <ProductCard product={product} />
            ))}
          </div>

          {/* Pagination (Static UI) */}
          <div className="mt-16 flex justify-center items-center gap-2">
            <button className="w-10 h-10 border border-gray-200 rounded-full flex items-center justify-center text-sm hover:bg-black hover:text-white transition-colors cursor-pointer">
              1
            </button>
            <button className="w-10 h-10 border border-gray-200 rounded-full flex items-center justify-center text-sm hover:bg-black hover:text-white transition-colors cursor-pointer">
              2
            </button>
            <button className="w-10 h-10 border border-transparent flex items-center justify-center text-sm text-gray-400">
              ...
            </button>
            <button className="w-10 h-10 border border-gray-200 rounded-full flex items-center justify-center text-sm hover:bg-black hover:text-white transition-colors cursor-pointer">
              →
            </button>
          </div>
        </main>
      </div>
    </div>
  );
};
