import { FaTasks, FaUserCircle } from "react-icons/fa";
import { Button, message } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { PoweroffOutlined } from "@ant-design/icons";
import "../Navbar/Navbar.css";

// Navbar component
export const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Retrieve user token from local storage
  const token = localStorage.getItem("userToken");

  // Function to handle user logout
  const handleLogout = () => {
    localStorage.clear();
    message.success("Successfully Logged Out");
    navigate("/");
  };

  return (
    <div>
      <div className="navbar">
        <div style={{ cursor: "pointer" }}>
          <FaTasks onClick={() => navigate("/home")} />
        </div>

        {/* Conditional rendering based on user authentication */}
        {token?.length > 0 ? (
          <div style={{ display: "flex", gap: "10px" }} className="navbar-btn">
            <Button
              type="primary"
              danger
              icon={<PoweroffOutlined />}
              onClick={handleLogout}
            >
              Logout
            </Button>

            <Button
              className={location.pathname === "/profile" ? "active" : ""}
              icon={<FaUserCircle />}
              onClick={() => navigate("/profile")}
            >
              Profile
            </Button>
          </div>
        ) : (
          <div className="navbar-btn">
            <Button
              className={location.pathname === "/signup" ? "active" : ""}
              onClick={() => navigate("/signup")}
            >
              Signup
            </Button>
            <Button
              className={location.pathname === "/" ? "active" : ""}
              onClick={() => navigate("/")}
            >
              Login
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
