import { useState, createContext, useContext } from "react";

const AppContext = createContext()
export const AppContextProvider = ({ children }) => {
  const [screenSize, setScreenSize] = useState()
  const [appState, setAppState] = useState({
    showFilterBy: false
  });

  return (
    <AppContext.Provider
      value={{ screenSize, setScreenSize, showFilterBy: appState.showFilterBy, setAppState }}>
      {children}
    </AppContext.Provider>
  )
}

export const useAppContext = () => useContext(AppContext)
