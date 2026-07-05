import { useContext } from "react";
import { AdminContext } from "../context/AdminContext";
export const useAdminData = () => {
  return useContext(AdminContext);
};
