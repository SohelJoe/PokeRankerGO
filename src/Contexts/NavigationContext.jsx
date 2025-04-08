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

    const addSelectedMonToBreadCrump = (selectedMonName) => {
        const breadCrumpLength = breadCrumps.length;

        if (breadCrumpLength == 1) {
            setBreadCrumps((e) => [...e, selectedMonName])
        } else if (breadCrumpLength == 2) {
            setBreadCrumps(([e,]) => [e, selectedMonName])
        }
    }


    return (
        <NavigationContext.Provider value={{ changePage, page, breadCrumps, addSelectedMonToBreadCrump }}>
            {children}
        </NavigationContext.Provider>
    )
}

export default NavigationProvider;