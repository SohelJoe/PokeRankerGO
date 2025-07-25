import { useState, useEffect, createContext } from "react";

import pokeListDB from '../utils/pokeListDB.json';


export const MonDexContext = createContext();

const MonDexProvider = ({ children }) => {
    const LSName = 'PokeDEX';
    const [monDex, setMonDex] = useState(null);

    const saveMonData = (key, index, stats, isShadow, isBestBuddy, rank) => {
        const pokeDex = JSON.parse(localStorage.getItem(LSName)) || {};

        const monDexList = pokeDex[key] || [];

        monDexList.splice(index, index > -1 ? 1 : 0, { ...stats, isShadow, isBestBuddy, rank })
        pokeDex[key] = monDexList;

        setMonDex(pokeDex);
        localStorage.setItem(LSName, JSON.stringify(pokeDex));
    }

    const getMonData = (key) => {
        const pokeDex = JSON.parse(localStorage.getItem(LSName)) || {};

        const monDexList = pokeDex[key] || [];

        return monDexList;
    }

    const updateMonData = (key, index, stats, isShadow, isBestBuddy, rank) => {
        const pokeDex = JSON.parse(localStorage.getItem(LSName)) || {};

        const monDexList = pokeDex[key] || [];

        console.log({ ...stats, isShadow, isBestBuddy, rank });


        if (index >= 0 && index < monDexList.length) {
            monDexList[index] = { ...stats, isShadow, isBestBuddy, rank };
        } else {
            monDexList.push({ ...stats, isShadow, isBestBuddy, rank });
        }

        pokeDex[key] = monDexList;

        setMonDex(pokeDex);
        localStorage.setItem(LSName, JSON.stringify(pokeDex));
    }

    const getMonByKey = (key) => {
        const mon = pokeListDB[key];

        return ({
            name: mon[0],
            id: mon[1],
            form: mon[2],
            type1: mon[3],
            type2: mon[4],
            base: {
                atk: parseInt(mon[5]),
                def: parseInt(mon[6]),
                hp: parseInt(mon[7])
            }
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


    useEffect(() => {
        const pokeDex = JSON.parse(localStorage.getItem(LSName)) || {};
        setMonDex(pokeDex);
    }, [])




    return (
        <MonDexContext.Provider value={{ saveMonData, getMonData, updateMonData, monDex, getMonByKey, removeMonData }}>
            {children}
        </MonDexContext.Provider>
    )
}

export default MonDexProvider;