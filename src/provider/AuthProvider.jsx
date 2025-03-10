import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser =
      localStorage.getItem("userAccess") ||
      sessionStorage.getItem("userAccess");

    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const isTokenExpired = () => {
    const expiryTime =
      localStorage.getItem("tokenExpiry") ||
      sessionStorage.getItem("tokenExpiry");
    return expiryTime && Date.now() > expiryTime;
  };

  const refreshAccessToken = () => {
    const refreshToken =
      localStorage.getItem("userRefresh") ||
      sessionStorage.getItem("userRefresh");

    if (!refreshToken) {
      console.error("No refresh token found, logging out...");
      logout();
      return;
    }

    console.log("Refreshing token...");

    // Simulate getting a new token
    const newAccessToken = `new-access-token-${Date.now()}`;
    localStorage.setItem("accessToken", newAccessToken);
    setUser(newAccessToken);

    // Extend expiry time (1 hour)
    const newExpiryTime = Date.now() + 3600 * 1000;
    localStorage.setItem("tokenExpiry", newExpiryTime);
    sessionStorage.setItem("tokenExpiry", newExpiryTime);

    // Schedule next token refresh
    scheduleTokenRefresh();
  };

  const scheduleTokenRefresh = () => {
    const expiryTime =
      localStorage.getItem("tokenExpiry") ||
      sessionStorage.getItem("tokenExpiry");
    if (!expiryTime) return;

    const refreshTime = expiryTime - Date.now() - 5000; // Refresh 5 seconds before expiry

    if (refreshTime > 0) {
      setTimeout(refreshAccessToken, refreshTime);
    }
  };

  const logout = async () => {
    await localStorage.removeItem("userAccess");
    await sessionStorage.removeItem("userAccess");
    await localStorage.removeItem("userRefresh");
    await sessionStorage.removeItem("userRefresh");
    await localStorage.removeItem("tokenExpiry");
    await sessionStorage.removeItem("tokenExpiry");
    await setUser(null);
  };

  // Run on component mount
  useEffect(() => {
    if (isTokenExpired()) {
      refreshAccessToken();
    } else {
      scheduleTokenRefresh();
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
