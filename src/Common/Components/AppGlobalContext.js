import React, { useState, createContext } from "react";

export const AppGlobalContext = createContext();

export const AppGlobalContextProvider = props => {
    const contextInitialState = {
        sectionTitle: ''
    };
   const [appGlobalContext, setAppGlobalContext] = useState(contextInitialState);

   return (
       <AppGlobalContext.Provider value={[appGlobalContext, setAppGlobalContext]}>
          {props.children}
       </AppGlobalContext.Provider>
   );
};