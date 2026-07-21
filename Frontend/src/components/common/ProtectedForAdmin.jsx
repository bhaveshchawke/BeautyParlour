import { useAdminData } from "../../hooks/useAdminData";

export const ProtectedForAdmin = ({ children }) => {
  const { isAdmin } = useAdminData();

  if (!isAdmin) {
    return (
      // पूरे पेज के सेंटर में कार्ड दिखाने के लिए Flexbox और हल्की पैडिंग (p-4)
      <div className="min-h-[60vh] flex justify-center items-center p-4 bg-slate-50 font-sans">
        {/* कार्ड का डिज़ाइन: मोबाइल पर p-6, बड़ी स्क्रीन पर p-8 */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl sm:rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-slate-100 text-center w-full max-w-sm animate-in fade-in zoom-in duration-300">
          {/* ─── Security / Lock Icon ─── */}
          <div className="w-14 h-14 sm:w-16 sm:h-16 bg-rose-50 rounded-full flex items-center justify-center mx-auto mb-4 text-rose-500">
            <svg
              className="w-7 h-7 sm:w-8 sm:h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              ></path>
            </svg>
          </div>

          {/* ─── Heading ─── */}
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2 tracking-tight">
            Access <span className="text-rose-600">Denied</span>
          </h2>

          {/* ─── Message Text ─── */}
          <p className="text-sm sm:text-base text-slate-500 leading-relaxed">
            This page is restricted. You need administrator privileges to view
            this content.
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};
