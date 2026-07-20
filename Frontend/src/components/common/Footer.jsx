import { Link } from "react-router";
export const Footer = () => {
  return (
    <footer className="bg-[#0a0a0a] text-gray-400 font-sans pt-20 pb-8 border-t-4 border-pink-600">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        {/* Top Footer Section: 4 Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Column 1: Brand Info */}
          <div className="flex flex-col">
            {/* Logo */}
            <div className="text-white font-extrabold text-3xl mb-6">
              <span className="text-3xl font-extrabold text-white">Beau</span>
              <span className="text-3xl font-extrabold text-pink-600">Ten</span>
            </div>
            <p className="text-sm font-light leading-relaxed mb-6">
              Your ultimate destination for premium salon services and authentic
              cosmetics. Experience elegance and care, all under one roof.
            </p>
            {/* Social Links (Clean Text based, no heavy icons needed) */}
            <div className="flex gap-4 text-sm font-medium">
              <Link
                to={"https://www.instagram.com/mr_chawke_ji/"}
                className="hover:text-pink-500 cursor-pointer transition-colors"
              >
                Instagram
              </Link>
              <Link
                to={"https://www.facebook.com/bhavesh.chawke.9/"}
                className="hover:text-pink-500 cursor-pointer transition-colors"
              >
                Facebook
              </Link>
              <Link
                to={"https://x.com/ChawkeBhav95138"}
                className="hover:text-pink-500 cursor-pointer transition-colors"
              >
                Twitter
              </Link>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="flex flex-col">
            <h4 className="text-white text-base font-medium mb-6 uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="flex flex-col gap-4 text-sm font-light">
              <li className="hover:text-pink-500 cursor-pointer transition-colors w-fit">
                <Link to={"about-us"}>About Us</Link>
              </li>
              <li className="hover:text-pink-500 cursor-pointer transition-colors w-fit">
                <Link to={"shop"}>Shop Cosmetics</Link>
              </li>

              <li className="hover:text-pink-500 cursor-pointer transition-colors w-fit">
                <Link to={"contact"}> Contact Us</Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Services */}
          <div className="flex flex-col">
            <h4 className="text-white text-base font-medium mb-6 uppercase tracking-wider">
              Our Services
            </h4>
            <ul className="flex flex-col gap-4 text-sm font-light">
              <li className="hover:text-pink-500 cursor-pointer transition-colors w-fit">
                Hair Styling & Spa
              </li>
              <li className="hover:text-pink-500 cursor-pointer transition-colors w-fit">
                Advanced Skin Care
              </li>
              <li className="hover:text-pink-500 cursor-pointer transition-colors w-fit">
                Bridal Makeup
              </li>
              <li className="hover:text-pink-500 cursor-pointer transition-colors w-fit">
                Nail Art & Care
              </li>
              <li className="hover:text-pink-500 cursor-pointer transition-colors w-fit">
                Massages
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Address */}
          <div className="flex flex-col">
            <h4 className="text-white text-base font-medium mb-6 uppercase tracking-wider">
              Visit Us
            </h4>
            <div className="text-sm font-light leading-relaxed mb-4 flex flex-col gap-2">
              <p>
                <span className="block text-white font-medium mb-1">
                  📍Amravati Ghat,Betul
                </span>
                Amravati Ghat Gujri Chauk, <br />
                sub-district:Prabhat pattan, 460665,
              </p>
            </div>

            <div className="text-sm font-light leading-relaxed flex flex-col gap-1 mt-2">
              <p className="text-white font-medium">Bookings & Support:</p>
              <p className="hover:text-pink-500 cursor-pointer transition-colors">
                +91 9685641XXX
              </p>
              <p className="hover:text-pink-500 cursor-pointer transition-colors">
                bhaveshchawke4321@gmail.com
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Footer Section: Copyright & Legal */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-light">
          <p>
            &copy; {new Date().getFullYear()} BeauTen Salon & Store. All rights
            reserved.
          </p>
          <div className="flex gap-6">
            <span className="hover:text-white cursor-pointer transition-colors">
              Privacy Policy
            </span>
            <span className="hover:text-white cursor-pointer transition-colors">
              Terms of Service
            </span>
            <span className="hover:text-white cursor-pointer transition-colors">
              Refund Policy
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
