import React from "react";
import { useAuth } from "../context/AuthProvider";
import toast from "react-hot-toast";
import { useNavigate,useLocation } from "react-router-dom";

const Logout = () => {
  const [authUser, setAuthUser] = useAuth();
  const navigate = useNavigate();
   const location = useLocation();

  const handlelogout = () => {
    try {
      setAuthUser(null);
      localStorage.removeItem("Users");
      toast.success("Logout successfully");
      // if (location.pathname === "/collection") {
      //   navigate("/"); // Collection se logout = Home page
      // } else {
      //   navigate("/"); // Baaki jagah se logout = Home page
      // }
      window.location.href = "/";
    } catch (error) {
      toast.error("Error " + error.message);
    }
  };

  return (
    <div>
      <button
        className="px-3 py-2 bg-red-500 text-white rounded-md cursor-pointer"
        onClick={handlelogout}
      >
        Logout
      </button>
    </div>
  );
};

export default Logout;
