// import { Link } from "react-router-dom"; // राउटिंग के लिए इसे यूज़ करें

export const Register = () => {
  return (
    <div className="min-h-screen bg-[#0a0a0a] font-sans flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Aesthetic Glows */}
      <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-pink-600/20 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-96 h-96 bg-purple-600/10 rounded-full blur-[120px] pointer-events-none"></div>

      {/* Main Auth Container (flex-row-reverse से इमेज राइट साइड में चली जाएगी) */}
      <div className="w-full max-w-5xl bg-[#121212]/80 backdrop-blur-xl rounded-3xl overflow-hidden shadow-2xl border border-white/10 flex flex-col md:flex-row-reverse relative z-10">
        {/* ================= RIGHT SIDE: Image / Branding ================= */}
        <div className="hidden md:flex md:w-1/2 relative p-12 flex-col justify-between overflow-hidden">
          {/* Dark overlay on image */}
          <div className="absolute inset-0 bg-black/50 z-10"></div>
          <img
            src="https://images.pexels.com/photos/3993325/pexels-photo-3993325.jpeg?auto=compress&cs=tinysrgb&w=800"
            alt="Premium Salon"
            className="absolute inset-0 w-full h-full object-cover grayscale-[30%]"
          />

          <div className="relative z-20 text-right">
            <div className="text-white font-extrabold text-3xl mb-2 tracking-tight">
              <span>Beau</span>
              <span className="text-pink-500">Ten</span>
            </div>
            <p className="text-gray-300 font-light text-sm tracking-wide uppercase">
              Exclusive Member
            </p>
          </div>

          <div className="relative z-20">
            <h2 className="text-4xl font-light text-white leading-tight mb-4">
              Join the <br />
              <span className="font-semibold text-pink-400">Elite Circle.</span>
            </h2>
            <p className="text-gray-300 font-light text-sm max-w-sm leading-relaxed">
              Create an account to book your personalized salon sessions, manage
              your cosmetic orders, and unlock member-only offers.
            </p>
          </div>
        </div>

        {/* ================= LEFT SIDE: Register Form ================= */}
        <div className="w-full md:w-1/2 p-10 lg:p-14 flex flex-col justify-center bg-[#121212]">
          <div className="mb-10">
            <h3 className="text-3xl font-light text-white mb-2">
              Create Account
            </h3>
            <p className="text-gray-400 text-sm font-light">
              Fill in your details to start your premium beauty journey.
            </p>
          </div>

          {/* Form */}
          <form className="flex flex-col gap-8">
            {/* Full Name & Phone Number (Row) */}
            <div className="flex flex-col sm:flex-row gap-8">
              <div className="w-full relative group">
                <input
                  type="text"
                  id="name"
                  required
                  className="w-full pb-3 border-b border-gray-700 bg-transparent text-white text-sm focus:outline-none focus:border-pink-500 transition-colors peer"
                  placeholder=" "
                />
                <label
                  htmlFor="name"
                  className="absolute left-0 top-0 text-gray-500 text-sm transition-all duration-300 peer-focus:-top-5 peer-focus:text-xs peer-focus:text-pink-500 peer-valid:-top-5 peer-valid:text-xs peer-valid:text-gray-400 cursor-text pointer-events-none"
                >
                  Full Name
                </label>
              </div>

              <div className="w-full relative group">
                <input
                  type="tel"
                  id="phone"
                  required
                  className="w-full pb-3 border-b border-gray-700 bg-transparent text-white text-sm focus:outline-none focus:border-pink-500 transition-colors peer"
                  placeholder=" "
                />
                <label
                  htmlFor="phone"
                  className="absolute left-0 top-0 text-gray-500 text-sm transition-all duration-300 peer-focus:-top-5 peer-focus:text-xs peer-focus:text-pink-500 peer-valid:-top-5 peer-valid:text-xs peer-valid:text-gray-400 cursor-text pointer-events-none"
                >
                  Phone Number
                </label>
              </div>
            </div>

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

            {/* Password & Confirm Password (Row) */}
            <div className="flex flex-col sm:flex-row gap-8">
              <div className="w-full relative group">
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

              <div className="w-full relative group">
                <input
                  type="password"
                  id="confirmPassword"
                  required
                  className="w-full pb-3 border-b border-gray-700 bg-transparent text-white text-sm focus:outline-none focus:border-pink-500 transition-colors peer"
                  placeholder=" "
                />
                <label
                  htmlFor="confirmPassword"
                  className="absolute left-0 top-0 text-gray-500 text-sm transition-all duration-300 peer-focus:-top-5 peer-focus:text-xs peer-focus:text-pink-500 peer-valid:-top-5 peer-valid:text-xs peer-valid:text-gray-400 cursor-text pointer-events-none"
                >
                  Confirm Password
                </label>
              </div>
            </div>

            {/* Terms Checkbox */}
            <div className="flex items-start gap-3 mt-2">
              <input
                type="checkbox"
                id="terms"
                className="mt-1 w-4 h-4 accent-pink-600 cursor-pointer border-gray-700 rounded-sm bg-transparent"
                required
              />
              <label
                htmlFor="terms"
                className="text-xs text-gray-400 font-light leading-relaxed cursor-pointer"
              >
                I agree to the{" "}
                <span className="text-pink-400 hover:underline">
                  Terms of Service
                </span>{" "}
                and{" "}
                <span className="text-pink-400 hover:underline">
                  Privacy Policy
                </span>
                .
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full mt-2 px-6 py-4 bg-white text-black text-sm font-semibold rounded-lg hover:bg-pink-500 hover:text-white transition-colors duration-300 cursor-pointer shadow-lg"
            >
              Register Now
            </button>
          </form>

          {/* Navigate back to Login */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500 font-light">
              Already have an account?{" "}
              {/* React Router यूज़ करने पर <Link to="/login"> लगाएँ */}
              <button
                type="button"
                className="text-white font-medium hover:text-pink-400 transition-colors cursor-pointer"
              >
                Log In
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
