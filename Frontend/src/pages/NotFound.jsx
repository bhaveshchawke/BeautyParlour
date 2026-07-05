import { NavLink } from "react-router-dom";

export const NotFound = () => {
  return (
    <div className="min-h-screen bg-gray-50/50 flex flex-col items-center justify-center px-6 text-center font-sans">
      {/* Background Subtle Pink Glow */}
      <div className="absolute w-72 h-72 bg-pink-100 rounded-full blur-3xl opacity-40 -z-10 pointer-events-none"></div>

      {/* Big 404 Text */}
      <h1 className="text-8xl md:text-9xl font-black tracking-tighter text-gray-900 select-none">
        4<span className="text-pink-600">0</span>4
      </h1>

      {/* Parlor Themed Punchline */}
      <h2 className="text-2xl md:text-3xl font-extrabold text-gray-800 mt-4 tracking-tight">
        Oops! This page got trimmed away. ✂️
      </h2>

      <p className="text-gray-500 max-w-md mt-2 text-sm md:text-base">
        We searched our entire parlor, but the page you are looking for seems to
        have gone for a beauty nap.
      </p>

      {/* Call to Actions */}
      <div className="flex flex-col sm:flex-row items-center gap-4 mt-8 w-full sm:w-auto">
        {/* Back to Home Button */}
        <NavLink
          to="/"
          className="w-full sm:w-auto bg-pink-600 hover:bg-pink-700 text-white font-medium px-8 py-3 rounded-full shadow-sm hover:shadow transition-all flex items-center justify-center gap-2 cursor-pointer"
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
              strokeWidth="2"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back to Home
        </NavLink>

        {/* Book Appointment Button (Smart business move) */}
        <NavLink
          to="/appointment"
          className="w-full sm:w-auto bg-white hover:bg-gray-50 text-gray-800 font-medium px-8 py-3 rounded-full border border-gray-200 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
        >
          <span>📅</span> Book an Appointment
        </NavLink>
      </div>

      {/* Brand Footer tip */}
      <p className="text-xs text-gray-400 mt-14 font-medium">
        Shree Sai Parlour • Error 404
      </p>
    </div>
  );
};
