import React, { createContext, useContext, useState } from 'react';

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [authUser, setAuthUser] = useState(() => {
    // Window check karke localStorage access karo
    if (typeof window !== 'undefined') {
      const user = localStorage.getItem("Users");
      return user ? JSON.parse(user) : null;
    }
    return null;
  });

  return (
    <AuthContext.Provider value={[authUser, setAuthUser]}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);