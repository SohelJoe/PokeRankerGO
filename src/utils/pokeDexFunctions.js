const LSName = 'PokeDEX';


export const getPokeDex = () => {
    const pokeDex = JSON.parse(localStorage.getItem(LSName)) || {};
    return pokeDex;
}

export const getAllMonFromDex = (key) => {
    const pokeDex = JSON.parse(localStorage.getItem(LSName)) || {};

    const monDexList = pokeDex[key] || [];

    return monDexList;
}


export const getMonFromDex = (key, index) => {
    const pokeDex = JSON.parse(localStorage.getItem(LSName)) || {};

    const mon = pokeDex[key][index] || [];

    return mon;
}

export const updateMonData = (key, index, stats, isShadow, isBestBuddy, rank) => {
    const pokeDex = JSON.parse(localStorage.getItem(LSName)) || {};

    const monDexList = pokeDex[key] || [];

    if (index >= 0 && index < monDexList.length) {
        monDexList[index] = { ...stats, isShadow, isBestBuddy, rank };
    } else {
        monDexList.push({ ...stats, isShadow, isBestBuddy, rank });
    }

    pokeDex[key] = monDexList;

    localStorage.setItem(LSName, JSON.stringify(pokeDex));
}

export const removeMonFromDex = (key, index) => {
    const pokeDex = JSON.parse(localStorage.getItem(LSName)) || {};

    const monDexList = pokeDex[key] || [];

    monDexList.splice(index, index > -1 ? 1 : 0);
    pokeDex[key] = monDexList;

    localStorage.setItem(LSName, JSON.stringify(pokeDex));
    return pokeDex;
}

export const saveMonToDex = (key, index, stats, isShadow, isBestBuddy, rank) => {
    const pokeDex = JSON.parse(localStorage.getItem(LSName)) || {};

    const monDexList = pokeDex[key] || [];

    monDexList.splice(index, index > -1 ? 1 : 0, { ...stats, isShadow, isBestBuddy, rank })
    pokeDex[key] = monDexList;

    localStorage.setItem(LSName, JSON.stringify(pokeDex));
}