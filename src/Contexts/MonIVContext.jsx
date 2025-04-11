import { useState, createContext } from "react";

import cpm from '../utils/cpmList.json';
import pokeListDB from '../utils/pokeListDB.json';

export const MonIVContext = createContext();

const MonIVProvider = ({ children }) => {
    const [monFamily, setMonFamily] = useState({});
    const [pvpRankings, setPvpRankings] = useState({});
    const [selectedMon, setSelectedMon] = useState(null);
    const [isBestBuddy, setIsBestBuddy] = useState(false);
    const [stats, setStats] = useState({ attack: 0, defense: 0, hp: 0, lv: 15 });


    const toggleBestBuddy = () => {
        Promise.all([
            rankCalc(selectedMon[5], selectedMon[6], selectedMon[7], 0, 0, isBestBuddy ? 50 : 51, false, 1500),
            rankCalc(selectedMon[5], selectedMon[6], selectedMon[7], 0, 0, isBestBuddy ? 50 : 51, false, 2500),
            rankCalc(selectedMon[5], selectedMon[6], selectedMon[7], 0, 0, isBestBuddy ? 50 : 51, false, 'ML')
        ]).then((data) => {
            // console.log(data);
            setPvpRankings({ 1500: data[0], 2500: data[1], 'ML': data[2] })
            setIsBestBuddy((e) => !e)
        })
    }

    const setSelectedMonDetails = (monData) => {
        const [name, id, form, type1, type2, bAtt, bDef, bHp, ...family] = monData;

        const tempMonFamily = {}

        family.forEach((monID) => {
            tempMonFamily[monID] = pokeListDB[monID];
        })

        const bNumAtt = Number(bAtt);
        const bNumDef = Number(bDef);
        const bNumHp = Number(bHp);

        Promise.all([
            rankCalc(bNumAtt, bNumDef, bNumHp, 0, 0, isBestBuddy ? 51 : 50, false, 1500),
            rankCalc(bNumAtt, bNumDef, bNumHp, 0, 0, isBestBuddy ? 51 : 50, false, 2500),
            rankCalc(bNumAtt, bNumDef, bNumHp, 0, 0, isBestBuddy ? 51 : 50, false, 'ML')
        ]).then((data) => {
            // console.log(data);
            setMonFamily(tempMonFamily);
            setPvpRankings({ 1500: data[0], 2500: data[1], 'ML': data[2] })
            setSelectedMon([name, id, form, type1, type2, bNumAtt, bNumDef, bNumHp, ...family]);
        })
    }

    const calculateCP = (attack, defense, hp, level) => {
        // console.log(attack, defense, hp, level);

        return Math.max(10, Math.floor(attack * Math.sqrt(defense) * Math.sqrt(hp) * cpm[level] * cpm[level] / 10));
    }

    const calculateStatProd = (attack, defense, hp, level) => {
        var attSt = attack * cpm[level];
        var defSt = defense * cpm[level];
        var staSt = Math.max(10, Math.floor(hp * cpm[level]));
        var statProd = Math.round(attSt * defSt * staSt); /* update maxStats if necessary */

        return ([attSt, defSt, staSt, statProd])
    }


    const rankCalc = async (baseatk, basedef, basesta, floor, minLvl, maxLvl, invalid, league) => {
        // returns sorted list of all (up to 4096) combinations indexed by statProd + CP
        // console.log("calculate: Received: baseatk= " + baseatk + " basedef= " + basedef + " basesta= " + basesta + " league= " + league + " floor=" + floor + " minLvl= " + minLvl + " maxLvl= " + maxLvl);
        var ranks = [], invalids = [];
        var maxAtk = { value: 0, aIV: 0, dIV: 0, sIV: 0, sp: 0 };
        var maxDef = { value: 0, aIV: 0, dIV: 0, sIV: 0, sp: 0 };
        var maxHP = { value: 0, aIV: 0, dIV: 0, sIV: 0, sp: 0 };
        var minAtk = { value: 1000, aIV: 0, dIV: 0, sIV: 0, sp: 0 };
        var minDef = { value: 1000, aIV: 0, dIV: 0, sIV: 0, sp: 0 };
        var minHP = { value: 1000, aIV: 0, dIV: 0, sIV: 0, sp: 0 };
        var minRankLvl = 100;
        var maxRankLvl = 0;
        var numRanks = 0; /* account for half-level CPMs (40-1)*2=78 */
        minLvl = Math.max(0, (minLvl - 1) * 2); /* use half-levels */
        maxLvl = Math.max(0, (maxLvl - 1) * 2); /* use half-levels */

        for (var atk = floor / 1; atk <= 15; atk++) {
            for (var def = floor / 1; def <= 15; def++) {
                for (var sta = floor / 1; sta <= 15; sta++) {
                    for (var level = maxLvl; level >= minLvl; level--) {
                        var cp = calculateCP(baseatk + atk, basedef + def, basesta + sta, level)

                        if ((league) && (cp > league)) {
                            if ((level == minLvl) && (invalid)) {
                                invalids.push({
                                    'A': atk,
                                    'D': def,
                                    'S': sta,
                                    'cp': cp
                                });
                            }
                            continue; /* keep searching for level */
                        } /* Update maxLvl on first loop (0/0/0 or floor/floor/floor) to optimize performance */

                        if (atk === floor / 1 && def === floor / 1 && sta === floor / 1) {
                            maxLvl = level;
                        }

                        const [aSt, dSt, sSt, statProd] = calculateStatProd(baseatk + atk, basedef + def, basesta + sta, level)

                        if ((maxAtk.value < aSt) || ((maxAtk.sp < statProd) && (maxAtk.value <= aSt))) {
                            maxAtk.value = aSt;
                            maxAtk.aIV = atk;
                            maxAtk.dIV = def;
                            maxAtk.sIV = sta;
                            maxAtk.sp = statProd;
                        }

                        if ((maxDef.value < dSt) || ((maxDef.sp < statProd) && (maxDef.value <= dSt))) {
                            maxDef.value = dSt;
                            maxDef.aIV = atk;
                            maxDef.dIV = def;
                            maxDef.sIV = sta;
                            maxDef.sp = statProd;
                        }

                        if ((maxHP.value < sSt) || ((maxHP.sp < statProd) && (maxHP.value <= sSt))) {
                            maxHP.value = sSt;
                            maxHP.aIV = atk;
                            maxHP.dIV = def;
                            maxHP.sIV = sta;
                            maxHP.sp = statProd;
                        }

                        if (level / 1 > maxRankLvl / 1) {
                            maxRankLvl = level;
                        } /* update minStats if necessary */

                        if ((minAtk.value > aSt) || ((minAtk.sp < statProd) && (minAtk.value >= aSt))) {
                            minAtk.value = aSt;
                            minAtk.aIV = atk;
                            minAtk.dIV = def;
                            minAtk.sIV = sta;
                            minAtk.sp = statProd;
                        }

                        if ((minDef.value > dSt) || ((minDef.sp < statProd) && (minDef.value >= dSt))) {
                            minDef.value = dSt;
                            minDef.aIV = atk;
                            minDef.dIV = def;
                            minDef.sIV = sta;
                            minDef.sp = statProd;
                        }

                        if ((minHP.value > sSt) || ((minHP.sp < statProd) && (minHP.value >= sSt))) {
                            minHP.value = sSt;
                            minHP.aIV = atk;
                            minHP.dIV = def;
                            minHP.sIV = sta;
                            minHP.sp = statProd;
                        }

                        if (level / 1 < minRankLvl / 1) {
                            minRankLvl = level;
                        }

                        var IVsum = atk / 1 + def / 1 + sta / 1;
                        var Star = 'NA';

                        if (IVsum < 23) {
                            Star = '0*';
                        } else if (IVsum < 30) {
                            Star = '1*';
                        } else if (IVsum < 37) {
                            Star = '2*';
                        } else if (IVsum < 45) {
                            Star = '3*';
                        } else {
                            Star = '4*';
                        }

                        level = level / 2 + 1;
                        /* store as arrays to prevent hash collisions from dropping entires */
                        /* Tie Breaking Order: 1)StatProd -> 2)AtkStat -> 3)HPval -> 4)finalCP -> 5)StaIV -> 6)ERROR */
                        var newIndex = statProd + '.' + Math.round(100000 * aSt);

                        if (!((newIndex) in ranks)) {
                            ranks[newIndex] = [
                                {
                                    'IVs': {
                                        'A': atk,
                                        'D': def,
                                        'S': sta,
                                        'star': Star
                                    },
                                    'battle': {
                                        'A': aSt,
                                        'D': dSt,
                                        'S': sSt
                                    },
                                    'L': level,
                                    'CP': cp
                                }
                            ];
                        } else {
                            var i;
                            var ranksLen = ranks[newIndex].length;

                            for (i = 0; i < ranksLen; i++) {
                                if (sSt > ranks[newIndex][i].battle.S) {
                                    break;
                                } else if (sSt == ranks[newIndex][i].battle.S) {
                                    if (cp > ranks[newIndex][i].CP) {
                                        break;
                                    } else if (cp == ranks[newIndex][i].CP) {
                                        if (sta > ranks[newIndex][i].IVs.S) {
                                            // console.log("Used 5th tie breaker (Stamina IV) for newIndex("+newIndex+"):"+JSON.stringify(ranks[newIndex]));
                                            break;
                                        } else if (sta == ranks[newIndex][i].IVs.S) {
                                            console.log(
                                                'Need 6th tie breaker for newIndex(' + newIndex + '):' + JSON.stringify(ranks[newIndex])
                                            );
                                        }
                                    }
                                }
                            }

                            ranks[newIndex].splice(
                                i,
                                0,
                                {
                                    'IVs': { 'A': atk, 'D': def, 'S': sta, 'star': Star },
                                    'battle': { 'A': aSt, 'D': dSt, 'S': sSt },
                                    'L': level,
                                    'CP': cp
                                }
                            );
                        }


                        numRanks = numRanks + 1;
                        break; /* stop evaluating this IV combination */
                    }
                }
            }
        } /* sort by statProd+CP before returning */

        var rankNo = 0;
        const sorted = {};

        Object.keys(ranks).sort((a, b) => {
            return b - a;
        }).forEach((key) => {
            ranks[key].forEach(data => {
                const { IVs: { A, D, S } } = data;
                sorted[(A + '.' + D + '.' + S)] = { ...data, rank: ++rankNo, statProd: key }
            })
        });

        sorted.maxAtk = maxAtk;
        sorted.maxDef = maxDef;
        sorted.maxHP = maxHP;
        sorted.minAtk = minAtk;
        sorted.minDef = minDef;
        sorted.minHP = minHP;
        sorted.minLvl = 1 + (minRankLvl / 2);
        sorted.maxLvl = 1 + (maxRankLvl / 2);
        sorted.numRanks = numRanks;
        sorted.invalids = invalids; /* console.log("calculate output:"+JSON.stringify(sorted, null, 2)); */

        return sorted;
    }


    return (
        <MonIVContext.Provider value={{ selectedMon, setSelectedMonDetails, pvpRankings, monFamily, stats, setStats, calculateCP, isBestBuddy, toggleBestBuddy }}>
            {children}
        </MonIVContext.Provider>
    )
}

export default MonIVProvider;