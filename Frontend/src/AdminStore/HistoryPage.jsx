import { useEffect, useState } from "react";
import { UserViewPopUp } from "./UserViewPopUp";
import { getAllUsers } from "../services/AdminService";
import { getAllAppointments } from "../services/AppointmentService";

export const HistoryPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState(null); // For Modal

  //__state for all users data_________________________________________________
  const [appointments, setAppointment] = useState([]);
  const [users, SetUsers] = useState([]);

  //fetching users_____________________________________________________________
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [usersRes, appointmentsRes] = await Promise.all([
          getAllUsers(),
          getAllAppointments(),
        ]);

        // Users
        if (usersRes.data && usersRes.data.length > 0) {
          SetUsers(usersRes.data);
        } else {
          SetUsers([]);
        }

        // Appointments
        if (appointmentsRes.data && appointmentsRes.data.length > 0) {
          setAppointment(appointmentsRes.data);
        } else {
          setAppointment([]);
        }
      } catch (error) {
        console.error(error);
        SetUsers([]);
        setAppointment([]);
      }
    };

    fetchData();
  }, []);

  // ─── Filter Logic (Search by Name or Phone) ───────────────────────────────
  const filteredCustomers = users.filter(
    (customer) =>
      customer.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone.includes(searchTerm),
  );

  return (
    // मोबाइल के लिए pt-20 और px-4 जोड़ा गया है
    <div className="min-h-screen bg-slate-50 font-sans pt-20 sm:pt-24 px-4 sm:px-6 lg:px-8 pb-20">
      <div className="max-w-7xl mx-auto">
        {/* ─── 1. Header & Search Bar ────────────────────────────────────────── */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 sm:mb-8 gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Customer Database
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              View customer history, lifetime value, and manage accounts.
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-80 shrink-0">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search by name or phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-full py-2.5 pl-10 pr-4 text-sm text-slate-900 focus:outline-none focus:border-rose-400 focus:ring-2 focus:ring-rose-500/20 transition-all shadow-sm"
            />
          </div>
        </div>

        {/* ─── 2. Main Users Table ───────────────────────────────────────────── */}
        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
          {/* overflow-x-auto से मोबाइल पर टेबल हॉरिजॉन्टल स्क्रॉल होगी */}
          <div className="overflow-x-auto custom-scrollbar">
            {/* min-w-[700px] सुनिश्चित करेगा कि टेबल कंटेंट सिकुड़े नहीं */}
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-[10px] sm:text-[11px] uppercase tracking-widest font-bold">
                  <th className="py-3 px-4 sm:py-4 sm:px-6 whitespace-nowrap">
                    Customer Details
                  </th>
                  <th className="py-3 px-4 sm:py-4 sm:px-6 whitespace-nowrap">
                    Joined Date
                  </th>
                  <th className="py-3 px-4 sm:py-4 sm:px-6 text-center whitespace-nowrap">
                    Appointments
                  </th>
                  <th className="py-3 px-4 sm:py-4 sm:px-6 whitespace-nowrap">
                    Status
                  </th>
                  <th className="py-3 px-4 sm:py-4 sm:px-6 text-right whitespace-nowrap">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {filteredCustomers.length > 0 ? (
                  filteredCustomers.map((customer) => (
                    <tr
                      key={customer._id}
                      className="hover:bg-slate-50/80 transition-colors group"
                    >
                      {/* Name, Phone, Email & VIP Badge */}
                      <td className="py-3 px-4 sm:py-4 sm:px-6">
                        <div className="flex items-center gap-3 whitespace-nowrap">
                          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center font-bold text-sm shrink-0">
                            {customer.userName.charAt(0)}
                          </div>
                          <div>
                            <div className="flex items-center gap-2 mb-0.5">
                              <p className="font-bold text-slate-900">
                                {customer.userName}
                              </p>
                              {/* ─── VIP Tag Logic (>5 appointments) ─── */}
                              {customer.totalAppointments >= 5 && (
                                <span className="bg-gradient-to-r from-amber-200 to-amber-400 text-amber-900 text-[9px] font-extrabold px-2 py-0.5 rounded-full shadow-sm flex items-center gap-1">
                                  <span>⭐</span> VIP
                                </span>
                              )}
                            </div>
                            <p className="text-[10px] sm:text-[11px] text-slate-500 font-medium">
                              {customer.phone} • {customer.email}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Joined Date */}
                      <td className="py-3 px-4 sm:py-4 sm:px-6 text-slate-600 font-medium whitespace-nowrap">
                        {customer.createdAt}
                      </td>

                      {/* Appointments */}
                      <td className="py-3 px-4 sm:py-4 sm:px-6 text-center whitespace-nowrap">
                        <p className="font-bold text-slate-900">
                          {
                            appointments.filter(
                              (apt) => apt.userId === customer._id,
                            ).length
                          }
                        </p>
                      </td>

                      {/* Status */}
                      <td className="py-3 px-4 sm:py-4 sm:px-6 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider
                          ${
                            customer.isVerified
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                              : "bg-rose-50 text-rose-700 border border-rose-200"
                          }
                        `}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              customer.isVerified
                                ? "bg-emerald-500"
                                : "bg-rose-500"
                            }`}
                          ></span>
                          {customer.isVerified}
                        </span>
                      </td>

                      {/* ─── 5. Admin Actions ─── */}
                      <td className="py-3 px-4 sm:py-4 sm:px-6">
                        <div className="flex justify-end gap-2 whitespace-nowrap">
                          {/* Call Button */}
                          <a
                            href={`tel:${customer.phone}`}
                            className="p-2 sm:p-2.5 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors cursor-pointer shrink-0"
                            title="Call Customer"
                          >
                            <svg
                              className="w-4 h-4 sm:w-5 sm:h-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                              ></path>
                            </svg>
                          </a>

                          {/* View History Button */}
                          <button
                            onClick={() => {
                              const userAppointments = appointments.filter(
                                (apt) => apt.userId === customer._id,
                              );
                              // Ensure the modal gets what it expects
                              const history = userAppointments.map((apt) => ({
                                date: apt.date,
                                service: apt.service,
                                price: apt.price || 0,
                                status: apt.status,
                              }));
                              const lifetimeValue = history.reduce(
                                (sum, apt) => sum + apt.price,
                                0,
                              );

                              setSelectedUser({
                                ...customer,
                                history,
                                totalAppointments: history.length,
                                lifetimeValue,
                              });
                            }}
                            className="p-2 sm:p-2.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer shrink-0"
                            title="View History"
                          >
                            <svg
                              className="w-4 h-4 sm:w-5 sm:h-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                              ></path>
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                              ></path>
                            </svg>
                          </button>

                          {/* Block/Ban Button */}
                          <button
                            className="p-2 sm:p-2.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer shrink-0"
                            title={
                              customer.status === "Active"
                                ? "Block User"
                                : "Unblock User"
                            }
                          >
                            <svg
                              className="w-4 h-4 sm:w-5 sm:h-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
                              ></path>
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="5"
                      className="py-10 text-center text-slate-500 text-sm"
                    >
                      No customers found matching your search.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ─── 3. Detailed History View (Modal Popup) ────────────────────────── */}
      {selectedUser && (
        <UserViewPopUp
          selectedUser={selectedUser}
          setSelectedUser={setSelectedUser}
        />
      )}
    </div>
  );
};
