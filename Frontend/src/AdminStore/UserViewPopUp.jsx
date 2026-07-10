export const UserViewPopUp = ({ selectedUser, setSelectedUser }) => {
  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl animate-in fade-in zoom-in duration-200 overflow-hidden">
        {/* Modal Header */}
        <div className="px-6 py-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center font-bold text-lg">
              {selectedUser.userName.charAt(0)}
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                {selectedUser.userName}
                {selectedUser.totalAppointments >= 5 && (
                  <span className="text-sm" title="VIP Customer">
                    ⭐
                  </span>
                )}
              </h2>
              <p className="text-xs text-slate-500">{selectedUser.phone}</p>
            </div>
          </div>
          <button
            onClick={() => setSelectedUser(null)}
            className="w-8 h-8 flex items-center justify-center rounded-full text-slate-400 hover:text-rose-500 hover:bg-rose-50 transition-colors"
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
        <div className="p-6 overflow-y-auto custom-scrollbar">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest mb-4">
            Past Appointments
          </h3>

          {selectedUser.history && selectedUser.history.length > 0 ? (
            <div className="border border-slate-100 rounded-2xl overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-slate-50 border-b border-slate-100">
                  <tr>
                    <th className="py-3 px-4 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="py-3 px-4 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                      Service
                    </th>
                    <th className="py-3 px-4 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="py-3 px-4 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {selectedUser.history.map((record, index) => (
                    <tr key={index} className="hover:bg-slate-50/50">
                      <td className="py-3 px-4 text-xs font-medium text-slate-600">
                        {record.date}
                      </td>
                      <td className="py-3 px-4 text-xs font-bold text-slate-900">
                        {record.service}
                      </td>
                      <td className="py-3 px-4 text-xs font-medium text-slate-600">
                        ₹{record.price.toLocaleString("en-IN")}
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
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
          ) : (
            <p className="text-sm text-slate-500 text-center py-6 bg-slate-50 rounded-2xl border border-slate-100">
              No past appointments found.
            </p>
          )}
        </div>

        {/* Modal Footer (Summary) */}
        <div className="px-6 py-4 bg-slate-900 text-white flex justify-between items-center shrink-0">
          <div>
            <p className="text-[10px] text-slate-400 uppercase tracking-widest mb-0.5">
              Total Revenue Generated
            </p>
            <p className="text-lg font-bold text-rose-400">
              ₹{selectedUser.lifetimeValue.toLocaleString("en-IN")}
            </p>
          </div>
          <button
            onClick={() => setSelectedUser(null)}
            className="bg-white text-slate-900 hover:bg-slate-200 px-6 py-2 rounded-full text-sm font-bold transition-colors shadow-md active:scale-95"
          >
            Close History
          </button>
        </div>
      </div>
    </div>
  );
};
