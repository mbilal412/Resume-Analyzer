import React from "react";
import { useState } from "react";
import { createContext } from "react";

export const DashboardContext = createContext();
const DashboardContextProvider = ({ children }) => {
  const [allReports, setAllReports] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  return (
    <DashboardContext.Provider
      value={{
        isLoading,
        error,
        allReports,
        setIsLoading,
        setError,
        setAllReports,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

export default DashboardContextProvider;
