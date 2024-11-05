import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  let navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // Verify token with server
      const verifyToken = async () => {
        try {
          const response = await fetch("http://localhost:8080/verify-token", {
            headers: { Authorization: `Bearer ${token}` },
          });
          if (response.ok) {
            setIsLoggedIn(true);
          } else {
            handleLogout();
          }
        } catch (error) {
          console.error("Token verification failed:", error);
          handleLogout();
        }
      };
      verifyToken();
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/");
  };

  return { isLoggedIn, setIsLoggedIn, handleLogout };
};

export default useAuth;
