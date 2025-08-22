import { Navigate } from "react-router-dom";

const AntiAdminRoute = ({ children }) => {
  const role = localStorage.getItem("role");

  if (!role) {
    return <Navigate to="/login" replace />;
  }

  if (role === "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AntiAdminRoute;
