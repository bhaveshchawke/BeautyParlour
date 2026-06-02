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
    // bg-gray-50 और पतले बॉर्डर से यह Hero और Services के बीच एक शानदार लाइन खींच देगा
    <div className="w-full bg-gray-50 border-y border-gray-100 py-10 font-sans hidden md:block">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between gap-6">
        {features.map((feature) => (
          <div
            key={feature.id}
            className="flex flex-col items-center text-center"
          >
            {feature.icon}
            <h4 className="text-sm font-semibold text-gray-900 tracking-wide uppercase mb-1">
              {feature.title}
            </h4>
            <p className="text-xs text-gray-500 font-light">
              {feature.subtitle}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
