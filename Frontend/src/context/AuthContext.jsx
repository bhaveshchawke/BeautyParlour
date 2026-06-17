import { createContext } from "react";
import { useState, useEffect } from "react";
import { checkAuthStatus } from "../services/AuthService";
export const AuthContext = createContext();

export const UserDataProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchUser = async () => {
      const data = await checkAuthStatus();
      if (data && data.isLoggedIn) {
        setUser(data.user);
      }
      setIsLoading(false);
    };
    fetchUser();
  }, []);
  const logout = () => {
    setUser(null); // React state turant clear!
  };
  return (
    <>
      <AuthContext.Provider value={{ user, isLoading, logout }}>
        {children}
      </AuthContext.Provider>
    </>
  );
};
