import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const token = localStorage.getItem("accessToken");
  const role = localStorage.getItem("role");

  if (!token) {
    return <Navigate to="/login" />;
  }

  if (role !== "admin") {
    return <Navigate to="/" />; // redirect to homepage if not admin
  }

  return children;
};

export default AdminRoute;