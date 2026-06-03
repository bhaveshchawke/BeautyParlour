export const ApointMent = () => {
  // डमी टाइम स्लॉट्स (इन्हें आप बैकएंड से डायनामिक बना सकते हैं)
  const timeSlots = [
    "10:00 AM",
    "11:00 AM",
    "12:30 PM",
    "02:00 PM",
    "03:30 PM",
    "05:00 PM",
    "06:30 PM",
  ];

  // डमी सर्विसेज़
  const services = [
    "Hair Styling & Spa",
    "Advanced Skin Care",
    "Bridal & Party Makeup",
    "Nail Art & Extensions",
    "Relaxing Massage Therapy",
  ];

  return (
    <div className="bg-stone-50 min-h-screen font-sans pb-24">
      {/* 1. Dark Premium Header Banner */}
      <section className="bg-[#0a0a0a] py-20 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <span className="text-pink-600 font-medium tracking-[0.3em] uppercase text-xs block mb-3">
            Reserve Your Time
          </span>
          <h1 className="text-4xl lg:text-5xl font-light text-white tracking-tight mb-4">
            Book Your <span className="font-semibold">Experience</span>
          </h1>
          <p className="text-gray-400 font-light text-sm lg:text-base max-w-lg mx-auto">
            Choose your preferred service, date, and time. Our expert stylists
            will be ready to give you the ultimate pampering session.
          </p>
        </div>
      </section>

      {/* 2. Main Booking Container (Split Layout) */}
      <div className="max-w-6xl mx-auto px-6 lg:px-8 mt-[-40px] relative z-10">
        <div className="bg-white rounded-3xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.05)] overflow-hidden flex flex-col lg:flex-row border border-gray-100">
          {/* ================= LEFT SIDE (Aesthetic & Info) ================= */}
          <div className="w-full lg:w-2/5 bg-[#121212] relative overflow-hidden flex flex-col justify-between">
            {/* Image taking up top half of the left side */}
            <div className="h-64 w-full relative">
              <img
                src="https://images.pexels.com/photos/3993322/pexels-photo-3993322.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Spa Treatment"
                className="w-full h-full object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#121212] to-transparent"></div>
            </div>

            {/* Info Section */}
            <div className="p-10 text-white relative z-10">
              <h3 className="text-2xl font-light mb-6">
                Why Book With{" "}
                <span className="font-semibold text-pink-500">BeauTen?</span>
              </h3>

              <ul className="space-y-6">
                <li className="flex gap-4">
                  <span className="text-pink-500 text-xl">✦</span>
                  <div>
                    <h4 className="text-sm font-semibold tracking-wide">
                      No Waiting Time
                    </h4>
                    <p className="text-xs text-gray-400 font-light mt-1 leading-relaxed">
                      Your appointment time is strictly reserved just for you.
                    </p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="text-pink-500 text-xl">✦</span>
                  <div>
                    <h4 className="text-sm font-semibold tracking-wide">
                      Expert Consultation
                    </h4>
                    <p className="text-xs text-gray-400 font-light mt-1 leading-relaxed">
                      Get a free skin or hair analysis before your service
                      starts.
                    </p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="text-pink-500 text-xl">✦</span>
                  <div>
                    <h4 className="text-sm font-semibold tracking-wide">
                      100% Sanitized
                    </h4>
                    <p className="text-xs text-gray-400 font-light mt-1 leading-relaxed">
                      We strictly use sterilized tools and authentic products.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* ================= RIGHT SIDE (Booking Form) ================= */}
          <div className="w-full lg:w-3/5 p-8 lg:p-14">
            <h3 className="text-2xl font-light text-gray-900 mb-8">
              Appointment <span className="font-semibold">Details</span>
            </h3>

            {/* यहाँ आप अपना onSubmit लॉजिक लगाएंगे */}
            <form className="flex flex-col gap-10">
              {/* 1. Select Service */}
              <div>
                <label className="text-xs font-semibold text-gray-900 uppercase tracking-widest mb-4 block">
                  Select Service
                </label>
                <div className="relative">
                  <select
                    className="w-full pb-3 border-b border-gray-300 bg-transparent text-gray-900 text-sm focus:outline-none focus:border-pink-600 transition-colors appearance-none cursor-pointer"
                    /* onChange={(e) => setService(e.target.value)} */
                  >
                    <option value="" disabled selected>
                      Choose a premium service...
                    </option>
                    {services.map((srv, idx) => (
                      <option key={idx} value={srv}>
                        {srv}
                      </option>
                    ))}
                  </select>
                  {/* Custom Arrow for Select */}
                  <div className="absolute right-0 top-0 pointer-events-none text-gray-400">
                    ▼
                  </div>
                </div>
              </div>

              {/* 2. Select Date */}
              <div>
                <label className="text-xs font-semibold text-gray-900 uppercase tracking-widest mb-4 block">
                  Choose Date
                </label>
                <input
                  type="date"
                  className="w-full pb-3 border-b border-gray-300 bg-transparent text-gray-900 text-sm focus:outline-none focus:border-pink-600 transition-colors cursor-pointer"
                  /* onChange={(e) => setDate(e.target.value)} */
                />
              </div>

              {/* 3. Select Time Slot (Clickable Pills) */}
              <div>
                <label className="text-xs font-semibold text-gray-900 uppercase tracking-widest mb-4 block">
                  Available Slots
                </label>
                <div className="flex flex-wrap gap-3">
                  {timeSlots.map((time, idx) => (
                    <div
                      key={idx}
                      className="px-5 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-600 font-medium cursor-pointer hover:border-pink-600 hover:text-pink-600 transition-all duration-300"
                      /* onClick={() => setTimeSlot(time)} (आप सिलेक्टेड वाले को bg-pink-600 और text-white कर सकते हैं) */
                    >
                      {time}
                    </div>
                  ))}
                </div>
              </div>

              {/* 4. Personal Details (Floating Labels) */}
              <div className="flex flex-col sm:flex-row gap-8 pt-4 border-t border-gray-100">
                <div className="w-full relative group">
                  <input
                    type="text"
                    id="fullName"
                    required
                    className="w-full pb-3 border-b border-gray-300 bg-transparent text-gray-900 text-sm focus:outline-none focus:border-pink-600 transition-colors peer"
                    placeholder=" "
                  />
                  <label
                    htmlFor="fullName"
                    className="absolute left-0 top-0 text-gray-400 text-sm transition-all duration-300 peer-focus:-top-5 peer-focus:text-xs peer-focus:text-pink-600 peer-valid:-top-5 peer-valid:text-xs peer-valid:text-gray-500 cursor-text pointer-events-none"
                  >
                    Full Name
                  </label>
                </div>

                <div className="w-full relative group">
                  <input
                    type="tel"
                    id="phone"
                    required
                    className="w-full pb-3 border-b border-gray-300 bg-transparent text-gray-900 text-sm focus:outline-none focus:border-pink-600 transition-colors peer"
                    placeholder=" "
                  />
                  <label
                    htmlFor="phone"
                    className="absolute left-0 top-0 text-gray-400 text-sm transition-all duration-300 peer-focus:-top-5 peer-focus:text-xs peer-focus:text-pink-600 peer-valid:-top-5 peer-valid:text-xs peer-valid:text-gray-500 cursor-text pointer-events-none"
                  >
                    Phone Number
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full mt-4 px-10 py-4 bg-black text-white text-sm font-medium rounded-lg hover:bg-pink-600 hover:shadow-[0_10px_20px_-10px_rgba(219,39,119,0.5)] transition-all duration-300 cursor-pointer flex justify-center items-center gap-2"
              >
                Confirm Appointment <span>→</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
