import React, { createContext, useEffect, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ user: null, token: "" });
  useEffect(() => {
    const data = localStorage.getItem(`auth`);
    if (data) {
      const dataParse = JSON.parse(data);
      setAuth({
        ...auth,
        user: dataParse.user,
        token: dataParse.token,
      });
    }
  }, []);
  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
