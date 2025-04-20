import React, { useRef, useState, useEffect, useContext } from 'react'

import AddSVG from '../assets/add.svg';
import BestBuddyRibon from '../assets/bestBuddyRibbon.png';


// Contexts
import { MonIVContext } from '../Contexts/MonIVContext';
// Components
import ImageBox from '../Components/ImageBox';
import SearchBar from '../Components/SearchBar';


const typings = ['normal', 'fighting', 'flying', 'poison', 'ground', 'rock', 'bug', 'ghost', 'steel', 'fire', 'water', 'grass', 'electric', 'psychic', 'ice', 'dragon', 'dark', 'fairy']

const Ranking = () => {
    const hpBar = useRef()
    const attackBar = useRef()
    const defenseBar = useRef()

    const [open, setOpen] = useState(false);
    const [tableRows, setTableRows] = useState(20);
    const [openedTab, setOpenedTab] = useState('1500');
    const [page, setPage] = useState({ 1500: 1, 2500: 1, ML: 1 });
    const [stats, setStats] = useState({ attack: 10, defense: 10, hp: 10, lv: 15 });

    const { selectedMon, monFamily, toggleMonFromFamily, pvpRankings, isBestBuddy, calculateCP, toggleBestBuddy } = useContext(MonIVContext);
    const [key, monName, id, form, type1, type2, bAtt, bDef, bHp, ...family] = selectedMon || [...Array(10).keys()];

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

        // console.log(pvpRankings);
        return familyRankByStat;
    }

    const setModalState = (state) => {
        if (state == 'open') {
            setOpen('opening');
        } else if (state == 'close') {
            setOpen('closing');

            setTimeout(() => {
                setOpen(false);
            }, 300);
        }
    }

    const familyRankings = selectedMon && getRankingForFamily();

    useEffect(() => {
        // console.log('Update Table Rows');
        setTableRows(20);
        // setStats({ attack: 10, defense: 10, hp: 10, lv: 15 });
    }, [monFamily])

    useEffect(() => {
        // console.log('Update Table Pages');
        setPage({ 1500: 1, 2500: 1, ML: 1 });
    }, [selectedMon])


    return <> <SearchBar className='absolute left-0 right-0 z-99' />

        {selectedMon && <div className='max-w-4xl relative mx-auto mt-28'>
            <div className="relative p-1 2xs:p-2 md:p-3 xl:p-4 border-2 border-sky-600 bg-sky-50 dark:border-sky-600/60 dark:bg-sky-700/10 rounded-2xl overflow-hidden">
                <div className='flex items-center xs:items-stretch sm:items-center relative z-0'>
                    <ImageBox id={id} form={form} name={monName} megaClassName="w-full max-w-2/10 opacity-40 ml-10 px-1" className="mr-2 w-full max-w-3/10 aspect-square h-max" w="256" />
                    <div className='font-semibold w-full max-w-7/10'>
                        <span className='text-xs xl:text-sm leading-none text-gray-500/80 dark:text-gray-500'>Selected Pokémon</span>
                        <div className='flex relative gap-1.25 sm:gap-2 items-baseline pb-1.75 before:absolute before:block before:w-full before:h-0.5 before:bg-linear-to-r before:from-gray-800/60 dark:before:from-gray-200/60 before:from-30% before:to-transparent before:z-[1] before:left-0.25 before:bottom-0 before:rounded-l-full mb-2'>
                            {isBestBuddy && <img className='block h-4 xs:h-5 xl:h-6 3xl:h-7' src={BestBuddyRibon} alt="Best Buddy Ribbon" />}
                            <h2 className='text-2xl xs:text-3xl xl:text-4xl leading-none text-sky-700 dark:text-sky-600 font-bold'>
                                {monName}
                            </h2>
                        </div>
                        <div className='hidden sm:block'>
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
                        <div className='sm:hidden flex gap-2 2xs:gap-3 sm:gap-4 w-full mb-4'>
                            <div className="w-full max-w-4/12">
                                <h6 className='2xs:text-lg 2xs:mb-1 xs:mb-1.5'>Attack</h6>
                                <select className='border-1 border-gray-700 rounded-sm px-1 py-0.5 w-9/10' value={stats.attack} onChange={({ target }) => setStats({ ...stats, attack: target.value })}>
                                    {[...Array(16).keys()].map((i) => <option value={i}>{i}</option>)}
                                </select>
                            </div>
                            <div className="w-full max-w-4/12">
                                <h6 className='2xs:text-lg 2xs:mb-1 xs:mb-1.5'>Defense</h6>
                                <select className='border-1 border-gray-700 rounded-sm px-1 py-0.5 w-9/10' value={stats.defense} onChange={({ target }) => setStats({ ...stats, defense: target.value })}>
                                    {[...Array(16).keys()].map((i) => <option value={i}>{i}</option>)}
                                </select>
                            </div>
                            <div className="w-full max-w-4/12">
                                <h6 className='2xs:text-lg 2xs:mb-1 xs:mb-1.5'>Stamina</h6>
                                <select className='border-1 border-gray-700 rounded-sm px-1 py-0.5 w-9/10' value={stats.hp} onChange={({ target }) => setStats({ ...stats, hp: target.value })}>
                                    {[...Array(16).keys()].map((i) => <option value={i}>{i}</option>)}
                                </select>
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
                        <p className='min-w-fit text-xs 2xs:text-sm'> Species Base Stats </p>
                        <p className='min-w-fit text-sm 2xs:text-base'>
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
                            <button className={`relative flex items-center gap-0.75 text-md z-0 pl-0.75 pr-3 pb-0.75 pt-0.5 border-2 border-sky-700 dark:border-sky-600/80 dark:hover:border-sky-600/90 rounded-full h-max cursor-pointer ${isBestBuddy ? 'text-white dark:text-white bg-sky-800/80 dark:bg-sky-600/70 hover:bg-sky-800 dark:hover:bg-sky-600/80' : 'text-sky-800 dark:text-sky-500/80 dark:hover:text-sky-500/90 bg-sky-300/20 dark:bg-sky-100/10 hover:bg-sky-300/30 dark:hover:bg-sky-200/10'} text-center uppercase font-semibold hover:drop-shadow-lg`} onClick={() => { toggleBestBuddy(); (stats.lv > 50 && setStats((e) => ({ ...e, lv: 50 }))) }}>
                                {isBestBuddy ? <svg version="1.1" className='h-5 w-5 mt-0.25' stroke="currentColor" fill="currentColor" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="122.88px" height="122.88px" viewBox="0 0 122.88 122.88" enableBackground="new 0 0 122.88 122.88" xmlSpace="preserve"><g><path d="M34.388,67.984c-0.286-0.308-0.542-0.638-0.762-0.981c-0.221-0.345-0.414-0.714-0.573-1.097 c-0.531-1.265-0.675-2.631-0.451-3.934c0.224-1.294,0.812-2.531,1.744-3.548l0.34-0.35c2.293-2.185,5.771-2.592,8.499-0.951 c0.39,0.233,0.762,0.51,1.109,0.827l0.034,0.031c1.931,1.852,5.198,4.881,7.343,6.79l1.841,1.651l22.532-23.635 c0.317-0.327,0.666-0.62,1.035-0.876c0.378-0.261,0.775-0.482,1.185-0.661c0.414-0.181,0.852-0.323,1.3-0.421 c0.447-0.099,0.903-0.155,1.356-0.165h0.026c0.451-0.005,0.893,0.027,1.341,0.103c0.437,0.074,0.876,0.193,1.333,0.369 c0.421,0.161,0.825,0.363,1.207,0.604c0.365,0.231,0.721,0.506,1.056,0.822l0.162,0.147c0.316,0.313,0.601,0.653,0.85,1.014 c0.256,0.369,0.475,0.766,0.652,1.178c0.183,0.414,0.325,0.852,0.424,1.299c0.1,0.439,0.154,0.895,0.165,1.36v0.23 c-0.004,0.399-0.042,0.804-0.114,1.204c-0.079,0.435-0.198,0.863-0.356,1.271c-0.16,0.418-0.365,0.825-0.607,1.21 c-0.238,0.377-0.518,0.739-0.832,1.07l-27.219,28.56c-0.32,0.342-0.663,0.642-1.022,0.898c-0.369,0.264-0.767,0.491-1.183,0.681 c-0.417,0.188-0.851,0.337-1.288,0.44c-0.435,0.104-0.889,0.166-1.35,0.187l-0.125,0.003c-0.423,0.009-0.84-0.016-1.241-0.078 l-0.102-0.02c-0.415-0.07-0.819-0.174-1.205-0.31c-0.421-0.15-0.833-0.343-1.226-0.575l-0.063-0.04 c-0.371-0.224-0.717-0.477-1.032-0.754l-0.063-0.06c-1.58-1.466-3.297-2.958-5.033-4.466c-3.007-2.613-7.178-6.382-9.678-9.02 L34.388,67.984L34.388,67.984z M61.44,0c16.96,0,32.328,6.883,43.453,17.987c11.104,11.125,17.986,26.493,17.986,43.453 c0,16.961-6.883,32.329-17.986,43.454C93.769,115.998,78.4,122.88,61.44,122.88c-16.961,0-32.329-6.882-43.454-17.986 C6.882,93.769,0,78.4,0,61.439C0,44.48,6.882,29.112,17.986,17.987C29.112,6.883,44.479,0,61.44,0L61.44,0z M96.899,25.981 C87.826,16.907,75.29,11.296,61.44,11.296c-13.851,0-26.387,5.611-35.46,14.685c-9.073,9.073-14.684,21.609-14.684,35.458 c0,13.851,5.611,26.387,14.684,35.46s21.609,14.685,35.46,14.685c13.85,0,26.386-5.611,35.459-14.685s14.684-21.609,14.684-35.46 C111.583,47.59,105.973,35.054,96.899,25.981L96.899,25.981z" /></g></svg> : <svg version="1.1" className='h-5 w-5 mt-0.25' xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="122.88px" height="122.879px" viewBox="0 0 122.88 122.879" enableBackground="new 0 0 122.88 122.879" xmlSpace="preserve"><g><path fill="currentColor" d="M61.44,0c16.96,0,32.328,6.882,43.453,17.986c11.104,11.125,17.986,26.494,17.986,43.453 c0,16.961-6.883,32.328-17.986,43.453C93.769,115.998,78.4,122.879,61.44,122.879c-16.96,0-32.329-6.881-43.454-17.986 C6.882,93.768,0,78.4,0,61.439C0,44.48,6.882,29.111,17.986,17.986C29.112,6.882,44.48,0,61.44,0L61.44,0z M73.452,39.152 c2.75-2.792,7.221-2.805,9.986-0.026c2.764,2.776,2.775,7.292,0.027,10.083L71.4,61.445l12.077,12.25 c2.728,2.77,2.689,7.256-0.081,10.021c-2.772,2.766-7.229,2.758-9.954-0.012L61.445,71.541L49.428,83.729 c-2.75,2.793-7.22,2.805-9.985,0.025c-2.763-2.775-2.776-7.291-0.026-10.082L51.48,61.435l-12.078-12.25 c-2.726-2.769-2.689-7.256,0.082-10.022c2.772-2.765,7.229-2.758,9.954,0.013L61.435,51.34L73.452,39.152L73.452,39.152z M96.899,25.98C87.826,16.907,75.29,11.296,61.44,11.296c-13.851,0-26.387,5.611-35.46,14.685 c-9.073,9.073-14.684,21.609-14.684,35.459s5.611,26.387,14.684,35.459c9.073,9.074,21.609,14.686,35.46,14.686 c13.85,0,26.386-5.611,35.459-14.686c9.073-9.072,14.684-21.609,14.684-35.459S105.973,35.054,96.899,25.98L96.899,25.98z" /></g></svg>}
                                Best Buddy
                            </button>
                            <button className='p-1.75 border-2 border-sky-700 dark:border-sky-600/80 rounded-full h-max cursor-pointer bg-sky-300/20 dark:bg-sky-100/10 hover:bg-sky-300/30 dark:hover:bg-sky-50/10 dark:hover:brightness-[1.1] hover:drop-shadow-lg' onClick={() => setModalState('open')}>
                                <img className='h-4 w-4 dark:brightness-[1.15]' src={AddSVG} alt="Add" />
                            </button>
                        </div>
                    </div>
                    <input className='w-full' type="range" min="1" max={isBestBuddy ? 51 : 50} step={0.5} value={stats.lv} name="level" onChange={({ target }) => setStats((e) => ({ ...e, lv: target.value }))} />
                </div>

                {open && <div className={`fixed inset-0 overflow-hidden bg-gray-600/70 ${open == 'opening' ? 'animate-In' : 'animate-Out'}`}>
                    <div className="flex h-full w-full justify-center items-center">
                        <div className={`border border-teal-500 shadow-lg modal-container bg-white py-4 text-left px-6 w-11/12 md:max-w-md mx-auto rounded z-50 overflow-y-auto ${open ? 'animate-Entering' : 'animate-Leaving'}`}>
                            <div className="flex justify-between items-center pb-3">
                                <p className="text-2xl font-bold">Header</p>
                                <div className="modal-close cursor-pointer z-50" onClick={() => setModalState('close')}>
                                    <svg className="fill-current text-black" xmlns="http://www.w3.org/2000/svg" width="18" height="18"
                                        viewBox="0 0 18 18"><path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z" />
                                    </svg>
                                </div>
                            </div>
                            <div className="my-5">
                                <p>Inliberali Persius Multi iustitia pronuntiaret expeteretur sanos didicisset laus angusti ferrentur arbitrium arbitramur huic desiderent.?</p>
                            </div>
                            <div className="flex justify-end pt-2">
                                <button className="focus:outline-none modal-close px-4 bg-gray-400 p-3 rounded-lg text-black hover:bg-gray-300">Cancel</button>
                                <button className="focus:outline-none px-4 bg-teal-500 p-3 ml-3 rounded-lg text-white hover:bg-teal-400">Confirm</button>
                            </div>
                        </div>
                    </div>
                </div>}

                {family.length > 0 && <div className="mt-4 flex gap-4 items-center">
                    <h2 className='text-lg font-semibold leading-5 mr-3 text-sky-700 dark:text-sky-600'>{monName}'s <br /> Family</h2>
                    {family.map((key) => <div key={key} className={`relative z-0 min-w-max text-center cursor-pointer text-gray-600/80 hover:text-gray-600 dark:text-gray-400/70 dark:hover:text-gray-400 ${monFamily[key][2] && monFamily[key][2].includes('Mega') && 'ml-4'}`} onClick={() => toggleMonFromFamily(key, monFamily[key])}>
                        <ImageBox id={monFamily[key][1]} form={monFamily[key][2]} name={monFamily[key][0]} megaClassName="h-14 w-14 opacity-30 left-[50%] transform-[translateX(-50%)]" className="h-14 w-full max-w-14 mx-auto" w="64" />
                        <p className='font-semibold text-sm leading-none'>{monFamily[key][0]}</p>
                    </div>)}
                </div>}

                <div className="flex items-stretch w-full gap-1 mt-4 p-1 border-1 border-sky-600 dark:border-sky-800 rounded-lg bg-sky-50 dark:bg-sky-950/60 drop-shadow-sm">
                    <div className="relative z-0 w-full max-w-16 2xs:max-w-18 sm:max-w-22 lg:max-w-25 text-center text-sky-700 dark:text-sky-50 sm:px-2 lg:px-4">
                        <ImageBox id={id} form={form} name={monName} megaClassName="h-14 w-14 opacity-30 left-[50%] transform-[translateX(-50%)]" className="h-14 w-full max-w-14 mx-auto" w="64" />
                        <p className='font-semibold text-sm leading-none mt-0.5'>{monName}</p>
                    </div>
                    <div className={`flex flex-col justify-center w-full max-w-4/12 text-center font-semibold p-0.75 rounded-md border-2${(!familyRankings[key].GreatLeague || familyRankings[key].GreatLeague.L < stats.lv) ? ' opacity-50 bg-red-300/40 dark:bg-red-800/40 border-red-800/80 dark:border-red-600/40' : ' bg-sky-200/40 dark:bg-sky-800/40 border-sky-600 dark:border-sky-800'}`}>
                        <h6 className='xs:text-lg uppercase text-sky-700/90 dark:text-sky-50/90 leading-[1] my-0.5 pb-0.5'>Great League</h6>
                        <h2 className='text-sm xs:text-md text-sky-700/60 font-normal dark:text-sky-50/60'>Rank. <span className='text-xl xs:text-2xl font-semibold uppercase text-sky-700 dark:text-sky-50 leading-none'>{familyRankings[key].GreatLeague ? familyRankings[key].GreatLeague.rank : '-'}</span></h2>
                        <p className='flex gap-2 justify-center text-xs xs:text-sm mb-0.5 text-gray-600/80 dark:text-gray-400/70'><span>CP {familyRankings[key].GreatLeague ? familyRankings[key].GreatLeague.CP : '-'}</span> <span>Lvl. {familyRankings[key].GreatLeague ? familyRankings[key].GreatLeague.L : '-'}</span></p>
                    </div>
                    <div className={`flex flex-col justify-center w-full max-w-4/12 text-center font-semibold p-0.75 rounded-md border-2${(!familyRankings[key].UltraLeague || familyRankings[key].UltraLeague.L < stats.lv) ? ' opacity-50 bg-red-300/40 dark:bg-red-800/40 border-red-800/80 dark:border-red-600/40' : ' bg-sky-200/40 dark:bg-sky-800/40 border-sky-600 dark:border-sky-800'}`}>
                        <h6 className='xs:text-lg uppercase text-sky-700/90 dark:text-sky-50/90 leading-[1] my-0.5 pb-0.5'>Ultra League</h6>
                        <h2 className='text-sm xs:text-md text-sky-700/60 font-normal dark:text-sky-50/60'>Rank. <span className='text-xl xs:text-2xl font-semibold uppercase text-sky-700 dark:text-sky-50 leading-none'>{familyRankings[key].UltraLeague ? familyRankings[key].UltraLeague.rank : '-'}</span></h2>
                        <p className='flex gap-2 justify-center text-xs xs:text-sm mb-0.5 text-gray-600/80 dark:text-gray-400/70'><span>CP {familyRankings[key].UltraLeague ? familyRankings[key].UltraLeague.CP : '-'}</span> <span>Lvl. {familyRankings[key].UltraLeague ? familyRankings[key].UltraLeague.L : '-'}</span></p>
                    </div>
                    <div className={`flex flex-col justify-center w-full max-w-4/12 text-center font-semibold p-0.75 rounded-md border-2${(!familyRankings[key].MasterLeague || familyRankings[key].MasterLeague.L < stats.lv) ? ' opacity-50 bg-red-300/40 dark:bg-red-800/40 border-red-800/80 dark:border-red-600/40' : ' bg-sky-200/40 dark:bg-sky-800/40 border-sky-600 dark:border-sky-800'}`}>
                        <h6 className='xs:text-lg uppercase text-sky-700/90 dark:text-sky-50/90 leading-[1] my-0.5 pb-0.5'>Master League</h6>
                        <h2 className='text-sm xs:text-md text-sky-700/60 font-normal dark:text-sky-50/60'>Rank. <span className='text-xl xs:text-2xl font-semibold uppercase text-sky-700 dark:text-sky-50 leading-none'>{familyRankings[key].MasterLeague ? familyRankings[key].MasterLeague.rank : '-'}</span></h2>
                        <p className='flex gap-2 justify-center text-xs xs:text-sm mb-0.5 text-gray-600/80 dark:text-gray-400/70'><span>CP {familyRankings[key].MasterLeague ? familyRankings[key].MasterLeague.CP : '-'}</span> <span>Lvl. {familyRankings[key].MasterLeague ? familyRankings[key].MasterLeague.L : '-'}</span></p>
                    </div>
                </div>
                {family.map(monKey => <div key={monKey} className="flex items-stretch w-full gap-1 mt-1.75 p-1 border-1 border-sky-600 dark:border-sky-800 rounded-lg bg-sky-50 dark:bg-sky-950/60 drop-shadow-sm">
                    <div className="relative z-0 w-full max-w-16 2xs:max-w-18 sm:max-w-22 lg:max-w-25 text-center text-sky-700 dark:text-sky-50 sm:px-2 lg:px-4">
                        <ImageBox id={monFamily[monKey][1]} form={monFamily[monKey][2]} name={monFamily[monKey][0]} megaClassName="h-14 w-14 opacity-30 left-[50%] transform-[translateX(-50%)]" className="h-14 w-full max-w-14 mx-auto" w="64" />
                        <p className='font-semibold text-sm leading-none mt-0.5'>{monFamily[monKey][0]}</p>
                    </div>
                    <div className={`flex flex-col justify-center w-full max-w-4/12 text-center font-semibold p-0.75 rounded-md border-2${(!familyRankings[monKey].GreatLeague || familyRankings[monKey].GreatLeague.L < stats.lv) ? ' opacity-50 bg-red-300/40 dark:bg-red-800/40 border-red-800/80 dark:border-red-600/40' : ' bg-sky-200/40 dark:bg-sky-800/40 border-sky-600 dark:border-sky-800'}`}>
                        <h6 className='xs:text-lg uppercase text-sky-700/90 dark:text-sky-50/90 leading-[1] my-0.5 pb-0.5'>Great League</h6>
                        <h2 className='text-sm xs:text-md text-sky-700/60 font-normal dark:text-sky-50/60'>Rank. <span className='text-xl xs:text-2xl font-semibold uppercase text-sky-700 dark:text-sky-50 leading-none'>{familyRankings[monKey].GreatLeague ? familyRankings[monKey].GreatLeague.rank : '-'}</span></h2>
                        <p className='flex gap-2 justify-center text-xs xs:text-sm mb-0.5 text-gray-600/80 dark:text-gray-400/70'><span>CP {familyRankings[monKey].GreatLeague ? familyRankings[monKey].GreatLeague.CP : '-'}</span> <span>Lvl. {familyRankings[monKey].GreatLeague ? familyRankings[monKey].GreatLeague.L : '-'}</span></p>
                    </div>
                    <div className={`flex flex-col justify-center w-full max-w-4/12 text-center font-semibold p-0.75 rounded-md border-2${(!familyRankings[monKey].UltraLeague || familyRankings[monKey].UltraLeague.L < stats.lv) ? ' opacity-50 bg-red-300/40 dark:bg-red-800/40 border-red-800/80 dark:border-red-600/40' : ' bg-sky-200/40 dark:bg-sky-800/40 border-sky-600 dark:border-sky-800'}`}>
                        <h6 className='xs:text-lg uppercase text-sky-700/90 dark:text-sky-50/90 leading-[1] my-0.5 pb-0.5'>Ultra League</h6>
                        <h2 className='text-sm xs:text-md text-sky-700/60 font-normal dark:text-sky-50/60'>Rank. <span className='text-xl xs:text-2xl font-semibold uppercase text-sky-700 dark:text-sky-50 leading-none'>{familyRankings[monKey].UltraLeague ? familyRankings[monKey].UltraLeague.rank : '-'}</span></h2>
                        <p className='flex gap-2 justify-center text-xs xs:text-sm mb-0.5 text-gray-600/80 dark:text-gray-400/70'><span>CP {familyRankings[monKey].UltraLeague ? familyRankings[monKey].UltraLeague.CP : '-'}</span> <span>Lvl. {familyRankings[monKey].UltraLeague ? familyRankings[monKey].UltraLeague.L : '-'}</span></p>
                    </div>
                    <div className={`flex flex-col justify-center w-full max-w-4/12 text-center font-semibold p-0.75 rounded-md border-2${(!familyRankings[monKey].MasterLeague || familyRankings[monKey].MasterLeague.L < stats.lv) ? ' opacity-50 bg-red-300/40 dark:bg-red-800/40 border-red-800/80 dark:border-red-600/40' : ' bg-sky-200/40 dark:bg-sky-800/40 border-sky-600 dark:border-sky-800'}`}>
                        <h6 className='xs:text-lg uppercase text-sky-700/90 dark:text-sky-50/90 leading-[1] my-0.5 pb-0.5'>Master League</h6>
                        <h2 className='text-sm xs:text-md text-sky-700/60 font-normal dark:text-sky-50/60'>Rank. <span className='text-xl xs:text-2xl font-semibold uppercase text-sky-700 dark:text-sky-50 leading-none'>{familyRankings[monKey].MasterLeague ? familyRankings[monKey].MasterLeague.rank : '-'}</span></h2>
                        <p className='flex gap-2 justify-center text-xs xs:text-sm mb-0.5 text-gray-600/80 dark:text-gray-400/70'><span>CP {familyRankings[monKey].MasterLeague ? familyRankings[monKey].MasterLeague.CP : '-'}</span> <span>Lvl. {familyRankings[monKey].MasterLeague ? familyRankings[monKey].MasterLeague.L : '-'}</span></p>
                    </div>
                </div>)}

                <div className="relative mt-4 border-2 rounded-lg border-sky-600 bg-sky-50 dark:bg-sky-950/60 drop-shadow-lg">
                    <nav aria-label="Tabs" className="flex text-base xs:text-lg text-gray-600 dark:text-gray-200 font-semibold border-b-1 border-gray-300 dark:border-gray-500">
                        <button className={`relative flex-1/3 py-1.5 cursor-pointer uppercase ${openedTab == '1500' ? 'text-sky-700 dark:text-sky-400 before:absolute before:w-full before:h-0.5 before:bg-sky-700/90 dark:before:bg-sky-500 before:-bottom-0.25 before:left-0' : 'opacity-80 hover:opacity-90 hover:before:absolute hover:before:w-full hover:before:h-0.5 hover:before:bg-gray-400/60 hover:before:-bottom-0.25 hover:before:left-0'}`} onClick={() => openedTab != '1500' && setOpenedTab('1500')}>Great League</button>
                        <button className={`relative flex-1/3 py-1.5 cursor-pointer uppercase ${openedTab == '2500' ? 'text-sky-700 dark:text-sky-400 before:absolute before:w-full before:h-0.5 before:bg-sky-700/90 dark:before:bg-sky-500 before:-bottom-0.25 before:left-0' : 'opacity-80 hover:opacity-90 hover:before:absolute hover:before:w-full hover:before:h-0.5 hover:before:bg-gray-400/60 hover:before:-bottom-0.25 hover:before:left-0'}`} onClick={() => openedTab != '2500' && setOpenedTab('2500')}>Ultra League</button>
                        <button className={`relative flex-1/3 py-1.5 cursor-pointer uppercase ${openedTab == 'ML' ? 'text-sky-700 dark:text-sky-400 before:absolute before:w-full before:h-0.5 before:bg-sky-700/90 dark:before:bg-sky-500 before:-bottom-0.25 before:left-0' : 'opacity-80 hover:opacity-90 hover:before:absolute hover:before:w-full hover:before:h-0.5 hover:before:bg-gray-400/60 hover:before:-bottom-0.25 hover:before:left-0'}`} onClick={() => openedTab != 'ML' && setOpenedTab('ML')}>Master League</button>
                    </nav>
                    <div className="w-full overflow-x-auto">
                        <table className="w-full px-1">
                            <thead className='border-b-1 border-sky-600/60 dark:border-sky-400/60 bg-sky-400/10 text-sky-800/90 dark:text-sky-200'>
                                <tr className='*:px-1 text-sm xs:text-base'>
                                    <th scope="col" className="py-2 font-semibold!">Rank</th>
                                    <th scope="col" className="py-2 font-semibold!">IVs</th>
                                    <th scope="col" className="py-2 font-semibold!">CP</th>
                                    <th scope="col" className="py-2 font-semibold!">Level</th>
                                    <th scope="col" className="py-2 font-semibold!">%</th>
                                    <th scope="col" className="py-2 font-semibold!">Attack</th>
                                    <th scope="col" className="py-2 font-semibold!">Defense</th>
                                    <th scope="col" className="py-2 font-semibold!">Stamina</th>
                                    <th scope="col" className="py-2 font-semibold!">PROD</th>
                                </tr>
                            </thead>
                            <tbody className="whitespace-nowrap text-sm xs:text-base">
                                <tr className='*:px-1 text-center font-semibold bg-green-200 dark:bg-green-900 not-last:border-b border-green-400 dark:border-green-700'>
                                    <td className="py-1"> # {pvpRankings[key][openedTab][(stats.attack + '.' + stats.defense + '.' + stats.hp)].rank} </td>
                                    <td className="py-1"> {pvpRankings[key][openedTab][(stats.attack + '.' + stats.defense + '.' + stats.hp)].IVs?.A} / {pvpRankings[key][openedTab][(stats.attack + '.' + stats.defense + '.' + stats.hp)].IVs?.D} / {pvpRankings[key][openedTab][(stats.attack + '.' + stats.defense + '.' + stats.hp)].IVs?.S} </td>
                                    <td className="py-1"> {pvpRankings[key][openedTab][(stats.attack + '.' + stats.defense + '.' + stats.hp)].CP} </td>
                                    <td className="py-1"> {pvpRankings[key][openedTab][(stats.attack + '.' + stats.defense + '.' + stats.hp)].L} </td>
                                    <td className="py-1">{(pvpRankings[key][openedTab][(stats.attack + '.' + stats.defense + '.' + stats.hp)].statProd / pvpRankings[key][openedTab].maxStatProd * 100).toFixed(2)}%</td>
                                    <td className="py-1">{pvpRankings[key][openedTab][(stats.attack + '.' + stats.defense + '.' + stats.hp)].battle?.A.toFixed(2)}</td>
                                    <td className="py-1">{pvpRankings[key][openedTab][(stats.attack + '.' + stats.defense + '.' + stats.hp)].battle?.D.toFixed(2)}</td>
                                    <td className="py-1">{pvpRankings[key][openedTab][(stats.attack + '.' + stats.defense + '.' + stats.hp)].battle?.S}</td>
                                    <td className="py-1">{pvpRankings[key][openedTab][(stats.attack + '.' + stats.defense + '.' + stats.hp)].statProd}</td>
                                </tr>
                                {pvpRankings && Object.values(pvpRankings[key][openedTab]).slice((page[openedTab] - 1) * tableRows, (pvpRankings[key][openedTab].numRanks > page[openedTab] * tableRows) ? page[openedTab] * tableRows : pvpRankings[key][openedTab].numRanks).map((row, i) => <tr key={i} className='*:px-1 text-center not-last:border-b not-last:border-gray-200 dark:not-last:border-gray-700'>
                                    <td className="py-1 font-semibold"> # {row.rank} </td>
                                    <td className="py-1"> {row.IVs?.A} / {row.IVs?.D} / {row.IVs?.S} </td>
                                    <td className="py-1"> {row.CP} </td>
                                    <td className="py-1"> {row.L} </td>
                                    <td className="py-1">{(row.statProd / pvpRankings[key][openedTab].maxStatProd * 100).toFixed(2)}%</td>
                                    <td className="py-1">{row.battle?.A.toFixed(2)}</td>
                                    <td className="py-1">{row.battle?.D.toFixed(2)}</td>
                                    <td className="py-1">{row.battle?.S}</td>
                                    <td className="py-1">{row.statProd}</td>
                                </tr>)}
                            </tbody>
                        </table>
                    </div>
                    <div className="flex items-center justify-between border-t border-gray-400 dark:border-gray-500 p-2">
                        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                            <div className='flex text-gray-700 dark:text-gray-300/80 ml-2 gap-2'>
                                <p> Showing </p>
                                <select className='border-1 border-gray-700 rounded-sm px-1 py-0.5' value={tableRows} onChange={({ target }) => setTableRows(target.value)}>
                                    <option value="20">20</option>
                                    <option value="35">35</option>
                                    <option value="50">50</option>
                                    <option value="100">100</option>
                                </select>
                                <p>of {pvpRankings[key][openedTab].numRanks} Results </p>
                            </div>

                            <nav className="isolate inline-flex -space-x-px rounded-md shadow-xs" aria-label="Pagination">
                                <button className="relative not-disabled:cursor-pointer inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-gray-300 ring-inset not-disabled:hover:bg-gray-50 focus:z-20 focus:outline-offset-0" disabled={page[openedTab] == 1} onClick={() => setPage(e => ({ ...e, [openedTab]: e[openedTab] - 1 }))}>
                                    <span className="sr-only">Previous</span>
                                    <svg className="size-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
                                        <path fillRule="evenodd" d="M11.78 5.22a.75.75 0 0 1 0 1.06L8.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Z" clipRule="evenodd" />
                                    </svg>
                                </button>

                                {(page[openedTab] == 1 ? [0, 1, 2] : [-1, 0, 1]).map(i => <button key={i} className={`relative cursor-pointer inline-flex items-center px-4 py-2 min-w-11.5 text-sm justify-center font-semibold focus:z-20 ${page[openedTab] == (Math.round(pvpRankings[key][openedTab].numRanks / tableRows) - page[openedTab] > 3 ? page[openedTab] + i : Math.round(pvpRankings[key][openedTab].numRanks / tableRows) - 4 + i) ? 'z-10 text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600 bg-sky-600' : 'text-gray-900 dark:text-gray-100 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:outline-offset-0 md:inline-flex'}`} onClick={() => setPage(e => ({ ...e, [openedTab]: page[openedTab] + i }))}>
                                    {Math.round(pvpRankings[key][openedTab].numRanks / tableRows) - page[openedTab] > 3 ? page[openedTab] + i : Math.round(pvpRankings[key][openedTab].numRanks / tableRows) - 4 + i}
                                </button>)}

                                {Math.round(pvpRankings[key][openedTab].numRanks / tableRows) - page[openedTab] > 4 ? <span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-gray-300 ring-inset focus:outline-offset-0">...</span> : <button className={`relative cursor-pointer inline-flex items-center px-4 py-2 min-w-11.5 text-sm justify-center font-semibold focus:z-20 ${page[openedTab] == Math.round(pvpRankings[key][openedTab].numRanks / tableRows) - 2 ? 'z-10 text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600 bg-sky-600' : 'text-gray-900 dark:text-gray-100 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:outline-offset-0 md:inline-flex'}`} onClick={() => setPage(e => ({ ...e, [openedTab]: Math.round(pvpRankings[key][openedTab].numRanks / tableRows) - 2 }))}>{Math.round(pvpRankings[key][openedTab].numRanks / tableRows) - 2}</button>}

                                {[1, 2].map(i => <button key={i} className={`relative cursor-pointer inline-flex items-center px-4 py-2 min-w-11.5 text-sm justify-center font-semibold focus:z-20 ${page[openedTab] == Math.round(pvpRankings[key][openedTab].numRanks / tableRows) - 2 + i ? 'z-10 text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600 bg-sky-600' : 'text-gray-900 dark:text-gray-100 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:outline-offset-0 md:inline-flex'}`} onClick={() => setPage(e => ({ ...e, [openedTab]: Math.round(pvpRankings[key][openedTab].numRanks / tableRows) - 2 + i }))}>{Math.round(pvpRankings[key][openedTab].numRanks / tableRows) - 2 + i}</button>)}

                                <button className="relative not-disabled:cursor-pointer inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-gray-300 ring-inset not-disabled:hover:bg-gray-50 focus:z-20 focus:outline-offset-0" disabled={page[openedTab] == Math.round(pvpRankings[key][openedTab].numRanks / tableRows)} onClick={() => setPage(e => ({ ...e, [openedTab]: e[openedTab] + 1 }))}>
                                    <span className="sr-only">Next</span>
                                    <svg className="size-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
                                        <path fillRule="evenodd" d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                                    </svg>
                                </button>
                            </nav>
                        </div>
                        <div className="flex flex-1 justify-between sm:hidden">
                            <button className="relative inline-flex items-center rounded-md not-disabled:cursor-pointer border border-gray-300 px-4 py-2 text-sm text-gray-700 dark:text-gray-400 not-disabled:hover:bg-sky-500/10 disabled:opacity-75" disabled={page[openedTab] == 1} onClick={() => setPage(e => ({ ...e, [openedTab]: e[openedTab] - 1 }))}>Previous</button>
                            <button className="relative inline-flex items-center rounded-md not-disabled:cursor-pointer border border-gray-300 px-4 py-2 text-sm text-gray-700 dark:text-gray-400 not-disabled:hover:bg-sky-500/10 disabled:opacity-75" disabled={page[openedTab] == Math.round(pvpRankings[key][openedTab].numRanks / tableRows)} onClick={() => setPage(e => ({ ...e, [openedTab]: e[openedTab] + 1 }))}>Next</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>}
    </>


}

export default Ranking