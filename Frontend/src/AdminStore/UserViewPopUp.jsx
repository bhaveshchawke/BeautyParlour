export const UserViewPopUp = ({ selectedUser, setSelectedUser }) => {
  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      {/* मोबाइल के लिए rounded-2xl और डेस्कटॉप के लिए rounded-3xl */}
      <div className="bg-white rounded-2xl sm:rounded-3xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl animate-in fade-in zoom-in duration-200 overflow-hidden">
        {/* Modal Header */}
        {/* मोबाइल के लिए पैडिंग कम की है px-4 py-4 */}
        <div className="px-4 sm:px-6 py-4 sm:py-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50 shrink-0">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center font-bold text-base sm:text-lg shrink-0">
              {selectedUser.userName.charAt(0)}
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-1 sm:gap-2">
                {selectedUser.userName}
                {selectedUser.totalAppointments >= 5 && (
                  <span className="text-xs sm:text-sm" title="VIP Customer">
                    ⭐
                  </span>
                )}
              </h2>
              <p className="text-[11px] sm:text-xs text-slate-500">{selectedUser.phone}</p>
            </div>
          </div>
          <button
            onClick={() => setSelectedUser(null)}
            className="w-8 h-8 flex items-center justify-center rounded-full text-slate-400 hover:text-rose-500 hover:bg-rose-50 transition-colors shrink-0"
          >
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
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </div>

        {/* Modal Body (Scrollable History Table) */}
        {/* मोबाइल के लिए पैडिंग p-4 */}
        <div className="p-4 sm:p-6 overflow-y-auto custom-scrollbar flex-grow">
          <h3 className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-widest mb-3 sm:mb-4">
            Past Appointments
          </h3>

          {selectedUser.history && selectedUser.history.length > 0 ? (
            <div className="border border-slate-100 rounded-xl sm:rounded-2xl overflow-hidden">
              {/* overflow-x-auto से मोबाइल पर टेबल हॉरिजॉन्टल स्क्रॉल होगी */}
              <div className="overflow-x-auto custom-scrollbar">
                {/* min-w-[500px] सुनिश्चित करेगा कि टेबल सिकुड़े नहीं */}
                <table className="w-full text-left min-w-[500px]">
                  <thead className="bg-slate-50 border-b border-slate-100">
                    <tr>
                      <th className="py-2.5 sm:py-3 px-3 sm:px-4 text-[10px] font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">
                        Date
                      </th>
                      <th className="py-2.5 sm:py-3 px-3 sm:px-4 text-[10px] font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">
                        Service
                      </th>
                      <th className="py-2.5 sm:py-3 px-3 sm:px-4 text-[10px] font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">
                        Amount
                      </th>
                      <th className="py-2.5 sm:py-3 px-3 sm:px-4 text-[10px] font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {selectedUser.history.map((record, index) => (
                      <tr key={index} className="hover:bg-slate-50/50">
                        <td className="py-2.5 sm:py-3 px-3 sm:px-4 text-[11px] sm:text-xs font-medium text-slate-600 whitespace-nowrap">
                          {record.date}
                        </td>
                        <td className="py-2.5 sm:py-3 px-3 sm:px-4 text-[11px] sm:text-xs font-bold text-slate-900 whitespace-nowrap">
                          {record.service}
                        </td>
                        <td className="py-2.5 sm:py-3 px-3 sm:px-4 text-[11px] sm:text-xs font-medium text-slate-600 whitespace-nowrap">
                          ₹{record.price.toLocaleString("en-IN")}
                        </td>
                        <td className="py-2.5 sm:py-3 px-3 sm:px-4 whitespace-nowrap">
                          <span
                            className={`text-[9px] sm:text-[10px] font-bold px-2 py-0.5 rounded-full ${
                              record.status === "Completed"
                                ? "bg-emerald-50 text-emerald-600"
                                : record.status === "Cancelled"
                                  ? "bg-slate-100 text-slate-500"
                                  : "bg-rose-50 text-rose-600"
                            }`}
                          >
                            {record.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <p className="text-xs sm:text-sm text-slate-500 text-center py-6 bg-slate-50 rounded-xl sm:rounded-2xl border border-slate-100">
              No past appointments found.
            </p>
          )}
        </div>

        {/* Modal Footer (Summary) */}
        {/* मोबाइल पर px-4 py-3 */}
        <div className="px-4 sm:px-6 py-3 sm:py-4 bg-slate-900 text-white flex justify-between items-center shrink-0">
          <div>
            <p className="text-[9px] sm:text-[10px] text-slate-400 uppercase tracking-widest mb-0.5">
              Total Revenue Generated
            </p>
            <p className="text-base sm:text-lg font-bold text-rose-400">
              ₹{selectedUser.lifetimeValue.toLocaleString("en-IN")}
            </p>
          </div>
          <button
            onClick={() => setSelectedUser(null)}
            className="bg-white text-slate-900 hover:bg-slate-200 px-4 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-bold transition-colors shadow-md active:scale-95 shrink-0"
          >
            Close History
          </button>
        </div>
      </div>
    </div>
  );
};