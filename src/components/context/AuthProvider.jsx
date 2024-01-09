/* eslint-disable react/prop-types */
import { createContext, useCallback, useRef, useState } from "react";
import axios from "../../api/axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});

  async function logIn(username, password) {
    const res = await axios.post(
      "/login",
      JSON.stringify({ username, password }),
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );

    setAuth({
      username,
      password,
      token: res.data.accessToken,
    });
  }

  async function logOut() {
    setAuth({});
    try {
      const res = await axios("/logout", { withCredentials: true });
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <AuthContext.Provider value={{ auth, setAuth, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
