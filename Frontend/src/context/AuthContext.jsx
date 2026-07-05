import { createContext, useContext, useState, useEffect } from "react";
import { checkAuthStatus } from "../services/AuthService";
import { AdminContext } from "./AdminContext";

export const AuthContext = createContext();

export const UserDataProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { setIsAdmin } = useContext(AdminContext);

  useEffect(() => {
    const fetchUser = async () => {
      const data = await checkAuthStatus();
      if (data && data.isLoggedIn) {
        setUser(data.user);
        if (data.user.isAdmin) {
          setIsAdmin(true);
        }
      }
      setIsLoading(false);
    };
    fetchUser();
  }, [setIsAdmin]);

  const logout = () => {
    setUser(null);
    setIsAdmin(false);
  };

  const loginUser = (userData) => {
    setUser(userData);
    if (userData && userData.isAdmin) {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, logout, loginUser }}>
      {children}
    </AuthContext.Provider>
  );
};
