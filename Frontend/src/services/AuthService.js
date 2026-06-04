import axios from "axios";
const backendUrl = import.meta.env.VITE_BACKEND_URL;
export const sendRegisteredData = async ({
  confirmPassword,
  termsAccepted,
  ...data
}) => {
  try {
    const response = await axios.post(`${backendUrl}/auth/register`, data);
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};
