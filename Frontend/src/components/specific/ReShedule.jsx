import { useState } from "react";
import { reshedule } from "../../services/AppointmentService";
import { useMessage } from "../../hooks/useMessage";

export const ReShedule = ({ onClose, appointmentId, onSuccess }) => {
  const { showMessage } = useMessage();

  // state for handling errors
  const [errors, setErrors] = useState({});

  // for storing input data in an obj
  const [data, setData] = useState({
    date: "",
    time: "",
  });

  // handle input data
  const handleChange = (e) => {
    const { name, value } = e.target;

    // जैसे ही यूजर टाइप करे, उस फील्ड का एरर हटा दें
    setErrors((prev) => ({ ...prev, [`${name}Error`]: "" }));

    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  // for sending data to backend
  const handleSubmit = async () => {
    const isValid = handleErrors();
    console.table(data);

    if (isValid) {
      try {
        const payload = { ...data, id: appointmentId };
        const response = await reshedule(payload);
        if (!response) {
          showMessage("Something went wrong!", "error");
          return;
        }
        showMessage(response.message, "success");
        if (response.data) {
          onSuccess(response.data);
        } else {
          onClose();
        }
      } catch (error) {
        showMessage(error.message, "error");
      }
    } else {
      showMessage("All fields are required!", "error");
    }
  };

  // handling errors
  const handleErrors = () => {
    const newErrors = {};
    // for date
    if (!data.date) {
      newErrors.dateError = "Date is required to reschedule";
    }
    // for time
    if (!data.time) {
      newErrors.timeError = "Time is required to reschedule";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    // Backdrop / Overlay
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4">
      {/* Modal Container */}
      <div className="bg-[#1a1a1a] w-full max-w-md rounded-2xl border border-gray-800 shadow-2xl overflow-hidden relative">
        {/* Top Glow - Pink Accent */}
        <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-pink-600 via-pink-400 to-pink-600"></div>

        {/* Header */}
        <div className="p-6 border-b border-gray-800 flex justify-between items-center bg-[#1a1a1a]">
          <h2 className="text-lg font-medium text-white">
            Reschedule{" "}
            <span className="text-pink-500 font-semibold">Appointment</span>
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-pink-500 hover:bg-pink-500/10 w-8 h-8 rounded-full flex items-center justify-center transition-colors cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Body - Inputs */}
        <div className="p-6 space-y-6">
          {/* Date Input */}
          <div>
            <label className="block text-[10px] font-medium text-gray-500 mb-2 uppercase tracking-widest">
              Select New Date
            </label>
            <input
              onChange={handleChange}
              value={data.date}
              name="date"
              type="date"
              className={`w-full bg-[#111111] text-gray-200 text-sm rounded-xl px-4 py-3 outline-none transition-all [color-scheme:dark] cursor-pointer ${
                errors.dateError
                  ? "border border-red-500/50 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                  : "border border-gray-800 focus:border-pink-500 focus:ring-1 focus:ring-pink-500"
              }`}
            />
            {/* Styled Error Message */}
            {errors.dateError && (
              <p className="text-red-400 text-[11px] mt-1.5 flex items-center gap-1 font-medium">
                <span className="text-red-500 text-sm">⚠</span>{" "}
                {errors.dateError}
              </p>
            )}
          </div>

          {/* Time Input */}
          <div>
            <label className="block text-[10px] font-medium text-gray-500 mb-2 uppercase tracking-widest">
              Select New Time
            </label>
            <input
              onChange={handleChange}
              value={data.time}
              name="time"
              type="time"
              className={`w-full bg-[#111111] text-gray-200 text-sm rounded-xl px-4 py-3 outline-none transition-all [color-scheme:dark] cursor-pointer ${
                errors.timeError
                  ? "border border-red-500/50 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                  : "border border-gray-800 focus:border-pink-500 focus:ring-1 focus:ring-pink-500"
              }`}
            />
            {/* Styled Error Message */}
            {errors.timeError && (
              <p className="text-red-400 text-[11px] mt-1.5 flex items-center gap-1 font-medium">
                <span className="text-red-500 text-sm">⚠</span>{" "}
                {errors.timeError}
              </p>
            )}
          </div>
        </div>

        {/* Footer - Actions */}
        <div className="p-5 border-t border-gray-800 flex gap-3 justify-end bg-[#111111]/50">
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-transparent border border-gray-700 text-gray-400 text-xs font-medium rounded-lg hover:bg-gray-800 hover:text-white transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-6 py-2.5 bg-pink-600 text-white text-xs font-medium rounded-lg hover:bg-pink-500 transition-all cursor-pointer shadow-[0_0_15px_rgba(236,72,153,0.2)] hover:shadow-[0_0_20px_rgba(236,72,153,0.4)]"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};
