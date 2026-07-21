import { useReducer, useEffect, useState } from "react";
import { AddService } from "../AdminStore/AddService";
import { getAllServies } from "../services/AdminService";
import { deleteService } from "../services/AdminService";
import { useMessage } from "../hooks/useMessage";
import { isActive } from "../services/AdminService";

export const ServiceManagement = () => {
  const { showMessage } = useMessage();
  const reducer = (state, action) => {
    switch (action.type) {
      case "TOGGLE_ISOPEN":
        return {
          ...state,
          isOpenAdd: !state.isOpenAdd,
        };

      default:
        return state;
    }
  };
  const [state, dispatch] = useReducer(reducer, {
    isOpenAdd: false,
  });

  //__fun_for delete service_________________________________
  const handleDeleteService = async (id) => {
    try {
      const response = await deleteService(id);
      showMessage(response.message, "success");

      // UI se us row ko turant gayab karne ke liye ye line add karein:
      setServices((prevServices) => prevServices.filter((s) => s._id !== id));
    } catch (error) {
      showMessage("Something went wrong...", "error");
      console.log(error);
    }
  };

  //__state for edit data_________________
  const [editingService, setEditingService] = useState(null);
  // ─── Dynamic Data State ──────────────────────────────────────────
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ─── OPTIMISTIC UI UPDATE FOR SMOOTH SWITCH ────────────────────────
  const handleIsActive = async (id) => {
    // 1. UI को तुरंत अपडेट करें (बिना API का इंतज़ार किए) ताकि एनीमेशन स्मूद हो
    setServices((prevServices) =>
      prevServices.map((service) =>
        service._id === id ? { ...service, active: !service.active } : service,
      ),
    );

    try {
      // 2. बैकग्राउंड में API कॉल
      const response = await isActive(id);
      showMessage(response.message, "success");
    } catch (error) {
      // 3. अगर API फेल हो जाए, तो स्विच को वापस पुरानी स्थिति में कर दें
      showMessage(error.message || "Failed to update status", "error");
      setServices((prevServices) =>
        prevServices.map((service) =>
          service._id === id
            ? { ...service, active: !service.active }
            : service,
        ),
      );
      console.log(error);
    }
  };

  // Component load hote hi services fetch karne ke liye useEffect
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await getAllServies();
        if (response && response.data) {
          setServices(response.data);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, [state.isOpenAdd]);

  // ─── UI Component ───────────────────────────────────────────────
  return (
    // मोबाइल के लिए pt-20 और px-4 जोड़ा गया है
    <div className="min-h-screen bg-slate-50 font-sans pt-20 sm:pt-24 px-4 sm:px-6 lg:px-8 pb-20">
      <div className="max-w-7xl mx-auto">
        {/* ─── 1. Header Section ───────────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8 gap-4 sm:gap-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Service Management
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Manage your parlour services, categories, and availability.
            </p>
          </div>
          {/* मोबाइल पर बटन को w-full और justify-center किया गया है */}
          <button
            onClick={() => dispatch({ type: "TOGGLE_ISOPEN" })}
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-rose-500 hover:bg-rose-600 text-white px-6 py-3.5 sm:py-3 rounded-xl sm:rounded-full text-sm font-semibold transition-colors shadow-md shadow-rose-500/20 active:scale-95 whitespace-nowrap cursor-pointer shrink-0"
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
                d="M12 4v16m8-8H4"
              ></path>
            </svg>
            Add New Service
          </button>
          {state.isOpenAdd && (
            <AddService onClose={() => dispatch({ type: "TOGGLE_ISOPEN" })} />
          )}
        </div>

        {/* Loading and Error States */}
        {loading && (
          <p className="text-center text-slate-500 py-10">
            Loading services...
          </p>
        )}
        {error && <p className="text-center text-red-500 py-10">{error}</p>}
        {!loading && services.length === 0 && (
          <p className="text-center text-slate-500 py-10">
            No services found. Add one!
          </p>
        )}

        {/* ─── 2. Services Table ───────────────────────────────────────── */}
        {!loading && services.length > 0 && (
          <div className="bg-white rounded-2xl sm:rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
            {/* overflow-x-auto से मोबाइल पर टेबल हॉरिजॉन्टल स्क्रॉल होगी */}
            <div className="overflow-x-auto custom-scrollbar">
              {/* min-w-[600px] सुनिश्चित करेगा कि टेबल सिकुड़े नहीं */}
              <table className="w-full text-left border-collapse min-w-[600px]">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-[10px] sm:text-xs uppercase tracking-widest font-bold">
                    <th className="py-3 px-4 sm:py-4 sm:px-6 whitespace-nowrap">
                      Service Info
                    </th>
                    <th className="py-3 px-4 sm:py-4 sm:px-6 whitespace-nowrap">
                      Duration
                    </th>
                    <th className="py-3 px-4 sm:py-4 sm:px-6 whitespace-nowrap">
                      Price
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
                  {services.map((service) => (
                    <tr
                      key={service._id} // MongoDB me id _id hoti hai
                      className={`hover:bg-slate-50/50 transition-colors group ${
                        !service.active ? "opacity-50 bg-slate-50" : ""
                      }`}
                    >
                      {/* Service Info */}
                      <td className="py-3 px-4 sm:py-4 sm:px-6">
                        <div className="flex items-center gap-3 sm:gap-4 whitespace-nowrap">
                          <img
                            src={service.image}
                            alt={service.serviceTitle}
                            className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg object-cover border border-slate-100 shadow-sm shrink-0"
                          />
                          <div>
                            <p className="font-bold text-slate-900 mb-0.5 text-sm">
                              {service.serviceTitle}
                            </p>
                            <span className="inline-block px-2 py-0.5 bg-slate-100 text-slate-600 text-[9px] sm:text-[10px] font-bold uppercase tracking-wider rounded-md">
                              {service.category || "Other"}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Duration */}
                      <td className="py-3 px-4 sm:py-4 sm:px-6 text-slate-600 font-medium whitespace-nowrap">
                        {service.serviceDuration} Mins
                      </td>

                      {/* Price */}
                      <td className="py-3 px-4 sm:py-4 sm:px-6 text-slate-900 font-bold whitespace-nowrap">
                        ₹ {service.servicePrice.toLocaleString("en-IN")}
                      </td>

                      {/* ─── FIXED SMOOTH TOGGLE SWITCH ─── */}
                      <td className="py-3 px-4 sm:py-4 sm:px-6 whitespace-nowrap">
                        <div className="flex items-center gap-2 sm:gap-3">
                          <button
                            onClick={() => handleIsActive(service._id)}
                            className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-300 ease-in-out focus:outline-none ${
                              service.active ? "bg-rose-500" : "bg-slate-300"
                            }`}
                            role="switch"
                            aria-checked={service.active}
                          >
                            <span
                              aria-hidden="true"
                              className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-300 ease-in-out ${
                                service.active
                                  ? "translate-x-5"
                                  : "translate-x-0"
                              }`}
                            />
                          </button>
                          <span
                            className={`text-[10px] sm:text-xs font-bold ${
                              service.active
                                ? "text-rose-600"
                                : "text-slate-400"
                            }`}
                          >
                            {service.active ? "Active" : "Off"}
                          </span>
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="py-3 px-4 sm:py-4 sm:px-6">
                        <div className="flex justify-end gap-2 whitespace-nowrap">
                          <button
                            onClick={() => setEditingService(service)}
                            className="p-2 sm:p-2.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer shrink-0"
                            title="Edit Service"
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
                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                              ></path>
                            </svg>
                          </button>
                          <button
                            onClick={() => handleDeleteService(service._id)}
                            className="p-2 sm:p-2.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer shrink-0"
                            title="Delete Service"
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
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
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
          </div>
        )}

        {/* Edit Modal */}
        {editingService && (
          <AddService
            onClose={() => setEditingService(null)}
            service={editingService}
          />
        )}
      </div>
    </div>
  );
};
