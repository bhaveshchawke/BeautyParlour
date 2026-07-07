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
