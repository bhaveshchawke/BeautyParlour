import { CiMedal, CiFaceSmile, CiDroplet, CiStar } from "react-icons/ci";

export const BrandRibbon = () => {
  const features = [
    {
      id: 1,
      icon: <CiMedal className="text-pink-600 text-3xl mb-2" />,
      title: "Premium Brands",
      subtitle: "100% Authentic Products",
    },
    {
      id: 2,
      icon: <CiFaceSmile className="text-pink-600 text-3xl mb-2" />,
      title: "Expert Artists",
      subtitle: "Highly Trained Professionals",
    },
    {
      id: 3,
      icon: <CiDroplet className="text-pink-600 text-3xl mb-2" />,
      title: "Hygienic Space",
      subtitle: "Sanitized After Every Client",
    },
    {
      id: 4,
      icon: <CiStar className="text-pink-600 text-3xl mb-2" />,
      title: "4.9/5 Rated",
      subtitle: "Loved by 1000+ Customers",
    },
  ];

  return (
    <div className="w-full bg-gray-50 border-y border-gray-100 py-8 md:py-10 font-sans">
      {/* 
        flex-nowrap और overflow-x-auto का उपयोग किया गया है, 
        जिससे मोबाइल पर ये एक ही लाइन में (horizontal) रहेंगे और स्वाइप किए जा सकेंगे।
      */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 flex items-center justify-start md:justify-between gap-8 md:gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide">
        {features.map((feature) => (
          <div
            key={feature.id}
            // min-w-[160px] दिया गया है ताकि मोबाइल पर आइटम्स सिकुड़ें नहीं
            className="flex flex-col items-center text-center shrink-0 min-w-[160px] md:min-w-0 snap-center"
          >
            {feature.icon}
            <h4 className="text-xs sm:text-sm font-semibold text-gray-900 tracking-wide uppercase mb-1 whitespace-nowrap">
              {feature.title}
            </h4>
            <p className="text-[10px] sm:text-xs text-gray-500 font-light whitespace-nowrap">
              {feature.subtitle}
            </p>
          </div>
        ))}
      </div>

      {/* 
        Scrollbar छुपाने के लिए (Optionally) आप अपनी global CSS में यह जोड़ सकते हैं:
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      */}
    </div>
  );
};
