import { ServiceCard } from "./ServiceCard";
import { getAllServies } from "../../services/AdminService";
import { useEffect, useState } from "react";
import { Link } from "react-router";

export const Services = () => {
  //__state-for-serices_______________________________________
  const [servicesData, setServicesData] = useState([]);

  //__func for getting services_______________________________________________
  useEffect(() => {
    const getServices = async () => {
      try {
        const response = await getAllServies();
        if (response && response.data) {
          const activeServicesOnly = response.data.filter(
            (service) => service.active === true,
          );
          setServicesData(activeServicesOnly);
        }
      } catch (error) {
        setServicesData([]);
      }
    };
    getServices();
  }, []);
  // console.log(servicesData); // Removed to prevent performance lag

  return (
    // मोबाइल के लिए py-12 किया गया है ताकि ऊपर-नीचे ज्यादा खाली जगह न दिखे
    <section className="bg-white font-sans py-12 md:py-20 lg:py-28">
      {/* 
        मोबाइल के लिए px-4 sm:px-6 कर दिया गया है। 
      */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header: मोबाइल पर mb-10 और items-center ताकि बटन और टेक्स्ट सेंटर में रहें */}
        <div className="text-center md:text-left mb-10 md:mb-16 flex flex-col md:flex-row items-center md:items-end justify-between gap-6">
          <div>
            <span className="text-xs font-medium tracking-[0.2em] text-pink-600 uppercase mb-2 md:mb-3 block">
              Our Expertise
            </span>
            <h2 className="text-3xl lg:text-4xl font-light text-gray-900 tracking-tight">
              Signature{" "}
              <span className="font-semibold text-black">Treatments</span>
            </h2>
          </div>

          {/* View All Button: self-start को हटा दिया गया है क्योंकि ऊपर items-center इसे मोबाइल पर अपने आप सेंटर कर देगा */}
          <Link
            to={"services"}
            className="group flex items-center gap-2 text-sm font-medium text-gray-900 hover:text-pink-600 transition-colors pb-1 border-b border-gray-900 hover:border-pink-600 cursor-pointer"
          >
            Explore All Services
            <span className="transform group-hover:translate-x-1 transition-transform duration-300">
              →
            </span>
          </Link>
        </div>

        {/* मोबाइल पर गैप को gap-8 (32px) कर दिया गया है ताकि कार्ड्स बहुत दूर न भागें */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 lg:gap-14">
          {servicesData.map((service) => (
            <ServiceCard key={service._id} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
};
