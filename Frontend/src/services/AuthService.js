import axios from "axios";
const backendUrl = import.meta.env.VITE_BACKEND_URL;

//send data to backend
export const sendRegisteredData = async ({
  confirmPassword,
  termsAccepted,
  ...data
}) => {
  try {
    const response = await axios.post(`${backendUrl}/auth/register`, data);
    return response.data;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
      throw new Error(error.response.data.error);
    } else {
      // Agar backend se response hi na aaye (jaise Network Error)
      throw new Error(error.message);
    }
  }
};

//verify otp
export const validateOtp = async (data) => {
  try {
    const response = await axios.post(`${backendUrl}/auth/verifyOtp`, data, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
      const errMsg = typeof error.response.data.error === 'object' ? JSON.stringify(error.response.data.error) : error.response.data.error;
      throw new Error(errMsg);
    } else {
      throw new Error(error.message);
    }
  }
};

//send logic data to backend//
export const sendLogindata = async (data) => {
  try {
    const response = await axios.post(`${backendUrl}/auth/getlogindata`, data, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
      const errMsg = typeof error.response.data.error === 'object' ? JSON.stringify(error.response.data.error) : error.response.data.error;
      throw new Error(errMsg);
    } else {
      const fallbackMsg = typeof error.response?.data === 'string' ? error.response.data : error.message;
      throw new Error(fallbackMsg);
    }
  }
};
//for getting cookie login info form backend//

export const checkAuthStatus = async () => {
  try {
    const response = await axios.get(`${backendUrl}/auth/me`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    return null;
  }
};
//for logout //
export const logoutUser = async () => {
  try {
    const responce = await axios.post(
      `${backendUrl}/auth/logout`,
      {},
      {
        withCredentials: true,
      },
    );
    return responce.data;
  } catch (error) {
    throw new Error(error.message);
  }
};
