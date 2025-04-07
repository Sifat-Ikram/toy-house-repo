import { createContext, useEffect, useRef, useState } from "react";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => localStorage.getItem("userAccess"));
  const [loading, setLoading] = useState(true);
  const refreshTimeoutRef = useRef(null);

  const getTokenExpiry = () => {
    const expiry = localStorage.getItem("tokenExpiry");
    return expiry ? Number(expiry) : null; // Ensures it is a number
  };

  const isTokenExpired = () => {
    const expiryTime = getTokenExpiry();
    return expiryTime && Date.now() > expiryTime;
  };

  const logout = () => {
    ["userAccess", "userRefresh", "tokenExpiry"].forEach((key) => {
      localStorage.removeItem(key);
      sessionStorage.removeItem(key);
    });

    setUser(null);
    if (refreshTimeoutRef.current) clearTimeout(refreshTimeoutRef.current);
  };

  useEffect(() => {
    if (!user) {
      setLoading(false); // No user, stop loading
      return;
    }

    if (isTokenExpired()) {
      logout();
      setTimeout(() => {
        window.location.href = "/login"; // Redirect to login
      }, 0);
    } else {
      setLoading(false); // User exists & token is valid
    }
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Show loading state
  }

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
