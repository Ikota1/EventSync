  import { useState, createContext, useContext } from "react";
  import PropTypes from 'prop-types';

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
  
  AppContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
  };

  export const useAppContext = () => useContext(AppContext)
