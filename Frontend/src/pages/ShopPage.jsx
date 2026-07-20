import { useEffect, useState } from "react";
import { ProductCard } from "../components/specific/ProductCard";
import { fetchAllProducts } from "../services/AdminService";
import { Loader } from "../components/common/Loader"; // Ensure path is correct

// Backend model ke anusar exact categories
const CATEGORIES = [
  "Hair Care",
  "Skin Care",
  "Makeup",
  "Tools & Appliances",
  "Other",
];

export const ShopPage = () => {
  // ─── States ──────────────────────────────────────────────────────────
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Search aur Category filters ke liye state
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]); // ✅ Naya state

  // ─── Fetch Products from API ───────────────────────────────────────
  useEffect(() => {
    const getProducts = async () => {
      try {
        setIsLoading(true);
        const response = await fetchAllProducts();
        console.log("Mera Data:", response);

        if (response && response.data) {
          // Sirf wahi products dikhao jo 'active' hain
          const activeProducts = response.data.filter(
            (product) => product.active === true,
          );
          setProducts(activeProducts);
        }
      } catch (error) {
        console.error("Failed to load products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    getProducts();
  }, []);

  // ─── Filter Logic ──────────────────────────────────────────────────
  // ✅ Checkbox check/uncheck handle karne ka function
  const handleCategoryChange = (category) => {
    setSelectedCategories(
      (prev) =>
        prev.includes(category)
          ? prev.filter((c) => c !== category) // Agar pehle se hai, toh hata do
          : [...prev, category], // Nahi hai, toh add kar do
    );
  };

  // ✅ Search aur Category dono ko ek sath apply karna
  const filteredProducts = products.filter((product) => {
    // 1. Search Query Match
    const matchesSearch = product.productName
      ?.toLowerCase()
      .includes(searchQuery.toLowerCase());

    // 2. Category Match (Agar koi category select nahi ki, toh sab dikhao)
    const matchesCategory =
      selectedCategories.length === 0 ||
      selectedCategories.includes(product.productCategory);

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="bg-stone-50 min-h-screen font-sans pb-24">
      {/* 1. Shop Banner (Dark Theme for Premium Feel) */}
      <section className="bg-slate-900 py-16 px-6 text-center relative overflow-hidden">
        {/* Subtle glow effect */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-rose-600/10 rounded-full blur-[80px] pointer-events-none" />

        <div className="max-w-3xl mx-auto relative z-10">
          <span className="text-rose-500 font-bold tracking-[0.3em] uppercase text-[10px] sm:text-xs block mb-3">
            Premium Cosmetics
          </span>
          <h1 className="text-4xl lg:text-5xl font-light text-white tracking-tight mb-4">
            Shop Our{" "}
            <span className="font-semibold text-rose-500">Collection</span>
          </h1>
          <p className="text-slate-400 font-light text-sm lg:text-base max-w-lg mx-auto">
            Discover carefully curated beauty products used and recommended by
            our expert stylists.
          </p>
        </div>
      </section>

      {/* 2. Main Shop Layout */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 mt-12 flex flex-col lg:flex-row gap-12">
        {/* ================= SIDEBAR (Filters & Search) ================= */}
        <aside className="w-full lg:w-1/4 flex flex-col gap-10">
          {/* Search Bar */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-widest mb-5 border-b border-slate-200 pb-3">
              Search Products
            </h3>
            <div className="relative">
              <input
                type="text"
                placeholder="Search by name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-xl py-3 pl-11 pr-4 text-sm font-medium text-slate-900 outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition-all shadow-sm"
              />
              {/* Search Icon */}
              <svg
                className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </div>
          </div>

          {/* ✅ Working Categories Filter */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-widest mb-5 border-b border-slate-200 pb-3">
              Categories
            </h3>
            <div className="flex flex-col gap-3">
              {CATEGORIES.map((category, idx) => (
                <label
                  key={idx}
                  className="flex items-center gap-3 cursor-pointer group"
                >
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(category)}
                    onChange={() => handleCategoryChange(category)}
                    className="w-4 h-4 accent-rose-500 cursor-pointer border-slate-300 rounded-sm"
                  />
                  <span
                    className={`text-sm transition-colors font-light ${
                      selectedCategories.includes(category)
                        ? "text-slate-900 font-medium"
                        : "text-slate-600 group-hover:text-slate-900"
                    }`}
                  >
                    {category}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </aside>

        {/* ================= MAIN CONTENT (Products) ================= */}
        <main className="w-full lg:w-3/4">
          {/* Toolbar: Results Count */}
          <div className="flex flex-col sm:flex-row justify-between items-center mb-8 pb-4 border-b border-slate-200 gap-4">
            <p className="text-sm text-slate-500 font-light">
              Showing{" "}
              <span className="font-medium text-slate-900">
                {filteredProducts.length}
              </span>{" "}
              results
            </p>
          </div>

          {/* Loading, Empty State, and Product Grid */}
          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <Loader inButton={false} />
              <span className="ml-3 text-slate-500">Loading products...</span>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-3xl border border-slate-100 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                No products found
              </h3>
              <p className="text-sm text-slate-500">
                {searchQuery || selectedCategories.length > 0
                  ? "No results found for your filters. Try clearing them."
                  : "We are currently restocking our premium collection."}
              </p>

              {/* Clear Filters Button (Dikhne me acha lagega agar koi filter match na ho) */}
              {(searchQuery || selectedCategories.length > 0) && (
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategories([]);
                  }}
                  className="mt-4 px-6 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-medium rounded-full transition-colors"
                >
                  Clear Filters
                </button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
              {filteredProducts.map((product) =>
                // ✅ Sirf tabhi ProductCard dikhega jab active true hoga, varna null return karega
                product.active ? (
                  <ProductCard key={product._id} product={product} />
                ) : null,
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
