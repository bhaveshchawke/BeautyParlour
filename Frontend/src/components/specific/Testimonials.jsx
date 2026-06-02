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
    <section className="bg-rose-50/30 font-sans py-20 lg:py-28">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-xs font-medium tracking-[0.2em] text-pink-600 uppercase mb-3 block">
            Real Experiences
          </span>
          <h2 className="text-3xl lg:text-4xl font-light text-gray-900 tracking-tight">
            Words From Our{" "}
            <span className="font-semibold text-black">Clients</span>
          </h2>
        </div>

        {/* Testimonial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {reviews.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white p-8 rounded-2xl border border-gray-100 shadow-[0_10px_40px_-20px_rgba(0,0,0,0.05)] flex flex-col relative"
            >
              {/* Quote Icon (Decorative) */}
              <div className="text-6xl text-pink-100 absolute top-4 right-6 font-serif leading-none">
                "
              </div>

              {/* Star Rating */}
              <div className="flex gap-1 mb-6">
                {[...Array(Math.floor(testimonial.rating))].map((_, i) => (
                  <span key={i} className="text-pink-500 text-sm">
                    ★
                  </span>
                ))}
                {testimonial.rating % 1 !== 0 && (
                  <span className="text-pink-500 text-sm">★</span>
                )}
              </div>

              {/* Review Text */}
              <p className="text-gray-600 font-light leading-relaxed text-sm mb-8 flex-grow relative z-10">
                "{testimonial.review}"
              </p>

              {/* Client Profile */}
              <div className="flex items-center gap-4 mt-auto pt-6 border-t border-gray-50">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-pink-50"
                />
                <div>
                  <h4 className="text-sm font-semibold text-gray-900">
                    {testimonial.name}
                  </h4>
                  <p className="text-xs text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
