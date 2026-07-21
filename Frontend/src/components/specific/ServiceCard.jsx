import { useNavigate } from "react-router";

export const ServiceCard = ({ service }) => {
  const navigate = useNavigate();

  const handleBookNow = () => {
    // Navigate karte waqt state me service ka naam bhej rahe hain
    navigate("/appointment", { state: { serviceName: service.serviceTitle } });
  };

  return (
    // h-full जोड़ा गया है ताकि ग्रिड में सभी कार्ड्स एक समान ऊँचाई (height) के रहें
    <div className="group flex flex-col bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] hover:border-gray-200 transition-all duration-500 h-full">
      {/* Image Container: aspect-[3/2] से इमेज थोड़ी कम लंबी और ज्यादा स्लीक दिखेगी */}
      <div className="w-full aspect-[3/2] overflow-hidden bg-gray-50 relative shrink-0">
        <img
          src={service.image}
          alt={service.serviceTitle}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-in-out"
        />
      </div>

      {/* Card Content: मोबाइल के लिए p-5, टैबलेट के लिए sm:p-6 और डेस्कटॉप के लिए lg:p-7 */}
      <div className="p-5 sm:p-6 lg:p-7 flex flex-col flex-grow">
        {/* line-clamp-1 सुनिश्चित करेगा कि टाइटल 1 लाइन से ज्यादा न ले */}
        <h3 className="text-lg sm:text-xl font-medium text-gray-900 mb-2 sm:mb-3 line-clamp-1 title-font">
          {service.serviceTitle}
        </h3>
        {/* line-clamp-3 सुनिश्चित करेगा कि डिस्क्रिप्शन सिर्फ 3 लाइनों में रहे ताकि कार्ड का साइज़ न बिगड़े */}
        <p className="text-gray-500 font-light leading-relaxed text-xs sm:text-sm mb-5 sm:mb-6 flex-grow line-clamp-3">
          {service.serviceDescription}
        </p>

        {/* Footer of Card */}
        <div className="flex items-center justify-between pt-4 sm:pt-5 border-t border-gray-100 mt-auto shrink-0">
          <div className="flex flex-col">
            <span className="text-[10px] sm:text-xs text-gray-400 font-light uppercase tracking-wider">
              Starts at
            </span>
            <span className="text-sm sm:text-base font-semibold text-gray-900">
              ₹
              {service.servicePrice?.toLocaleString("en-IN") ||
                service.servicePrice}
            </span>
          </div>

          {/* मोबाइल पर टैप एरिया बढ़ाने के लिए हल्की सी पैडिंग दी है */}
          <button
            onClick={handleBookNow}
            className="flex items-center gap-1.5 text-xs sm:text-sm font-medium text-pink-600 hover:text-pink-700 cursor-pointer py-2 pl-2"
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
