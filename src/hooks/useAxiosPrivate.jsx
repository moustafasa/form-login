import { useEffect } from "react";
import { axiosPrivate } from "../api/axios";
import useRefresh from "./useRefresh";
import useAuth from "./useAuth";

const useAxiosPrivate = () => {
  const refresh = useRefresh();
  const { auth } = useAuth();

  useEffect(() => {
    const reqIntercept = axiosPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${auth.token}`;
        }
        return config;
      },
      (err) => Promise.reject(err)
    );
    const resIntercept = axiosPrivate.interceptors.response.use(
      (res) => res,
      async (err) => {
        const prev = err.config;
        if (err.response.status === 401 && !prev.sent) {
          prev.sent = true;
          const { token } = await refresh();
          prev.headers["Authorization"] = `Bearer ${token}`;
          return axiosPrivate(prev);
        }
        return Promise.reject(err);
      }
    );
    return () => {
      axiosPrivate.interceptors.response.eject(reqIntercept);
      axiosPrivate.interceptors.response.eject(resIntercept);
    };
  }, [refresh, auth]);

  return axiosPrivate;
};

export default useAxiosPrivate;
