import { useEffect, useState } from "react";
import { fetchOrders } from "../services/productService"; //for user
import {
  createPaymentOrder,
  verifyPaymentSignature,
} from "../services/paymentService";
import { useMessage } from "../hooks/useMessage";

export const CheckOut = () => {
  const [orders, setOrders] = useState([]);
  const { showMessage } = useMessage();

  const [formData, setFormData] = useState({
    email: "user@example.com", // Example of pre-filled data
    phone: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  useEffect(() => {
    const fetchOrdersData = async () => {
      try {
        const response = await fetchOrders();
        if (!response || !response.orders) {
          setOrders([]);
          return;
        }
        setOrders(response.orders);

        // Pre-fill form based on the LATEST pending order's customer details
        const pendingOrder =
          [...response.orders]
            .reverse()
            .find((order) => order.paymentStatus === "Pending") ||
          response.orders[response.orders.length - 1];

        if (pendingOrder) {
          const nameParts = pendingOrder.customerName
            ? pendingOrder.customerName.split(" ")
            : ["", ""];
          setFormData((prev) => ({
            ...prev,
            firstName: nameParts[0] || "",
            lastName: nameParts.slice(1).join(" ") || "",
            phone: pendingOrder.customerPhone || prev.phone,
          }));
        }
      } catch (error) {
        console.log(error);
        setOrders([]);
      }
    };
    fetchOrdersData();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Find the LATEST pending order to display in the checkout summary
  const currentOrder =
    [...orders].reverse().find((order) => order.paymentStatus === "Pending") ||
    orders[orders.length - 1];
  const cartItems = currentOrder ? currentOrder.items : [];
  const subtotal = currentOrder ? currentOrder.totalAmount : 0;
  const shipping = 0; // Free shipping
  const total = subtotal + shipping;

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    if (!currentOrder) return;
    const isLoaded = await loadRazorpayScript();
    if (!isLoaded) {
      showMessage("Razorpay failed to load. Check your connection.", "error");
      return;
    }

    const orderData = await createPaymentOrder(total, currentOrder._id);
    if (!orderData.success) {
      showMessage("Server error creating payment order", "error");
      return;
    }

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID || "rzp_live_RuyggVLfE3NBKM",
      amount: orderData.order.amount,
      currency: "INR",
      name: "Beauty Parlor",
      order_id: orderData.order.id,
      handler: async function (response) {
        const verifyRes = await verifyPaymentSignature({
          razorpay_order_id: response.razorpay_order_id,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_signature: response.razorpay_signature,
          mongoOrderId: currentOrder._id,
        });

        if (verifyRes.success) {
          showMessage("Payment Successful!", "success");
          // Optional: redirect to a success page or refresh state
          setTimeout(() => {
            window.location.reload();
          }, 1500);
        } else {
          showMessage("Payment verification failed.", "error");
        }
      },
      prefill: {
        name: formData.firstName,
        email: formData.email,
        contact: formData.phone,
      },
      theme: { color: "#db2777" }, // pink-600
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  return (
    // Deep minimal background for distraction-free checkout
    <div className="min-h-screen bg-[#faf9f8] font-sans text-gray-800 selection:bg-pink-200">
      {/* Minimal Header (Distraction-Free) */}
      <header className="bg-white border-b border-gray-100 py-6 px-4 sm:px-6 lg:px-8 flex justify-center">
        <h1 className="text-2xl font-light tracking-widest text-gray-900 uppercase">
          Sai<span className="font-semibold text-pink-600">Parlour</span>
        </h1>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
          {/* ================= CENTERED COLUMN: Order Summary ================= */}
          <div className="w-full lg:w-[500px] mx-auto">
            <div className="sticky top-10 bg-white rounded-3xl p-8 border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
              <h3 className="text-lg font-medium text-gray-900 mb-6">
                Order Summary
              </h3>

              {/* Items List */}
              <div className="space-y-4 mb-6 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                {cartItems.map((item) => (
                  <div key={item._id} className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-50 flex-shrink-0 border border-gray-100">
                      {/* Using a placeholder cosmetic image since API doesn't provide one */}
                      <img
                        src="https://images.unsplash.com/photo-1596462502278-27bf85033c5a?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80"
                        alt={item.productName}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-gray-900">
                        {item.productName}
                      </h4>
                      <p className="text-xs text-gray-500 mt-0.5">
                        Qty: {item.quantity}
                      </p>
                    </div>
                    <div className="text-sm font-medium text-gray-900">
                      ₹{item.price.toLocaleString()}
                    </div>
                  </div>
                ))}
                {cartItems.length === 0 && (
                  <p className="text-sm text-gray-500 text-center py-4">
                    No pending items found.
                  </p>
                )}
              </div>

              {/* Price Breakdown */}
              <div className="border-t border-gray-100 pt-6 space-y-3 mb-6">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-medium text-gray-900">
                    ₹{subtotal.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Shipping</span>
                  <span className="font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded uppercase tracking-wider text-[10px]">
                    Free
                  </span>
                </div>
              </div>

              <div className="border-t border-gray-100 pt-4 mb-8 flex justify-between items-end">
                <span className="text-base text-gray-900 font-medium">
                  Total
                </span>
                <span className="text-2xl font-semibold text-gray-900">
                  ₹{total.toLocaleString()}
                </span>
              </div>

              {/* Call to Action Button */}
              <button
                disabled={cartItems.length === 0}
                type="button"
                onClick={handlePayment}
                className="w-full cursor-pointer bg-pink-600 hover:bg-pink-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-4 rounded-xl font-medium text-lg transition-all shadow-[0_4px_14px_0_rgba(219,39,119,0.39)] flex items-center justify-center gap-2"
              >
                Pay with UPI
              </button>

              {/* Trust Badges */}
              <div className="mt-6 flex flex-col items-center justify-center gap-2">
                <div className="flex items-center gap-2 text-gray-500 text-xs font-medium">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-green-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                  256-bit Secure Checkout
                </div>
                <p className="text-[10px] text-gray-400 text-center">
                  Your payment details are fully encrypted and safe.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
