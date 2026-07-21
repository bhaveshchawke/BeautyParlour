export const Offers = () => {
  // कॉम्बो ऑफर्स का डेटा
  const comboOffers = [
    {
      id: 1,
      tag: "Most Popular",
      title: "Complete Bridal Glam + Care Kit",
      description:
        "Book our premium Bridal Makeup package and get a luxury cosmetics and skincare hamper absolutely free to maintain your glow.",
      discount: "Save ₹1500",
      serviceImage:
        "https://images.pexels.com/photos/2442904/pexels-photo-2442904.jpeg?auto=compress&cs=tinysrgb&w=800", // ब्राइडल मेकअप
      productImage:
        "https://images.pexels.com/photos/3373736/pexels-photo-3373736.jpeg?auto=compress&cs=tinysrgb&w=400", // कॉस्मेटिक्स हैम्पर
    },
    {
      id: 2,
      tag: "Limited Time",
      title: "Advanced Hair Spa + L'Oreal Kit",
      description:
        "Rejuvenate your hair with our deep conditioning spa and take home a professional L'Oreal hair care kit at a flat 20% discount.",
      discount: "20% OFF on Products",
      serviceImage:
        "https://images.pexels.com/photos/3993444/pexels-photo-3993444.jpeg?auto=compress&cs=tinysrgb&w=800", // हेयर स्पा
      productImage:
        "https://images.pexels.com/photos/2587370/pexels-photo-2587370.jpeg?auto=compress&cs=tinysrgb&w=400", // हेयर केयर प्रोडक्ट
    },
  ];

  return (
    // bg-stone-50: यह हल्का सा एलीगेंट ग्रे/वार्म टोन है जो इसे व्हाइट से अलग करेगा
    // मोबाइल के लिए py-12 कर दिया गया है
    <section className="bg-stone-50 font-sans py-12 md:py-20 lg:py-28">
      {/* मोबाइल के लिए px-4 किया गया है */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-10 md:mb-16">
          <span className="text-xs font-medium tracking-[0.2em] text-pink-600 uppercase mb-2 md:mb-3 block">
            Exclusive Combos
          </span>
          <h2 className="text-3xl lg:text-4xl font-light text-gray-900 tracking-tight">
            Curated For <span className="font-semibold text-black">You</span>
          </h2>
        </div>

        {/* Offers List (Vertical Stack) */}
        {/* मोबाइल पर गैप को 12 (48px) किया गया है ताकि सेक्शन्स ज्यादा दूर न लगें */}
        <div className="flex flex-col gap-12 md:gap-16 lg:gap-24">
          {comboOffers.map((offer, index) => (
            <div
              key={offer.id}
              // flexDirection को index के हिसाब से पलट रहे हैं ताकि डिज़ाइन में वैरायटी (Zig-Zag) आए
              className={`flex flex-col ${
                index % 2 !== 0 ? "lg:flex-row-reverse" : "lg:flex-row"
              } items-center gap-8 md:gap-10 lg:gap-20`}
            >
              {/* Left Side: Overlapping Images (Service + Product) */}
              <div className="w-full lg:w-1/2 relative group">
                {/* Main Service Image */}
                <div className="w-full aspect-[4/3] rounded-2xl md:rounded-3xl overflow-hidden shadow-xl relative z-10 border border-gray-100">
                  <img
                    src={offer.serviceImage}
                    alt="Salon Service"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
                  />
                  {/* Dark overlay for a premium look */}
                  <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-500"></div>
                </div>

                {/* Overlapping Floating Product Image (Glassmorphism Border) */}
                <div
                  className={`absolute -bottom-6 sm:-bottom-8 ${
                    index % 2 !== 0
                      ? "left-2 sm:-left-4 lg:-left-8" // मोबाइल पर left-2 ताकि बाहर न जाए
                      : "right-2 sm:-right-4 lg:-right-8" // मोबाइल पर right-2 ताकि बाहर न जाए
                  } w-28 sm:w-40 lg:w-48 aspect-square rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl border-[4px] sm:border-[6px] border-stone-50 z-20 group-hover:-translate-y-2 transition-transform duration-500`}
                >
                  <img
                    src={offer.productImage}
                    alt="Store Product"
                    className="w-full h-full object-cover"
                  />
                  {/* Plus Icon Badge - दोनों इमेजेज के जुड़ने का प्रतीक */}
                  <div className="absolute top-1 right-1 sm:top-2 sm:right-2 bg-pink-600 text-white w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center font-bold text-sm sm:text-lg shadow-md">
                    +
                  </div>
                </div>
              </div>

              {/* Right Side: Text Content */}
              {/* mt-8 दिया गया है ताकि छोटी इमेज टेक्स्ट के ऊपर न चढ़े */}
              <div className="w-full lg:w-1/2 flex flex-col items-start mt-8 md:mt-10 lg:mt-0">
                <span className="inline-block px-3 py-1 bg-gray-900 text-white text-[10px] sm:text-xs font-medium rounded-full uppercase tracking-wider mb-4 sm:mb-5">
                  {offer.tag}
                </span>

                <h3 className="text-xl sm:text-2xl lg:text-3xl font-medium text-gray-900 leading-tight mb-3 sm:mb-4">
                  {offer.title}
                </h3>

                <p className="text-gray-500 font-light leading-relaxed text-sm sm:text-base mb-5 sm:mb-6">
                  {offer.description}
                </p>

                <div className="bg-pink-50/80 border border-pink-100 px-3 py-1.5 sm:px-4 sm:py-2 rounded-md mb-6 sm:mb-8 inline-block">
                  <span className="text-pink-700 font-semibold text-xs sm:text-sm">
                    ✨ {offer.discount}
                  </span>
                </div>

                {/* मोबाइल पर बटन को w-full कर दिया गया है ताकि टैप करने में आसानी हो */}
                <button
                  className="w-full sm:w-auto px-8 py-3.5 bg-black text-white text-sm font-medium rounded-md hover:bg-pink-600 hover:shadow-lg transition-all duration-300 cursor-pointer"
                  /* यहाँ ऑफर बुक करने या राउटिंग का लॉजिक लगाएँ */
                >
                  Claim Offer
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
