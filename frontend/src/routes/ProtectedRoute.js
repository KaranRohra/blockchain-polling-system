import { Cookies } from "react-cookie";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
    const cookies = new Cookies();
    return cookies.get("token") ? children : <Navigate to="/auth" />;
}

export default ProtectedRoute;
