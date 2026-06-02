import { ServiceCard } from "./ServiceCard";

export const Services = () => {
  const servicesData = [
    {
      id: 1,
      title: "Hair Styling & Spa",
      description:
        "Expert cuts, coloring, and deep conditioning spa treatments for a flawless look.",
      price: "₹499",
      image:
        "https://images.pexels.com/photos/3993444/pexels-photo-3993444.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
    {
      id: 2,
      title: "Advanced Skin Care",
      description:
        "Rejuvenating facials and skin treatments using premium, dermatologist-tested products.",
      price: "₹899",
      image:
        "https://images.pexels.com/photos/3993322/pexels-photo-3993322.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
    {
      id: 3,
      title: "Bridal & Party Makeup",
      description:
        "HD and airbrush makeup by professional artists to make your special day unforgettable.",
      price: "₹2499",
      image:
        "https://images.pexels.com/photos/2442904/pexels-photo-2442904.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
  ];

  return (
    <section className="bg-white font-sans py-20 lg:py-28">
      {/* 
        बदलाव: max-w-7xl को max-w-6xl कर दिया गया है ताकि कार्ड्स ज्यादा न फैलें। 
        px-6 lg:px-8 से साइड में अच्छी जगह मिलेगी।
      */}
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center md:text-left mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="text-xs font-medium tracking-[0.2em] text-pink-600 uppercase mb-3 block">
              Our Expertise
            </span>
            <h2 className="text-3xl lg:text-4xl font-light text-gray-900 tracking-tight">
              Signature{" "}
              <span className="font-semibold text-black">Treatments</span>
            </h2>
          </div>

          {/* View All Button */}
          <button className="group flex items-center gap-2 text-sm font-medium text-gray-900 hover:text-pink-600 transition-colors pb-1 border-b border-gray-900 hover:border-pink-600 self-start md:self-end cursor-pointer">
            Explore All Services
            <span className="transform group-hover:translate-x-1 transition-transform duration-300">
              →
            </span>
          </button>
        </div>

        {/* 
          बदलाव: gap-8 lg:gap-10 को बढ़ाकर gap-10 lg:gap-14 कर दिया गया है।
          इससे कार्ड्स के बीच में एकदम परफेक्ट दूरी (Distance) बन जाएगी। 
        */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-14">
          {servicesData.map((service) => (
            // बदलाव: key prop को यहाँ Map के अंदर लगाया गया है (Best Practice)
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
};
