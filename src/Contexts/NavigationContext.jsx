import { useState, createContext } from "react";

export const NavigationContext = createContext();

const NavigationProvider = ({ children }) => {
    const [page, setPage] = useState('ranking')
    const [breadCrumps, setBreadCrumps] = useState(['ranking'])

    const changePage = (newPage) => {
        if (page != newPage) {
            setPage(newPage)
            setBreadCrumps([newPage])
        }
    }


    return (
        <NavigationContext.Provider value={{ changePage, page, breadCrumps }}>
            {children}
        </NavigationContext.Provider>
    )
}

export default NavigationProvider;