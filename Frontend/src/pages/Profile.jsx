import { useState } from "react";

export const Profile = () => {
  // Tabs के बीच स्विच करने के लिए State
  const [activeTab, setActiveTab] = useState("appointments");

  return (
    // Deep Dark Background for the whole page
    <div className="bg-[#0a0a0a] min-h-screen font-sans py-12 lg:py-20 text-gray-300">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Page Title */}
        <div className="mb-10 border-b border-white/10 pb-6">
          <h1 className="text-3xl lg:text-4xl font-light text-white tracking-tight">
            My <span className="font-semibold text-pink-500">Account</span>
          </h1>
        </div>

        {/* 2-Column Layout */}
        <div className="flex flex-col lg:flex-row gap-10 items-start">
          {/* ================= LEFT COLUMN: Sidebar Navigation ================= */}
          <div className="w-full lg:w-1/4 flex flex-col gap-6">
            {/* User Info Card (The Elite Card) */}
            <div className="bg-[#121212] p-6 rounded-2xl border border-white/5 shadow-xl flex flex-col items-center text-center relative overflow-hidden">
              {/* Subtle top glow */}
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-pink-500 to-transparent opacity-50"></div>

              {/* Avatar (Initials) */}
              <div className="w-20 h-20 bg-pink-600/10 border border-pink-500/30 rounded-full flex items-center justify-center text-2xl font-medium text-pink-500 mb-4 shadow-[0_0_15px_rgba(219,39,119,0.2)]">
                BC
              </div>

              <h2 className="text-lg font-medium text-white mb-1">
                Bhavesh Chawke
              </h2>
              <p className="text-xs font-light text-gray-400 mb-4">
                bhavesh.c@example.com
              </p>

              <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] uppercase tracking-widest text-pink-400 font-medium flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-pink-500 rounded-full animate-pulse"></span>
                Elite Member
              </span>
            </div>

            {/* Sidebar Navigation */}
            <div className="bg-[#121212] rounded-2xl border border-white/5 shadow-xl overflow-hidden flex flex-col py-3">
              <button
                onClick={() => setActiveTab("appointments")}
                className={`w-full flex items-center gap-4 px-6 py-4 text-sm transition-all border-l-2 cursor-pointer ${activeTab === "appointments" ? "bg-white/5 border-pink-500 text-white font-medium" : "border-transparent text-gray-400 hover:bg-white/5 hover:text-white"}`}
              >
                📅 My Appointments
              </button>
              <button
                onClick={() => setActiveTab("orders")}
                className={`w-full flex items-center gap-4 px-6 py-4 text-sm transition-all border-l-2 cursor-pointer ${activeTab === "orders" ? "bg-white/5 border-pink-500 text-white font-medium" : "border-transparent text-gray-400 hover:bg-white/5 hover:text-white"}`}
              >
                🛍️ Cosmetic Orders
              </button>
              <button
                onClick={() => setActiveTab("address")}
                className={`w-full flex items-center gap-4 px-6 py-4 text-sm transition-all border-l-2 cursor-pointer ${activeTab === "address" ? "bg-white/5 border-pink-500 text-white font-medium" : "border-transparent text-gray-400 hover:bg-white/5 hover:text-white"}`}
              >
                📍 Saved Addresses
              </button>
              <button
                onClick={() => setActiveTab("settings")}
                className={`w-full flex items-center gap-4 px-6 py-4 text-sm transition-all border-l-2 cursor-pointer ${activeTab === "settings" ? "bg-white/5 border-pink-500 text-white font-medium" : "border-transparent text-gray-400 hover:bg-white/5 hover:text-white"}`}
              >
                ⚙️ Account Settings
              </button>

              <div className="h-px bg-white/10 my-2 mx-4"></div>

              <button className="w-full flex items-center gap-4 px-6 py-4 text-sm text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all cursor-pointer">
                🚪 Log Out
              </button>
            </div>
          </div>

          {/* ================= RIGHT COLUMN: Main Content Area ================= */}
          <div className="w-full lg:w-3/4">
            {/* 1. Appointments View */}
            {activeTab === "appointments" && (
              <div className="animate-fade-in">
                <h3 className="text-xl font-light text-white mb-6">
                  Upcoming <span className="font-semibold">Appointments</span>
                </h3>

                {/* Single Appointment Card */}
                <div className="bg-[#121212] rounded-2xl border border-white/5 p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-pink-500/30 transition-colors">
                  <div className="flex gap-6 items-center">
                    {/* Date Block */}
                    <div className="w-16 h-16 rounded-xl bg-white/5 border border-white/10 flex flex-col items-center justify-center flex-shrink-0">
                      <span className="text-xs text-pink-500 font-semibold uppercase">
                        Oct
                      </span>
                      <span className="text-xl font-light text-white">24</span>
                    </div>
                    {/* Details */}
                    <div>
                      <h4 className="text-base font-medium text-white mb-1">
                        Advanced Hair Spa & Styling
                      </h4>
                      <p className="text-sm text-gray-400 font-light mb-2">
                        10:30 AM • Expert Stylist
                      </p>
                      <span className="inline-block px-2.5 py-1 bg-green-500/10 text-green-400 text-[10px] uppercase tracking-wider rounded-md font-medium">
                        Confirmed
                      </span>
                    </div>
                  </div>
                  {/* Actions */}
                  <div className="flex gap-3">
                    <button className="px-4 py-2 border border-white/10 text-gray-300 text-xs font-medium rounded-lg hover:bg-white/5 transition-colors cursor-pointer">
                      Reschedule
                    </button>
                    <button className="px-4 py-2 bg-pink-600/10 text-pink-500 border border-pink-500/20 text-xs font-medium rounded-lg hover:bg-pink-600 hover:text-white transition-all cursor-pointer">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* 2. Orders View */}
            {activeTab === "orders" && (
              <div className="animate-fade-in">
                <h3 className="text-xl font-light text-white mb-6">
                  Recent <span className="font-semibold">Orders</span>
                </h3>

                {/* Single Order Card */}
                <div className="bg-[#121212] rounded-2xl border border-white/5 p-6 flex flex-col gap-6 hover:border-pink-500/30 transition-colors">
                  {/* Order Header */}
                  <div className="flex justify-between items-center border-b border-white/5 pb-4">
                    <div>
                      <p className="text-xs text-gray-400 font-light mb-1">
                        Order #BT-849201
                      </p>
                      <p className="text-sm font-medium text-white">
                        Placed on Oct 12, 2026
                      </p>
                    </div>
                    <span className="px-3 py-1 bg-pink-500/10 text-pink-400 text-[10px] uppercase tracking-wider rounded-md font-medium border border-pink-500/20">
                      Shipped
                    </span>
                  </div>

                  {/* Order Item */}
                  <div className="flex items-center gap-4">
                    <img
                      src="https://images.pexels.com/photos/2587370/pexels-photo-2587370.jpeg?auto=compress&cs=tinysrgb&w=150"
                      alt="Product"
                      className="w-16 h-16 rounded-lg object-cover border border-white/10"
                    />
                    <div>
                      <h4 className="text-sm font-medium text-white">
                        L'Oréal Professional Hair Spa Mask
                      </h4>
                      <p className="text-xs text-gray-400 font-light">
                        Qty: 1 • ₹749
                      </p>
                    </div>
                  </div>

                  {/* Order Footer */}
                  <div className="flex justify-between items-center pt-2">
                    <p className="text-sm font-medium text-white">
                      Total: ₹749
                    </p>
                    <button className="text-xs text-pink-500 hover:text-pink-400 font-medium cursor-pointer underline-offset-4 hover:underline">
                      Track Package →
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* 3. Saved Address View (Preview) */}
            {activeTab === "address" && (
              <div className="animate-fade-in">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-light text-white">
                    Saved <span className="font-semibold">Addresses</span>
                  </h3>
                  <button className="text-xs bg-white/5 hover:bg-white/10 text-white px-4 py-2 rounded-lg transition-colors cursor-pointer border border-white/10">
                    + Add New
                  </button>
                </div>

                <div className="bg-[#121212] rounded-2xl border border-pink-500/30 p-6 relative">
                  <div className="absolute top-6 right-6 text-pink-500 text-xs font-semibold uppercase tracking-widest bg-pink-500/10 px-2 py-1 rounded">
                    Default
                  </div>
                  <h4 className="text-sm font-medium text-white mb-2">Home</h4>
                  <p className="text-sm text-gray-400 font-light leading-relaxed max-w-sm">
                    Bhavesh Chawke
                    <br />
                    101, Tech Park, IT Square
                    <br />
                    Indore, Madhya Pradesh 452001
                    <br />
                    Phone: +91 98765 43210
                  </p>
                  <div className="flex gap-4 mt-4">
                    <button className="text-xs text-gray-300 hover:text-white transition-colors cursor-pointer">
                      Edit
                    </button>
                    <button className="text-xs text-red-400 hover:text-red-300 transition-colors cursor-pointer">
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* 4. Settings View (Empty state preview) */}
            {activeTab === "settings" && (
              <div className="animate-fade-in">
                <h3 className="text-xl font-light text-white mb-6">
                  Account <span className="font-semibold">Settings</span>
                </h3>
                <div className="bg-[#121212] rounded-2xl border border-white/5 p-10 text-center">
                  <p className="text-gray-400 font-light text-sm">
                    Update your password, notification preferences, and privacy
                    settings here.
                  </p>
                  {/* You can add a form here later */}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
