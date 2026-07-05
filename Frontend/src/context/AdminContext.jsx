import { createContext, useState, useEffect } from "react";
export const AdminContext = createContext();
import { isAdmin as checkAdminStatus } from "../services/AdminAuth";

export const AdminDataProvider = ({ children }) => {
  const [adminData, setAdminData] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const response = await checkAdminStatus();
        if (response) {
          setAdminData(response.user);
          setIsAdmin(response.isAdmin);
          return;
        }
        setAdminData(null);
        setIsAdmin(false);
      } catch (error) {
        setAdminData(null);
        setIsAdmin(false);
      }
    };
    fetchAdmin();
  }, []);
  return (
    <>
      <AdminContext.Provider value={{ isAdmin, adminData, setIsAdmin }}>
        {children}
      </AdminContext.Provider>
    </>
  );
};
