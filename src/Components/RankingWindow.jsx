import React, { useRef, useState, useContext } from 'react'

import AddSVG from '../assets/add.svg';
import megaSvg from '../assets/mega.svg';
import BestBuddyRibon from '../assets/bestBuddyRibbon.png';

// Contexts
import { MonIVContext } from '../Contexts/MonIVContext';

const typings = ['normal', 'fighting', 'flying', 'poison', 'ground', 'rock', 'bug', 'ghost', 'steel', 'fire', 'water', 'grass', 'electric', 'psychic', 'ice', 'dragon', 'dark', 'fairy']

const RankingWindow = ({ className = '' }) => {
    const hpBar = useRef()
    const attackBar = useRef()
    const defenseBar = useRef()

    const { selectedMon, monFamily, toggleMonFromFamily, pvpRankings, stats, setStats, isBestBuddy, calculateCP, toggleBestBuddy } = useContext(MonIVContext);

    const updateHoverBG = (parentElm, pos) => {
        parentElm.childNodes.forEach((elm, i) => {
            if (i <= pos) {
                elm.classList.add('bg-orange-500/30')
            } else {
                elm.classList.remove('bg-orange-500/30')
            }
        })
    }

    const removeHoverBG = (parentElm) => {
        parentElm.childNodes.forEach((elm) => {
            elm.classList.remove('bg-orange-500/30')
        })
    }

    const getRankingForFamily = () => {
        const familyRankByStat = {};

        Object.keys(pvpRankings).forEach(mon => {
            familyRankByStat[mon] = {
                GreatLeague: pvpRankings[mon][1500][(stats.attack + '.' + stats.defense + '.' + stats.hp)],
                UltraLeague: pvpRankings[mon][2500][(stats.attack + '.' + stats.defense + '.' + stats.hp)],
                MasterLeague: pvpRankings[mon]['ML'][(stats.attack + '.' + stats.defense + '.' + stats.hp)],
            }
        })

        // console.log(familyRankByStat);
        return familyRankByStat;
    }


    if (selectedMon) {
        const [key, monName, id, form, type1, type2, bAtt, bDef, bHp, ...family] = selectedMon;

        const familyRankings = getRankingForFamily();

        return (<div className={`max-w-4xl ${className}`}>
            <div className="relative p-4 border-2 border-sky-600 bg-sky-50 dark:border-sky-600/60 dark:bg-sky-700/10 rounded-2xl overflow-hidden">
                <div className='flex items-center relative z-0'>
                    {form && form.includes('Mega') && <img className='absolute w-full max-w-2/10 -z-1 opacity-40 ml-10 px-1' src={megaSvg} alt="Mega BG" />}
                    <img className='mr-2 w-full max-w-3/10 aspect-square h-max' src={`https://db.pokemongohub.net/_next/image?url=%2Fimages%2Fofficial%2Ffull%2F${('000' + id).slice(-3)}${form == 'Mega Y' ? '_f3' : form == 'Galarian' ? '_galar' : form ? '_f2' : ''}.webp&w=256&q=75`} alt={monName} />
                    <div className='font-semibold w-full max-w-7/10'>
                        <span className='text-sm leading-none text-gray-500/80 dark:text-gray-500'>Selected Pokémon</span>
                        <div className='flex relative gap-2 items-baseline pb-1.75 before:absolute before:block before:w-full before:h-0.5 before:bg-linear-to-r before:from-gray-800/60 dark:before:from-gray-200/60 before:from-30% before:to-transparent before:z-[1] before:left-0.25 before:bottom-0 before:rounded-l-full'>
                            {isBestBuddy && <img className='block h-7' src={BestBuddyRibon} alt="Best Buddy Ribbon" />}
                            <h2 className='text-4xl leading-none text-sky-700 dark:text-sky-600 font-bold'>
                                {monName}
                            </h2>
                        </div>
                        <div className='mt-2'>
                            <h6>Attack</h6>
                            <div className='flex gap-0.5 mb-1.5 text-center text-sm text-gray-600 dark:text-gray-50' ref={attackBar} onMouseLeave={() => removeHoverBG(attackBar.current)}>
                                {[...Array(15).keys()].map((i) => <span key={i} className={`block flex-1 bg-gray-400/30 cursor-pointer ${i == 0 ? 'rounded-l-full' : i == 14 && 'rounded-r-full'} ${(i == 4 || i == 9) && 'mr-1'} hover:rounded-r-full ${i + 1 == stats.attack && 'rounded-r-full'} select-none ${stats.attack >= i + 1 && 'bg-orange-400/80! text-black'}`} onMouseEnter={() => updateHoverBG(attackBar.current, i)} onClick={() => setStats({ ...stats, attack: i + 1 })} onDoubleClick={() => i == 0 && setStats({ ...stats, attack: 0 })}>
                                    {i + 1}
                                </span>)}
                            </div>
                            <h6>Defense</h6>
                            <div className='flex gap-0.5 mb-1.5 text-center text-sm text-gray-600 dark:text-gray-50' ref={defenseBar} onMouseLeave={() => removeHoverBG(defenseBar.current)}>
                                {[...Array(15).keys()].map((i) => <span key={i} className={`block flex-1 bg-gray-400/30 cursor-pointer ${i == 0 ? 'rounded-l-full' : i == 14 && 'rounded-r-full'} ${(i == 4 || i == 9) && 'mr-1'} hover:rounded-r-full ${i + 1 == stats.defense && 'rounded-r-full'} select-none ${stats.defense >= i + 1 && 'bg-orange-400/80! text-black'}`} onMouseEnter={() => updateHoverBG(defenseBar.current, i)} onClick={() => setStats({ ...stats, defense: i + 1 })} onDoubleClick={() => i == 0 && setStats({ ...stats, defense: 0 })}>
                                    {i + 1}
                                </span>)}
                            </div>
                            <h6>HP</h6>
                            <div className='flex gap-0.5 mb-1.5 text-center text-sm text-gray-600 dark:text-gray-50' ref={hpBar} onMouseLeave={() => removeHoverBG(hpBar.current)}>
                                {[...Array(15).keys()].map((i) => <span key={i} className={`block flex-1 bg-gray-400/30 cursor-pointer ${i == 0 ? 'rounded-l-full' : i == 14 && 'rounded-r-full'} ${(i == 4 || i == 9) && 'mr-1'} hover:rounded-r-full ${i + 1 == stats.hp && 'rounded-r-full'} select-none ${stats.hp >= i + 1 && 'bg-orange-400/80! text-black'}`} onMouseEnter={() => updateHoverBG(hpBar.current, i)} onClick={() => setStats({ ...stats, hp: i + 1 })} onDoubleClick={() => i == 0 && setStats({ ...stats, hp: 0 })}>
                                    {i + 1}
                                </span>)}
                            </div>
                        </div>
                    </div>
                </div>

                <div className='relative flex items-center before:absolute'>
                    <div className='flex w-full max-w-3/10 justify-center align-middle items-center gap-1'>
                        <h6 className='block leading-none max-h-max mr-1 md:mr-2 text-xl md:text-2xl font-bold text-sky-600'>#{('000' + id).slice(-3)}</h6>
                        {type1 && <img className='w-full max-w-1/7' src={`https://db.pokemongohub.net/_next/image?url=%2Fimages%2Ficons%2Fico_${typings.indexOf(type1)}_${type1}.webp&w=32&q=75`} alt={type1} />}
                        {type2 && <img className='w-full max-w-1/7' src={`https://db.pokemongohub.net/_next/image?url=%2Fimages%2Ficons%2Fico_${typings.indexOf(type2)}_${type2}.webp&w=32&q=75`} alt={type2} />}
                    </div>
                    <div className="text-center grow-1 text-gray-400 dark:text-gray-200/50 font-semibold gap-1">
                        <p className='min-w-fit text-sm'> Species Base Stats </p>
                        <p className='min-w-fit'>
                            Attack: <span className='text-gray-800 dark:text-gray-200'>{bAtt}{stats.attack > 0 && '+' + stats.attack}</span> |
                            Defense: <span className='text-gray-800 dark:text-gray-200'>{bDef}{stats.defense > 0 && '+' + stats.defense}</span> |
                            Stamina: <span className='text-gray-800 dark:text-gray-200'>{bHp}{stats.hp > 0 && '+' + stats.hp}</span>
                        </p>
                    </div>
                </div>

                <div className="mt-3 relative before:block before:w-full before:h-0.5 before:bg-gradient-to-r before:from-transparent before:via-gray-800/50 dark:before:via-gray-200/50 before:to-transparent before:z-[1] before:left-0.25 before:bottom-0 before:rounded-l-full">
                    <div className='flex items-center mt-3'>
                        <div className='flex gap-4 w-full ml-1 text-lg font-semibold text-gray-500 dark:text-gray-100/60'>
                            <h4 className='w-22'>Level: <span className='text-gray-800 dark:text-gray-200'>{stats.lv}</span></h4>
                            <h4>CP: <span className='text-gray-800 dark:text-gray-200'>{calculateCP(bAtt + stats.attack, bDef + stats.defense, bHp + stats.hp, (stats.lv - 1) * 2)}</span></h4>
                        </div>
                        <div className='flex min-w-max items-center gap-1.5 -mt-0.5 mb-0.5'>
                            <button className={`relative flex items-center gap-0.5 text-md z-0 pl-0.75 pr-3 pb-0.75 pt-0.5 border-2 border-sky-700 dark:border-sky-600/80 dark:hover:border-sky-600/90 rounded-full h-max cursor-pointer ${isBestBuddy ? 'text-white dark:text-white bg-sky-800/80 dark:bg-sky-600/70 hover:bg-sky-800 dark:hover:bg-sky-600/80' : 'text-sky-800 dark:text-sky-500/80 dark:hover:text-sky-500/90 bg-sky-300/20 dark:bg-sky-100/10 hover:bg-sky-300/30 dark:hover:bg-sky-200/10'} text-center uppercase font-semibold hover:drop-shadow-lg`} onClick={() => { toggleBestBuddy(); (stats.lv > 50 && setStats((e) => ({ ...e, lv: 50 }))) }}>
                                {isBestBuddy ? <svg version="1.1" className='h-6 w-6 mt-0.25' stroke="currentColor" fill="currentColor" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="122.88px" height="122.88px" viewBox="0 0 122.88 122.88" enableBackground="new 0 0 122.88 122.88" xmlSpace="preserve"><g><path d="M34.388,67.984c-0.286-0.308-0.542-0.638-0.762-0.981c-0.221-0.345-0.414-0.714-0.573-1.097 c-0.531-1.265-0.675-2.631-0.451-3.934c0.224-1.294,0.812-2.531,1.744-3.548l0.34-0.35c2.293-2.185,5.771-2.592,8.499-0.951 c0.39,0.233,0.762,0.51,1.109,0.827l0.034,0.031c1.931,1.852,5.198,4.881,7.343,6.79l1.841,1.651l22.532-23.635 c0.317-0.327,0.666-0.62,1.035-0.876c0.378-0.261,0.775-0.482,1.185-0.661c0.414-0.181,0.852-0.323,1.3-0.421 c0.447-0.099,0.903-0.155,1.356-0.165h0.026c0.451-0.005,0.893,0.027,1.341,0.103c0.437,0.074,0.876,0.193,1.333,0.369 c0.421,0.161,0.825,0.363,1.207,0.604c0.365,0.231,0.721,0.506,1.056,0.822l0.162,0.147c0.316,0.313,0.601,0.653,0.85,1.014 c0.256,0.369,0.475,0.766,0.652,1.178c0.183,0.414,0.325,0.852,0.424,1.299c0.1,0.439,0.154,0.895,0.165,1.36v0.23 c-0.004,0.399-0.042,0.804-0.114,1.204c-0.079,0.435-0.198,0.863-0.356,1.271c-0.16,0.418-0.365,0.825-0.607,1.21 c-0.238,0.377-0.518,0.739-0.832,1.07l-27.219,28.56c-0.32,0.342-0.663,0.642-1.022,0.898c-0.369,0.264-0.767,0.491-1.183,0.681 c-0.417,0.188-0.851,0.337-1.288,0.44c-0.435,0.104-0.889,0.166-1.35,0.187l-0.125,0.003c-0.423,0.009-0.84-0.016-1.241-0.078 l-0.102-0.02c-0.415-0.07-0.819-0.174-1.205-0.31c-0.421-0.15-0.833-0.343-1.226-0.575l-0.063-0.04 c-0.371-0.224-0.717-0.477-1.032-0.754l-0.063-0.06c-1.58-1.466-3.297-2.958-5.033-4.466c-3.007-2.613-7.178-6.382-9.678-9.02 L34.388,67.984L34.388,67.984z M61.44,0c16.96,0,32.328,6.883,43.453,17.987c11.104,11.125,17.986,26.493,17.986,43.453 c0,16.961-6.883,32.329-17.986,43.454C93.769,115.998,78.4,122.88,61.44,122.88c-16.961,0-32.329-6.882-43.454-17.986 C6.882,93.769,0,78.4,0,61.439C0,44.48,6.882,29.112,17.986,17.987C29.112,6.883,44.479,0,61.44,0L61.44,0z M96.899,25.981 C87.826,16.907,75.29,11.296,61.44,11.296c-13.851,0-26.387,5.611-35.46,14.685c-9.073,9.073-14.684,21.609-14.684,35.458 c0,13.851,5.611,26.387,14.684,35.46s21.609,14.685,35.46,14.685c13.85,0,26.386-5.611,35.459-14.685s14.684-21.609,14.684-35.46 C111.583,47.59,105.973,35.054,96.899,25.981L96.899,25.981z" /></g></svg> : <svg version="1.1" className='h-6 w-6 mt-0.25' xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="122.88px" height="122.879px" viewBox="0 0 122.88 122.879" enableBackground="new 0 0 122.88 122.879" xmlSpace="preserve"><g><path fill="currentColor" d="M61.44,0c16.96,0,32.328,6.882,43.453,17.986c11.104,11.125,17.986,26.494,17.986,43.453 c0,16.961-6.883,32.328-17.986,43.453C93.769,115.998,78.4,122.879,61.44,122.879c-16.96,0-32.329-6.881-43.454-17.986 C6.882,93.768,0,78.4,0,61.439C0,44.48,6.882,29.111,17.986,17.986C29.112,6.882,44.48,0,61.44,0L61.44,0z M73.452,39.152 c2.75-2.792,7.221-2.805,9.986-0.026c2.764,2.776,2.775,7.292,0.027,10.083L71.4,61.445l12.077,12.25 c2.728,2.77,2.689,7.256-0.081,10.021c-2.772,2.766-7.229,2.758-9.954-0.012L61.445,71.541L49.428,83.729 c-2.75,2.793-7.22,2.805-9.985,0.025c-2.763-2.775-2.776-7.291-0.026-10.082L51.48,61.435l-12.078-12.25 c-2.726-2.769-2.689-7.256,0.082-10.022c2.772-2.765,7.229-2.758,9.954,0.013L61.435,51.34L73.452,39.152L73.452,39.152z M96.899,25.98C87.826,16.907,75.29,11.296,61.44,11.296c-13.851,0-26.387,5.611-35.46,14.685 c-9.073,9.073-14.684,21.609-14.684,35.459s5.611,26.387,14.684,35.459c9.073,9.074,21.609,14.686,35.46,14.686 c13.85,0,26.386-5.611,35.459-14.686c9.073-9.072,14.684-21.609,14.684-35.459S105.973,35.054,96.899,25.98L96.899,25.98z" /></g></svg>}
                                Best Buddy
                            </button>
                            <button className='p-1.75 border-2 border-sky-700 dark:border-sky-600/80 rounded-full h-max cursor-pointer bg-sky-300/20 dark:bg-sky-100/10 hover:bg-sky-300/30 dark:hover:bg-sky-50/10 dark:hover:brightness-[1.1] hover:drop-shadow-lg'>
                                <img className='h-4 w-4 dark:brightness-[1.15]' src={AddSVG} alt="Add" />
                            </button>
                        </div>
                    </div>
                    <input className='w-full' type="range" min="1" max={isBestBuddy ? 51 : 50} step={0.5} value={stats.lv} name="level" onChange={({ target }) => setStats((e) => ({ ...e, lv: target.value }))} />
                </div>

                {family.length > 0 && <div className="mt-4 flex gap-4 items-center">
                    <h2 className='text-lg font-semibold leading-5 mr-3 text-sky-700 dark:text-sky-600'>{monName}'s <br /> Family</h2>
                    {family.map((key) => <div key={key} className={`relative z-0 min-w-max text-center cursor-pointer text-gray-600/80 hover:text-gray-600 dark:text-gray-400/70 dark:hover:text-gray-400 ${monFamily[key][2] && monFamily[key][2].includes('Mega') && 'ml-4'}`} onClick={() => toggleMonFromFamily(key, monFamily[key])}>
                        {monFamily[key][2] && monFamily[key][2].includes('Mega') && <img className='absolute h-14 w-14 -z-999 opacity-30 left-[50%] transform-[translateX(-50%)]' src={megaSvg} alt="Mega BG" />}
                        <img key={key} className='h-14 w-full max-w-14 mx-auto' src={`https://db.pokemongohub.net/_next/image?url=%2Fimages%2Fofficial%2Ffull%2F${('000' + monFamily[key][1]).slice(-3)}${monFamily[key][2] == 'Mega Y' ? '_f3' : monFamily[key][2] == 'Galar' ? '_galar' : monFamily[key][2] ? '_f2' : ''}.webp&w=64&q=75`} alt={monFamily[key][0]} />
                        <p className='font-semibold text-sm leading-none'>{monFamily[key][0]}</p>
                    </div>)}
                </div>}

                <div className="flex items-center w-full gap-1 mt-4 p-1 border-1 border-sky-600 dark:border-sky-800 rounded-lg bg-sky-100/40 dark:bg-sky-900/20">
                    <div className="relative z-0 w-full max-w-25 text-center text-sky-700 dark:text-sky-50 px-4">
                        {form && form.includes('Mega') && <img className='absolute h-15 w-15 -z-999 opacity-30 left-[50%] transform-[translateX(-50%)]' src={megaSvg} alt="Mega BG" />}
                        <img className='h-15 w-full max-w-15 mx-auto' src={`https://db.pokemongohub.net/_next/image?url=%2Fimages%2Fofficial%2Ffull%2F${('000' + id).slice(-3)}${form == 'Mega Y' ? '_f3' : form == 'Galar' ? '_galar' : form ? '_f2' : ''}.webp&w=64&q=75`} alt={monName} />
                        <p className='font-semibold text-sm leading-none mt-0.5'>{monName}</p>
                    </div>
                    <div className={`w-full max-w-4/12 text-center font-semibold p-1 bg-sky-200/40 dark:bg-sky-800/40 rounded-md border-2 border-sky-600 dark:border-sky-800${(!familyRankings[key].GreatLeague || familyRankings[key].GreatLeague.L < stats.lv) && ' opacity-50'}`}>
                        <h6 className='text-lg uppercase text-sky-700/90 dark:text-sky-50/90'>Great League</h6>
                        <h2 className='text-md text-sky-700/60 font-normal dark:text-sky-50/60'>Rank. <span className='text-2xl font-semibold uppercase text-sky-700 dark:text-sky-50'>{familyRankings[key].GreatLeague ? familyRankings[key].GreatLeague.rank : '-'}</span></h2>
                        <p className='flex gap-2 justify-center text-sm my-1 text-gray-600/80 dark:text-gray-400/70'><span>CP {familyRankings[key].GreatLeague ? familyRankings[key].GreatLeague.CP : '-'}</span> <span>Lvl. {familyRankings[key].GreatLeague ? familyRankings[key].GreatLeague.L : '-'}</span></p>
                    </div>
                    <div className={`w-full max-w-4/12 text-center font-semibold p-1 bg-sky-200/40 dark:bg-sky-800/40 rounded-md border-2 border-sky-600 dark:border-sky-800${(!familyRankings[key].UltraLeague || familyRankings[key].UltraLeague.L < stats.lv) && ' opacity-50'}`}>
                        <h6 className='text-lg uppercase text-sky-700/90 dark:text-sky-50/90'>Ultra League</h6>
                        <h2 className='text-md text-sky-700/60 font-normal dark:text-sky-50/60'>Rank. <span className='text-2xl font-semibold uppercase text-sky-700 dark:text-sky-50'>{familyRankings[key].UltraLeague ? familyRankings[key].UltraLeague.rank : '-'}</span></h2>
                        <p className='flex gap-2 justify-center text-sm my-1 text-gray-600/80 dark:text-gray-400/70'><span>CP {familyRankings[key].UltraLeague ? familyRankings[key].UltraLeague.CP : '-'}</span> <span>Lvl. {familyRankings[key].UltraLeague ? familyRankings[key].UltraLeague.L : '-'}</span></p>
                    </div>
                    <div className={`w-full max-w-4/12 text-center font-semibold p-1 bg-sky-200/40 dark:bg-sky-800/40 rounded-md border-2 border-sky-600 dark:border-sky-800${(!familyRankings[key].MasterLeague) && ' opacity-50'}`}>
                        <h6 className='text-lg uppercase text-sky-700/90 dark:text-sky-50/90'>Master League</h6>
                        <h2 className='text-md text-sky-700/60 font-normal dark:text-sky-50/60'>Rank. <span className='text-2xl font-semibold uppercase text-sky-700 dark:text-sky-50'>{familyRankings[key].MasterLeague ? familyRankings[key].MasterLeague.rank : '-'}</span></h2>
                        <p className='flex gap-2 justify-center text-sm my-1 text-gray-600/80 dark:text-gray-400/70'><span>CP {familyRankings[key].MasterLeague ? familyRankings[key].MasterLeague.CP : '-'}</span> <span>Lvl. {familyRankings[key].MasterLeague ? familyRankings[key].MasterLeague.L : '-'}</span></p>
                    </div>
                </div>
                {family.map(monKey => <div key={monKey} className="flex items-center w-full gap-1 mt-2 p-1 border-1 border-sky-600 dark:border-sky-800 rounded-lg bg-sky-100/40 dark:bg-sky-900/20">
                    <div className="relative z-0 w-full max-w-25 text-center text-sky-700 dark:text-sky-50 px-4">
                        {monFamily[monKey][2] && monFamily[monKey][2].includes('Mega') && <img className='absolute h-15 w-15 -z-999 opacity-30 left-[50%] transform-[translateX(-50%)]' src={megaSvg} alt="Mega BG" />}
                        <img key={monKey} className='h-15 w-full max-w-15 mx-auto' src={`https://db.pokemongohub.net/_next/image?url=%2Fimages%2Fofficial%2Ffull%2F${('000' + monFamily[monKey][1]).slice(-3)}${monFamily[monKey][2] == 'Mega Y' ? '_f3' : monFamily[monKey][2] == 'Galar' ? '_galar' : monFamily[monKey][2] ? '_f2' : ''}.webp&w=64&q=75`} alt={monFamily[monKey][0]} />
                        <p className='font-semibold text-sm leading-none mt-0.5'>{monFamily[monKey][0]}</p>
                    </div>
                    <div className={`w-full max-w-4/12 text-center font-semibold p-1 bg-sky-200/40 dark:bg-sky-800/40 rounded-md border-2 border-sky-600 dark:border-sky-800${(!familyRankings[monKey].GreatLeague || familyRankings[monKey].GreatLeague.L < stats.lv) && ' opacity-50'}`}>
                        <h6 className='text-lg uppercase text-sky-700/90 dark:text-sky-50/90'>Great League</h6>
                        <h2 className='text-md text-sky-700/60 font-normal dark:text-sky-50/60'>Rank. <span className='text-2xl font-semibold uppercase text-sky-700 dark:text-sky-50'>{familyRankings[monKey].GreatLeague ? familyRankings[monKey].GreatLeague.rank : '-'}</span></h2>
                        <p className='flex gap-2 justify-center text-sm my-1 text-gray-600/80 dark:text-gray-400/70'><span>CP {familyRankings[monKey].GreatLeague ? familyRankings[monKey].GreatLeague.CP : '-'}</span> <span>Lvl. {familyRankings[monKey].GreatLeague ? familyRankings[monKey].GreatLeague.L : '-'}</span></p>
                    </div>
                    <div className={`w-full max-w-4/12 text-center font-semibold p-1 bg-sky-200/40 dark:bg-sky-800/40 rounded-md border-2 border-sky-600 dark:border-sky-800${(!familyRankings[monKey].UltraLeague || familyRankings[monKey].UltraLeague.L < stats.lv) && ' opacity-50'}`}>
                        <h6 className='text-lg uppercase text-sky-700/90 dark:text-sky-50/90'>Ultra League</h6>
                        <h2 className='text-md text-sky-700/60 font-normal dark:text-sky-50/60'>Rank. <span className='text-2xl font-semibold uppercase text-sky-700 dark:text-sky-50'>{familyRankings[monKey].UltraLeague ? familyRankings[monKey].UltraLeague.rank : '-'}</span></h2>
                        <p className='flex gap-2 justify-center text-sm my-1 text-gray-600/80 dark:text-gray-400/70'><span>CP {familyRankings[monKey].UltraLeague ? familyRankings[monKey].UltraLeague.CP : '-'}</span> <span>Lvl. {familyRankings[monKey].UltraLeague ? familyRankings[monKey].UltraLeague.L : '-'}</span></p>
                    </div>
                    <div className={`w-full max-w-4/12 text-center font-semibold p-1 bg-sky-200/40 dark:bg-sky-800/40 rounded-md border-2 border-sky-600 dark:border-sky-800${(!familyRankings[monKey].MasterLeague) && ' opacity-50'}`}>
                        <h6 className='text-lg uppercase text-sky-700/90 dark:text-sky-50/90'>Master League</h6>
                        <h2 className='text-md text-sky-700/60 font-normal dark:text-sky-50/60'>Rank. <span className='text-2xl font-semibold uppercase text-sky-700 dark:text-sky-50'>{familyRankings[monKey].MasterLeague ? familyRankings[monKey].MasterLeague.rank : '-'}</span></h2>
                        <p className='flex gap-2 justify-center text-sm my-1 text-gray-600/80 dark:text-gray-400/70'><span>CP {familyRankings[monKey].MasterLeague ? familyRankings[monKey].MasterLeague.CP : '-'}</span> <span>Lvl. {familyRankings[monKey].MasterLeague ? familyRankings[monKey].MasterLeague.L : '-'}</span></p>
                    </div>
                </div>)}
            </div>
        </div>)
    }

}

export default RankingWindow