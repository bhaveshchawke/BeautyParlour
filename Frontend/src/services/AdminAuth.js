import axios from "axios";
const backendUrl = import.meta.env.VITE_BACKEND_URL;
//for check isAdmin or not//
export const isAdmin = async () => {
  try {
    const response = await axios.get(`${backendUrl}/admin/me`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
      throw new Error(error.response.data.error);
    }
    // 2. Agar server band hai ya koi dusra error hai
    throw new Error(error.message);
  }
};
