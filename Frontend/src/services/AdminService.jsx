import axios from "axios";
const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const confirmedAppointment = async (id, status) => {
  try {
    if (status === "confirmed") {
      const response = await axios.post(
        `${backendUrl}/admin/confirmed`,
        { id },
        { withCredentials: true },
      );
      return response.data;
    }
    if (status === "cancelled") {
      const response = await axios.post(
        `${backendUrl}/admin/cancel`,
        { id },
        { withCredentials: true },
      );
      return response.data;
    }
    if (status === "completed") {
      const response = await axios.post(
        `${backendUrl}/admin/completed`,
        { id },
        { withCredentials: true },
      );
      return response.data;
    }
    return null;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
      throw new Error(error.response.data.error);
    }
    throw new Error(error.message);
  }
};

//AddServiceFromAdmin_________________________________________
export const addService = async (data) => {
  try {
    const response = await axios.post(`${backendUrl}/admin/addService`, data, {
      withCredentials: true,
    });
    if (response) {
      return response.data;
    }
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
      throw new Error(error.response.data.error);
    }
    throw new Error(error.message);
  }
};

//__getAll-Services_from_backend________________________________________________
export const getAllServies = async () => {
  try {
    const response = await axios.get(`${backendUrl}/services/getallservices`);
    return response.data;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
      throw new Error(error.response.data.error);
    }
    throw new Error(error.message);
  }
};
//EditServiceFromAdmin_________________________________________
export const editService = async (id, data) => {
  try {
    const response = await axios.put(
      `${backendUrl}/admin/editService/${id}`,
      data,
      {
        withCredentials: true,
      },
    );
    if (response) {
      return response.data;
    }
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
      throw new Error(error.response.data.error);
    }
    throw new Error(error.message);
  }
};
//api for delete_service________________________
//api for delete_service________________________
export const deleteService = async (id) => {
  try {
    const response = await axios.delete(
      `${backendUrl}/admin/deleteservice/${id}`, // ID ko URL me jod diya
      {
        withCredentials: true,
      },
    );
    return response.data;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
      throw new Error(error.response.data.error);
    }
    throw new Error(error.message);
  }
};
///for handle service active or not_________________
export const isActive = async (id) => {
  try {
    const response = await axios.post(
      `${backendUrl}/admin/isactive`,
      { id },
      {
        withCredentials: true,
      },
    );
    return response.data;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
      throw new Error(error.response.data.error);
    }
    throw new Error(error.message);
  }
};
// api for all customes data
export const getAllUsers = async () => {
  try {
    const users = await axios.get(`${backendUrl}/admin/getallusers`, {
      withCredentials: true,
    });
    return users.data;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
      throw new Error(error.response.data.error);
    }
    throw new Error(error.message);
  }
};
// for adding products in App_____________________________________________________
export const addProducts = async (data) => {
  try {
    const response = await axios.post(`${backendUrl}/admin/addproduct`, data, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
      throw new Error(error.response.data.error);
    }
    throw new Error(error.message);
  }
};
// getting all products
export const fetchAllProducts = async () => {
  try {
    const products = await axios.get(`${backendUrl}/admin/fetchproducts`, {
      withCredentials: true,
    });
    return products.data;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
      throw new Error(error.response.data.error);
    }
    throw new Error(error.message);
  }
};
//api for update/edit product
export const updateProduct = async (data) => {
  try {
    const response = await axios.post(
      `${backendUrl}/admin/updateproduct`,
      data,
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
// for delete product
export const deleteProduct = async (id) => {
  try {
    const response = await axios.post(
      `${backendUrl}/admin/deleteproduct`,
      { id },
      {
        withCredentials: true,
      },
    );
    return response.data;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
      throw new Error(error.response.data.error);
    }
    throw new Error(error.message);
  }
};
// added to cart api__________________________________________________
export const addToCart = async (id) => {
  try {
    const response = await axios.post(
      `${backendUrl}/admin/addtocart`,
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
//__ fethcing carts_____________________
export const fetchAllCarts = async () => {
  try {
    const carts = await axios.get(`${backendUrl}/admin/fetchcarts`, {
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

// for toggling product status//
export const toogleProductStatus = async (id) => {
  try {
    const response = await axios.post(
      `${backendUrl}/admin/toogleproductptatus`,
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
//__for-fetching -all-orders_________________________________________________________
export const fetchOrders = async () => {
  try {
    const orders = await axios.get(`${backendUrl}/admin/fetchorders`, {
      withCredentials: true,
    });
    return orders.data;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
      throw new Error(error.response.data.error);
    }
    throw new Error(error.message);
  }
};

// update order status
export const updateOrderStatusApi = async (orderId, newStatus) => {
  try {
    const response = await axios.put(
      `${backendUrl}/admin/update-order-status`,
      { orderId, newStatus },
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      return { success: false, message: error.response.data.message };
    }
    return { success: false, message: error.message };
  }
};
