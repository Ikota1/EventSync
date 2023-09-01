import { useState, createContext, useContext } from "react";

const AppContext = createContext()
export const AppContextProvider = ({ children }) => {
  const [screenSize, setScreenSize] = useState()


  return (
    <AppContext.Provider
      value={{ screenSize, setScreenSize}}>
      {children}
    </AppContext.Provider>
  )
}

export const useAppContext = () => useContext(AppContext)
