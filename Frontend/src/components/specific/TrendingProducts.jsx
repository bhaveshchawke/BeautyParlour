import { fetchAllProducts } from "../../services/AdminService";
import { useEffect, useState } from "react";
import { Link } from "react-router";
export const TrendingProducts = () => {
  //state for products_____________________________________
  const [productsData, setProductsData] = useState([]);
  //for fetching products_____________________________________
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products = await fetchAllProducts();
        if (!products || products.length === "0") {
          setProductsData([]);
        }
        setProductsData(products.data);
      } catch (error) {
        console.log(error);
        setProductsData([]);
      }
    };
    fetchProducts();
  }, []);
  const trendingProducts = productsData.slice(0, 5);
  return (
    <section className="bg-white font-sans py-20 lg:py-28 border-t border-gray-50">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-xs font-medium tracking-[0.2em] text-pink-600 uppercase mb-3 block">
              Shop The Look
            </span>
            <h2 className="text-3xl lg:text-4xl font-light text-gray-900 tracking-tight">
              Trending{" "}
              <span className="font-semibold text-black">Cosmetics</span>
            </h2>
          </div>

          {/* View All Store Button */}
          <Link
            to={"shop"}
            className="group flex items-center gap-2 text-sm font-medium text-gray-900 hover:text-pink-600 transition-colors pb-1 border-b border-gray-900 hover:border-pink-600 self-start md:self-end cursor-pointer"
          >
            Visit Full Store
            <span className="transform group-hover:translate-x-1 transition-transform duration-300">
              →
            </span>
          </Link>
        </div>

        {/* Product Grid (4 columns on Desktop) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
          {trendingProducts.map((product) => (
            <div
              key={product._id}
              className="group flex flex-col relative cursor-pointer"
            >
              {/* Product Image Container */}
              <div className="w-full aspect-[4/5] bg-gray-50 rounded-xl overflow-hidden relative mb-5">
                {/* Optional Badge (Like 'Best Seller') */}
                {product.badge && (
                  <div className="absolute top-3 left-3 bg-black text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-sm z-10">
                    {product.badge}
                  </div>
                )}

                <img
                  src={product.productImage}
                  alt={product.productName}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-in-out"
                />

                {/* Hover Add To Cart Overlay */}
                <div className="absolute inset-x-0 bottom-0 p-4 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 z-20">
                  <button className="w-full cursor-pointer bg-white/95 backdrop-blur-sm text-black text-sm font-medium py-3 rounded-lg shadow-lg hover:bg-black hover:text-white transition-colors duration-300">
                    Quick Add to Cart
                  </button>
                </div>
              </div>

              {/* Product Details (Borderless & Clean) */}
              <div className="flex flex-col flex-grow">
                {/* Brand Name */}
                <span className="text-xs text-gray-400 font-medium uppercase tracking-widest mb-1">
                  {product.brand}
                </span>

                {/* Product Name */}
                <h3 className="text-base font-medium text-gray-900 leading-snug mb-2 line-clamp-2">
                  {product.productName}
                </h3>

                {/* Ratings */}
                <div className="flex items-center gap-1.5 mb-3">
                  <span className="text-pink-500 text-xs">★★★★★</span>
                  <span className="text-xs text-gray-400">
                    ({product.reviews})
                  </span>
                </div>

                {/* Price Section */}
                <div className="flex items-center gap-2 mt-auto">
                  <span className="text-lg font-semibold text-gray-900">
                    {product.salePrice}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-gray-400 line-through">
                      {product.originalPrice}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
