import { useParams, Link } from "react-router";
import { useEffect, useState } from "react";
import { getAppointmentByIdFromBackend } from "../services/AppointmentService";
import { cancelApointment } from "../services/AppointmentService";
import { Loader } from "../components/common/Loader";
import { useMessage } from "../hooks/useMessage";
export const AppointmentDetail = () => {
  const { id } = useParams();
  const { showMessage } = useMessage();
  // Data ko store karne ke liye State
  const [appointmentData, setAppointmentData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const response = await getAppointmentByIdFromBackend(id);
        if (response.success) {
          setAppointmentData(response.data); // Data state me save kar liya
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false); // Data aane ke baad loading false kar di
      }
    };
    fetchDetail();
  }, [id]); // Jab bhi ID change hogi, effect chalega

  //for cancel appointment //
  const handleCalcelAppointment = async () => {
    try {
      const response = await cancelApointment(id);
      if (!response) {
        showMessage("Something went wrong!", "error");
        return;
      }
      showMessage(response.message, "success");
      if (response) {
        setAppointmentData((prevAppointments) => {
          return {
            ...prevAppointments,
            status: response.data.status,
          };
        });
      }
    } catch (error) {
      showMessage(error.message, "error");
    }
  };
  if (loading) return <Loader />;
  if (!appointmentData)
    return (
      <div className="text-white text-center mt-20">Appointment not found</div>
    );

  // Helper function to get colors based on status
  const getStatusColors = (status) => {
    switch (status?.toLowerCase()) {
      case "cancelled":
        return {
          badge: "bg-red-500/10 text-red-400 border-red-500/20",
          dot: "bg-red-400",
          glow: "from-red-600 via-red-400 to-red-600",
        };
      case "completed":
      case "confirmed":
        return {
          badge: "bg-green-500/10 text-green-400 border-green-500/20",
          dot: "bg-green-400",
          glow: "from-green-600 via-green-400 to-green-600",
        };
      case "pending":
      default:
        return {
          badge: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
          dot: "bg-yellow-400",
          glow: "from-yellow-600 via-yellow-400 to-yellow-600",
        };
    }
  };

  const statusColors = getStatusColors(appointmentData.status);

  return (
    <div className="bg-[#111111] min-h-screen font-sans py-8 lg:py-12 text-gray-200">
      <div className="max-w-2xl mx-auto px-4 lg:px-6">
        {/* Header & Back Button */}
        <div className="flex items-center gap-4 mb-6 border-b border-gray-800 pb-4">
          <Link
            to={"/profile"}
            className="w-8 h-8 bg-[#1a1a1a] border border-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:text-pink-500 hover:border-pink-500/50 transition-all cursor-pointer text-sm"
          >
            ←
          </Link>
          <h1 className="text-xl lg:text-2xl font-light text-white tracking-tight">
            Appointment{" "}
            <span className="font-semibold text-pink-500">Details</span>
          </h1>
        </div>

        {/* Main Details Card */}
        <div className="bg-[#1a1a1a] rounded-2xl border border-gray-800 shadow-xl overflow-hidden relative">
          {/* Top Glow - Dynamic Color based on Status */}
          <div
            className={`absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r ${statusColors.glow}`}
          ></div>

          <div className="p-6 md:p-8">
            {/* Header Section of Card: ID & Status */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-gray-800">
              <div>
                <p className="text-[10px] text-gray-500 font-medium tracking-widest uppercase mb-0.5">
                  Booking ID
                </p>
                <p className="text-xs font-mono font-medium text-gray-300">
                  {appointmentData._id}
                </p>
              </div>
              <span
                className={`px-3 py-1 text-[10px] uppercase tracking-widest rounded border inline-flex items-center gap-1.5 w-fit font-medium ${statusColors.badge}`}
              >
                <span
                  className={`w-1.5 h-1.5 rounded-full animate-pulse ${statusColors.dot}`}
                ></span>
                {appointmentData.status}
              </span>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-8">
              {/* Service Info */}
              <div className="sm:col-span-2">
                <p className="text-[10px] text-gray-500 font-medium tracking-widest uppercase mb-2">
                  Service Booked
                </p>
                <div className="flex items-center gap-3 bg-[#111111] border border-gray-800 p-3 rounded-xl">
                  <div className="w-10 h-10 bg-pink-500/10 border border-pink-500/20 text-pink-500 rounded-lg flex items-center justify-center text-lg shadow-[0_0_10px_rgba(236,72,153,0.1)]">
                    ✨
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-white">
                      {appointmentData.service}
                    </h3>
                    <p className="text-[11px] text-gray-400 mt-0.5">
                      Premium Salon Experience
                    </p>
                  </div>
                </div>
              </div>

              {/* Date & Time */}
              <div>
                <p className="text-[10px] text-gray-500 font-medium tracking-widest uppercase mb-1">
                  Schedule
                </p>
                <h4 className="text-sm text-white font-medium mb-0.5">
                  {appointmentData.date}
                </h4>
                <p className="text-xs text-pink-400">
                  {appointmentData.timeSlot}
                </p>
              </div>

              {/* Customer Details */}
              <div>
                <p className="text-[10px] text-gray-500 font-medium tracking-widest uppercase mb-1">
                  Customer Details
                </p>
                <h4 className="text-sm text-white font-medium mb-0.5">
                  {appointmentData.fullName}
                </h4>
                <p className="text-xs text-gray-400">
                  +91 {appointmentData.phone}
                </p>
              </div>

              {/* Booking Time Meta */}
              <div className="sm:col-span-2 pt-4 mt-2 border-t border-gray-800">
                <p className="text-[10px] text-gray-600">
                  Booked on: {new Date(appointmentData.createdAt).toLocaleString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit"
                  })}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-end">
          <Link
            to="/contact"
            className="px-5 py-2.5 bg-[#1a1a1a] border border-gray-800 text-gray-300 text-xs font-medium rounded-lg hover:bg-[#222222] hover:text-white transition-colors cursor-pointer text-center flex items-center justify-center"
          >
            Need Help?
          </Link>
          <button
            disabled={appointmentData.status === "cancelled"}
            onClick={handleCalcelAppointment}
            className={`px-5 py-2.5 text-xs font-medium rounded-lg transition-all text-center ${
              appointmentData.status === "cancelled"
                ? "bg-[#1a1a1a] text-gray-500 border border-gray-800 cursor-not-allowed opacity-60"
                : "bg-transparent border border-pink-500/50 text-pink-500 hover:bg-pink-500 hover:text-white cursor-pointer shadow-[0_0_15px_rgba(236,72,153,0.15)] hover:shadow-[0_0_20px_rgba(236,72,153,0.3)]"
            }`}
          >
            {appointmentData.status === "cancelled"
              ? "Cancelled"
              : "Cancel Appointment"}
          </button>
        </div>
      </div>
    </div>
  );
};
