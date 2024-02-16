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

  //   const token =
  //     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1OTdmNDI2Y2Q5OTRmYzQ4MmY0ZGQ4ZCIsImlhdCI6MTcwODEwOTY5MSwiZXhwIjoxNzEwNzAxNjkxfQ.e4nGL7hZIkM8O26otQZfwA5qRiDT7WEpnGgNaYumNn0";

  // Get current user via Bearer Token
  useEffect(() => {
    const fetchCurrentUser = async (token) => {
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
    if (state.token) {
      fetchCurrentUser(state.token);
    }
  }, [state.token]);

  return (
    <AuthContext.Provider value={{ state, dispatch, currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
