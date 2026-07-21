import { useMessage } from "../../hooks/useMessage";
import { addToCart } from "../../services/AdminService";

export const ProductCard = ({ product }) => {
  const { showMessage } = useMessage();

  //add to cart________________________
  const addedToCart = async (id) => {
    try {
      const response = await addToCart(id);
      if (!response) {
        showMessage("something went wrong", "error");
      }
      // Dispatch custom event so Navbar updates instantly
      window.dispatchEvent(new Event("cartUpdated"));
      showMessage(response.message, "success");
    } catch (error) {
      console.log(error);
      showMessage("something went wrong", "error");
    }
  };

  return (
    // एक्स्ट्रा <div> और {" "} को हटा दिया गया है ताकि Grid लेआउट खराब न हो
    <div
      key={product._id}
      className="group flex flex-col relative cursor-pointer"
    >
      {/* Image Container with Hover Quick Add */}
      <div className="w-full aspect-[4/5] bg-white rounded-xl overflow-hidden relative mb-3 sm:mb-4 border border-gray-100 shadow-sm">
        {/* 'New' Badge - मोबाइल के लिए साइज़ छोटा (text-[9px]) किया गया है */}
        {product.badge === "NEW" && (
          <div className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-[#0a0a0a] text-white text-[9px] sm:text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-sm z-10">
            New
          </div>
        )}

        <img
          src={product.productImage}
          alt={product.productName}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-in-out"
        />

        {/* Slide-up Add to Cart Button */}
        {/* मोबाइल पर बटन हमेशा दिखेगा (translate-y-0), डेस्कटॉप पर होवर पर आएगा (sm:translate-y-full group-hover:translate-y-0) */}
        <div className="absolute inset-x-0 bottom-0 translate-y-0 sm:translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out z-20">
          <button
            className="w-full bg-[#0a0a0a]/90 sm:bg-[#0a0a0a] backdrop-blur-sm sm:backdrop-blur-none cursor-pointer text-white text-xs sm:text-sm font-medium py-2.5 sm:py-3.5 hover:bg-pink-600 transition-colors"
            onClick={(e) => {
              e.stopPropagation(); // अगर कार्ड पर कोई और लिंक लगा हो, तो बटन दबाने पर वो ट्रिगर नहीं होगा
              addedToCart(product._id);
            }}
          >
            Add to Cart
          </button>
        </div>
      </div>

      {/* Product Info */}
      {/* मोबाइल स्क्रीन पर टेक्स्ट टूटे नहीं, इसके लिए px-1 और text-xs का इस्तेमाल किया है */}
      <div className="flex flex-col items-center text-center px-1">
        <span className="text-[9px] sm:text-[10px] text-gray-400 font-medium uppercase tracking-widest mb-1 sm:mb-1.5">
          {product.brand}
        </span>
        <h3 className="text-xs sm:text-sm font-medium text-gray-900 leading-snug mb-1 sm:mb-2 line-clamp-1">
          {product.productName}
        </h3>
        <span className="text-sm sm:text-base font-semibold text-gray-900">
          ₹{product.salePrice?.toLocaleString("en-IN")}
        </span>
      </div>
    </div>
  );
};
