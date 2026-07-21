import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom"; // ✅ FIX 1: react-dom की जगह react-router-dom
import { sendApintmentToBacekend } from "../services/AppointmentService";
import { useMessage } from "../hooks/useMessage";
import { Loader } from "../components/common/Loader";
import { getAllServies } from "../services/AdminService";

export const ApointMent = () => {
  const { showMessage } = useMessage();
  const location = useLocation();

  const timeSlots = [
    "10:00 AM",
    "11:00 AM",
    "12:30 PM",
    "02:00 PM",
    "03:30 PM",
    "05:00 PM",
    "06:30 PM",
  ];

  const preselectedService = location.state?.serviceName || "";

  const [dbServices, setDbServices] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [newError, setNewError] = useState({});

  // ✅ FIX 2: Spelling mistakes in state keys fixed
  const [data, setData] = useState({
    selectedService: preselectedService,
    selectedDate: "",
    selectedSlot: "",
    fullName: "",
    phone: "",
  });

  // ─── Fetch Services ──────────────────────────────────────────────
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await getAllServies();
        if (response && response.data) {
          const activeServicesOnly = response.data.filter(
            (service) => service.active === true,
          );
          setDbServices(activeServicesOnly);
        }
      } catch (error) {
        console.error("Failed to load services", error);
      }
    };
    fetchServices();
  }, []);

  // ─── Handlers ──────────────────────────────────────────────────
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field as user types
    if (newError[`${name}Error`]) {
      setNewError((prev) => ({ ...prev, [`${name}Error`]: "" }));
    }
  };

  const handleSlotClick = (time) => {
    setData((prev) => ({
      ...prev,
      selectedSlot: time,
    }));
    setNewError((prev) => ({ ...prev, timeSlotError: "" }));
  };

  // ─── Validation ────────────────────────────────────────────────
  const handleErrors = () => {
    const newErrors = {};

    if (
      !data.selectedService ||
      data.selectedService === "General Consultation"
    ) {
      newErrors.selectedServiceError = "Please select a valid service";
    }
    if (!data.selectedDate) {
      newErrors.dateError = "Please select a date";
    }
    if (!data.selectedSlot) {
      newErrors.timeSlotError = "Time slot is required";
    }
    if (!data.fullName.trim()) {
      newErrors.fullNameError = "Full name is required";
    }
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(data.phone)) {
      newErrors.phoneError = "Invalid 10-digit contact number";
    }

    setNewError(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ─── Submit ────────────────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();
    let isValid = handleErrors();

    if (isValid) {
      try {
        const payload = {
          service: data.selectedService,
          date: data.selectedDate,
          timeSlot: data.selectedSlot,
          fullName: data.fullName,
          phone: data.phone,
        };

        setIsLoading(true);
        const response = await sendApintmentToBacekend(payload);
        showMessage(response.message || "Appointment Confirmed!", "success");
        setIsLoading(false);

        setData({
          selectedService: "",
          selectedDate: "",
          selectedSlot: "",
          fullName: "",
          phone: "",
        });
      } catch (error) {
        console.error(error);
        showMessage(error.message || "Booking failed. Try again.", "error");
        setIsLoading(false);
      }
    } else {
      showMessage("Please fill all required fields correctly.", "error");
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen font-sans pb-24">
      {/* ─── 1. Premium Header Banner ─────────────────────────────────── */}
      {/* मोबाइल के लिए py-12 px-4 और टेक्स्ट साइज़ को एडजस्ट किया गया है */}
      <section className="bg-slate-900 py-12 sm:py-20 px-4 sm:px-6 text-center relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-72 sm:w-96 h-72 sm:h-96 bg-rose-600/10 rounded-full blur-[80px] pointer-events-none" />
        <div className="max-w-3xl mx-auto relative z-10">
          <span className="text-rose-400 font-bold tracking-[0.2em] uppercase text-[10px] sm:text-xs block mb-3 sm:mb-4 border border-rose-500/20 bg-rose-500/10 py-1.5 px-4 rounded-full w-fit mx-auto">
            Reserve Your Time
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white tracking-tight mb-4 sm:mb-5">
            Book Your{" "}
            <span className="font-bold text-rose-500">Experience</span>
          </h1>
          <p className="text-slate-400 font-light text-xs sm:text-sm lg:text-base max-w-lg mx-auto leading-relaxed px-2">
            Choose your preferred service, date, and time. Our expert stylists
            will be ready to give you the ultimate pampering session.
          </p>
        </div>
      </section>

      {/* ─── 2. Main Booking Container (Split Layout) ───────────────── */}
      {/* मोबाइल के लिए px-4 और -mt-6 ताकि बैनर के साथ अच्छा लुक आए */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 sm:-mt-10 relative z-20">
        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl shadow-slate-200/50 overflow-hidden flex flex-col lg:flex-row border border-slate-100">
          {/* ================= LEFT SIDE (Aesthetic & Info) ================= */}
          <div className="w-full lg:w-2/5 bg-slate-900 relative overflow-hidden flex flex-col justify-between">
            <div className="h-48 sm:h-64 lg:h-72 w-full relative">
              <img
                src="https://images.unsplash.com/photo-1600334129128-685c5582fd35?q=80&w=800&auto=format&fit=crop"
                alt="Spa Treatment"
                className="w-full h-full object-cover opacity-60"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent"></div>
            </div>

            <div className="p-6 sm:p-8 lg:p-10 text-white relative z-10">
              <h3 className="text-xl sm:text-2xl font-light mb-6 sm:mb-8">
                Why Choose <br />
                <span className="font-bold text-rose-400">
                  Shree Sai Parlour?
                </span>
              </h3>

              <ul className="space-y-4 sm:space-y-6">
                <li className="flex gap-3 sm:gap-4">
                  <span className="text-rose-500 text-lg sm:text-xl">✦</span>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold tracking-wide">
                      No Waiting Time
                    </h4>
                    <p className="text-[11px] sm:text-xs text-slate-400 font-light mt-1 leading-relaxed">
                      Your appointment time is strictly reserved just for you.
                    </p>
                  </div>
                </li>
                <li className="flex gap-3 sm:gap-4">
                  <span className="text-rose-500 text-lg sm:text-xl">✦</span>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold tracking-wide">
                      Expert Consultation
                    </h4>
                    <p className="text-[11px] sm:text-xs text-slate-400 font-light mt-1 leading-relaxed">
                      Get a free skin or hair analysis before your service
                      starts.
                    </p>
                  </div>
                </li>
                <li className="flex gap-3 sm:gap-4">
                  <span className="text-rose-500 text-lg sm:text-xl">✦</span>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold tracking-wide">
                      100% Sanitized
                    </h4>
                    <p className="text-[11px] sm:text-xs text-slate-400 font-light mt-1 leading-relaxed">
                      We strictly use sterilized tools and authentic products.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* ================= RIGHT SIDE (Booking Form) ================= */}
          <div className="w-full lg:w-3/5 p-5 sm:p-10 lg:p-14">
            <h3 className="text-xl sm:text-2xl font-light text-slate-900 mb-6 sm:mb-8">
              Appointment <span className="font-bold">Details</span>
            </h3>

            <form
              className="flex flex-col gap-6 sm:gap-8"
              onSubmit={handleSubmit}
            >
              {/* 1. Select Service */}
              <div>
                <label className="text-[11px] sm:text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 sm:mb-3 block">
                  Select Service
                </label>
                <div className="relative">
                  <select
                    onChange={handleInputChange}
                    name="selectedService"
                    value={data.selectedService}
                    className={`w-full pb-3 border-b bg-transparent text-slate-900 text-sm focus:outline-none focus:border-rose-500 transition-colors appearance-none cursor-pointer ${
                      newError.selectedServiceError
                        ? "border-red-400"
                        : "border-slate-200"
                    }`}
                  >
                    <option value="" disabled>
                      Choose a premium service...
                    </option>
                    <option value="General Consultation">
                      General Consultation (Not Sure)
                    </option>
                    {dbServices.map((srv) => (
                      <option key={srv._id} value={srv.serviceTitle}>
                        {srv.serviceTitle} - ₹{srv.servicePrice}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-0 top-0 pointer-events-none text-slate-400 text-xs">
                    ▼
                  </div>
                </div>
                {newError.selectedServiceError && (
                  <div className="text-[10px] text-red-500 font-medium mt-1.5">
                    {newError.selectedServiceError}
                  </div>
                )}
              </div>

              {/* 2. Select Date */}
              <div>
                <label className="text-[11px] sm:text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 sm:mb-3 block">
                  Choose Date
                </label>
                <input
                  type="date"
                  name="selectedDate"
                  value={data.selectedDate}
                  onChange={handleInputChange}
                  className={`w-full pb-3 border-b bg-transparent text-slate-900 text-sm focus:outline-none focus:border-rose-500 transition-colors cursor-pointer [color-scheme:light] ${
                    newError.dateError ? "border-red-400" : "border-slate-200"
                  }`}
                />
                {newError.dateError && (
                  <div className="text-[10px] text-red-500 font-medium mt-1.5">
                    {newError.dateError}
                  </div>
                )}
              </div>

              {/* 3. Select Time Slot (Pills) */}
              <div>
                <label className="text-[11px] sm:text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 sm:mb-3 block">
                  Available Slots
                </label>
                <div className="flex flex-wrap gap-2">
                  {timeSlots.map((time, idx) => (
                    <div
                      key={idx}
                      onClick={() => handleSlotClick(time)}
                      className={`px-3.5 py-2 sm:px-5 sm:py-2.5 border rounded-xl text-xs sm:text-sm font-semibold cursor-pointer transition-all duration-300 ${
                        data.selectedSlot === time
                          ? "border-rose-500 bg-rose-500 text-white shadow-md shadow-rose-500/20"
                          : "border-slate-200 text-slate-600 hover:border-rose-300 hover:text-rose-500 bg-slate-50"
                      }`}
                    >
                      {time}
                    </div>
                  ))}
                </div>
                {newError.timeSlotError && (
                  <div className="text-[10px] text-red-500 font-medium mt-2">
                    {newError.timeSlotError}
                  </div>
                )}
              </div>

              {/* 4. Personal Details */}
              {/* मोबाइल पर दोनों इनपुट्स एक के नीचे एक (flex-col) आएंगे ताकि जगह कम न पड़े */}
              <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 pt-4 border-t border-slate-100">
                <div className="w-full relative group mt-2">
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={data.fullName}
                    onChange={handleInputChange}
                    className={`w-full pb-3 border-b bg-transparent text-slate-900 text-sm focus:outline-none focus:border-rose-500 transition-colors peer placeholder-transparent ${
                      newError.fullNameError
                        ? "border-red-400"
                        : "border-slate-200"
                    }`}
                    placeholder="Full Name"
                  />
                  <label
                    htmlFor="fullName"
                    className="absolute left-0 top-0 text-slate-400 text-sm transition-all duration-300 peer-placeholder-shown:top-0 peer-placeholder-shown:text-sm peer-placeholder-shown:text-slate-400 peer-focus:-top-5 peer-focus:text-[11px] peer-focus:text-rose-500 peer-focus:font-bold -top-5 text-[11px] font-bold cursor-text pointer-events-none uppercase tracking-wider"
                  >
                    Full Name
                  </label>
                  {newError.fullNameError && (
                    <div className="absolute -bottom-5 left-0 text-[10px] text-red-500 font-medium">
                      {newError.fullNameError}
                    </div>
                  )}
                </div>

                <div className="w-full relative group mt-2">
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={data.phone}
                    onChange={handleInputChange}
                    className={`w-full pb-3 border-b bg-transparent text-slate-900 text-sm focus:outline-none focus:border-rose-500 transition-colors peer placeholder-transparent ${
                      newError.phoneError
                        ? "border-red-400"
                        : "border-slate-200"
                    }`}
                    placeholder="Phone Number"
                  />
                  <label
                    htmlFor="phone"
                    className="absolute left-0 top-0 text-slate-400 text-sm transition-all duration-300 peer-placeholder-shown:top-0 peer-placeholder-shown:text-sm peer-placeholder-shown:text-slate-400 peer-focus:-top-5 peer-focus:text-[11px] peer-focus:text-rose-500 peer-focus:font-bold -top-5 text-[11px] font-bold cursor-text pointer-events-none uppercase tracking-wider"
                  >
                    Phone Number
                  </label>
                  {newError.phoneError && (
                    <div className="absolute -bottom-5 left-0 text-[10px] text-red-500 font-medium">
                      {newError.phoneError}
                    </div>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full mt-6 px-10 py-3.5 sm:py-4 text-white text-sm font-bold rounded-full flex justify-center items-center gap-2 transition-all duration-300 active:scale-[0.98] ${
                  isLoading
                    ? "bg-slate-400 cursor-not-allowed"
                    : "bg-slate-900 hover:bg-rose-500 hover:shadow-lg hover:shadow-rose-500/30 cursor-pointer"
                }`}
              >
                {isLoading ? <Loader inButton={true} /> : "Confirm Appointment"}
                {!isLoading && <span>→</span>}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
