export const ProductCard = ({ product }) => {
  return (
    <div>
      {" "}
      <div
        key={product._id}
        className="group flex flex-col relative cursor-pointer"
      >
        {/* Image Container with Hover Quick Add */}
        <div className="w-full aspect-[4/5] bg-white rounded-xl overflow-hidden relative mb-4 border border-gray-100 shadow-sm">
          {/* 'New' Badge */}
          {product.badge === "NEW" && (
            <div className="absolute top-3 left-3 bg-[#0a0a0a] text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-sm z-10">
              New
            </div>
          )}

          <img
            src={product.productImage}
            alt={product.productName}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-in-out"
          />

          {/* Slide-up Add to Cart Button */}
          <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out z-20">
            <button
              className="w-full bg-[#0a0a0a] text-white text-sm font-medium py-3.5 hover:bg-pink-600 transition-colors"
              /* onClick={() => addToCart(product.id)} */
            >
              Add to Cart
            </button>
          </div>
        </div>

        {/* Product Info */}
        <div className="flex flex-col items-center text-center">
          <span className="text-[10px] text-gray-400 font-medium uppercase tracking-widest mb-1.5">
            {product.brand}
          </span>
          <h3 className="text-sm font-medium text-gray-900 leading-snug mb-2 line-clamp-1">
            {product.productName}
          </h3>
          <span className="text-base font-semibold text-gray-900">
            ₹{product.salePrice}
          </span>
        </div>
      </div>
    </div>
  );
};
