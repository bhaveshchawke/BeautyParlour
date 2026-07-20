import { useEffect, useState } from "react";
import { getAllAppointments } from "../services/AppointmentService";
import { confirmedAppointment } from "../services/AdminService";
import { useMessage } from "../hooks/useMessage";
export const AdminDashboard = () => {
  const { showMessage } = useMessage();
  const [appointments, setAppointments] = useState([]);
  const [filterType, setFilterType] = useState("All"); // Naya state for filteration

  // Filter Logic
  const filteredAppointments = appointments.filter((apt) => {
    if (filterType === "All") return true;

    if (filterType === "Pending") return apt.status === "pending";

    if (filterType === "Today") {
      const today = new Date();
      const aptDate = new Date(apt.createdAt); // Ya apt.date agar model me date field string format me hai
      return (
        aptDate.getDate() === today.getDate() &&
        aptDate.getMonth() === today.getMonth() &&
        aptDate.getFullYear() === today.getFullYear()
      );
    }

    if (filterType === "Past Month") {
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      const aptDate = new Date(apt.createdAt);
      return aptDate >= thirtyDaysAgo;
    }

    return true;
  });

  //all pending appointments//
  const pendingTasks = appointments.filter(
    (appointment) => appointment.status === "pending",
  );
  //all completed appointments//
  const completedTasks = appointments.filter(
    (appointment) => appointment.status === "completed",
  );
  //sliced items//
  const [currentPage, setCurrentPage] = useState(1); // Default page 1
  const itemsPerPage = 5; // Ek page par kitne appointments dikhane hain (Aap isko badal sakte hain)
  // 1. Aakhri item ka index nikaliye
  const indexOfLastItem = currentPage * itemsPerPage;
  // 2. Pehle item ka index nikaliye
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  // 3. Array ko kaat lijiye (slice)
  const currentAppointments = filteredAppointments.slice(
    indexOfFirstItem,
    indexOfLastItem,
  );
  // 4. Total pages calculate kijiye taaki pata chale "Next" kab band karna hai
  const totalPages = Math.ceil(filteredAppointments.length / itemsPerPage);
  // for handle confirm appointments//
  const handletasks = async (id, status) => {
    try {
      const response = await confirmedAppointment(id, status);
      showMessage(response.message, "success");
      setAppointments((prev) =>
        prev.map((apt) => (apt._id === id ? response.data : apt)),
      );
    } catch (error) {
      showMessage(error.message, "error");
    }
  };
  useEffect(() => {
    const fetchAppointment = async () => {
      try {
        const response = await getAllAppointments();
        if (!response) {
          setAppointments([]);
          return;
        }
        setAppointments(response.data);
      } catch (error) {
        setAppointments([]);
      }
    };
    fetchAppointment();
  }, []);
  // console.log(appointments); // Removed to prevent performance lag

  return (
    // Main Dashboard Container
    <div className="min-h-screen bg-gray-50/50 font-sans pt-24 pb-12 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        {/* === Header Section === */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
            Dashboard <span className="text-pink-600 font-light">Overview</span>
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Welcome back! Here is what's happening at your parlor today.
          </p>
        </div>

        {/* === 2. Overview Analytics (Quick Stats 📊) === */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {/* Stat Card 1 */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between hover:shadow-md transition-shadow">
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">
                Today's Appointments
              </p>
              <h3 className="text-3xl font-bold text-gray-900">
                {Object.keys(appointments).length}
              </h3>
            </div>
            <div className="w-14 h-14 rounded-full flex items-center justify-center text-2xl bg-blue-50 text-blue-600">
              📅
            </div>
          </div>

          {/* Stat Card 2 */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between hover:shadow-md transition-shadow">
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">
                Pending Requests
              </p>
              <h3 className="text-3xl font-bold text-gray-900">
                {pendingTasks.length}
              </h3>
            </div>
            <div className="w-14 h-14 rounded-full flex items-center justify-center text-2xl bg-orange-50 text-orange-600">
              ⏳
            </div>
          </div>

          {/* Stat Card 3 */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between hover:shadow-md transition-shadow">
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">
                Total Completed
              </p>
              <h3 className="text-3xl font-bold text-gray-900">
                {completedTasks.length}
              </h3>
            </div>
            <div className="w-14 h-14 rounded-full flex items-center justify-center text-2xl bg-green-50 text-green-600">
              ✨
            </div>
          </div>
        </div>

        {/* === 4. Filters (Dhundne me aasani 🔍) === */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Appointments</h2>

          <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-hide">
            <button 
              onClick={() => { setFilterType("All"); setCurrentPage(1); }}
              className={`whitespace-nowrap px-5 py-2 rounded-full text-xs font-medium transition-all shadow-md ${filterType === "All" ? "bg-black text-white" : "bg-white text-gray-600 border border-gray-200 hover:border-pink-500 hover:text-pink-600"}`}>
              All
            </button>
            <button 
              onClick={() => { setFilterType("Today"); setCurrentPage(1); }}
              className={`whitespace-nowrap px-5 py-2 rounded-full text-xs font-medium transition-all shadow-md ${filterType === "Today" ? "bg-black text-white" : "bg-white text-gray-600 border border-gray-200 hover:border-pink-500 hover:text-pink-600"}`}>
              Today
            </button>
            <button 
              onClick={() => { setFilterType("Pending"); setCurrentPage(1); }}
              className={`whitespace-nowrap px-5 py-2 rounded-full text-xs font-medium transition-all shadow-md ${filterType === "Pending" ? "bg-black text-white" : "bg-white text-gray-600 border border-gray-200 hover:border-pink-500 hover:text-pink-600"}`}>
              Pending
            </button>
            <button 
              onClick={() => { setFilterType("Past Month"); setCurrentPage(1); }}
              className={`whitespace-nowrap px-5 py-2 rounded-full text-xs font-medium transition-all shadow-md ${filterType === "Past Month" ? "bg-black text-white" : "bg-white text-gray-600 border border-gray-200 hover:border-pink-500 hover:text-pink-600"}`}>
              Past Month
            </button>
          </div>
        </div>

        {/* === 3. Appointments Management Table (Asli Kaam 📝) === */}
        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              {/* Table Head */}
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100 text-gray-500 text-[11px] uppercase tracking-wider">
                  <th className="py-4 px-6 font-medium">Customer Info</th>
                  <th className="py-4 px-6 font-medium">Service</th>
                  <th className="py-4 px-6 font-medium">Date & Time</th>
                  <th className="py-4 px-6 font-medium">Status</th>
                  <th className="py-4 px-6 font-medium text-center">Actions</th>
                </tr>
              </thead>

              {/* Table Body */}
              <tbody className="divide-y divide-gray-100 text-sm">
                {/* Row 1: Pending */}
                {currentAppointments.map((apt) => (
                  <tr
                    key={apt._id}
                    className="hover:bg-gray-50/50 transition-colors"
                  >
                    <td className="py-4 px-6">
                      <div className="flex flex-col">
                        <span className="font-semibold text-gray-900">
                          {apt.fullName}
                        </span>
                        <span className="text-xs text-gray-500 mt-0.5">
                          +91 {apt.phone}
                        </span>
                        <span className="text-[10px] text-gray-400 mt-0.5">
                          {apt.userId}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-gray-700 font-medium">
                        {apt.service}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex flex-col">
                        <span className="text-gray-800">{new Date(apt.createdAt).toLocaleDateString()}</span>
                        <span className="text-xs text-gray-500 mt-0.5">
                          {apt.timeSlot}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="px-3 py-1 rounded-full text-[11px] font-medium border bg-orange-100 text-orange-700 border-orange-200">
                        {apt.status}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => handletasks(apt._id, "confirmed")}
                          className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white flex items-center justify-center transition-colors border border-blue-100 shadow-sm"
                          title="Confirm Appointment"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2.5"
                              d="M5 13l4 4L19 7"
                            ></path>
                          </svg>
                        </button>
                        <button
                          onClick={() => handletasks(apt._id, "completed")}
                          className="w-8 h-8 rounded-full bg-green-50 text-green-600 hover:bg-green-600 hover:text-white flex items-center justify-center transition-colors border border-green-100 shadow-sm"
                          title="Mark as Completed"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2.5"
                              d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                            ></path>
                          </svg>
                        </button>
                        <button
                          onClick={() => handletasks(apt._id, "cancelled")}
                          className="w-8 h-8 rounded-full bg-red-50 text-red-600 hover:bg-red-600 hover:text-white flex items-center justify-center transition-colors border border-red-100 shadow-sm"
                          title="Cancel Appointment"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2.5"
                              d="M6 18L18 6M6 6l12 12"
                            ></path>
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination / Footer */}
          <div className="bg-gray-50 border-t border-gray-100 px-6 py-4 flex items-center justify-between">
            <span className="text-xs text-gray-500">
              Showing {Object.keys(currentAppointments).length} of{" "}
              {Object.keys(appointments).length} appointments
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className={`px-3 py-1 text-xs border border-gray-200 rounded ${
                  currentPage === 1
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "text-gray-600 bg-white hover:bg-gray-50"
                }`}
              >
                Prev
              </button>
              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages || totalPages === 0}
                className={`px-3 py-1 text-xs border border-gray-200 rounded ${
                  currentPage === totalPages || totalPages === 0
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "text-gray-600 bg-white hover:bg-gray-50"
                }`}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
