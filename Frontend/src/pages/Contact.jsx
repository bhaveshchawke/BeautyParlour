export const Contact = () => {
  return (
    // हल्का सा स्टोन (Stone) बैकग्राउंड ताकि बहुत ज्यादा सफेद न लगे
    <div className="bg-stone-50 min-h-screen font-sans pb-16 lg:pb-20">
      {/* 1. Dark Premium Header Banner (Scaled Down) */}
      <section className="bg-[#0a0a0a] pt-16 pb-24 px-6 text-center">
        <div className="max-w-2xl mx-auto">
          <span className="text-pink-600 font-medium tracking-[0.2em] uppercase text-[10px] block mb-2">
            Get In Touch
          </span>
          <h1 className="text-3xl lg:text-4xl font-light text-white tracking-tight mb-3">
            We'd Love To <span className="font-semibold">Hear From You</span>
          </h1>
          <p className="text-gray-400 font-light text-xs lg:text-sm max-w-md mx-auto leading-relaxed">
            Whether you have a question about our salon services, cosmetics, or
            just want to say hello, our team is ready to answer all your
            questions.
          </p>
        </div>
      </section>

      {/* 2. Main Contact Section (Split Layout) */}
      <div className="max-w-5xl mx-auto px-4 lg:px-6 mt-[-60px] relative z-10">
        <div className="bg-white rounded-2xl shadow-[0_15px_40px_-12px_rgba(0,0,0,0.08)] overflow-hidden flex flex-col lg:flex-row border border-gray-100">
          {/* ================= LEFT SIDE (Contact Info & Image) ================= */}
          <div className="w-full lg:w-5/12 bg-[#121212] text-white p-8 lg:p-10 flex flex-col justify-between relative overflow-hidden">
            {/* Background Decorative Element */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-pink-600/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>

            <div className="relative z-10">
              <h3 className="text-xl font-light mb-6">
                Contact{" "}
                <span className="font-semibold text-pink-500">Information</span>
              </h3>

              <div className="flex flex-col gap-6 font-light text-gray-300 text-[13px]">
                {/* Address */}
                <div>
                  <h4 className="text-gray-500 text-[10px] font-semibold uppercase tracking-widest mb-1.5">
                    Our Studio
                  </h4>
                  <p className="leading-relaxed">
                    101, Premium Hub, AB Road,
                    <br />
                    Indore, Madhya Pradesh 452001
                  </p>
                </div>

                {/* Phone & Email */}
                <div>
                  <h4 className="text-gray-500 text-[10px] font-semibold uppercase tracking-widest mb-1.5">
                    Direct Lines
                  </h4>
                  <p className="mb-0.5 hover:text-pink-400 cursor-pointer transition-colors">
                    +91 98765 43210
                  </p>
                  <p className="hover:text-pink-400 cursor-pointer transition-colors">
                    hello@beauten.com
                  </p>
                </div>

                {/* Working Hours */}
                <div>
                  <h4 className="text-gray-500 text-[10px] font-semibold uppercase tracking-widest mb-1.5">
                    Working Hours
                  </h4>
                  <p className="mb-0.5">Mon - Sat: 10:00 AM - 8:00 PM</p>
                  <p className="text-gray-500 text-xs">
                    Sunday: Closed for Maintenance
                  </p>
                </div>
              </div>
            </div>

            {/* Small Aesthetic Image at the bottom of the dark section */}
            <div className="mt-8 relative z-10 w-full aspect-[16/7] rounded-xl overflow-hidden border border-white/10">
              <img
                src="https://images.pexels.com/photos/3993444/pexels-photo-3993444.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Salon Ambience"
                className="w-full h-full object-cover opacity-70 hover:opacity-100 transition-opacity duration-500"
              />
            </div>
          </div>

          {/* ================= RIGHT SIDE (The Form) ================= */}
          <div className="w-full lg:w-7/12 p-8 lg:p-12 flex flex-col justify-center">
            <h3 className="text-xl lg:text-2xl font-light text-gray-900 mb-8">
              Send us a{" "}
              <span className="font-semibold text-pink-600">Message</span>
            </h3>

            {/* यहाँ आप onSubmit लॉजिक लगा सकते हैं */}
            <form className="flex flex-col gap-7">
              {/* Row 1: Name & Email */}
              <div className="flex flex-col sm:flex-row gap-7">
                <div className="w-full relative group">
                  <input
                    type="text"
                    id="name"
                    required
                    className="w-full pb-2 border-b border-gray-200 bg-transparent text-gray-900 text-sm focus:outline-none focus:border-pink-500 transition-colors peer"
                    placeholder=" "
                    /* onChange={(e) => setName(e.target.value)} */
                  />
                  {/* Floating Label Effect */}
                  <label
                    htmlFor="name"
                    className="absolute left-0 top-0 text-gray-400 text-[13px] transition-all duration-300 peer-focus:-top-4 peer-focus:text-[11px] peer-focus:text-pink-500 peer-valid:-top-4 peer-valid:text-[11px] peer-valid:text-gray-500 cursor-text pointer-events-none"
                  >
                    Your Name
                  </label>
                </div>

                <div className="w-full relative group">
                  <input
                    type="email"
                    id="email"
                    required
                    className="w-full pb-2 border-b border-gray-200 bg-transparent text-gray-900 text-sm focus:outline-none focus:border-pink-500 transition-colors peer"
                    placeholder=" "
                  />
                  <label
                    htmlFor="email"
                    className="absolute left-0 top-0 text-gray-400 text-[13px] transition-all duration-300 peer-focus:-top-4 peer-focus:text-[11px] peer-focus:text-pink-500 peer-valid:-top-4 peer-valid:text-[11px] peer-valid:text-gray-500 cursor-text pointer-events-none"
                  >
                    Email Address
                  </label>
                </div>
              </div>

              {/* Row 2: Subject */}
              <div className="w-full relative group">
                <input
                  type="text"
                  id="subject"
                  required
                  className="w-full pb-2 border-b border-gray-200 bg-transparent text-gray-900 text-sm focus:outline-none focus:border-pink-500 transition-colors peer"
                  placeholder=" "
                />
                <label
                  htmlFor="subject"
                  className="absolute left-0 top-0 text-gray-400 text-[13px] transition-all duration-300 peer-focus:-top-4 peer-focus:text-[11px] peer-focus:text-pink-500 peer-valid:-top-4 peer-valid:text-[11px] peer-valid:text-gray-500 cursor-text pointer-events-none"
                >
                  Subject / Topic
                </label>
              </div>

              {/* Row 3: Message */}
              <div className="w-full relative group">
                <textarea
                  id="message"
                  required
                  rows="3"
                  className="w-full pb-2 border-b border-gray-200 bg-transparent text-gray-900 text-sm focus:outline-none focus:border-pink-500 transition-colors peer resize-none"
                  placeholder=" "
                ></textarea>
                <label
                  htmlFor="message"
                  className="absolute left-0 top-0 text-gray-400 text-[13px] transition-all duration-300 peer-focus:-top-4 peer-focus:text-[11px] peer-focus:text-pink-500 peer-valid:-top-4 peer-valid:text-[11px] peer-valid:text-gray-500 cursor-text pointer-events-none"
                >
                  How can we help you?
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="self-start mt-2 px-8 py-2.5 bg-[#111111] text-white text-[13px] font-medium rounded-lg hover:bg-pink-600 hover:shadow-[0_8px_15px_-5px_rgba(236,72,153,0.4)] transition-all duration-300 cursor-pointer"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
