import { useEffect, useState } from "react";
import { Link } from "react-router"; // Ensure you are using react-router-dom
import { getAllServies } from "../services/AdminService";

const CATEGORIES = ["All", "Face", "Hair", "Body", "Bridal"];

export const AllServices = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [services, setServices] = useState([]);

  // Filter logic (Static)
  const filteredServices =
    activeCategory === "All"
      ? services
      : services.filter((service) => service.category === activeCategory);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const response = await getAllServies();
        if (!response.data || response.data.length === 0) {
          setServices([]);
        } else {
          const activeServicesOnly = response.data.filter(
            (service) => service.active === true,
          );
          setServices(activeServicesOnly);
        }
      } catch (error) {
        setServices([]);
        console.log(error);
      }
    };
    fetchAll();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-20">
      {/* ─── 1. Page Header ───────────────────────────────────────────────── */}
      {/* मोबाइल के लिए py-12 px-4 और टेक्स्ट को text-3xl किया गया है */}
      <div className="w-full bg-slate-900 py-12 sm:py-24 px-4 sm:px-6 text-center relative overflow-hidden">
        {/* Subtle decorative glow */}
        <div className="absolute top-0 right-0 w-72 h-72 sm:w-96 sm:h-96 bg-rose-600/10 rounded-full blur-[80px] pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto">
          <span className="text-[10px] sm:text-xs font-bold tracking-[0.2em] text-rose-400 uppercase mb-3 sm:mb-4 block">
            Our Menu
          </span>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-light text-white tracking-tight mb-4 sm:mb-6">
            Discover Your{" "}
            <span className="font-semibold text-rose-300">Glow</span>
          </h1>
          <p className="text-slate-400 text-sm sm:text-base font-light max-w-xl mx-auto leading-relaxed px-2">
            From rejuvenating facials to advanced hair care and bridal
            perfection, explore our complete range of premium salon services.
          </p>
        </div>
      </div>

      {/* ─── 2. Main Content Area ─────────────────────────────────────────── */}
      {/* मोबाइल पर px-4 */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 sm:-mt-8 relative z-20">
        {/* Category Filters (Swipeable Pills) */}
        {/* मोबाइल पर स्मूद स्क्रॉलिंग के लिए वाइट बैकग्राउंड हटाकर बटन्स को स्टाइल किया गया है */}
        <div className="flex items-center justify-start sm:justify-center gap-2 sm:gap-3 overflow-x-auto custom-scrollbar scrollbar-hide mb-8 sm:mb-12 pb-2 sm:pb-0 px-2 sm:px-0">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 sm:px-6 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 whitespace-nowrap cursor-pointer shrink-0 border ${
                activeCategory === cat
                  ? "bg-rose-500 text-white border-rose-500 shadow-md shadow-rose-500/20"
                  : "bg-white text-slate-600 border-slate-200 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200 shadow-sm"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* ─── 3. Services Grid ───────────────────────────────────────────── */}
        {/* मोबाइल पर gap-6 और डेस्कटॉप पर gap-8 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
          {filteredServices.map((service) => (
            <div
              key={service._id}
              className="group bg-white rounded-2xl sm:rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-rose-100/50 transition-all duration-500 overflow-hidden flex flex-col cursor-pointer"
            >
              {/* Image Container */}
              <div className="relative aspect-[4/3] overflow-hidden bg-slate-100 shrink-0">
                <img
                  src={service.image}
                  alt={service.serviceTitle}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-3 left-3 sm:top-4 sm:left-4">
                  <span className="bg-white/90 backdrop-blur-sm text-slate-900 text-[9px] sm:text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full shadow-sm">
                    {service.category}
                  </span>
                </div>
              </div>

              {/* Content Area - मोबाइल के लिए p-5 */}
              <div className="p-5 sm:p-6 lg:p-8 flex flex-col flex-grow">
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-1.5 sm:mb-2 group-hover:text-rose-600 transition-colors line-clamp-1">
                  {service.serviceTitle}
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 font-light leading-relaxed mb-5 sm:mb-6 line-clamp-2">
                  {service.serviceDescription}
                </p>

                {/* Price & Duration */}
                <div className="mt-auto pt-4 sm:pt-5 border-t border-slate-100 flex items-center justify-between shrink-0">
                  <div>
                    <p className="text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5 sm:mb-1">
                      Starting at
                    </p>
                    <p className="text-base sm:text-lg font-bold text-slate-900">
                      ₹
                      {service.servicePrice?.toLocaleString("en-IN") ||
                        service.servicePrice}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5 sm:mb-1">
                      Duration
                    </p>
                    <p className="text-xs sm:text-sm font-semibold text-slate-700 flex items-center gap-1 justify-end">
                      <svg
                        className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-rose-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        ></path>
                      </svg>
                      {service.serviceDuration} Mins
                    </p>
                  </div>
                </div>

                {/* Action Button */}
                <Link
                  to="/appointment"
                  state={{ serviceName: service.serviceTitle }}
                  className="w-full mt-5 sm:mt-6 bg-slate-50 text-slate-900 border border-slate-200 hover:bg-rose-500 hover:text-white hover:border-rose-500 py-2.5 sm:py-3 rounded-xl text-sm font-bold transition-all duration-300 text-center block"
                >
                  Book Appointment
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredServices.length === 0 && (
          <div className="text-center py-16 sm:py-20">
            <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-1.5 sm:mb-2">
              No services found
            </h3>
            <p className="text-xs sm:text-sm text-slate-500">
              We are adding new services to this category soon.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
