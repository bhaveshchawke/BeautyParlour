import axios from "axios";
const backendUrl = import.meta.env.VITE_BACKEND_URL;
// delete poduct from cart//
export const deleteProductFromCart = async (id) => {
  try {
    const response = await axios.post(
      `${backendUrl}/product/deleteproductfromcart`,
      { id },
      { withCredentials: true },
    );
    return response.data;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
      throw new Error(error.response.data.error);
    }
    throw new Error(error.message);
  }
};

///for creating an order///
export const createOrder = async (orderData) => {
  try {
    const response = await axios.post(
      `${backendUrl}/product/create`,
      orderData,
      { withCredentials: true },
    );
    return response.data;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error(error.message);
  }
};
//for fetching orders_for-user_______________________________________________
export const fetchOrders = async () => {
  try {
    const orders = await axios.get(`${backendUrl}/product/fetchorders`, {
      withCredentials: true,
    });
    return orders.data;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error(error.message);
  }
};
//__ fethcing carts_____________________
export const fetchAllCarts = async () => {
  try {
    const carts = await axios.get(`${backendUrl}/product/fetchcarts`, {
      withCredentials: true,
    });
    return carts.data;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
      throw new Error(error.response.data.error);
    }
    throw new Error(error.message);
  }
};
