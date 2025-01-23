import { createContext, useState } from "react";

export const GlobalContext = createContext();

const GlobalProvider = ({ children }) => {
    const [siteData, setSiteData] = useState({
        mainMenuItems: [],
        mainMenuLoaded: false,
    });

    return (
        <GlobalContext.Provider value={[siteData, setSiteData]}>
            {children}
        </GlobalContext.Provider>
    );
};

export default GlobalProvider;