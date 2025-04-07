import { useState, createContext } from "react";

import cpm from '../utils/cpmList.json';
import pokeListObj from '../utils/pokeListObj.json';

export const MonIVContext = createContext();

const MonIVProvider = ({ children }) => {
    const [selectedMon, setSelectedMon] = useState(null)

    const setSelectedMonDetails = (id, type1, type2, form, name) => {

        if (name.includes('Mime')) {
            var search_name = name.replaceAll('.', '')
            search_name = ((search_name.split(' ')).slice(-2)).join('_');
        } else {
            var search_name = (name.split(' ')).slice(-1);
        }


        if (search_name && id && id > 0) {
            if (form) {
                if (!form.includes('Mega')) {
                    search_name = search_name + '_' + form;
                } else {
                    if (form.includes(' ')) {
                        search_name = 'Mega_' + search_name + '_' + form.split(' ')[1]
                    } else {
                        search_name = name.replaceAll(' ', '_');
                    }
                }
            }

            // console.log(search_name);

            if (pokeListObj[search_name] && pokeListObj[search_name][0] == id) {
                const details = [...pokeListObj[search_name]];
                details.splice(1, 0, form, type1, type2);
                details[4] = parseInt(details[4]);
                details[5] = parseInt(details[5]);
                details[6] = parseInt(details[6]);

                // console.log([name, ...details]);

                rankCalc(details[4], details[5], details[6], 0, 0, 50, false, 1500).then((data) => {
                    // console.log(data);
                    setSelectedMon([name, ...details]);
                })
            }
        }

    }

    /* floor = 0: Wild Caught, 1: Trade, Good Friend, 2: Trade, Great | Purified, 3: Trade, Ultra Friend, 4: Weather Boost, 5: Trade, Best Friend, 6: Shadow Legendary, 10: Raid | Hatch, 12: Lucky Trade */
    /* minLvl, maxLvl = 1...40, 1...51 */
    /* invalid = true|false [Show Trade Improvement %] */
    const rankCalc = async (baseatk, basedef, basesta, floor, minLvl, maxLvl, invalid, league) => {
        /* returns sorted list of all (up to 4096) combinations indexed by statProd + CP */
        /*console.log("calculate: Received: baseatk="+baseatk+" basedef="+basedef+" basesta="+basesta+" league="+league+" floor="+floor+" minLvl="+minLvl);*/
        /* Each item stored by statProd.CP */
        /* Rank definition:{"12613615.1500":{"IVs":{"A":14, "D":14, "S":14, "star": "3*"}, "base":{"A":145, "D":105, "S":115}, "battle":{"A":145, "D":105, "S":115}, "L":25}, */
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
                        var cp = Math.max(
                            10,
                            Math.floor((baseatk + atk) * Math.sqrt(basedef + def) * Math.sqrt(basesta + sta) * cpm[level] * cpm[level] / 10)
                        );

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

                        var aSt = (baseatk + atk) * cpm[level];
                        var dSt = (basedef + def) * cpm[level];
                        var sSt = Math.max(10, Math.floor((basesta + sta) * cpm[level]));
                        var statProd = Math.round(aSt * dSt * sSt); /* update maxStats if necessary */

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

                        if (!(newIndex in ranks)) {
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
                                        if (sta > ranks[newIndex][i].IVs.S) { /*console.log("Used 5th tie breaker (Stamina IV) for newIndex("+newIndex+"):"+JSON.stringify(ranks[newIndex]));*/ break;
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

        const sorted = {};
        Object.keys(ranks).sort(function (a, b) {
            return b - a;
        }).forEach(function (key) {
            sorted[key] = ranks[key];
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
        <MonIVContext.Provider value={{ selectedMon, setSelectedMonDetails }}>
            {children}
        </MonIVContext.Provider>
    )
}

export default MonIVProvider;