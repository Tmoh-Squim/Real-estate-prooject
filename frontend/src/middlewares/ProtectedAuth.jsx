import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { isLoading, user } = useSelector((state) => state.user);
  if (isLoading === false) {
    if (!user?.user) {
      return <Navigate to="/login" replace />;
    }
    return children;
  }
};
export const AdminRoute = ({ children }) => {
  const { isLoading, user } = useSelector((state) => state.user);
  if (isLoading === false) {
    if (!user?.user) {
      return <Navigate to="/login" replace />;
    }else if (user?.user?.role !== 'Admin'){
      return <Navigate to="/login" replace />;
    }
    return children;
  }
};
export const AgentRoute = ({ children }) => {
    const { isLoading, user } = useSelector((state) => state.user);
    if (isLoading === false) {
      if (!user?.user) {
        return <Navigate to="/login" replace />;
      }else if (user?.user?.role !== 'Agent'){
        return <Navigate to="/login" replace />;
      }
      return children;
    }
  };

export default ProtectedRoute;
