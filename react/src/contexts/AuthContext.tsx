import {
  useState,
  useEffect,
  createContext,
  SetStateAction,
  Dispatch,
  ReactElement,
} from "react";
import { useNavigate } from "react-router-dom";
import axios from "utils/axios";

interface AuthProviderValue {
  token: string | null;
  setToken: Dispatch<SetStateAction<string | null>>;
  isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthProviderValue>({
  token: null,
  setToken: () => { },
  isAuthenticated: false,
});

export const AuthProvider = ({ children }: { children: ReactElement }) => {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem("token"));
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      // Probably should be Bearer token format
      axios.defaults.headers.common["Authorization"] = token;
      localStorage.setItem("token", token);
      navigate("/");
    }
  }, [token, navigate]);

  useEffect(() => {
    if (token) {
      setIsAuthenticated(true);
    }
  }, [token]);

  return (
    <AuthContext.Provider value={{ token, setToken, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
