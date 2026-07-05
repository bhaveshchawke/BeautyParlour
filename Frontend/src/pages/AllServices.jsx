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
          const activeServicesOnly = response.data.filter(service => service.active === true);
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
      <div className="w-full bg-slate-900 py-16 sm:py-24 px-6 text-center relative overflow-hidden">
        {/* Subtle decorative glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-rose-600/10 rounded-full blur-[80px] pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto">
          <span className="text-xs font-bold tracking-[0.2em] text-rose-400 uppercase mb-4 block">
            Our Menu
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light text-white tracking-tight mb-6">
            Discover Your{" "}
            <span className="font-semibold text-rose-300">Glow</span>
          </h1>
          <p className="text-slate-400 text-sm sm:text-base font-light max-w-xl mx-auto leading-relaxed">
            From rejuvenating facials to advanced hair care and bridal
            perfection, explore our complete range of premium salon services.
          </p>
        </div>
      </div>

      {/* ─── 2. Main Content Area ─────────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-6 lg:px-8 -mt-8 relative z-20">
        {/* Category Filters (Pill Tabs) */}
        <div className="bg-white rounded-full shadow-md shadow-slate-200/50 border border-slate-100 p-2 flex items-center justify-start sm:justify-center gap-2 overflow-x-auto scrollbar-hide mb-12 max-w-fit mx-auto">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 whitespace-nowrap cursor-pointer ${
                activeCategory === cat
                  ? "bg-rose-500 text-white shadow-md"
                  : "bg-transparent text-slate-600 hover:bg-rose-50 hover:text-rose-600"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* ─── 3. Services Grid ───────────────────────────────────────────── */}
        {/* 1 column on mobile, 2 on tablet, 3 on large screens */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
          {filteredServices.map((service) => (
            // Service Card (You can replace this with your actual <ServiceCard /> later)
            <div
              key={service._id}
              className="group bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-rose-100/50 transition-all duration-500 overflow-hidden flex flex-col cursor-pointer"
            >
              {/* Image Container */}
              <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                <img
                  src={service.image}
                  alt={service.serviceTitle}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-white/90 backdrop-blur-sm text-slate-900 text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full shadow-sm">
                    {service.category}
                  </span>
                </div>
              </div>

              {/* Content Area */}
              <div className="p-6 sm:p-8 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-rose-600 transition-colors">
                  {service.serviceTitle}
                </h3>
                <p className="text-sm text-slate-500 font-light leading-relaxed mb-6 line-clamp-2">
                  {service.serviceDescription}
                </p>

                {/* Price & Duration (Pushed to bottom) */}
                <div className="mt-auto pt-5 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
                      Starting at
                    </p>
                    <p className="text-lg font-bold text-slate-900">
                      {service.servicePrice}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
                      Duration
                    </p>
                    <p className="text-sm font-semibold text-slate-700 flex items-center gap-1">
                      <svg
                        className="w-4 h-4 text-rose-500"
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
                      {service.serviceDuration}
                    </p>
                  </div>
                </div>

                {/* Action Button */}
                <button className="w-full mt-6 bg-slate-50 text-slate-900 border border-slate-200 hover:bg-rose-500 hover:text-white hover:border-rose-500 py-3 rounded-xl text-sm font-bold transition-all duration-300">
                  Book Appointment
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State (if a category somehow has no services) */}
        {filteredServices.length === 0 && (
          <div className="text-center py-20">
            <h3 className="text-lg font-bold text-slate-900 mb-2">
              No services found
            </h3>
            <p className="text-sm text-slate-500">
              We are adding new services to this category soon.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
