import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { CiUser, CiShoppingCart } from "react-icons/ci";
import { SearchBar } from "./SearchBar";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Loader } from "../common/Loader";
import { logoutUser } from "../../services/AuthService";
import { useMessage } from "../../hooks/useMessage";
import { useAdminData } from "../../hooks/useAdminData";
import { fetchAllCarts } from "../../services/productService";

export const NavBar = () => {
  const { isAdmin } = useAdminData();
  const [isOpenSearch, setIsOpenSearch] = useState(false);
  const { user, isLoading } = useContext(AuthContext);
  const { showMessage } = useMessage();
  const [cart, setCart] = useState([]);

  // ─── Mobile Menu State ───
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { to: "/", text: "Home" },
    { to: "/about-us", text: "About Us" },
    { to: "/shop", text: "Shop" },
    { to: "/contact", text: "Contact" },
    { to: "/appointment", text: "Appointment" },
  ];

  const handleLogout = async () => {
    try {
      await logoutUser();
      showMessage("Logged out successfully", "error");
      setIsMobileMenuOpen(false); // Logout hone par mobile menu close karein
      window.location.reload();
    } catch (error) {
      showMessage("Failed to logout!", "error");
    }
  };

  //fetch carts
  useEffect(() => {
    const fetchCarts = async () => {
      try {
        const carts = await fetchAllCarts();
        if (carts && carts.success && carts.data) {
          setCart(carts.data);
        }
      } catch (error) {
        console.log(error);
        setCart([]);
      }
    };
    fetchCarts();

    // Listen for custom event
    window.addEventListener("cartUpdated", fetchCarts);
    return () => window.removeEventListener("cartUpdated", fetchCarts);
  }, []);

  return (
    <>
      {/* ─── Main NavBar ─── */}
      {/* मोबाइल के लिए px-4 और डेस्कटॉप के लिए lg:px-12 */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-white text-black py-3 px-4 lg:py-4 lg:px-12 flex items-center justify-between border-b border-gray-100 shadow-sm font-sans">
        {/* === Logo Section === */}
        <NavLink
          to="/"
          className="flex items-center gap-1.5 group cursor-pointer shrink-0"
        >
          <span className="text-xl sm:text-2xl lg:text-[28px] font-black text-gray-900 tracking-tighter">
            Sai<span className="text-xl inline-block ml-1"></span>
          </span>
          <span className="text-xl sm:text-2xl lg:text-[28px] font-extrabold text-pink-600 tracking-tight">
            Parlour
          </span>
        </NavLink>
        {/* ============================= */}

        {/* ─── Desktop Navigation Links (Hidden on Mobile) ─── */}
        <div className="hidden lg:flex items-center space-x-8">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `flex items-center text-gray-800 hover:text-pink-600 transition-colors ${
                  isActive ? "text-pink-600" : ""
                }`
              }
            >
              {link.text}
            </NavLink>
          ))}
        </div>

        {/* ─── Right Action Icons Section ─── */}
        <div className="flex items-center space-x-3 sm:space-x-4 lg:space-x-6">
          {/* Admin Panel Dropdown (Desktop Only) */}
          {isAdmin && (
            <div className="relative group hidden lg:block">
              <button className="text-sm font-medium text-gray-700 border border-gray-300 px-4 py-1.5 rounded-full hover:text-pink-600 hover:border-pink-600 transition-colors flex items-center gap-1 cursor-pointer">
                Admin Panel
                <svg
                  className="w-3 h-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="3"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </button>

              <div className="absolute right-0 top-full pt-2 w-60 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div className="bg-white border border-gray-100 rounded-xl shadow-xl overflow-hidden">
                  <div className="py-2 flex flex-col">
                    <NavLink
                      to="/admindashboard"
                      className="px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-pink-50 hover:text-pink-600 transition-colors"
                    >
                      Admin Dashboard
                    </NavLink>
                    <NavLink
                      to="/Servicemanagement"
                      className="px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-pink-50 hover:text-pink-600 transition-colors"
                    >
                      Service Management
                    </NavLink>
                    <NavLink
                      to="/userhistory"
                      className="px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-pink-50 hover:text-pink-600 transition-colors"
                    >
                      User / Customer History
                    </NavLink>
                    <NavLink
                      to="/shopmanagement"
                      className="px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-pink-50 hover:text-pink-600 transition-colors"
                    >
                      Shop / E-commerce 🛍️
                    </NavLink>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* User Icon (Desktop Only) */}
          <NavLink
            to={"/profile"}
            className="hidden lg:block text-gray-700 hover:text-pink-600 transition-colors p-1 cursor-pointer"
          >
            <CiUser size={24} />
          </NavLink>

          {/* Cart Icon (Visible on Both) */}
          <NavLink
            to="/cart"
            className="relative text-gray-700 hover:text-pink-600 transition-colors p-1 group shrink-0"
          >
            <CiShoppingCart size={24} className="w-6 h-6 sm:w-7 sm:h-7" />
            <span className="absolute -top-1 -right-1 bg-pink-600 text-white rounded-full w-4 h-4 sm:w-[18px] sm:h-[18px] flex items-center justify-center text-[9px] sm:text-[10px] font-bold group-hover:bg-pink-700 transition-colors pointer-events-none">
              {cart ? cart.length : 0}
            </span>
          </NavLink>

          {/* User Auth Section (Desktop Only) */}
          <div className="hidden lg:flex items-center">
            {isLoading ? (
              <div className="ml-4 flex items-center justify-center w-24 h-10">
                <Loader />
              </div>
            ) : user ? (
              <div className="flex items-center gap-4 ml-4">
                <span className="font-medium text-gray-700">
                  Hi, {user.name}
                </span>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 text-white px-4 py-2 rounded-full font-medium hover:bg-red-600 transition-colors shadow-sm cursor-pointer text-sm"
                >
                  Logout
                </button>
              </div>
            ) : (
              <NavLink
                to="/login"
                className="ml-4 bg-pink-600 text-white px-6 py-2 rounded-full font-medium hover:bg-pink-700 transition-colors shadow-sm"
              >
                Login
              </NavLink>
            )}
          </div>

          {/* ─── Mobile Hamburger Menu Button (Visible only on Mobile) ─── */}
          <button
            className="lg:hidden p-1 text-gray-700 hover:text-pink-600 transition-colors"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <svg
              className="w-6 h-6 sm:w-7 sm:h-7"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>
        </div>

        {isOpenSearch && (
          <SearchBar oncloseSerch={() => setIsOpenSearch(false)} />
        )}
      </nav>

      {/* ─── Mobile Menu Drawer ─── */}
      {/* Overlay Background */}
      <div
        className={`fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-[60] lg:hidden transition-opacity duration-300 ${
          isMobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      ></div>

      {/* Side Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-[80%] max-w-sm bg-white z-[70] transform transition-transform duration-300 ease-in-out lg:hidden flex flex-col shadow-2xl ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <span className="text-xl font-bold text-gray-900">Menu</span>
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="p-2 text-slate-500 hover:text-rose-500 hover:bg-rose-50 rounded-full transition-colors"
          >
            <svg
              className="w-6 h-6"
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

        {/* Drawer Content (Scrollable) */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-4 flex flex-col gap-6">
          {/* Auth Section in Mobile */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
            {isLoading ? (
              <div className="flex justify-center">
                <Loader />
              </div>
            ) : user ? (
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center font-bold text-lg">
                    {user.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-wider font-bold">
                      Welcome back
                    </p>
                    <p className="text-base font-bold text-slate-900">
                      {user.name}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2 mt-2">
                  <NavLink
                    to="/profile"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex-1 text-center bg-white border border-slate-200 text-slate-700 py-2 rounded-xl text-sm font-semibold shadow-sm"
                  >
                    Profile
                  </NavLink>
                  <button
                    onClick={handleLogout}
                    className="flex-1 text-center bg-red-50 text-red-600 py-2 rounded-xl text-sm font-semibold shadow-sm"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-3 text-center">
                <p className="text-sm text-slate-600 font-medium">
                  Join us for the best experience
                </p>
                <NavLink
                  to="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full bg-pink-600 text-white py-2.5 rounded-xl font-semibold shadow-sm"
                >
                  Login / Sign Up
                </NavLink>
              </div>
            )}
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col gap-1">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 px-2">
              Navigation
            </p>
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setIsMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `px-4 py-3 rounded-xl text-base font-semibold transition-colors ${
                    isActive
                      ? "bg-pink-50 text-pink-600"
                      : "text-slate-700 hover:bg-slate-50"
                  }`
                }
              >
                {link.text}
              </NavLink>
            ))}
          </div>

          {/* Admin Panel Links in Mobile */}
          {isAdmin && (
            <div className="flex flex-col gap-1 border-t border-slate-100 pt-5">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 px-2">
                Admin Controls
              </p>
              <NavLink
                to="/admindashboard"
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-4 py-3 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                Admin Dashboard
              </NavLink>
              <NavLink
                to="/Servicemanagement"
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-4 py-3 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                Service Management
              </NavLink>
              <NavLink
                to="/userhistory"
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-4 py-3 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                User History
              </NavLink>
              <NavLink
                to="/shopmanagement"
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-4 py-3 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                Shop Management
              </NavLink>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
