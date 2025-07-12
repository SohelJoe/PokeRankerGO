import { useState, useEffect, createContext } from "react";

import pokeListDB from '../utils/pokeListDB.json';


export const MonDexContext = createContext();

const MonDexProvider = ({ children }) => {
    const LSName = 'PokeDEX';
    const [monDex, setMonDex] = useState(null);

    const saveMonData = (key, index, stats, isBestBuddy, rank) => {
        const pokeDex = JSON.parse(localStorage.getItem(LSName)) || {};

        const monDexList = pokeDex[key] || [];

        monDexList.splice(index, index > -1 ? 1 : 0, { ...stats, isBestBuddy, rank })
        pokeDex[key] = monDexList;

        setMonDex(pokeDex);
        localStorage.setItem(LSName, JSON.stringify(pokeDex));
    }

    const getMonData = (key) => {
        const pokeDex = JSON.parse(localStorage.getItem(LSName)) || {};

        const monDexList = pokeDex[key] || [];

        return monDexList;
    }

    const getMonDex = () => {
        const pokeDex = JSON.parse(localStorage.getItem(LSName)) || {};

        setMonDex(pokeDex);
    }

    const getMonByKey = (key) => {
        const mon = pokeListDB[key];

        return ({
            name: mon[0],
            id: mon[1],
            form: mon[2],
            type1: mon[3],
            type2: mon[4]
        });
    }

    const removeMonData = (key, index) => {
        const pokeDex = JSON.parse(localStorage.getItem(LSName)) || {};

        const monDexList = pokeDex[key] || [];

        monDexList.splice(index, index > -1 ? 1 : 0);
        pokeDex[key] = monDexList;

        setMonDex(pokeDex);
        localStorage.setItem(LSName, JSON.stringify(pokeDex));
    }



    return (
        <MonDexContext.Provider value={{ saveMonData, getMonData, monDex, getMonDex, getMonByKey, removeMonData }}>
            {children}
        </MonDexContext.Provider>
    )
}

export default MonDexProvider;