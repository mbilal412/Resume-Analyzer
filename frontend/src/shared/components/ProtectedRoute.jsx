import React from "react";
import { useAuth } from "@clerk/clerk-react";
import './ProtectedRoute.scss';

const ProtectedRoute = ({ children }) => {
  console.log("rendering");
  const { isSignedIn, isLoaded } = useAuth();

  if (!isLoaded) {
    return (
      <div class="spinner-container">
        <div class="spinner"></div>
      </div>
    );
  }
  if (!isSignedIn) {
    window.location.href = "/sign-in";
    return null;
  }
  return <>{children}</>;
};

export default ProtectedRoute;
