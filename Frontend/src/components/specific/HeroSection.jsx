import { NavLink } from "react-router";

export const HeroSection = () => {
  return (
    <section className="bg-white font-sans overflow-hidden">
      {/* Container की स्पेसिंग को मोबाइल के लिए और बैलेंस किया गया है (px-4, py-12) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-12 lg:py-24 flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
        {/* Left Side: Minimal Text Content */}
        <div className="w-full lg:w-1/2 flex flex-col items-start text-left z-10">
          <span className="text-xs font-medium tracking-[0.2em] text-pink-600 uppercase mb-3 lg:mb-4">
            Premium Salon & Store
          </span>

          {/* हेडिंग को मोबाइल पर थोड़ा स्केल-डाउन किया गया है (text-3xl sm:text-4xl) */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-light text-gray-900 leading-[1.2] lg:leading-[1.15] tracking-tight">
            Refine your beauty, <br />
            <span className="font-semibold text-black mt-2 inline-block">
              embrace your elegance.
            </span>
          </h1>

          <p className="mt-4 lg:mt-6 text-gray-500 font-light leading-relaxed max-w-md text-base lg:text-lg">
            Experience world-class salon services and discover handpicked
            premium cosmetics. A minimalist approach to your daily glow.
          </p>

          {/* Buttons: मोबाइल पर flex-col ताकि बटन एक के नीचे एक आएं और छोटे स्क्रीन पर फिट रहें */}
          <div className="mt-8 lg:mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-5 sm:gap-8 w-full sm:w-auto">
            {/* 1. Solid Minimal Button (w-full on mobile for easy tapping) */}
            <NavLink
              to={"/appointment"}
              className="w-full sm:w-auto text-center px-8 py-3.5 bg-black text-white text-sm font-medium rounded-md hover:bg-pink-600 transition-colors duration-300 shadow-md cursor-pointer"
            >
              Book Appointment
            </NavLink>

            {/* 2. Clean Underline Button */}
            <NavLink
              to={"/shop"}
              className="group flex items-center gap-2 text-sm font-medium text-gray-900 hover:text-pink-600 transition-colors duration-300 cursor-pointer"
            >
              <span className="border-b border-black group-hover:border-pink-600 transition-colors pb-0.5">
                Shop Cosmetics
              </span>
            </NavLink>
          </div>
        </div>

        {/* Right Side: Horizontal Professional Image */}
        {/* mt-12 को कम किया गया है क्योंकि flex gap पहले से ही मोबाइल पर स्पेस दे रहा है */}
        <div className="w-full lg:w-1/2 flex justify-center lg:justify-end mt-4 lg:mt-0">
          <div className="w-full max-w-[650px] aspect-[16/9] lg:aspect-[4/3] xl:aspect-[16/9] bg-gray-50 rounded-2xl overflow-hidden shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] border border-gray-100 relative group">
            <img
              src="https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fG1ha2V1cHxlbnwwfDB8MHx8fDI%3D"
              alt="Pink Flowers on Table"
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-in-out"
            />
            <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-500"></div>
          </div>
        </div>
      </div>
    </section>
  );
};
