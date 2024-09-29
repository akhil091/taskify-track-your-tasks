import { message } from 'antd';
import { Navigate } from 'react-router-dom';

// PrivateRoute component to protect private routes
// eslint-disable-next-line react/prop-types
export const PrivateRoute = ({ children }) => {
    // Retrieve user token from local storage
    const token = localStorage.getItem("userToken");

    // Check if the token exists
    if (!token) {
        message.error("Please Login First");
        return <Navigate to="/" />;
    }
    // If the token exists, render the children (protected components)
    return children;
};
