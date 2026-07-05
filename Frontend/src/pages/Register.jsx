import { useEffect, useState } from "react";
import { useMessage } from "../hooks/useMessage";
import { sendRegisteredData, validateOtp } from "../services/AuthService";
import { Loader } from "../components/common/Loader";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export const Register = () => {
  const { user, loginUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const { showMessage } = useMessage();
  const [userData, setUserData] = useState({
    userName: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
    termsAccepted: false,
    otp: "", // OTP Field
  });

  // States
  const [errors, setErrors] = useState({});
  const [loader, setLoader] = useState(false);
  const [step, setStep] = useState(1);
  const [timeLeft, setTimeLeft] = useState(0); // Timer State

  // ==========================================
  // Data Handler
  // ==========================================
  const handleData = (e) => {
    const { name, value, type, checked } = e.target;
    setUserData({
      ...userData,
      [name]: type === "checkbox" ? checked : value,
    });
    // Remove error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  // ==========================================
  // OTP Timer Logic
  // ==========================================
  useEffect(() => {
    if (step !== 2 || timeLeft <= 0) return;
    const timerId = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timerId);
  }, [step, timeLeft]);

  // Time Formatting (MM:SS)
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

  // ==========================================
  // Step 1 Validation
  // ==========================================
  const handleErrors = () => {
    const newErrors = {};

    if (!userData.userName.trim()) {
      newErrors.userName = "Please Enter your user name!";
    }

    if (!userData.phone.trim()) {
      newErrors.phone = "Please Enter your phone number!";
    } else if (userData.phone.trim().length < 10) {
      newErrors.phone = "Please Enter a valid 10-digit number!";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!userData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(userData.email)) {
      newErrors.email = "Invalid email format";
    }

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^-])[A-Za-z\d@$!%*?&#^-]{8,}$/;
    if (!userData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (userData.password.trim().length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    } else if (!passwordRegex.test(userData.password)) {
      newErrors.password =
        "Must contain uppercase, lowercase, number & special character.";
    }

    if (!userData.confirmPassword.trim()) {
      newErrors.confirmPassword = "Please confirm your password!";
    } else if (userData.password !== userData.confirmPassword) {
      newErrors.confirmPassword = "Password doesn't match!";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ==========================================
  // Step 1 Submit (Send Data to Backend)
  // ==========================================
  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = handleErrors();

    if (isValid) {
      try {
        setLoader(true);
        const response = await sendRegisteredData(userData);
        if (response) {
          showMessage("OTP sent to your email!", "success");
          setStep(2);
          setTimeLeft(300); // Start 5 minutes timer
        }
      } catch (error) {
        showMessage(error.message || "Failed to send data", "error");
      } finally {
        setLoader(false);
      }
    } else {
      showMessage("Form validation failed", "error");
    }
  };

  // ==========================================
  // Step 2: Validate OTP
  // ==========================================
  const submitOtp = async (e) => {
    e.preventDefault();

    if (!userData.otp || userData.otp.trim().length !== 6) {
      setErrors({ ...errors, otp: "Please enter a valid 6-digit OTP!" });
      return;
    }

    try {
      setLoader(true);
      const response = await validateOtp(userData);

      if (!response) {
        showMessage("Invalid OTP!", "error");
        return;
      }

      showMessage("Registration successful! You are now logged in.", "success");
      setTimeLeft(0);

      loginUser(response.user);
      navigate("/");
    } catch (error) {
      if (timeLeft === 0) {
        showMessage(" OTP expired", "error");
      } else {
        showMessage(error.message || "Invalid OTP", "error");
      }
    } finally {
      setLoader(false);
    }
  };

  // ==========================================
  // Resend OTP Logic
  // ==========================================
  const handleResend = async () => {
    try {
      setLoader(true);
      await sendRegisteredData(userData);
      showMessage("OTP resent successfully!", "success");
      setTimeLeft(300); // Restart 5 minutes timer
      setErrors({ ...errors, otp: "" });
      setUserData({ ...userData, otp: "" }); // Clear OTP input
    } catch (error) {
      showMessage(error.message || "Failed to resend OTP", "error");
    } finally {
      setLoader(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] font-sans flex items-center justify-center p-6 relative overflow-hidden">
      {/* ----------------- STEP 1: REGISTRATION UI ----------------- */}
      {step === 1 && (
        <>
          <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-pink-600/20 rounded-full blur-[120px] pointer-events-none"></div>
          <div className="absolute bottom-[-10%] left-[-10%] w-96 h-96 bg-purple-600/10 rounded-full blur-[120px] pointer-events-none"></div>

          <div className="w-full max-w-5xl bg-[#121212]/80 backdrop-blur-xl rounded-3xl overflow-hidden shadow-2xl border border-white/10 flex flex-col md:flex-row-reverse relative z-10">
            {/* RIGHT SIDE: Image */}
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
                  <span className="font-semibold text-pink-400">
                    Elite Circle.
                  </span>
                </h2>
                <p className="text-gray-300 font-light text-sm max-w-sm leading-relaxed">
                  Create an account to book your personalized salon sessions,
                  manage your cosmetic orders, and unlock member-only offers.
                </p>
              </div>
            </div>

            {/* LEFT SIDE: Register Form */}
            <div className="w-full md:w-1/2 p-10 lg:p-14 flex flex-col justify-center bg-[#121212]">
              <div className="mb-10">
                <h3 className="text-3xl font-light text-white mb-2">
                  Create Account
                </h3>
                <p className="text-gray-400 text-sm font-light">
                  Fill in your details to start your premium beauty journey.
                </p>
              </div>

              <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
                {/* Full Name & Phone */}
                <div className="flex flex-col sm:flex-row gap-8">
                  <div className="w-full relative group">
                    <input
                      type="text"
                      value={userData.userName}
                      id="name"
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

                {/* Email */}
                <div className="relative group">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={userData.email}
                    onChange={handleData}
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

                {/* Password & Confirm */}
                <div className="flex flex-col sm:flex-row gap-8">
                  <div className="w-full relative group">
                    <input
                      type="password"
                      id="password"
                      name="password"
                      onChange={handleData}
                      value={userData.password}
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

                {/* Terms */}
                <div className="flex items-start gap-3 mt-2">
                  <input
                    checked={userData.termsAccepted}
                    name="termsAccepted"
                    type="checkbox"
                    onChange={handleData}
                    id="terms"
                    className="mt-1 w-4 h-4 accent-pink-600 cursor-pointer border-gray-700 rounded-sm bg-transparent"
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

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loader}
                  className="w-full mt-2 flex items-center justify-center gap-3 px-6 py-4 bg-white text-black text-sm font-semibold rounded-lg hover:bg-pink-500 hover:text-white transition-colors duration-300 cursor-pointer shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {loader ? <Loader inButton={true} /> : "Register Now"}
                </button>
              </form>

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
        </>
      )}

      {/* ----------------- STEP 2: OTP VERIFICATION UI ----------------- */}
      {step === 2 && (
        <>
          <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-pink-600/20 rounded-full blur-[120px] pointer-events-none"></div>
          <div className="absolute bottom-[-10%] left-[-10%] w-96 h-96 bg-rose-600/10 rounded-full blur-[120px] pointer-events-none"></div>

          <div className="w-full max-w-5xl bg-[#121212]/80 backdrop-blur-xl rounded-3xl overflow-hidden shadow-2xl border border-white/10 flex flex-col md:flex-row-reverse relative z-10 animate-[fadeIn_0.5s_ease-in-out]">
            {/* RIGHT SIDE: Image */}
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
                  Secure Your <br />
                  <span className="font-semibold text-pink-400">Account.</span>
                </h2>
                <p className="text-gray-300 font-light text-sm max-w-sm leading-relaxed">
                  Authentication is the final step to unlock your personalized
                  salon sessions and premium cosmetics.
                </p>
              </div>
            </div>

            {/* LEFT SIDE: OTP Form */}
            <div className="w-full md:w-1/2 p-10 lg:p-14 flex flex-col justify-center bg-[#121212]">
              <button
                onClick={() => setStep(1)}
                className="self-start mb-8 text-gray-400 hover:text-white flex items-center gap-2 text-sm font-light transition-colors cursor-pointer"
              >
                ← Back to Edit Details
              </button>

              <div className="mb-10">
                <h3 className="text-3xl font-light text-white mb-2">
                  Verify Account
                </h3>
                <p className="text-gray-400 text-sm font-light leading-relaxed">
                  We've sent a 6-digit secure code to <br />
                  <span className="text-white font-medium">
                    {userData.email || "your email address"}
                  </span>
                </p>
              </div>

              <form className="flex flex-col gap-4" onSubmit={submitOtp}>
                {/* OTP Input */}
                <div className="relative group text-center mt-2">
                  <input
                    type="text"
                    maxLength="6"
                    name="otp"
                    value={userData.otp || ""}
                    onChange={handleData}
                    disabled={timeLeft === 0}
                    className="w-full bg-[#0a0a0a]/50 border border-gray-700 rounded-xl py-5 text-center text-white text-2xl font-mono tracking-[1.2em] focus:outline-none focus:border-pink-500 focus:shadow-[0_0_20px_rgba(219,39,119,0.15)] transition-all placeholder:tracking-normal disabled:opacity-50 disabled:cursor-not-allowed"
                    placeholder="------"
                    autoComplete="off"
                  />
                  {errors.otp && (
                    <span className="absolute -bottom-6 left-0 right-0 text-center text-[11px] text-red-500">
                      {errors.otp}
                    </span>
                  )}
                </div>

                {/* Conditional Render: Timer & Button OR Resend UI */}
                {timeLeft > 0 ? (
                  <div className="flex flex-col items-center gap-4 mt-4">
                    <button
                      type="submit"
                      disabled={loader}
                      className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-pink-600 text-white text-sm font-semibold rounded-lg hover:bg-pink-700 transition-colors duration-300 cursor-pointer shadow-[0_10px_20px_-10px_rgba(219,39,119,0.5)] disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {loader ? (
                        <Loader inButton={true} />
                      ) : (
                        "Verify & Register"
                      )}
                    </button>

                    <div className="flex flex-col items-center gap-1 mt-1">
                      <span className="text-pink-500 font-mono tracking-widest bg-pink-500/10 px-4 py-1.5 rounded-full text-xs border border-pink-500/20 shadow-[0_0_10px_rgba(219,39,119,0.1)]">
                        ⏳ {formattedTime}
                      </span>
                      <p className="text-[11px] text-gray-400 font-light tracking-wide">
                        OTP is valid till the timer runs out.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="mt-6 text-center">
                    <p className="text-sm text-gray-400 font-light">
                      OTP has expired.{" "}
                      <button
                        type="button"
                        onClick={handleResend}
                        disabled={loader}
                        className="text-white font-medium hover:text-pink-400 transition-colors cursor-pointer border-b border-transparent hover:border-pink-400 pb-0.5 disabled:opacity-50"
                      >
                        {loader ? "Sending..." : "Resend OTP"}
                      </button>
                    </p>
                  </div>
                )}
              </form>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
