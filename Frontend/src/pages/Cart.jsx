export const Cart = () => {
  return (
    // हल्का सा स्टोन (Stone) बैकग्राउंड
    <div className="bg-[#f8f8f8] min-h-screen font-sans py-12 lg:py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Page Title */}
        <div className="mb-12 border-b border-gray-200 pb-6 flex items-baseline gap-4">
          <h1 className="text-3xl lg:text-4xl font-light text-gray-900 tracking-tight">
            Shopping <span className="font-semibold text-black">Bag</span>
          </h1>
          <span className="text-sm font-medium text-gray-500 bg-gray-200 px-3 py-1 rounded-full">
            2 Items
          </span>
        </div>

        {/* 2-Column Layout */}
        <div className="flex flex-col lg:flex-row gap-12 items-start">
          {/* ================= LEFT COLUMN: Cart Items ================= */}
          <div className="w-full lg:w-2/3 flex flex-col gap-6">
            {/* Item 1 (Static UI for reference) */}
            <div className="relative bg-white p-5 lg:p-6 rounded-2xl border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col sm:flex-row items-center justify-between gap-6 transition-all duration-300 hover:border-pink-100">
              <div className="flex items-center gap-6 w-full sm:w-auto">
                <div className="w-24 h-28 bg-gray-50 rounded-xl overflow-hidden flex-shrink-0 border border-gray-50">
                  <img
                    src="https://images.pexels.com/photos/2587370/pexels-photo-2587370.jpeg?auto=compress&cs=tinysrgb&w=400"
                    alt="Hair Spa Mask"
                    className="w-full h-full object-cover object-center"
                  />
                </div>
                <div>
                  <span className="text-[10px] text-gray-400 font-semibold uppercase tracking-widest block mb-1.5">
                    L'Oréal Paris
                  </span>
                  <h3 className="text-sm font-medium text-gray-900 leading-snug max-w-[250px]">
                    Professional Hair Spa Mask (200ml)
                  </h3>
                  <div className="flex items-center gap-2 mt-3 sm:hidden">
                    <span className="text-sm font-semibold text-gray-900">
                      ₹749
                    </span>
                    <span className="text-xs text-gray-400 line-through">
                      ₹999
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-8 w-full sm:w-auto pt-4 sm:pt-0 border-t sm:border-t-0 border-gray-50">
                <div className="flex items-center border border-gray-200 rounded-lg bg-gray-50 overflow-hidden h-10">
                  <button
                    type="button"
                    className="w-10 h-full flex items-center justify-center hover:bg-gray-200 transition-colors text-gray-600 cursor-pointer"
                  >
                    −
                  </button>
                  <span className="w-10 text-xs font-semibold text-gray-900 text-center flex items-center justify-center bg-white h-full border-x border-gray-200">
                    1
                  </span>
                  <button
                    type="button"
                    className="w-10 h-full flex items-center justify-center hover:bg-gray-200 transition-colors text-gray-600 cursor-pointer"
                  >
                    +
                  </button>
                </div>

                <div className="hidden sm:flex flex-col items-end min-w-[80px]">
                  <span className="text-base font-semibold text-gray-900">
                    ₹749
                  </span>
                  <span className="text-xs text-gray-400 line-through mt-0.5">
                    ₹999
                  </span>
                </div>

                <button
                  type="button"
                  className="text-gray-400 hover:text-pink-600 transition-colors cursor-pointer p-2 sm:absolute sm:top-5 sm:right-5"
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

            {/* Item 2 (Static UI for reference) */}
            <div className="relative bg-white p-5 lg:p-6 rounded-2xl border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col sm:flex-row items-center justify-between gap-6 transition-all duration-300 hover:border-pink-100">
              <div className="flex items-center gap-6 w-full sm:w-auto">
                <div className="w-24 h-28 bg-gray-50 rounded-xl overflow-hidden flex-shrink-0 border border-gray-50">
                  <img
                    src="https://images.pexels.com/photos/2533266/pexels-photo-2533266.jpeg?auto=compress&cs=tinysrgb&w=400"
                    alt="Lipstick"
                    className="w-full h-full object-cover object-center"
                  />
                </div>
                <div>
                  <span className="text-[10px] text-gray-400 font-semibold uppercase tracking-widest block mb-1.5">
                    MAC Cosmetics
                  </span>
                  <h3 className="text-sm font-medium text-gray-900 leading-snug max-w-[250px]">
                    Velvet Teddy Matte Lipstick
                  </h3>
                  <div className="flex items-center gap-2 mt-3 sm:hidden">
                    <span className="text-sm font-semibold text-gray-900">
                      ₹1950
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-8 w-full sm:w-auto pt-4 sm:pt-0 border-t sm:border-t-0 border-gray-50">
                <div className="flex items-center border border-gray-200 rounded-lg bg-gray-50 overflow-hidden h-10">
                  <button
                    type="button"
                    className="w-10 h-full flex items-center justify-center hover:bg-gray-200 transition-colors text-gray-600 cursor-pointer"
                  >
                    −
                  </button>
                  <span className="w-10 text-xs font-semibold text-gray-900 text-center flex items-center justify-center bg-white h-full border-x border-gray-200">
                    2
                  </span>
                  <button
                    type="button"
                    className="w-10 h-full flex items-center justify-center hover:bg-gray-200 transition-colors text-gray-600 cursor-pointer"
                  >
                    +
                  </button>
                </div>

                <div className="hidden sm:flex flex-col items-end min-w-[80px]">
                  <span className="text-base font-semibold text-gray-900">
                    ₹1950
                  </span>
                </div>

                <button
                  type="button"
                  className="text-gray-400 hover:text-pink-600 transition-colors cursor-pointer p-2 sm:absolute sm:top-5 sm:right-5"
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
                  <span>Subtotal</span>
                  <span className="font-medium text-gray-900">₹2699</span>
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

              {/* Total */}
              <div className="flex justify-between items-end pt-6 mb-8">
                <span className="text-base font-medium text-gray-900">
                  Total
                </span>
                <span className="text-3xl font-semibold text-black tracking-tight">
                  ₹2699
                </span>
              </div>

              {/* Checkout Button */}
              <button
                type="button"
                className="w-full py-4 bg-black text-white text-sm font-semibold rounded-xl hover:bg-pink-600 hover:shadow-[0_10px_20px_-10px_rgba(219,39,119,0.5)] transition-all duration-300 cursor-pointer flex justify-center items-center gap-2"
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
