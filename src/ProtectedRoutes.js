import { Outlet, Navigate } from "react-router-dom";

const PrivateRoutes = () => {
  const account = JSON.parse(localStorage.getItem("infoCustomer"));

  return account ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
