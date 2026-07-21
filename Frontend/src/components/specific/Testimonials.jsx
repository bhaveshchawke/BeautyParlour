export const Testimonials = () => {
  const reviews = [
    {
      id: 1,
      name: "Aanya Sharma",
      role: "Regular Client",
      image:
        "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150",
      review:
        "The bridal package was an absolute dream! The makeup artists are true professionals. Plus, the free skincare kit I got with the combo offer is doing wonders for my skin.",
      rating: 5,
    },
    {
      id: 2,
      name: "Riya Verma",
      role: "Store Customer",
      image:
        "https://images.pexels.com/photos/1382731/pexels-photo-1382731.jpeg?auto=compress&cs=tinysrgb&w=150",
      review:
        "I order all my MAC and L'Oréal products from their store. 100% authentic products and the staff always recommends exactly what suits my skin type. Highly recommended!",
      rating: 5,
    },
    {
      id: 3,
      name: "Neha Kapoor",
      role: "Salon Client",
      image:
        "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=150",
      review:
        "Best hair spa in the city. The ambiance is so relaxing and hygienic. The glass of detox water they offer during the service just shows how much they care about details.",
      rating: 4.5,
    },
  ];

  return (
    // बहुत ही हल्का सा पिंक/ग्रे बैकग्राउंड ताकि सफेद वाले प्रोडक्ट्स सेक्शन से अलग दिखे
    // मोबाइल के लिए py-12 किया गया है
    <section className="bg-rose-50/30 font-sans py-12 md:py-20 lg:py-28">
      {/* मोबाइल के लिए px-4 किया गया है */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        {/* मोबाइल पर mb-10 ताकि टाइटल और कार्ड्स के बीच गैप सही रहे */}
        <div className="text-center mb-10 md:mb-16">
          <span className="text-xs font-medium tracking-[0.2em] text-pink-600 uppercase mb-2 md:mb-3 block">
            Real Experiences
          </span>
          <h2 className="text-3xl lg:text-4xl font-light text-gray-900 tracking-tight">
            Words From Our{" "}
            <span className="font-semibold text-black">Clients</span>
          </h2>
        </div>

        {/* Testimonial Grid */}
        {/* मोबाइल पर गैप-6 किया गया है ताकि कार्ड्स बहुत दूर न हों */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
          {reviews.map((testimonial) => (
            <div
              key={testimonial.id}
              // मोबाइल पर पैडिंग p-6 की गई है ताकि टेक्स्ट को थोड़ी ज्यादा जगह मिले
              className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-100 shadow-[0_10px_40px_-20px_rgba(0,0,0,0.05)] flex flex-col relative"
            >
              {/* Quote Icon (Decorative) */}
              <div className="text-5xl sm:text-6xl text-pink-100 absolute top-4 right-6 font-serif leading-none">
                "
              </div>

              {/* Star Rating */}
              <div className="flex gap-1 mb-5 sm:mb-6">
                {[...Array(Math.floor(testimonial.rating))].map((_, i) => (
                  <span key={i} className="text-pink-500 text-sm sm:text-base">
                    ★
                  </span>
                ))}
                {testimonial.rating % 1 !== 0 && (
                  <span className="text-pink-500 text-sm sm:text-base">★</span>
                )}
              </div>

              {/* Review Text */}
              <p className="text-gray-600 font-light leading-relaxed text-sm mb-6 sm:mb-8 flex-grow relative z-10">
                "{testimonial.review}"
              </p>

              {/* Client Profile */}
              <div className="flex items-center gap-4 mt-auto pt-5 sm:pt-6 border-t border-gray-50">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover border-2 border-pink-50"
                />
                <div>
                  <h4 className="text-sm font-semibold text-gray-900">
                    {testimonial.name}
                  </h4>
                  <p className="text-[11px] sm:text-xs text-gray-500">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
