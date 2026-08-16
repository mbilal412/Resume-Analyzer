import React from "react";
import { useAuth } from "@clerk/clerk-react";
import './ProtectedRoute.scss';
import { useNavigate } from "react-router";

const ProtectedRoute = ({ children }) => {
  const { isSignedIn, isLoaded } = useAuth();
  const navigate = useNavigate();

  if (!isLoaded) {
    return (
      <div className="spinner-container">
        <div className="spinner"></div>
      </div>
    );
  }
  if (!isSignedIn) {
    navigate("/");
    return null;
  }
  return <>{children}</>;
};

export default ProtectedRoute;
