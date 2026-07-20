import axios from "axios";
const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const createPaymentOrder = async (amount, mongoOrderId) => {
  try {
    const { data } = await axios.post(
      `${backendUrl}/product/create-razorpay-order`,
      { amount, receiptId: mongoOrderId },
      { withCredentials: true }
    );
    return data;
  } catch (error) {
    console.error("Error creating payment order", error);
    return { success: false };
  }
};

export const verifyPaymentSignature = async (paymentData) => {
  try {
    const { data } = await axios.post(
      `${backendUrl}/product/verify-payment`,
      paymentData,
      { withCredentials: true }
    );
    return data;
  } catch (error) {
    console.error("Error verifying payment", error);
    return { success: false };
  }
};
