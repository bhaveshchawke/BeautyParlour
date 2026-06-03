export const AboutPage = () => {
  return (
    // पूरा पेज डार्क थीम में है (bg-[#0a0a0a])
    <div className="bg-[#0a0a0a] min-h-screen font-sans text-gray-300">
      {/* 1. Hero Section (Glassmorphism Overlay) */}
      <section className="relative w-full h-[60vh] min-h-[500px] flex items-center justify-center">
        {/* Background Image (Dark & Aesthetic) */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40"
          style={{
            backgroundImage:
              "url('https://images.pexels.com/photos/3993471/pexels-photo-3993471.jpeg?auto=compress&cs=tinysrgb&w=1920')",
          }}
        ></div>
        {/* Gradient Fade to blend with the next section */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0a0a0a]/50 to-[#0a0a0a]"></div>

        {/* Hero Content in Glassmorphism Box */}
        <div className="relative z-10 text-center px-6">
          <div className="inline-block backdrop-blur-md bg-white/5 border border-white/10 px-8 py-4 rounded-2xl">
            <span className="text-pink-500 font-medium tracking-[0.3em] uppercase text-xs block mb-2">
              Discover BeauTen
            </span>
            <h1 className="text-4xl md:text-6xl font-light text-white tracking-tight">
              Redefining <span className="font-semibold">Beauty.</span>
            </h1>
          </div>
        </div>
      </section>

      {/* 2. The Story Section (Split Layout) */}
      <section className="max-w-6xl mx-auto px-6 lg:px-8 py-20 lg:py-28">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Left Side: Images */}
          <div className="w-full lg:w-1/2 relative">
            <div className="aspect-square rounded-3xl overflow-hidden border border-white/10">
              <img
                src="https://images.pexels.com/photos/3993325/pexels-photo-3993325.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Salon Interior"
                className="w-full h-full object-cover grayscale-[20%]"
              />
            </div>
            {/* Floating Stats Box */}
            <div className="absolute -bottom-10 -right-4 lg:-right-10 bg-[#121212] border border-white/10 p-6 rounded-2xl shadow-2xl">
              <p className="text-4xl font-light text-white mb-1">10+</p>
              <p className="text-xs text-pink-500 uppercase tracking-widest font-medium">
                Years of Expertise
              </p>
            </div>
          </div>

          {/* Right Side: Text */}
          <div className="w-full lg:w-1/2 mt-12 lg:mt-0">
            <h2 className="text-3xl lg:text-4xl font-light text-white mb-6">
              The Perfect Blend of <br />
              <span className="font-semibold">Salon & Store</span>
            </h2>
            <div className="space-y-6 text-gray-400 font-light leading-relaxed text-sm lg:text-base">
              <p>
                At BeauTen, we believe that self-care shouldn't be complicated.
                Our journey started with a simple vision: to create a unified
                space where premium grooming services meet authentic cosmetics.
              </p>
              <p>
                We are more than just a salon. We are a carefully curated
                sanctuary where expert stylists craft your perfect look, and our
                integrated store ensures you take the best products home to
                maintain it.
              </p>
            </div>

            {/* Signature or Founder Note */}
            <div className="mt-10 pt-8 border-t border-white/10">
              <p className="text-white font-medium">Founders, BeauTen</p>
              <p className="text-xs text-gray-500 uppercase tracking-widest mt-1">
                Indore Studio
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Our Values / Why Choose Us (Grid Section) */}
      <section className="bg-[#121212] py-20 border-y border-white/5">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Value 1 */}
            <div className="p-8 rounded-2xl bg-[#0a0a0a] border border-white/5 hover:border-pink-500/30 transition-colors duration-500">
              <div className="w-12 h-12 bg-pink-500/10 rounded-full flex items-center justify-center mb-6 text-pink-500 text-xl">
                ✦
              </div>
              <h3 className="text-lg font-medium text-white mb-3">
                Authentic Products
              </h3>
              <p className="text-sm font-light text-gray-400 leading-relaxed">
                Every cosmetic item in our store is 100% genuine, sourced
                directly from top global brands.
              </p>
            </div>

            {/* Value 2 */}
            <div className="p-8 rounded-2xl bg-[#0a0a0a] border border-white/5 hover:border-pink-500/30 transition-colors duration-500">
              <div className="w-12 h-12 bg-pink-500/10 rounded-full flex items-center justify-center mb-6 text-pink-500 text-xl">
                ✦
              </div>
              <h3 className="text-lg font-medium text-white mb-3">
                Expert Professionals
              </h3>
              <p className="text-sm font-light text-gray-400 leading-relaxed">
                Our stylists undergo rigorous training to deliver international
                standard services.
              </p>
            </div>

            {/* Value 3 */}
            <div className="p-8 rounded-2xl bg-[#0a0a0a] border border-white/5 hover:border-pink-500/30 transition-colors duration-500">
              <div className="w-12 h-12 bg-pink-500/10 rounded-full flex items-center justify-center mb-6 text-pink-500 text-xl">
                ✦
              </div>
              <h3 className="text-lg font-medium text-white mb-3">
                Hygienic Space
              </h3>
              <p className="text-sm font-light text-gray-400 leading-relaxed">
                We maintain absolute premium hygiene standards, sanitizing our
                tools after every single client.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Call to Action */}
      <section className="py-24 text-center px-6">
        <h2 className="text-3xl font-light text-white mb-6">
          Ready to experience the{" "}
          <span className="font-semibold">difference?</span>
        </h2>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-8">
          <button
            className="px-8 py-3.5 bg-pink-600 text-white text-sm font-medium rounded-md hover:bg-pink-500 transition-colors duration-300 cursor-pointer"
            /* अपना लॉजिक लगाएँ */
          >
            Book an Appointment
          </button>
          <button
            className="px-8 py-3.5 bg-transparent border border-gray-600 text-white text-sm font-medium rounded-md hover:border-white transition-colors duration-300 cursor-pointer"
            /* अपना लॉजिक लगाएँ */
          >
            Explore Our Store
          </button>
        </div>
      </section>
    </div>
  );
};
