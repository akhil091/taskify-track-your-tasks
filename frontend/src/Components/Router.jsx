import { Route, Routes } from "react-router-dom";
import HomePage from "../Pages/HomePage/HomePage";
import { Login } from "../Pages/Login/Login";
import { Signup } from "../Pages/Signup/Signup";
import { PrivateRoute } from "./PrivateRoute";
import UserProfile from "../Pages/User/UserProfile";

// Router component to manage application routes
export const Router = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <HomePage />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <UserProfile />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
};
