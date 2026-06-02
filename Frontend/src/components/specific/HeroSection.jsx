export const HeroSection = () => {
  return (
    <section className="bg-white font-sans overflow-hidden">
      {/* Container की स्पेसिंग को और बैलेंस किया गया है */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16 lg:py-24 flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
        {/* Left Side: Minimal Text Content */}
        <div className="w-full lg:w-1/2 flex flex-col items-start text-left z-10">
          <span className="text-xs font-medium tracking-[0.2em] text-pink-600 uppercase mb-4">
            Premium Salon & Store
          </span>

          {/* हेडिंग को थोड़ा और रिफाइंड किया गया है */}
          <h1 className="text-4xl lg:text-5xl xl:text-6xl font-light text-gray-900 leading-[1.15] tracking-tight">
            Refine your beauty, <br />
            <span className="font-semibold text-black mt-2 inline-block">
              embrace your elegance.
            </span>
          </h1>

          <p className="mt-6 text-gray-500 font-light leading-relaxed max-w-md text-base lg:text-lg">
            Experience world-class salon services and discover handpicked
            premium cosmetics. A minimalist approach to your daily glow.
          </p>

          <div className="mt-10 flex items-center gap-8">
            {/* 1. Solid Minimal Button */}
            <button
              className="px-8 py-3.5 bg-black text-white text-sm font-medium rounded-md hover:bg-pink-600 transition-colors duration-300 shadow-md cursor-pointer"
              /* यहाँ अपना onClick/Routing लॉजिक लगाएँ */
            >
              Book Appointment
            </button>

            {/* 2. Clean Underline Button */}
            <button
              className="group flex items-center gap-2 text-sm font-medium text-gray-900 hover:text-pink-600 transition-colors duration-300 cursor-pointer"
              /* यहाँ अपना onClick/Routing लॉजिक लगाएँ */
            >
              <span className="border-b border-black group-hover:border-pink-600 transition-colors pb-0.5">
                Shop Cosmetics
              </span>
            </button>
          </div>
        </div>

        {/* Right Side: Horizontal Professional Image */}
        <div className="w-full lg:w-1/2 flex justify-center lg:justify-end mt-12 lg:mt-0">
          {/* 
            यहाँ aspect-[4/5] को हटाकर aspect-[16/9] (Horizontal) कर दिया गया है। 
            rounded-2xl और shadow-2xl इसे एक बहुत क्लीन कार्ड लुक देते हैं।
          */}
          <div className="w-full max-w-[650px] aspect-[16/9] lg:aspect-[4/3] xl:aspect-[16/9] bg-gray-50 rounded-2xl overflow-hidden shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] border border-gray-100 relative group">
            <img
              // डायरेक्ट इमेज लिंक अपडेट कर दिया गया है (images.unsplash.com)
              src="https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fG1ha2V1cHxlbnwwfDB8MHx8fDI%3D"
              alt="Pink Flowers on Table"
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-in-out"
            />
            {/* प्रीमियम लुक के लिए इमेज पर हल्का सा डार्क इफ़ेक्ट जो होवर करने पर हट जाएगा */}
            <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-500"></div>
          </div>
        </div>
      </div>
    </section>
  );
};
