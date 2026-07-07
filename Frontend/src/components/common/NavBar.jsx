import { useState } from "react";
import { NavLink } from "react-router-dom";
import { CiSearch, CiUser, CiShoppingCart } from "react-icons/ci";
import { SearchBar } from "./SearchBar";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Loader } from "../common/Loader";
import { logoutUser } from "../../services/AuthService";
import { useMessage } from "../../hooks/useMessage";
import { useAdminData } from "../../hooks/useAdminData";
export const NavBar = () => {
  const { isAdmin } = useAdminData();
  const [isOpenSearch, setIsOpenSearch] = useState(false);
  const { user, isLoading } = useContext(AuthContext);
  const { showMessage } = useMessage();

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
      window.location.reload();
    } catch (error) {
      showMessage("Failed to logout!", "error");
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white text-black py-4 px-12 flex items-center justify-between border-b border-gray-100 shadow-sm font-sans">
      {/* === UPDATED: Logo Section === */}
      <NavLink
        to="/"
        className="flex items-center gap-1.5 group cursor-pointer"
      >
        <span className="text-2xl lg:text-[28px] font-black text-gray-900 tracking-tighter">
          Shree<span className="text-xl inline-block ml-1">🏪</span>
        </span>
        <span className="text-2xl lg:text-[28px] font-extrabold text-pink-600 tracking-tight">
          Sai Parlour
        </span>
      </NavLink>
      {/* ============================= */}

      {/* Navigation Links Section */}
      <div className="flex items-center space-x-8">
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

      {/* Right Action Icons Section */}
      <div className="flex items-center space-x-6">
        {/* Admin Panel Dropdown */}
        {isAdmin && (
          <div className="relative group">
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

            {/* Dropdown Menu Wrapper (pt-2 helps keep the hover active when moving mouse down) */}
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
                    to="/admin/shop"
                    className="px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-pink-50 hover:text-pink-600 transition-colors"
                  >
                    Shop / E-commerce 🛍️
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        )}

        <button
          onClick={() => setIsOpenSearch(!isOpenSearch)}
          className="text-gray-700 hover:text-pink-600 transition-colors p-1 cursor-pointer"
        >
          <CiSearch size={24} />
        </button>
        <NavLink
          to={"/profile"}
          className="text-gray-700 hover:text-pink-600 transition-colors p-1 cursor-pointer"
        >
          <CiUser size={24} />
        </NavLink>

        {/* Cart with badge */}
        <NavLink
          to="/cart"
          className="relative text-gray-700 hover:text-pink-600 transition-colors p-1 group"
        >
          <CiShoppingCart size={24} />
          <span className="absolute -top-1 -right-1 bg-pink-600 text-white rounded-full w-[18px] h-[18px] flex items-center justify-center text-[10px] font-bold group-hover:bg-pink-700 transition-colors pointer-events-none">
            0
          </span>
        </NavLink>

        {/* User Auth Section (Login / Loader / User Profile) */}
        {isLoading ? (
          <div className="ml-4 flex items-center justify-center w-24 h-10">
            <Loader />
          </div>
        ) : user ? (
          // Agar user login hai, toh uska naam aur Logout dikhao
          <div className="flex items-center gap-4 ml-4">
            <span className="font-medium text-gray-700">Hi, {user.name}</span>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded-full font-medium hover:bg-red-600 transition-colors shadow-sm cursor-pointer text-sm"
            >
              Logout
            </button>
          </div>
        ) : (
          // Agar user login nahi hai, toh Login button dikhao
          <NavLink
            to="/login"
            className="ml-4 bg-pink-600 text-white px-6 py-2 rounded-full font-medium hover:bg-pink-700 transition-colors shadow-sm"
          >
            Login
          </NavLink>
        )}
      </div>

      {isOpenSearch && (
        <SearchBar oncloseSerch={() => setIsOpenSearch(false)} />
      )}
    </nav>
  );
};
