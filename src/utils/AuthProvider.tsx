import React, { createContext, useContext, useState } from "react";

// Määritellään kontekstin tyyppi
interface AuthContextType {
  isAuthenticated: boolean;
  login: (userToken: string) => void;
  logout: () => void;
}

// Luodaan konteksti ja annetaan sille tyyppi
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);

  const login = (userToken: string) => {
    setToken(userToken);
  };

  const logout = () => {
    setToken(null);
  };

  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AuthProvider;
