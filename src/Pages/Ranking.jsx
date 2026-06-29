import { useRef, useState, useEffect, useMemo } from 'react'
import { useParams, Link } from "react-router";

import { FaPlus } from "react-icons/fa6";
import { IoIosArrowBack } from "react-icons/io";
import { MdOutlineCancel } from "react-icons/md";
import { IoIosArrowForward } from "react-icons/io";
import { MdOutlineCheckCircle } from "react-icons/md";


// Components
import ImageBox from '../Components/ImageBox';
import MonIdType from '../Components/MonIdType';
import MonSaveModal from '../Components/MonSaveModal';
import MonRankingBox from '../Components/MonRankingBox';
import MonIvSelector from '../Components/MonIvSelector';
// Functions
import { getMonData, calculateCP } from '../utils/monFunctions';


const Ranking = () => {
    const rankingWindow = useRef()
    const { monKey } = useParams();

    const [isBestBuddy, setIsBestBuddy] = useState(false);
    const [isShadowMon, setIsShadowMon] = useState(false);

    const [tableRows, setTableRows] = useState(20);
    const [openedTab, setOpenedTab] = useState('1500');
    const [modalState, setModalState] = useState(false);
    const [page, setPage] = useState({ 1500: 1, 2500: 1, ML: 1 });
    const [stats, setStats] = useState({ attack: 10, defense: 10, hp: 10, lv: 15 });


    const { monFamily, pvpRankings, selectedMon } = useMemo(() => getMonData(monKey, isBestBuddy), [monKey, isBestBuddy]);
    const [key, monName, id, form, type1, type2, bAtt, bDef, bHp, ...family] = selectedMon;

    const toggleBestBuddy = () => {
        setIsBestBuddy((e) => !e)
    }

    const toggleShadowMon = () => {
        if (selectedMon && !(['Mega', 'Primal'].includes(form))) {
            setIsShadowMon((e) => !e)
        }
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

    const setModalOpen = () => {
        setModalState('opening');
        document.body.className = "h-screen overflow-y-hidden"
    }

    const setModalClose = () => {
        setModalState('closing');
        document.body.removeAttribute("class");

        setTimeout(() => {
            setModalState(false);
        }, 300);
    }

    const familyRankings = selectedMon && getRankingForFamily();
    const selectedMonCP = calculateCP(bAtt + stats.attack, bDef + stats.defense, bHp + stats.hp, (stats.lv - 1) * 2);


    useEffect(() => {
        // console.log('Update Table Pages');
        setPage({ 1500: 1, 2500: 1, ML: 1 });
        setTableRows(20);

        setTimeout(() => {
            rankingWindow?.current?.scrollIntoView({
                behavior: "smooth",
                block: "start",
                inline: "nearest"
            })
        }, 100);
    }, [monKey])



    return <> {selectedMon && <div ref={rankingWindow} className='max-w-4xl relative mx-auto mt-24 xs:mt-26 scroll-m-18'>
        <div className="relative p-1 2xs:p-2 md:p-3 xl:p-4 border-2 border-sky-600 bg-sky-50 dark:border-sky-600/60 dark:bg-sky-700/10 rounded-2xl overflow-hidden">

            <div className='flex items-center xs:items-stretch sm:items-center relative z-0'>
                <ImageBox id={id} form={form} name={monName} className="mr-2" megaClassName="w-full max-w-2/3 left-[50%] -translate-x-[50%] opacity-40" shadowClassName="w-full max-w-3/4 left-[50%] -translate-x-[50%] opacity-70 dark:opacity-60 bottom-[15%]" imgClassName="w-full aspect-square h-max" isBestBuddy={isBestBuddy} isShadow={isShadowMon} w="256" />
                <div className='font-semibold w-full max-w-7/10'>
                    <span className='text-xs xl:text-sm leading-none text-gray-500/80 dark:text-gray-500'>Selected Pokémon</span>
                    <div className='flex relative gap-1.25 sm:gap-2 items-baseline pb-1.75 before:absolute before:block before:w-full before:h-0.5 before:bg-linear-to-r before:from-gray-800/60 dark:before:from-gray-200/60 before:from-30% before:to-transparent before:z-[1] before:left-0.25 before:bottom-0 before:rounded-l-full mb-2'>
                        <h2 className='text-3xl xl:text-4xl leading-none text-sky-700 dark:text-sky-600 font-bold'>
                            {monName}
                        </h2>
                    </div>

                    <MonIvSelector stats={stats} setStats={setStats} />
                </div>
            </div>

            <div className='relative flex items-center before:absolute'>
                <MonIdType id={id} type1={type1} type2={type2} className='flex w-full max-w-3/10 justify-center align-middle items-center gap-1' idClassName="mr-1 md:mr-2 text-xl md:text-2xl" typeClassName="w-full max-w-1/7" />
                <div className="text-center max-w-7/10 grow-1 text-gray-400 dark:text-gray-200/50 font-semibold gap-1">
                    <p className='min-w-fit text-xs 2xs:text-sm mb-0.5'> Species Base Stats </p>
                    <p className='max-w-fit text-sm 2xs:text-base flex gap-0.5 justify-center flex-wrap leading-[1.15] mx-auto'>
                        <span className='whitespace-nowrap'>Attack: <span className='text-gray-800 dark:text-gray-200'>{bAtt}{stats.attack > 0 && '+' + stats.attack}</span> |</span>
                        <span className='whitespace-nowrap'>Defense: <span className='text-gray-800 dark:text-gray-200'>{bDef}{stats.defense > 0 && '+' + stats.defense}</span> |</span>
                        <span className='whitespace-nowrap'>Stamina: <span className='text-gray-800 dark:text-gray-200'>{bHp}{stats.hp > 0 && '+' + stats.hp}</span></span>
                    </p>
                </div>
            </div>

            <div className="mt-3 relative before:block before:w-full before:h-0.5 before:bg-gradient-to-r before:from-transparent before:via-gray-800/50 dark:before:via-gray-200/50 before:to-transparent before:z-[1] before:left-0.25 before:bottom-0 before:rounded-l-full">
                <div className='flex flex-col-reverse gap-2.5 2xs:flex-row 2xs:gap-0 items-center mt-3'>
                    <div className='flex gap-2 justify-around 2xs:justify-start sm:gap-4 w-full ml-1 text-lg font-semibold text-gray-500 dark:text-gray-100/60'>
                        <h4 className='w-20 sm:w-22'>Level: <span className='text-gray-800 dark:text-gray-200'>{stats.lv}</span></h4>
                        <h4>CP: <span className='text-gray-800 dark:text-gray-200'>{selectedMonCP}</span></h4>
                    </div>
                    <div className='flex min-w-max items-center gap-1.5'>
                        {(!form || ['Hisuian', 'Galar'].includes(form)) && <button className={`relative flex items-center gap-0.75 text-md z-0 pl-0.25 pr-3 pt-0 pb-0.25 border-2 border-sky-700 dark:border-sky-600/80 dark:hover:border-sky-600/90 rounded-full h-max cursor-pointer ${isShadowMon ? 'text-white dark:text-white bg-sky-800/80 dark:bg-sky-600/70 hover:bg-sky-800 dark:hover:bg-sky-600/80' : 'text-sky-800 dark:text-sky-500/80 dark:hover:text-sky-500/90 bg-sky-300/20 dark:bg-sky-100/10 hover:bg-sky-300/30 dark:hover:bg-sky-200/10'} text-center uppercase font-semibold hover:drop-shadow-lg`} onClick={toggleShadowMon}>
                            {isShadowMon ? <MdOutlineCheckCircle className='h-6 w-6 mt-0.25' /> : <MdOutlineCancel className='h-6 w-6 mt-0.25' />}
                            Shadow
                        </button>}
                        <button className={`relative flex items-center gap-0.75 text-md z-0 pl-0.25 pr-3 pt-0 pb-0.25 border-2 border-sky-700 dark:border-sky-600/80 dark:hover:border-sky-600/90 rounded-full h-max cursor-pointer ${isBestBuddy ? 'text-white dark:text-white bg-sky-800/80 dark:bg-sky-600/70 hover:bg-sky-800 dark:hover:bg-sky-600/80' : 'text-sky-800 dark:text-sky-500/80 dark:hover:text-sky-500/90 bg-sky-300/20 dark:bg-sky-100/10 hover:bg-sky-300/30 dark:hover:bg-sky-200/10'} text-center uppercase font-semibold hover:drop-shadow-lg`} onClick={() => { toggleBestBuddy(); (stats.lv > 50 && setStats((e) => ({ ...e, lv: 50 }))) }}>
                            {isBestBuddy ? <MdOutlineCheckCircle className='h-6 w-6 mt-0.25' /> : <MdOutlineCancel className='h-6 w-6 mt-0.25' />}
                            Best Buddy
                        </button>
                        <button className='p-1 border-2 text-sky-700 dark:text-sky-600/80 border-sky-700 dark:border-sky-600/80 rounded-full h-max cursor-pointer bg-sky-300/20 dark:bg-sky-100/10 hover:bg-sky-300/30 dark:hover:bg-sky-50/10 dark:hover:brightness-[1.2] hover:drop-shadow-lg' onClick={setModalOpen}>
                            <FaPlus className='size-4.5' />
                        </button>
                    </div>
                </div>
                <input className='w-full mt-3 sm:mt-2 lg:mt-1' type="range" min="1" max={isBestBuddy ? 51 : 50} step={0.5} value={stats.lv} name="level" onChange={({ target }) => setStats((e) => ({ ...e, lv: target.value }))} />
            </div>

            {family.length > 0 && <div className="mt-4 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-4">
                <h2 className='text-lg font-semibold leading-5 mr-3 text-sky-700 dark:text-sky-600'>{monName}'s <br className='hidden sm:block' /> Family</h2>
                <div className="flex gap-4 items-center flex-wrap">
                    {family.map((key) => <Link to={`/PokeRankerGO/ranking/${key}`} key={key} className={`relative z-0 min-w-max text-center cursor-pointer text-gray-600/80 hover:text-gray-600 dark:text-gray-200/70 dark:hover:text-gray-200 ${monFamily[key][2] && monFamily[key][2].includes('Mega') && 'sm:ml-4'}`}>
                        <ImageBox id={monFamily[key][1]} form={monFamily[key][2]} name={monFamily[key][0]} megaClassName="h-14 w-14 opacity-30 left-[50%] transform-[translateX(-50%)]" imgClassName="h-14 w-full max-w-14 mx-auto" w="64" />
                        <p className='font-semibold text-sm leading-none'>{monFamily[key][0]}</p>
                    </Link>)}
                </div>
            </div>}

            <MonRankingBox family={[key, ...family]} monFamily={monFamily} rankings={familyRankings} level={stats.lv} isShadow={isShadowMon} />

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
                        <div className='flex text-gray-700 dark:text-gray-200/80 ml-2 gap-2'>
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
                                <IoIosArrowBack className='w-5' />
                            </button>

                            {(page[openedTab] == 1 ? [0, 1, 2] : [-1, 0, 1]).map(i => <button key={i} className={`relative cursor-pointer inline-flex items-center px-4 py-2 min-w-11.5 text-sm justify-center font-semibold focus:z-20 ${page[openedTab] == (Math.round(pvpRankings[key][openedTab].numRanks / tableRows) - page[openedTab] > 3 ? page[openedTab] + i : Math.round(pvpRankings[key][openedTab].numRanks / tableRows) - 4 + i) ? 'z-10 text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600 bg-sky-600' : 'text-gray-900 dark:text-gray-100 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 dark:hover:bg-gray-50/10 focus:outline-offset-0 md:inline-flex'}`} onClick={() => setPage(e => ({ ...e, [openedTab]: page[openedTab] + i }))}>
                                {Math.round(pvpRankings[key][openedTab].numRanks / tableRows) - page[openedTab] > 3 ? page[openedTab] + i : Math.round(pvpRankings[key][openedTab].numRanks / tableRows) - 4 + i}
                            </button>)}

                            {Math.round(pvpRankings[key][openedTab].numRanks / tableRows) - page[openedTab] > 4 ? <span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-gray-300 ring-inset focus:outline-offset-0">...</span> : <button className={`relative cursor-pointer inline-flex items-center px-4 py-2 min-w-11.5 text-sm justify-center font-semibold focus:z-20 ${page[openedTab] == Math.round(pvpRankings[key][openedTab].numRanks / tableRows) - 2 ? 'z-10 text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600 bg-sky-600' : 'text-gray-900 dark:text-gray-100 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 dark:hover:bg-gray-50/10 focus:outline-offset-0 md:inline-flex'}`} onClick={() => setPage(e => ({ ...e, [openedTab]: Math.round(pvpRankings[key][openedTab].numRanks / tableRows) - 2 }))}>{Math.round(pvpRankings[key][openedTab].numRanks / tableRows) - 2}</button>}

                            {[1, 2].map(i => <button key={i} className={`relative cursor-pointer inline-flex items-center px-4 py-2 min-w-11.5 text-sm justify-center font-semibold focus:z-20 ${page[openedTab] == Math.round(pvpRankings[key][openedTab].numRanks / tableRows) - 2 + i ? 'z-10 text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600 bg-sky-600' : 'text-gray-900 dark:text-gray-100 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 dark:hover:bg-gray-50/10 focus:outline-offset-0 md:inline-flex'}`} onClick={() => setPage(e => ({ ...e, [openedTab]: Math.round(pvpRankings[key][openedTab].numRanks / tableRows) - 2 + i }))}>{Math.round(pvpRankings[key][openedTab].numRanks / tableRows) - 2 + i}</button>)}

                            <button className="relative not-disabled:cursor-pointer inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-gray-300 ring-inset not-disabled:hover:bg-gray-50 not-disabled:dark:hover:bg-gray-50/10 focus:z-20 focus:outline-offset-0" disabled={page[openedTab] == Math.round(pvpRankings[key][openedTab].numRanks / tableRows)} onClick={() => setPage(e => ({ ...e, [openedTab]: e[openedTab] + 1 }))}>
                                <span className="sr-only">Next</span>
                                <IoIosArrowForward className='w-5' />
                            </button>
                        </nav>
                    </div>
                    <div className="flex flex-1 justify-between sm:hidden">
                        <button className="relative inline-flex items-center rounded-md not-disabled:cursor-pointer border border-gray-300 px-4 py-2 text-sm text-gray-700 dark:text-gray-400 not-disabled:hover:bg-sky-500/10 disabled:opacity-75" disabled={page[openedTab] == 1} onClick={() => setPage(e => ({ ...e, [openedTab]: e[openedTab] - 1 }))}>Previous</button>
                        <button className="relative inline-flex items-center rounded-md not-disabled:cursor-pointer border border-gray-300 px-4 py-2 text-sm text-gray-700 dark:text-gray-400 not-disabled:hover:bg-sky-500/10 disabled:opacity-75" disabled={page[openedTab] == Math.round(pvpRankings[key][openedTab].numRanks / tableRows)} onClick={() => setPage(e => ({ ...e, [openedTab]: e[openedTab] + 1 }))}>Next</button>
                    </div>
                </div>
            </div>

            <MonSaveModal state={modalState} close={setModalClose} mon={[key, monName, id, form, type1, type2]} stats={stats} CP={selectedMonCP} ranking={familyRankings[key]} isBestBuddy={isBestBuddy} isShadow={isShadowMon} />
        </div>
    </div>}
    </>


}

export default Ranking