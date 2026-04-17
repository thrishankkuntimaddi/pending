import { createContext, useContext, useEffect, useState } from "react";
import { onAuthChange, signInWithGoogle, signOut } from "../firebase/auth";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthChange((u) => {
      setUser(u);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const login = async () => {
    setLoading(true);
    try {
      await signInWithGoogle();
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    await signOut();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};
