import React from "react";
import axios from "../api/axios";
import useAuth from "./useAuth";

const useRefresh = () => {
  const { setAuth } = useAuth();
  const refresh = async () => {
    try {
      const res = await axios.get("/refresh", { withCredentials: true });
      setAuth((prev) => ({
        ...prev,
        token: res.data.accessToken,
      }));
      return { token: res.data.accessToken };
    } catch (err) {
      // console.log(err);
    }
  };
  return refresh;
};

export default useRefresh;
