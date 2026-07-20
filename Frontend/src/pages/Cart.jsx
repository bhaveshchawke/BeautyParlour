import { useState, useEffect } from "react";
import { fetchAllProducts } from "../services/AdminService";
import { fetchAllCarts } from "../services/AdminService";
import { useMessage } from "../hooks/useMessage";
import { deleteProductFromCart, createOrder } from "../services/productService";
import { useNavigate } from "react-router";
export const Cart = () => {
  const { showMessage } = useMessage();
  const navigate = useNavigate();
  //___for adding all products____________________________
  const [products, setProducts] = useState([]);
  //___for fetching id from cart model____________________________
  const [id, setId] = useState([]);

  // Har cart item ki quantity track karne ke liye
  const [quantities, setQuantities] = useState({});

  // ✅ NAYA STATE: Order ka sara data store karne ke liye
  const [orderData, setOrderData] = useState(null);
  // console.log(orderData); // Removed to prevent performance lag

  // fetch products___________________________________
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const [allProducts, allCarts] = await Promise.all([
          fetchAllProducts(),
          fetchAllCarts(),
        ]);

        if (!allProducts) {
          console.error("Error in allProducts");
          setProducts([]);
        }
        if (!allCarts) {
          console.error("Error in allCarts");
          setId([]);
        }

        if (allProducts && allProducts.data) {
          setProducts(allProducts.data);
        }

        if (allCarts && allCarts.data) {
          setId(allCarts.data);
          // By default sabhi cart items ki quantity 1 set karna
          const initialQuantities = {};
          allCarts.data.forEach((cartRecord) => {
            initialQuantities[cartRecord._id] = cartRecord.quantity || 1;
          });
          setQuantities(initialQuantities);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchProducts();
  }, []);

  // HANDLERS FOR QUANTITY INCREASE / DECREASE
  const handleIncrease = (cartId) => {
    setQuantities((prev) => ({
      ...prev,
      [cartId]: prev[cartId] + 1,
    }));
  };

  const handleDecrease = (cartId) => {
    setQuantities((prev) => ({
      ...prev,
      [cartId]: prev[cartId] > 1 ? prev[cartId] - 1 : 1, // Quantity 1 se kam nahi hogi
    }));
  };

  // Derived state to get cart products with dynamic quantity
  const cartItems = id
    .map((cartRecord) => {
      const product = products.find((p) => p._id === cartRecord.productId);
      const qty = quantities[cartRecord._id] || 1; // Current quantity get karna
      return product
        ? { ...product, cartId: cartRecord._id, quantity: qty }
        : null;
    })
    .filter(Boolean);

  // DYNAMIC SUBTOTAL CALCULATION (Price × Quantity)
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.salePrice * item.quantity,
    0,
  );

  // TOTAL ITEMS (Units) IN CART
  const totalUnits = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // for removing items form cart...
  const removeFromCart = async (cartId) => {
    try {
      const response = await deleteProductFromCart(cartId);
      if (!response) {
        showMessage(response?.error || "Error removing item", "error");
        return;
      }
      showMessage("Item removed successfully", "success");

      // UI se turant remove karna
      setId((prev) => prev.filter((item) => item._id !== cartId));
      window.dispatchEvent(new Event("cartUpdated"));
    } catch (error) {
      console.log(error);
      showMessage(error.message || "Something went wrong", "error");
    }
  };

  // ✅ CHECKOUT HANDLER: Sara data orderData state me store karna
  const handleCheckout = async () => {
    const finalOrder = {
      items: cartItems.map((item) => ({
        productId: item._id,
        productName: item.productName,
        quantity: item.quantity,
        price: item.salePrice,
      })),
      totalAmount: subtotal,
    };

    try {
      showMessage("Processing your order...", "success");
      const response = await createOrder(finalOrder);

      if (response && response.success) {
        showMessage("redirecting", "success");
        // Clear UI cart
        // setId([]);
        window.dispatchEvent(new Event("cartUpdated"));
        navigate("/checkout");
      } else {
        showMessage("Failed to place order.", "error");
      }
    } catch (error) {
      console.log(error);
      const errorMessage =
        error.response?.data?.error ||
        error.response?.data?.message ||
        error.message ||
        "Failed to place order.";
      showMessage(errorMessage, "error");
    }
  };

  return (
    <div className="bg-[#f8f8f8] min-h-screen font-sans py-12 lg:py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Page Title */}
        <div className="mb-12 border-b border-gray-200 pb-6 flex items-baseline gap-4">
          <h1 className="text-3xl lg:text-4xl font-light text-gray-900 tracking-tight">
            Shopping <span className="font-semibold text-black">Bag</span>
          </h1>
          <span className="text-sm font-medium text-gray-500 bg-gray-200 px-3 py-1 rounded-full">
            {totalUnits} Items
          </span>
        </div>

        {/* 2-Column Layout */}
        <div className="flex flex-col lg:flex-row gap-12 items-start">
          {/* ================= LEFT COLUMN: Cart Items ================= */}
          <div className="w-full lg:w-2/3 flex flex-col gap-6">
            {cartItems.length === 0 ? (
              <div className="text-center text-gray-500 py-10 bg-white rounded-2xl border border-gray-100 shadow-sm">
                Your cart is empty. Let's add some premium products!
              </div>
            ) : (
              cartItems.map((item) => (
                <div
                  key={item.cartId}
                  className="relative bg-white p-5 lg:p-6 rounded-2xl border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col sm:flex-row items-center justify-between gap-6 transition-all duration-300 hover:border-pink-100"
                >
                  <div className="flex items-center gap-6 w-full sm:w-auto">
                    <div className="w-24 h-28 bg-gray-50 rounded-xl overflow-hidden flex-shrink-0 border border-gray-50">
                      <img
                        src={item.productImage}
                        alt={item.productName}
                        className="w-full h-full object-cover object-center"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] text-gray-400 font-semibold uppercase tracking-widest block mb-1.5">
                        {item.brand}
                      </span>
                      <h3 className="text-sm font-medium text-gray-900 leading-snug max-w-[250px]">
                        {item.productName}
                      </h3>
                      {/* Mobile Price View */}
                      <div className="flex items-center gap-2 mt-3 sm:hidden">
                        <span className="text-sm font-semibold text-gray-900">
                          ₹{item.salePrice.toLocaleString("en-IN")}
                        </span>
                        {item.originalPrice > item.salePrice && (
                          <span className="text-xs text-gray-400 line-through">
                            ₹{item.originalPrice.toLocaleString("en-IN")}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-8 w-full sm:w-auto pt-4 sm:pt-0 border-t sm:border-t-0 border-gray-50">
                    {/* QUANTITY CONTROLS */}
                    <div className="flex items-center border border-gray-200 rounded-lg bg-gray-50 overflow-hidden h-10">
                      <button
                        type="button"
                        onClick={() => handleDecrease(item.cartId)}
                        className="w-10 h-full flex items-center justify-center hover:bg-gray-200 transition-colors text-gray-600 cursor-pointer"
                      >
                        −
                      </button>
                      <span className="w-10 text-xs font-bold text-gray-900 text-center flex items-center justify-center bg-white h-full border-x border-gray-200">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleIncrease(item.cartId)}
                        className="w-10 h-full flex items-center justify-center hover:bg-gray-200 transition-colors text-gray-600 cursor-pointer"
                      >
                        +
                      </button>
                    </div>

                    {/* DYNAMIC ITEM TOTAL */}
                    <div className="hidden sm:flex flex-col items-end min-w-[80px]">
                      <span className="text-base font-semibold text-gray-900">
                        ₹
                        {(item.salePrice * item.quantity).toLocaleString(
                          "en-IN",
                        )}
                      </span>
                      {item.originalPrice > item.salePrice && (
                        <span className="text-xs text-gray-400 line-through mt-0.5">
                          ₹
                          {(item.originalPrice * item.quantity).toLocaleString(
                            "en-IN",
                          )}
                        </span>
                      )}
                    </div>

                    <button
                      onClick={() => removeFromCart(item.cartId)}
                      type="button"
                      className="text-gray-400 hover:text-pink-600 transition-colors cursor-pointer p-2 sm:absolute sm:top-5 sm:right-5"
                      title="Remove Item"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* ================= RIGHT COLUMN: Order Summary ================= */}
          <div className="w-full lg:w-1/3 lg:sticky lg:top-24 flex flex-col gap-6">
            {/* Promo Code Box */}
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
              <label className="text-xs font-semibold text-gray-900 uppercase tracking-widest block mb-3">
                Apply Promo Code
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter code"
                  className="w-full px-4 py-3 border border-gray-200 text-sm rounded-lg bg-gray-50 focus:outline-none focus:border-pink-500 focus:bg-white transition-all text-gray-800 uppercase"
                />
                <button
                  type="button"
                  className="px-6 py-3 bg-[#0a0a0a] text-white text-xs font-medium rounded-lg hover:bg-pink-600 transition-colors cursor-pointer uppercase tracking-wider"
                >
                  Apply
                </button>
              </div>
            </div>

            {/* Bill Summary Card */}
            <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
              <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-widest mb-6 border-b border-gray-100 pb-4">
                Order Summary
              </h2>

              <div className="flex flex-col gap-4 text-sm font-light text-gray-600 border-b border-gray-100 pb-6">
                <div className="flex justify-between">
                  <span>Subtotal ({totalUnits} items)</span>
                  <span className="font-medium text-gray-900">
                    ₹{subtotal.toLocaleString("en-IN")}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping Estimate</span>
                  <span className="font-medium text-gray-900">
                    <span className="text-green-600 font-medium tracking-wide">
                      FREE
                    </span>
                  </span>
                </div>
                <div className="flex justify-between text-xs text-gray-400">
                  <span>Taxes</span>
                  <span>Calculated at checkout</span>
                </div>
              </div>

              <div className="flex justify-between items-end pt-6 mb-8">
                <span className="text-base font-medium text-gray-900">
                  Total
                </span>
                <span className="text-3xl font-semibold text-black tracking-tight">
                  ₹{subtotal.toLocaleString("en-IN")}
                </span>
              </div>

              {/* ✅ CHECKOUT BUTTON WITH ONCLICK */}
              <button
                type="button"
                onClick={handleCheckout}
                disabled={cartItems.length === 0}
                className="w-full py-4 bg-black text-white text-sm font-semibold rounded-xl hover:bg-pink-600 hover:shadow-[0_10px_20px_-10px_rgba(219,39,119,0.5)] transition-all duration-300 cursor-pointer flex justify-center items-center gap-2 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                Proceed to Checkout
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </button>

              <div className="mt-5 flex items-center justify-center gap-2 text-[11px] text-gray-400 font-light">
                <svg
                  className="w-3.5 h-3.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
                Secure Checkout Guarantee
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
