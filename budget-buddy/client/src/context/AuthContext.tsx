import { createContext, useState, useEffect, ReactNode } from "react";
import axios from "axios";

interface User {
  name: string;
  email: string;
  notifications?: {
    emailAlerts: boolean;
    smsAlerts: boolean;
    pushNotifications: boolean;
  };
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  setUser: (user: User) => void;
}

// Export context
export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem("token"));

  // Restore user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) setUser(JSON.parse(savedUser));

    if (token) axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }, [token]);

  const login = async (email: string, password: string) => {
    const res = await axios.post("http://localhost:4000/api/auth/login", { email, password });
    setUser(res.data.user);
    setToken(res.data.token);

    // Persist token and user
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("user", JSON.stringify(res.data.user));
  };

  const signup = async (name: string, email: string, password: string) => {
    const res = await axios.post("http://localhost:4000/api/auth/signup", { name, email, password });
    setUser(res.data.user);
    setToken(res.data.token);

    // Persist token and user
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("user", JSON.stringify(res.data.user));
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    axios.defaults.headers.common["Authorization"] = "";
  };

  return (
    <AuthContext.Provider value={{ user, token, login, signup, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};





