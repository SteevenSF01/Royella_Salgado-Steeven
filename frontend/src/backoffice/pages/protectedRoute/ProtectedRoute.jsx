import { Navigate } from 'react-router-dom';
import { useAuth } from '../loginProvider/LoginProvider';

const ProtectedRoute = ({ children }) => {
    const { user } = useAuth();

    if (user.role !== 'ADMINISTRATEUR') {
    return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoute;