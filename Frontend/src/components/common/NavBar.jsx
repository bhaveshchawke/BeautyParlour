import { NavLink } from "react-router-dom";
import { CiSearch, CiUser, CiHeart, CiShoppingCart } from "react-icons/ci";

export const NavBar = () => {
  const navLinks = [
    { to: "/", text: "Home" },
    { to: "/about-us", text: "About Us" },
    { to: "/shop", text: "Shop" },
    { to: "/contact", text: "Contact" },
    { to: "/apointment", text: "apointment" },
  ];

  return (
    <nav className="bg-white text-black py-4 px-12 flex items-center justify-between border-b border-gray-100 shadow-sm font-sans">
      {/* Logo Section */}
      <NavLink to="/" className="text-black font-extrabold text-3xl">
        <span className="text-4xl font-extrabold text-black">Beau</span>
        <span className="text-4xl font-extrabold text-pink-600">Ten</span>
      </NavLink>

      {/* Navigation Links Section */}
      <div className="flex items-center space-x-8">
        {navLinks.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `flex items-center text-gray-800 hover:text-pink-600 transition-colors ${
                isActive ? "text-pink-600 font-medium" : "font-normal"
              }`
            }
          >
            {link.text}
          </NavLink>
        ))}
      </div>

      {/* Right Action Icons Section */}
      <div className="flex items-center space-x-6">
        <button className="text-gray-700 hover:text-pink-600 transition-colors p-1 cursor-pointer">
          <CiSearch size={24} />
        </button>
        <button className="text-gray-700 hover:text-pink-600 transition-colors p-1 cursor-pointer">
          <CiUser size={24} />
        </button>
        <button className="text-gray-700 hover:text-pink-600 transition-colors p-1 cursor-pointer">
          <CiHeart size={24} />
        </button>

        {/* Cart with badge */}
        <div className="relative group cursor-pointer">
          <button className="text-gray-700 hover:text-pink-600 transition-colors p-1">
            <CiShoppingCart size={24} />
          </button>
          <span className="absolute -top-1.5 -right-2 bg-pink-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-semibold group-hover:bg-pink-700 transition-colors">
            3
          </span>
        </div>
      </div>
    </nav>
  );
};
