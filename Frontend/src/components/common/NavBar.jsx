import { useState } from "react";
import { NavLink } from "react-router-dom";
import { CiSearch, CiUser, CiShoppingCart } from "react-icons/ci";
import { SearchBar } from "./SearchBar";

export const NavBar = () => {
  const [isOpenSearch, setIsOpenSearch] = useState(false);
  const navLinks = [
    { to: "/", text: "Home" },
    { to: "/about-us", text: "About Us" },
    { to: "/shop", text: "Shop" },
    { to: "/contact", text: "Contact" },
    { to: "/appointment", text: "Appointment" },
  ];

  return (
    <nav className="bg-white text-black py-4 px-12 flex items-center justify-between border-b border-gray-100 shadow-sm font-sans">
      {/* Logo Section */}
      <NavLink to="/" className="text-black font-extrabold text-3xl">
        <span className="text-4xl font-extrabold text-black">Shree🏪</span>
        <span className="text-4xl font-extrabold text-pink-600">
          Sai Parlour
        </span>
      </NavLink>

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

        {/* Login Button */}
        <NavLink
          to="/login"
          className="ml-4 bg-pink-600 text-white px-6 py-2 rounded-full font-medium hover:bg-pink-700 transition-colors shadow-sm"
        >
          Login
        </NavLink>
      </div>
      {isOpenSearch && (
        <SearchBar oncloseSerch={() => setIsOpenSearch(false)} />
      )}
    </nav>
  );
};
