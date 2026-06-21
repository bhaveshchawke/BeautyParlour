import { useState } from "react";
import { sendApintmentToBacekend } from "../services/AppointmentService";
import { useMessage } from "../hooks/useMessage";
import { Loader } from "../components/common/Loader";
export const ApointMent = () => {
  const { showMessage } = useMessage();
  const timeSlots = [
    "10:00 AM",
    "11:00 AM",
    "12:30 PM",
    "02:00 PM",
    "03:30 PM",
    "05:00 PM",
    "06:30 PM",
  ];

  const services = [
    "Hair Styling & Spa",
    "Advanced Skin Care",
    "Bridal & Party Makeup",
    "Nail Art & Extensions",
    "Relaxing Massage Therapy",
  ];
  const [data, setData] = useState({
    selecteService: "",
    selecteDate: "",
    selecteSlot: "",
    fullName: "",
    phone: "",
  });

  //newError state//
  const [newError, setNewError] = useState({});

  // ✅ FIX 1: Universal Handler for Inputs & Selects
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  // ✅ FIX 2: Custom Handler for Time Slot Divs
  const handleSlotClick = (time) => {
    setData((prev) => ({
      ...prev,
      selecteSlot: time,
    }));
  };
  //loading state//
  const [isLoading, setIsLoading] = useState(false);
  const handleErrors = () => {
    //for error handling
    const newErrors = {};

    if (!data.selecteService) {
      newErrors.selecteServiceError = "Please select a service";
    }

    if (!data.selecteDate) {
      newErrors.dateError = "Please select a date";
    }

    //for emtpy time slot //
    if (!data.selecteSlot) {
      newErrors.timeSlotError = "Time slot is required!";
    }
    //for empty userName//
    if (!data.fullName) {
      newErrors.fullNameError = "fullName is required!";
    }
    //for phone number//
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(data.phone)) {
      newErrors.phoneError = "Invalid contact number";
    }
    //adding errors in state//
    setNewError(newErrors);
    //return if error exist//
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let isValid = handleErrors();
    //if the handle error fun return zero errors//
    if (isValid) {
      try {
        // Map frontend state to match the backend model schema exactly
        const payload = {
          service: data.selecteService,
          date: data.selecteDate,
          timeSlot: data.selecteSlot,
          fullName: data.fullName,
          phone: data.phone,
        };
        setIsLoading(true);
        const response = await sendApintmentToBacekend(payload);
        showMessage(response.message, "success");
        setIsLoading(false);

        // Clear form after success
        setData({
          selecteService: "",
          selecteDate: "",
          selecteSlot: "",
          fullName: "",
          phone: "",
        });
      } catch (error) {
        console.error(error);
        showMessage(error.message, "error");
        setIsLoading(false);
      }
    } else {
      showMessage("Please fill all required fields", "error");
    }
  };

  return (
    <div className="bg-stone-50 min-h-screen font-sans pb-24">
      {/* 1. Dark Premium Header Banner */}
      <section className="bg-[#0a0a0a] py-20 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <span className="text-pink-600 font-medium tracking-[0.3em] uppercase text-xs block mb-3">
            Reserve Your Time
          </span>
          <h1 className="text-4xl lg:text-5xl font-light text-white tracking-tight mb-4">
            Book Your <span className="font-semibold">Experience</span>
          </h1>
          <p className="text-gray-400 font-light text-sm lg:text-base max-w-lg mx-auto">
            Choose your preferred service, date, and time. Our expert stylists
            will be ready to give you the ultimate pampering session.
          </p>
        </div>
      </section>

      {/* 2. Main Booking Container (Split Layout) */}
      <div className="max-w-6xl mx-auto px-6 lg:px-8 mt-[-40px] relative z-10">
        <div className="bg-white rounded-3xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.05)] overflow-hidden flex flex-col lg:flex-row border border-gray-100">
          {/* ================= LEFT SIDE (Aesthetic & Info) ================= */}
          <div className="w-full lg:w-2/5 bg-[#121212] relative overflow-hidden flex flex-col justify-between">
            {/* Image taking up top half of the left side */}
            <div className="h-64 w-full relative">
              <img
                src="https://images.pexels.com/photos/3993322/pexels-photo-3993322.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Spa Treatment"
                className="w-full h-full object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#121212] to-transparent"></div>
            </div>

            {/* Info Section */}
            <div className="p-10 text-white relative z-10">
              <h3 className="text-2xl font-light mb-6">
                Why Book With{" "}
                <span className="font-semibold text-pink-500">BeauTen?</span>
              </h3>

              <ul className="space-y-6">
                <li className="flex gap-4">
                  <span className="text-pink-500 text-xl">✦</span>
                  <div>
                    <h4 className="text-sm font-semibold tracking-wide">
                      No Waiting Time
                    </h4>
                    <p className="text-xs text-gray-400 font-light mt-1 leading-relaxed">
                      Your appointment time is strictly reserved just for you.
                    </p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="text-pink-500 text-xl">✦</span>
                  <div>
                    <h4 className="text-sm font-semibold tracking-wide">
                      Expert Consultation
                    </h4>
                    <p className="text-xs text-gray-400 font-light mt-1 leading-relaxed">
                      Get a free skin or hair analysis before your service
                      starts.
                    </p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="text-pink-500 text-xl">✦</span>
                  <div>
                    <h4 className="text-sm font-semibold tracking-wide">
                      100% Sanitized
                    </h4>
                    <p className="text-xs text-gray-400 font-light mt-1 leading-relaxed">
                      We strictly use sterilized tools and authentic products.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* ================= RIGHT SIDE (Booking Form) ================= */}
          <div className="w-full lg:w-3/5 p-8 lg:p-14">
            <h3 className="text-2xl font-light text-gray-900 mb-8">
              Appointment <span className="font-semibold">Details</span>
            </h3>

            {/* यहाँ आप अपना onSubmit लॉजिक लगाएंगे */}
            <form className="flex flex-col gap-10" onSubmit={handleSubmit}>
              {/* 1. Select Service */}
              <div>
                <label className="text-xs font-semibold text-gray-900 uppercase tracking-widest mb-4 block">
                  Select Service
                </label>
                <div className="relative">
                  <select
                    onChange={handleInputChange}
                    name="selecteService"
                    value={data.selecteService}
                    className="w-full pb-3 border-b border-gray-300 bg-transparent text-gray-900 text-sm focus:outline-none focus:border-pink-600 transition-colors appearance-none cursor-pointer"
                  >
                    <option value="" disabled>
                      Choose a premium service...
                    </option>
                    {services.map((srv, idx) => (
                      <option key={idx} value={srv}>
                        {srv}
                      </option>
                    ))}
                  </select>
                  {/* Custom Arrow for Select */}
                  <div className="absolute right-0 top-0 pointer-events-none text-gray-400">
                    ▼
                  </div>
                </div>
                {/* 🎨 SERVICE ERROR DIV STYLED HERE */}
                <div className="text-[10px] text-red-500 font-medium mt-1">
                  {newError.selecteServiceError}
                </div>
              </div>

              {/* 2. Select Date */}
              <div>
                <label className="text-xs font-semibold text-gray-900 uppercase tracking-widest mb-4 block">
                  Choose Date
                </label>
                <input
                  type="date"
                  name="selecteDate"
                  value={data.selecteDate}
                  onChange={handleInputChange}
                  className="w-full pb-3 border-b border-gray-300 bg-transparent text-gray-900 text-sm focus:outline-none focus:border-pink-600 transition-colors cursor-pointer"
                />
                {/* 🎨 DATE ERROR DIV STYLED HERE */}
                <div className="text-[10px] text-red-500 font-medium mt-1">
                  {newError.dateError}
                </div>
              </div>

              {/* 3. Select Time Slot (Clickable Pills) */}
              <div>
                <label className="text-xs font-semibold text-gray-900 uppercase tracking-widest mb-4 block">
                  Available Slots
                </label>
                <div className="flex flex-wrap gap-3">
                  {timeSlots.map((time, idx) => (
                    <div
                      key={idx}
                      onClick={() => handleSlotClick(time)}
                      className={`px-5 py-2.5 border rounded-lg text-sm font-medium cursor-pointer transition-all duration-300
                        ${
                          data.selecteSlot === time
                            ? "border-pink-600 bg-pink-600 text-white"
                            : "border-gray-200 text-gray-600 hover:border-pink-600 hover:text-pink-600"
                        }`}
                    >
                      {time}
                    </div>
                  ))}
                </div>
                {/* 🎨 TIME SLOT ERROR DIV STYLED HERE */}
                <div className="text-[10px] text-red-500 font-medium mt-2">
                  {newError.timeSlotError}
                </div>
              </div>

              {/* 4. Personal Details (Floating Labels) */}
              <div className="flex flex-col sm:flex-row gap-8 pt-4 border-t border-gray-100">
                <div className="w-full relative group">
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={data.fullName}
                    onChange={handleInputChange}
                    required
                    className="w-full pb-3 border-b border-gray-300 bg-transparent text-gray-900 text-sm focus:outline-none focus:border-pink-600 transition-colors peer"
                    placeholder=" "
                  />
                  <label
                    htmlFor="fullName"
                    className="absolute left-0 top-0 text-gray-400 text-sm transition-all duration-300 peer-focus:-top-5 peer-focus:text-xs peer-focus:text-pink-600 peer-valid:-top-5 peer-valid:text-xs peer-valid:text-gray-500 cursor-text pointer-events-none"
                  >
                    Full Name
                  </label>
                  {/* 🎨 FULL NAME ERROR DIV STYLED HERE */}
                  <div className="absolute -bottom-5 left-0 text-[10px] text-red-500 font-medium">
                    {newError.fullNameError}
                  </div>
                </div>

                <div className="w-full relative group">
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={data.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full pb-3 border-b border-gray-300 bg-transparent text-gray-900 text-sm focus:outline-none focus:border-pink-600 transition-colors peer"
                    placeholder=" "
                  />
                  <label
                    htmlFor="phone"
                    className="absolute left-0 top-0 text-gray-400 text-sm transition-all duration-300 peer-focus:-top-5 peer-focus:text-xs peer-focus:text-pink-600 peer-valid:-top-5 peer-valid:text-xs peer-valid:text-gray-500 cursor-text pointer-events-none"
                  >
                    Phone Number
                  </label>
                  {/* 🎨 PHONE ERROR DIV STYLED HERE */}
                  <div className="absolute -bottom-5 left-0 text-[10px] text-red-500 font-medium">
                    {newError.phoneError}
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full mt-4 px-10 py-4 text-white text-sm font-medium rounded-lg flex justify-center items-center gap-2 transition-all duration-300
    ${
      isLoading
        ? "bg-gray-400 cursor-not-allowed"
        : "bg-black hover:bg-pink-600 hover:shadow-[0_10px_20px_-10px_rgba(219,39,119,0.5)] cursor-pointer"
    }`}
              >
                {isLoading ? <Loader /> : "Confirm Appointment"} <span>→</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
