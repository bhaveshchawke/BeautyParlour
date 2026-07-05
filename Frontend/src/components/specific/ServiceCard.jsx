import { useNavigate } from "react-router";

export const ServiceCard = ({ service }) => {
  const navigate = useNavigate();

  const handleBookNow = () => {
    // Navigate karte waqt state me service ka naam bhej rahe hain
    navigate("/appointment", { state: { serviceName: service.serviceTitle } });
  };
  return (
    <div className="group flex flex-col bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] hover:border-gray-200 transition-all duration-500">
      {/* Image Container: aspect-[3/2] से इमेज थोड़ी कम लंबी और ज्यादा स्लीक दिखेगी */}
      <div className="w-full aspect-[3/2] overflow-hidden bg-gray-50 relative">
        <img
          src={service.image}
          alt={service.serviceTitle}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-in-out"
        />
      </div>

      {/* Card Content: Padding को थोड़ा बैलेंस किया गया है (p-6 lg:p-7) */}
      <div className="p-6 lg:p-7 flex flex-col flex-grow">
        <h3 className="text-xl font-medium text-gray-900 mb-3">
          {service.serviceTitle}
        </h3>
        <p className="text-gray-500 font-light leading-relaxed text-sm mb-6 flex-grow">
          {service.serviceDescription}
        </p>

        {/* Footer of Card */}
        <div className="flex items-center justify-between pt-5 border-t border-gray-100 mt-auto">
          <div className="flex flex-col">
            <span className="text-xs text-gray-400 font-light uppercase tracking-wider">
              Starts at
            </span>
            <span className="text-base font-semibold text-gray-900">
              {service.servicePrice}
            </span>
          </div>

          <button
            onClick={handleBookNow}
            className="flex items-center gap-1.5 text-sm font-medium text-pink-600 hover:text-pink-700 cursor-pointer"
          >
            Book Now
            <span className="transform group-hover:translate-x-1 transition-transform duration-300">
              →
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
