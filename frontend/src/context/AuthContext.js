import {
  createContext,
  useContext,
  useReducer,
  useState,
  useEffect,
} from "react";
import authReducer from "./AuthReducer";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setcurrentUser] = useState(null);
  const [state, dispatch] = useReducer(authReducer, { token: null });

  // Get current user via Bearer Token

  const fetchCurrentUser = async () => {
    setcurrentUser(null);
    try {
      const response = await fetch("/api/v1/auth/me", {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const json = await response.json();
        setcurrentUser(json);
        // console.log(currentUser);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const logOutUser = async () => {
    try {
      const response = await fetch("/api/v1/auth/logout", {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        localStorage.setItem("userLogged", "false");
        fetchCurrentUser();
      }
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect(() => {
  //   fetchCurrentUser();
  // }, [localStorage.setItem("userLogged", "false")]);

  return (
    <AuthContext.Provider
      value={{ state, dispatch, currentUser, fetchCurrentUser, logOutUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
