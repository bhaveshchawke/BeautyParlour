import { useState } from "react";
import { useMessage } from "../hooks/useMessage";
import { sendRegisteredData } from "../services/AuthService";
export const Register = () => {
  const { showMessage } = useMessage();
  const [userData, setUserData] = useState({
    userName: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
    termsAccepted: false,
  });

  //for error handling
  const [errors, setErrors] = useState({});

  //for data save
  const handleData = (e) => {
    const { name, value, type, checked } = e.target;
    setUserData({
      ...userData,
      [name]: type === "checkbox" ? checked : value,
    });
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  //for handle errors in fields
  const handleErrors = () => {
    // यहाँ 'errors' नाम पहले से स्टेट में है, इसलिए इसे 'newErrors' नाम देना बेस्ट प्रैक्टिस है
    const newErrors = {};

    // username validation
    if (!userData.userName.trim()) {
      newErrors.userName = "Please Enter your user name!";
    }

    // number validation
    if (!userData.phone.trim()) {
      newErrors.phone = "Please Enter your phone number!";
    } else if (userData.phone.trim().length < 10) {
      newErrors.phone = "Please Enter a valid 10-digit number!";
    }

    // Email Validation (Basic Regex)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!userData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(userData.email)) {
      newErrors.email = "Invalid email format";
    }

    // password validation
    if (!userData.password.trim()) {
      newErrors.password = "Please Enter password!";
    } else if (userData.password.length < 6) {
      // मैसेज 6 का है, तो लॉजिक भी 6 का ही होना चाहिए
      newErrors.password = "Password must be at least 6 characters";
    }

    // confirm password
    if (!userData.confirmPassword.trim()) {
      newErrors.confirmPassword = "Please confirm your password!";
    } else if (userData.password !== userData.confirmPassword) {
      // सही तुलना
      newErrors.confirmPassword = "Password doesn't match!";
    }

    // अब यह सब If ब्लॉक्स के बाहर है, इसलिए हमेशा सही काम करेगा
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ==========================================
  // FIXED: handleSubmit Function
  // ==========================================
  const handleSubmit = async (e) => {
    e.preventDefault();

    const isValid = handleErrors(); // चूँकि यह true/false देता है, 'isValid' नाम बेहतर है

    if (isValid) {
      console.table(userData);
      try {
        const response = await sendRegisteredData(userData);
        showMessage(response.message, "success");
      } catch (error) {
        showMessage(error.message, "error");
      }
    } else {
      showMessage("Form validation failed", "error");
    }
  };
  return (
    <div className="min-h-screen bg-[#0a0a0a] font-sans flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Aesthetic Glows */}
      <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-pink-600/20 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-96 h-96 bg-purple-600/10 rounded-full blur-[120px] pointer-events-none"></div>

      {/* Main Auth Container */}
      <div className="w-full max-w-5xl bg-[#121212]/80 backdrop-blur-xl rounded-3xl overflow-hidden shadow-2xl border border-white/10 flex flex-col md:flex-row-reverse relative z-10">
        {/* ================= RIGHT SIDE: Image / Branding ================= */}
        <div className="hidden md:flex md:w-1/2 relative p-12 flex-col justify-between overflow-hidden">
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
          <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
            {/* Full Name & Phone Number (Row) */}
            <div className="flex flex-col sm:flex-row gap-8">
              <div className="w-full relative group">
                <input
                  type="text"
                  value={userData.userName}
                  id="name"
                  required
                  name="userName"
                  onChange={handleData}
                  className="w-full pb-3 border-b border-gray-700 bg-transparent text-white text-sm focus:outline-none focus:border-pink-500 transition-colors peer"
                  placeholder=" "
                />
                <label
                  htmlFor="name"
                  className="absolute left-0 top-0 text-gray-500 text-sm transition-all duration-300 peer-focus:-top-5 peer-focus:text-xs peer-focus:text-pink-500 peer-valid:-top-5 peer-valid:text-xs peer-valid:text-gray-400 cursor-text pointer-events-none"
                >
                  Full Name
                </label>
                {/* Error Display */}
                {errors.userName && (
                  <span className="absolute -bottom-5 left-0 text-[10px] text-red-500">
                    {errors.userName}
                  </span>
                )}
              </div>

              <div className="w-full relative group">
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={userData.phone}
                  onChange={handleData}
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
                {errors.phone && (
                  <span className="absolute -bottom-5 left-0 text-[10px] text-red-500">
                    {errors.phone}
                  </span>
                )}
              </div>
            </div>

            {/* Email Input */}
            <div className="relative group">
              <input
                type="email"
                id="email"
                name="email"
                value={userData.email}
                onChange={handleData}
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
              {errors.email && (
                <span className="absolute -bottom-5 left-0 text-[10px] text-red-500">
                  {errors.email}
                </span>
              )}
            </div>

            {/* Password & Confirm Password (Row) */}
            <div className="flex flex-col sm:flex-row gap-8">
              <div className="w-full relative group">
                <input
                  type="password"
                  id="password"
                  name="password"
                  onChange={handleData}
                  value={userData.password}
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
                {errors.password && (
                  <span className="absolute -bottom-5 left-0 text-[10px] text-red-500">
                    {errors.password}
                  </span>
                )}
              </div>

              <div className="w-full relative group">
                <input
                  type="password"
                  id="confirmPassword"
                  value={userData.confirmPassword}
                  name="confirmPassword"
                  onChange={handleData}
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
                {errors.confirmPassword && (
                  <span className="absolute -bottom-5 left-0 text-[10px] text-red-500">
                    {errors.confirmPassword}
                  </span>
                )}
              </div>
            </div>

            {/* Terms Checkbox */}
            <div className="flex items-start gap-3 mt-2">
              <input
                checked={userData.termsAccepted}
                name="termsAccepted"
                type="checkbox"
                onChange={handleData}
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
