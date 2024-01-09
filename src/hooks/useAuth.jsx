import { useContext } from "react";
import AuthContext from "../components/context/AuthProvider";

const useAuth = () => {
  const context = useContext(AuthContext);
  return context;
};

export default useAuth;
