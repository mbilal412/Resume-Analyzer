import { useState, createContext } from "react";

export const DashboardContext = createContext();

const DashboardContextProvider = ({ children }) => {
  const [allReports, setAllReports] = useState([]);

  return (
    <DashboardContext.Provider value={{ allReports, setAllReports }}>
      {children}
    </DashboardContext.Provider>
  );
};

export default DashboardContextProvider;
