import {
  createContext,
  useContext,
  useReducer,
  useState,
  useEffect,
} from "react";
import authReducer from "./AuthReducer";
import Cookies from "js-cookie";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setcurrentUser] = useState(null);
  const [state, dispatch] = useReducer(authReducer, { token: null });

  const token = localStorage.getItem("token");

  // Get current user via Bearer Token

  const fetchCurrentUser = async (token) => {
    setcurrentUser(null);
    try {
      const response = await fetch("/api/v1/auth/me", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const json = await response.json();
      setcurrentUser(json);
      // console.log(currentUser);
    } catch (error) {
      console.log(error);
    }
  };

  const logOutUser = () => {
    setcurrentUser(null);
  };

  useEffect(() => {
    if (token) {
      fetchCurrentUser(token);
    }
  }, [token]);

  return (
    <AuthContext.Provider value={{ state, dispatch, currentUser, logOutUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;