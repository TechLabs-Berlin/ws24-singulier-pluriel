import React, { createContext, useContext, useState } from "react";

const NavigationContext = createContext();

export const useNavigation = () => useContext(NavigationContext);

export const NavigationProvider = ({ children }) => {
  const [links, setLinks] = useState([
    { name: "Home", path: "/main" },
    { name: "Communications", path: "/communication" },
    { name: "Grade Center", path: "/grade-center" },
  ]);

  return (
    <NavigationContext.Provider value={{ links, setLinks }}>
      {children}
    </NavigationContext.Provider>
  );
};
