import { Link } from "react-router-dom";

export const Login = () => {
  return (
    // पूरा बैकग्राउंड डार्क और प्रीमियम
    <div className="min-h-screen bg-[#0a0a0a] font-sans flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Aesthetic Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-pink-600/20 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-purple-600/10 rounded-full blur-[120px] pointer-events-none"></div>

      {/* Main Auth Container */}
      <div className="w-full max-w-5xl bg-[#121212]/80 backdrop-blur-xl rounded-3xl overflow-hidden shadow-2xl border border-white/10 flex flex-col md:flex-row relative z-10">
        {/* ================= LEFT SIDE: Image / Branding ================= */}
        <div className="hidden md:flex md:w-1/2 relative p-12 flex-col justify-between overflow-hidden">
          {/* Dark overlay on image */}
          <div className="absolute inset-0 bg-black/40 z-10"></div>
          <img
            src="https://images.pexels.com/photos/3993471/pexels-photo-3993471.jpeg?auto=compress&cs=tinysrgb&w=800"
            alt="Luxury Salon"
            className="absolute inset-0 w-full h-full object-cover grayscale-[20%]"
          />

          <div className="relative z-20">
            <div className="text-white font-extrabold text-3xl mb-2 tracking-tight">
              <span>Beau</span>
              <span className="text-pink-500">Ten</span>
            </div>
            <p className="text-gray-300 font-light text-sm tracking-wide uppercase">
              Premium Salon & Cosmetics
            </p>
          </div>

          <div className="relative z-20">
            <h2 className="text-4xl font-light text-white leading-tight mb-4">
              Unlock Your <br />
              <span className="font-semibold text-pink-400">Elegance.</span>
            </h2>
            <p className="text-gray-300 font-light text-sm max-w-sm leading-relaxed">
              Join our exclusive community to book premium appointments, track
              your cosmetic orders, and access personalized beauty
              recommendations.
            </p>
          </div>
        </div>

        {/* ================= RIGHT SIDE: Auth Form ================= */}
        <div className="w-full md:w-1/2 p-10 lg:p-16 flex flex-col justify-center bg-[#121212]">
          {/* Header */}
          <div className="mb-10">
            <h3 className="text-3xl font-light text-white mb-2">
              Welcome Back
            </h3>
            <p className="text-gray-400 text-sm font-light">
              Enter your details to access your dashboard.
            </p>
          </div>

          {/* Form */}
          {/* MERN Backend से कनेक्ट करने के लिए यहाँ onSubmit लगाएँ */}
          <form className="flex flex-col gap-8">
            {/* Email Input */}
            <div className="relative group">
              <input
                type="email"
                id="email"
                required
                className="w-full pb-3 border-b border-gray-700 bg-transparent text-white text-sm focus:outline-none focus:border-pink-500 transition-colors peer"
                placeholder=" "
              />
              <label
                htmlFor="email"
                className="absolute left-0 top-0 text-gray-500 text-sm transition-all duration-300 peer-focus:-top-5 peer-focus:text-xs peer-focus:text-pink-500 peer-valid:-top-5 peer-valid:text-xs peer-valid:text-gray-400 cursor-text pointer-events-none"
              >
                Email Address
              </label>
            </div>

            {/* Password Input */}
            <div className="relative group">
              <input
                type="password"
                id="password"
                required
                className="w-full pb-3 border-b border-gray-700 bg-transparent text-white text-sm focus:outline-none focus:border-pink-500 transition-colors peer"
                placeholder=" "
              />
              <label
                htmlFor="password"
                className="absolute left-0 top-0 text-gray-500 text-sm transition-all duration-300 peer-focus:-top-5 peer-focus:text-xs peer-focus:text-pink-500 peer-valid:-top-5 peer-valid:text-xs peer-valid:text-gray-400 cursor-text pointer-events-none"
              >
                Password
              </label>
            </div>

            {/* Forgot Password Link */}
            <div className="flex justify-end -mt-4">
              <span className="text-xs text-gray-500 hover:text-pink-400 cursor-pointer transition-colors">
                Forgot Password?
              </span>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full mt-2 px-6 py-3.5 bg-white text-black text-sm font-semibold rounded-lg hover:bg-pink-500 hover:text-white transition-colors duration-300 cursor-pointer shadow-lg"
            >
              Sign In
            </button>
          </form>

          {/* Navigate to Register Page */}
          <div className="mt-10 text-center">
            <p className="text-sm text-gray-500 font-light">
              Don't have an account?{" "}
              {/* React Router के साथ <Link to="/register"> का उपयोग करें */}
              <Link to="/register" className="text-white font-medium hover:text-pink-400 transition-colors cursor-pointer">
                Sign up now
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
