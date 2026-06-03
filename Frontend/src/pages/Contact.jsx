export const Contact = () => {
  return (
    // हल्का सा स्टोन (Stone) बैकग्राउंड ताकि बहुत ज्यादा सफेद न लगे
    <div className="bg-stone-50 min-h-screen font-sans pb-24">
      {/* 1. Dark Premium Header Banner */}
      <section className="bg-[#0a0a0a] py-20 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <span className="text-pink-600 font-medium tracking-[0.3em] uppercase text-xs block mb-3">
            Get In Touch
          </span>
          <h1 className="text-4xl lg:text-5xl font-light text-white tracking-tight mb-4">
            We'd Love To <span className="font-semibold">Hear From You</span>
          </h1>
          <p className="text-gray-400 font-light text-sm lg:text-base max-w-lg mx-auto">
            Whether you have a question about our salon services, cosmetics, or
            just want to say hello, our team is ready to answer all your
            questions.
          </p>
        </div>
      </section>

      {/* 2. Main Contact Section (Split Layout) */}
      <div className="max-w-6xl mx-auto px-6 lg:px-8 mt-[-40px] relative z-10">
        <div className="bg-white rounded-3xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.05)] overflow-hidden flex flex-col lg:flex-row border border-gray-100">
          {/* ================= LEFT SIDE (Contact Info & Image) ================= */}
          <div className="w-full lg:w-5/12 bg-[#121212] text-white p-10 lg:p-14 flex flex-col justify-between relative overflow-hidden">
            {/* Background Decorative Element */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-pink-600/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>

            <div className="relative z-10">
              <h3 className="text-2xl font-light mb-8">
                Contact <span className="font-semibold">Information</span>
              </h3>

              <div className="flex flex-col gap-8 font-light text-gray-300 text-sm">
                {/* Address */}
                <div>
                  <h4 className="text-pink-500 text-xs font-semibold uppercase tracking-widest mb-2">
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
                  <h4 className="text-pink-500 text-xs font-semibold uppercase tracking-widest mb-2">
                    Direct Lines
                  </h4>
                  <p className="mb-1 hover:text-white cursor-pointer transition-colors">
                    +91 98765 43210
                  </p>
                  <p className="hover:text-white cursor-pointer transition-colors">
                    hello@beauten.com
                  </p>
                </div>

                {/* Working Hours */}
                <div>
                  <h4 className="text-pink-500 text-xs font-semibold uppercase tracking-widest mb-2">
                    Working Hours
                  </h4>
                  <p className="mb-1">Mon - Sat: 10:00 AM - 8:00 PM</p>
                  <p className="text-gray-500">
                    Sunday: Closed for Maintenance
                  </p>
                </div>
              </div>
            </div>

            {/* Small Aesthetic Image at the bottom of the dark section */}
            <div className="mt-12 relative z-10 w-full aspect-video rounded-xl overflow-hidden border border-white/10">
              <img
                src="https://images.pexels.com/photos/3993444/pexels-photo-3993444.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Salon Ambience"
                className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity duration-500"
              />
            </div>
          </div>

          {/* ================= RIGHT SIDE (The Form) ================= */}
          <div className="w-full lg:w-7/12 p-10 lg:p-16 flex flex-col justify-center">
            <h3 className="text-2xl font-light text-gray-900 mb-8">
              Send us a <span className="font-semibold">Message</span>
            </h3>

            {/* यहाँ आप onSubmit लॉजिक लगा सकते हैं */}
            <form className="flex flex-col gap-10">
              {/* Row 1: Name & Email */}
              <div className="flex flex-col sm:flex-row gap-10">
                <div className="w-full relative group">
                  <input
                    type="text"
                    id="name"
                    required
                    className="w-full pb-3 border-b border-gray-300 bg-transparent text-gray-900 text-sm focus:outline-none focus:border-pink-600 transition-colors peer"
                    placeholder=" "
                    /* onChange={(e) => setName(e.target.value)} */
                  />
                  {/* Floating Label Effect */}
                  <label
                    htmlFor="name"
                    className="absolute left-0 top-0 text-gray-400 text-sm transition-all duration-300 peer-focus:-top-5 peer-focus:text-xs peer-focus:text-pink-600 peer-valid:-top-5 peer-valid:text-xs peer-valid:text-gray-500 cursor-text pointer-events-none"
                  >
                    Your Name
                  </label>
                </div>

                <div className="w-full relative group">
                  <input
                    type="email"
                    id="email"
                    required
                    className="w-full pb-3 border-b border-gray-300 bg-transparent text-gray-900 text-sm focus:outline-none focus:border-pink-600 transition-colors peer"
                    placeholder=" "
                  />
                  <label
                    htmlFor="email"
                    className="absolute left-0 top-0 text-gray-400 text-sm transition-all duration-300 peer-focus:-top-5 peer-focus:text-xs peer-focus:text-pink-600 peer-valid:-top-5 peer-valid:text-xs peer-valid:text-gray-500 cursor-text pointer-events-none"
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
                  className="w-full pb-3 border-b border-gray-300 bg-transparent text-gray-900 text-sm focus:outline-none focus:border-pink-600 transition-colors peer"
                  placeholder=" "
                />
                <label
                  htmlFor="subject"
                  className="absolute left-0 top-0 text-gray-400 text-sm transition-all duration-300 peer-focus:-top-5 peer-focus:text-xs peer-focus:text-pink-600 peer-valid:-top-5 peer-valid:text-xs peer-valid:text-gray-500 cursor-text pointer-events-none"
                >
                  Subject / Topic
                </label>
              </div>

              {/* Row 3: Message */}
              <div className="w-full relative group">
                <textarea
                  id="message"
                  required
                  rows="4"
                  className="w-full pb-3 border-b border-gray-300 bg-transparent text-gray-900 text-sm focus:outline-none focus:border-pink-600 transition-colors peer resize-none"
                  placeholder=" "
                ></textarea>
                <label
                  htmlFor="message"
                  className="absolute left-0 top-0 text-gray-400 text-sm transition-all duration-300 peer-focus:-top-5 peer-focus:text-xs peer-focus:text-pink-600 peer-valid:-top-5 peer-valid:text-xs peer-valid:text-gray-500 cursor-text pointer-events-none"
                >
                  How can we help you?
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="self-start mt-4 px-10 py-3.5 bg-black text-white text-sm font-medium rounded-md hover:bg-pink-600 hover:shadow-[0_10px_20px_-10px_rgba(219,39,119,0.5)] transition-all duration-300 cursor-pointer"
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
