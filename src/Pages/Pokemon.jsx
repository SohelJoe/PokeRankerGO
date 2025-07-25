import { useState, useContext } from 'react'

// Contexts
import { MonIVContext } from '../Contexts/MonIVContext';
import { MonDexContext } from '../Contexts/MonDexContext';
// Components
import ImageBox from '../Components/ImageBox';
import MonIdType from '../Components/MonIdType';
import MonRemoveModal from '../Components/MonRemoveModal';
import MonIvSelector from '../Components/MonIvSelector';
import MonRankingBox from '../Components/MonRankingBox';

import { GrUpdate } from "react-icons/gr";
import { FaRegHeart } from "react-icons/fa";
import { RiSwordLine } from "react-icons/ri";
import { FaShieldAlt } from "react-icons/fa";
import { RiDeleteBin2Line } from "react-icons/ri";
import { MdOutlineCancel } from "react-icons/md";
import { MdOutlineCheckCircle } from "react-icons/md";

import GreatLeague from "../assets/Battle_League_Great.png";
import UltraLeague from "../assets/Battle_League_Ultra.png";
import MasterLeague from "../assets/Battle_League_Master.png";


const Pokemon = () => {
    const [monData, setMonData] = useState(null);
    const [monUpdate, setMonUpdate] = useState(false);
    const [modalState, setModalState] = useState(false);

    const { calculateCP, calculateFamilyRanks } = useContext(MonIVContext);
    const { updateMonData, monDex, getMonByKey } = useContext(MonDexContext);

    const setUpdateMon = (key, name, id, form, type1, type2, base, mon, index) => {

        calculateFamilyRanks({
            [key]: [name, id, form, type1, type2, base.atk, base.def, base.hp]
        }, mon.isBestBuddy ? 50 : 51).then(rankings => {
            setMonUpdate({
                index, key, name, id, form, type1, type2, base,
                stats: {
                    attack: mon.attack,
                    defense: mon.defense,
                    hp: mon.hp,
                    lv: mon.lv,
                },
                isShadow: mon.isShadow,
                isBestBuddy: mon.isBestBuddy,
                fullRanking: rankings
            })
        })
    }

    const updateStats = (newStats) => {
        setMonUpdate(e => ({
            ...e, stats: newStats
        }))
    }

    const setModalOpen = (key, name, id, form, type1, type2, mon, index) => {
        setModalState('opening');
        setMonData([key, name, id, form, type1, type2, mon, index]);
        document.body.className = "h-screen overflow-y-hidden";
    }

    const setModalClose = () => {
        setMonData(null);
        setModalState('closing');
        document.body.removeAttribute("class");

        setTimeout(() => {
            setModalState(false);
        }, 300);
    }

    const updateLevelBar = ({ target }) => {
        setMonUpdate((e) => ({
            ...e,
            stats: {
                ...e.stats,
                lv: target.value
            }
        }))
    }

    const monUpdateOnSave = (monCp, monRanking) => {
        updateMonData(monUpdate.key, monUpdate.index, {
            attack: monUpdate.stats.attack,
            defense: monUpdate.stats.defense,
            hp: monUpdate.stats.hp,
            lv: monUpdate.stats.lv,
            cp: monCp
        }, monUpdate.isShadow, monUpdate.isBestBuddy, {
            GreatLeague: monRanking.GreatLeague.rank,
            UltraLeague: monRanking.UltraLeague.rank,
            MasterLeague: monRanking.MasterLeague.rank
        })

        setMonUpdate(false);
    }

    const toggleBestBuddy = () => {
        calculateFamilyRanks({
            [monUpdate.key]: [monUpdate.name, monUpdate.id, monUpdate.form, monUpdate.type1, monUpdate.type2, monUpdate.base.atk, monUpdate.base.def, monUpdate.base.hp]
        }, monUpdate.isBestBuddy ? 50 : 51).then(rankings => {
            setMonUpdate(e => ({
                ...e,
                isBestBuddy: !e.isBestBuddy,
                stats: {
                    ...e.stats,
                    lv: e.stats.lv > 50 ? 50 : e.stats.lv
                },
                fullRanking: rankings
            }))
        })
    }

    const toggleShadowMon = () => {
        if (!monUpdate.form || ['Hisuian', 'Galar'].includes(monUpdate.form)) {
            setMonUpdate((e) => ({
                ...e,
                isShadow: !e.isShadow
            }))
        }
    }



    if (!monDex && !monUpdate) {
        return <h3>Loading...</h3>
    } else if (monUpdate) {
        const selectedMonCP = monUpdate && calculateCP(monUpdate.base.atk + monUpdate.stats.attack, monUpdate.base.def + monUpdate.stats.defense, monUpdate.base.hp + monUpdate.stats.hp, (monUpdate.stats.lv - 1) * 2);
        const ranking = {
            [monUpdate.key]: {
                GreatLeague: monUpdate.fullRanking[monUpdate.key][1500][(monUpdate.stats.attack + '.' + monUpdate.stats.defense + '.' + monUpdate.stats.hp)],
                UltraLeague: monUpdate.fullRanking[monUpdate.key][2500][(monUpdate.stats.attack + '.' + monUpdate.stats.defense + '.' + monUpdate.stats.hp)],
                MasterLeague: monUpdate.fullRanking[monUpdate.key]['ML'][(monUpdate.stats.attack + '.' + monUpdate.stats.defense + '.' + monUpdate.stats.hp)],
            }
        }

        return <div className='max-w-4xl relative mx-auto'>
            <div className="relative p-1 2xs:p-2 md:p-3 xl:p-4 border-2 border-sky-600 bg-sky-50 dark:border-sky-600/60 dark:bg-sky-700/10 rounded-2xl overflow-hidden">
                <div className='flex items-center xs:items-stretch sm:items-center relative z-0'>
                    <ImageBox id={monUpdate.id} form={monUpdate.form} name={monUpdate.name} className="mr-2" megaClassName="w-full max-w-2/3 left-[50%] -translate-x-[50%] opacity-40" shadowClassName="w-full max-w-3/4 left-[50%] -translate-x-[50%] opacity-70 dark:opacity-60 bottom-[15%]" imgClassName="w-full aspect-square h-max" isBestBuddy={monUpdate.isBestBuddy} isShadow={monUpdate.isShadow} w="256" />
                    <div className='font-semibold w-full max-w-7/10'>
                        <span className='text-xs xl:text-sm leading-none text-gray-500/80 dark:text-gray-500'>Update Selected Pokémon</span>
                        <div className='flex relative gap-1.25 sm:gap-2 items-baseline pb-1.75 before:absolute before:block before:w-full before:h-0.5 before:bg-linear-to-r before:from-gray-800/60 dark:before:from-gray-200/60 before:from-30% before:to-transparent before:z-[1] before:left-0.25 before:bottom-0 before:rounded-l-full mb-2'>
                            <h2 className='text-3xl xl:text-4xl leading-none text-sky-700 dark:text-sky-600 font-bold'>
                                {monUpdate.name}
                            </h2>
                        </div>

                        <MonIvSelector stats={monUpdate.stats} setStats={updateStats} />
                    </div>
                </div>

                <div className='relative flex items-center before:absolute'>
                    <MonIdType id={monUpdate.id} type1={monUpdate.type1} type2={monUpdate.type2} className='flex w-full max-w-3/10 justify-center align-middle items-center gap-1' idClassName="mr-1 md:mr-2 text-xl md:text-2xl" typeClassName="w-full max-w-1/7" />
                    <div className="text-center max-w-7/10 grow-1 text-gray-400 dark:text-gray-200/50 font-semibold gap-1">
                        <p className='min-w-fit text-xs 2xs:text-sm mb-0.5'> Species Base Stats </p>
                        <p className='max-w-fit text-sm 2xs:text-base flex gap-0.5 justify-center flex-wrap leading-[1.15] mx-auto'>
                            <span className='whitespace-nowrap'>Attack: <span className='text-gray-800 dark:text-gray-200'>{monUpdate.base.atk}{monUpdate.stats.attack > 0 && '+' + monUpdate.stats.attack}</span> |</span>
                            <span className='whitespace-nowrap'>Defense: <span className='text-gray-800 dark:text-gray-200'>{monUpdate.base.def}{monUpdate.stats.defense > 0 && '+' + monUpdate.stats.defense}</span> |</span>
                            <span className='whitespace-nowrap'>Stamina: <span className='text-gray-800 dark:text-gray-200'>{monUpdate.base.hp}{monUpdate.stats.hp > 0 && '+' + monUpdate.stats.hp}</span></span>
                        </p>
                    </div>
                </div>

                <div className="mt-3 relative before:block before:w-full before:h-0.5 before:bg-gradient-to-r before:from-transparent before:via-gray-800/50 dark:before:via-gray-200/50 before:to-transparent before:z-[1] before:left-0.25 before:bottom-0 before:rounded-l-full">
                    <div className='flex flex-col-reverse gap-2.5 2xs:flex-row 2xs:gap-0 items-center mt-3'>
                        <div className='flex gap-2 justify-around 2xs:justify-start sm:gap-4 w-full ml-1 text-lg font-semibold text-gray-500 dark:text-gray-100/60'>
                            <h4 className='w-20 sm:w-22'>Level: <span className='text-gray-800 dark:text-gray-200'>{monUpdate.stats.lv}</span></h4>
                            <h4>CP: <span className='text-gray-800 dark:text-gray-200'>{selectedMonCP}</span></h4>
                        </div>
                        <div className='flex min-w-max items-center gap-1.5'>
                            {(!monUpdate.form || ['Hisuian', 'Galar'].includes(monUpdate.form)) && <button className={`relative flex items-center gap-0.75 text-md z-0 pl-0.25 pr-3 pt-0 pb-0.25 border-2 border-sky-700 dark:border-sky-600/80 dark:hover:border-sky-600/90 rounded-full h-max cursor-pointer ${monUpdate.isShadow ? 'text-white dark:text-white bg-sky-800/80 dark:bg-sky-600/70 hover:bg-sky-800 dark:hover:bg-sky-600/80' : 'text-sky-800 dark:text-sky-500/80 dark:hover:text-sky-500/90 bg-sky-300/20 dark:bg-sky-100/10 hover:bg-sky-300/30 dark:hover:bg-sky-200/10'} text-center uppercase font-semibold hover:drop-shadow-lg`} onClick={toggleShadowMon}>
                                {monUpdate.isShadow ? <MdOutlineCheckCircle className='h-6 w-6 mt-0.25' /> : <MdOutlineCancel className='h-6 w-6 mt-0.25' />}
                                Shadow
                            </button>}
                            <button className={`relative flex items-center gap-0.75 text-md z-0 pl-0.25 pr-3 pt-0 pb-0.25 border-2 border-sky-700 dark:border-sky-600/80 dark:hover:border-sky-600/90 rounded-full h-max cursor-pointer ${monUpdate.isBestBuddy ? 'text-white dark:text-white bg-sky-800/80 dark:bg-sky-600/70 hover:bg-sky-800 dark:hover:bg-sky-600/80' : 'text-sky-800 dark:text-sky-500/80 dark:hover:text-sky-500/90 bg-sky-300/20 dark:bg-sky-100/10 hover:bg-sky-300/30 dark:hover:bg-sky-200/10'} text-center uppercase font-semibold hover:drop-shadow-lg`} onClick={toggleBestBuddy}>
                                {monUpdate.isBestBuddy ? <MdOutlineCheckCircle className='h-6 w-6 mt-0.25' /> : <MdOutlineCancel className='h-6 w-6 mt-0.25' />}
                                Best Buddy
                            </button>
                        </div>
                    </div>
                    <input className='w-full mt-3 sm:mt-2 lg:mt-1' type="range" min="1" max={monUpdate.isBestBuddy ? 51 : 50} step={0.5} value={monUpdate.stats.lv} name="level" onChange={updateLevelBar} />
                </div>

                <MonRankingBox family={[monUpdate.key]} monFamily={{ [monUpdate.key]: [monUpdate.name, monUpdate.id, monUpdate.form, monUpdate.type1, monUpdate.type2, monUpdate.base.atk, monUpdate.base.def, monUpdate.base.hp] }} rankings={ranking} level={monUpdate.stats.lv} isShadow={monUpdate.isShadow} />

                <div className="flex pt-2 mt-3 gap-2 font-semibold">
                    <button type='button' className="cursor-pointer uppercase focus:outline-none px-4 py-1.75 rounded-md flex-1 bg-red-400/60 dark:bg-red-800/60 dark:hover:bg-red-800/80 hover:bg-red-400/80 hover:outline hover:outline-red-500 dark:hover:outline-red-700 text-red-800 dark:text-red-100/90 dark:hover:text-red-100" onClick={() => setMonUpdate(false)}>Cancel</button>
                    <button type='submit' className="cursor-pointer uppercase focus:outline-none px-4 py-1.75 rounded-md flex-1 bg-green-600/75 hover:bg-green-600/90 hover:outline hover:outline-green-700 dark:hover:outline-green-500/90 text-white" onClick={() => monUpdateOnSave(selectedMonCP, ranking[monUpdate.key])}>Update</button>
                </div>
            </div>
        </div>
    } else {
        return <>
            <ul role="list" className="grid xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 3xl:grid-cols-5 gap-4 2xs:gap-6 md:gap-4">
                {Object.keys(monDex).map(monKey => {
                    const { name, id, form, type1, type2, base } = getMonByKey(monKey);

                    return monDex[monKey].map((mon, i) => <li key={monKey + i} className="relative flex flex-col z-1 shadow-md rounded-lg overflow-hidden border-1 border-sky-400/80 dark:border-sky-700 bg-sky-100/20 dark:bg-sky-900/20">
                        <ImageBox id={id} form={form} name={name} className="max-w-7/10 w-full mx-auto pt-2 z-0" megaClassName="w-full max-w-3/5 left-[50%] -translate-x-[45%] opacity-30" shadowClassName="w-full opacity-70 dark:opacity-50" imgClassName="w-full aspect-square h-max" isBestBuddy={mon.isBestBuddy} isShadow={mon.isShadow} w="256" />
                        <MonIdType id={id} type1={type1} type2={type2} className='absolute flex w-full gap-0.5 top-0 p-1 z-2' idClassName="mr-auto text-md md:text-base" typeClassName="w-full max-w-1/12" />
                        <h3 className="text-base xl:text-lg px-2 leading-none text-sky-700 dark:text-sky-500 font-bold text-center">{name}</h3>
                        <div className='flex gap-1.25 justify-center w-full mt-2'>
                            <div className='pr-1.25 rounded-full flex items-center gap-1 text-blue-900 dark:text-blue-200 font-semibold text-lg leading-none bg-blue-300/30 dark:bg-blue-800/30 border-1 border-blue-900 dark:border-blue-500'>
                                <div className='bg-blue-300/40 dark:bg-blue-800/40 rounded-full p-0.75 ring-1 ring-blue-800/60 dark:ring-blue-400/80'>
                                    <RiSwordLine className='h-3.25 w-3.25' />
                                </div>
                                <p className='text-xs xs:mb-0.25'>{('00' + mon.attack).slice(-2)}</p>
                            </div>
                            <div className='pr-1.25 rounded-full flex items-center gap-1 text-yellow-900 dark:text-yellow-200 font-semibold text-lg leading-none bg-yellow-300/30 dark:bg-yellow-800/30 border-1 border-yellow-900 dark:border-yellow-500'>
                                <div className='bg-yellow-300/40 dark:bg-yellow-800/40 rounded-full p-0.75 ring-1 ring-yellow-800/60 dark:ring-yellow-400/80'>
                                    <FaShieldAlt className='h-3.25 w-3.25' />
                                </div>
                                <p className='text-xs xs:mb-0.25'>{('00' + mon.defense).slice(-2)}</p>
                            </div>
                            <div className='pr-1.25 rounded-full flex items-center gap-1 text-rose-900 dark:text-rose-200 font-semibold text-lg leading-none bg-rose-300/30 dark:bg-rose-800/30 border-1 border-rose-900 dark:border-rose-500'>
                                <div className='bg-rose-300/40 dark:bg-rose-800/40 rounded-full p-0.75 ring-1 ring-rose-800/60 dark:ring-rose-400/80'>
                                    <FaRegHeart className='h-3.25 w-3.25' />
                                </div>
                                <p className='text-xs xs:mb-0.25'>{('00' + mon.hp).slice(-2)}</p>
                            </div>
                        </div>
                        <p className='text-sm leading-none font-semibold text-gray-700/80 dark:text-gray-300/80 flex justify-center gap-4 xs:gap-6'>
                            <span>Level: <span className='text-base text-black dark:text-white'>{mon.lv}</span></span>
                            <span>CP: <span className='text-base text-black dark:text-white'>{mon.cp}</span></span>
                        </p>
                        <div className="p-2 pt-3.5 my-auto flex flex-col gap-2 relative before:block before:absolute before:w-full before:h-0.5 before:bg-gradient-to-r before:from-transparent before:via-gray-800/50 dark:before:via-gray-200/60 before:to-transparent before:z-[1] before:top-0.25 before:left-0 before:rounded-l-full">
                            <div className="w-full flex">
                                <img className="w-10 h-10 ml-4" src={GreatLeague} alt="" />
                                <div className="text-center font-semibold w-full">
                                    <h5 className='leading-none uppercase  text-sky-700/90 dark:text-sky-300/90'>Great League</h5>
                                    <h6 className='text-sm text-gray-600 dark:text-gray-400'>Rank. <span className='text-base text-black dark:text-white'>{mon.rank.GreatLeague}</span></h6>
                                </div>
                            </div>
                            <div className="w-full flex">
                                <img className="w-10 h-10 ml-4" src={UltraLeague} alt="" />
                                <div className="text-center font-semibold w-full">
                                    <h5 className='leading-none uppercase  text-sky-700/90 dark:text-sky-300/90'>Ultra League</h5>
                                    <h6 className='text-sm text-gray-600 dark:text-gray-400'>Rank. <span className='text-base text-black dark:text-white'>{mon.rank.UltraLeague}</span></h6>
                                </div>
                            </div>
                            <div className="w-full flex">
                                <img className="w-10 h-10 ml-4" src={MasterLeague} alt="" />
                                <div className="text-center font-semibold w-full">
                                    <h5 className='leading-none uppercase  text-sky-700/90 dark:text-sky-300/90'>Master League</h5>
                                    <h6 className='text-sm text-gray-600 dark:text-gray-400'>Rank. <span className='text-base text-black dark:text-white'>{mon.rank.MasterLeague}</span></h6>
                                </div>
                            </div>
                        </div>
                        <div className="w-full flex">
                            <button onClick={() => setModalOpen(monKey, name, id, form, type1, type2, mon, i)} className='flex gap-1 justify-center items-center w-full pt-1 pb-1.5 cursor-pointer uppercase font-semibold text-sm leading-none text-red-800 dark:text-red-600/80 bg-red-200/40 dark:bg-red-900/20 outline-1 outline-red-200 dark:outline-red-900/80'>
                                <RiDeleteBin2Line className='h-3.5 mt-0.25' /> Remove
                            </button>
                            <button className='flex gap-1 justify-center items-center w-full pt-1 pb-1.5 cursor-pointer uppercase font-semibold text-sm leading-none text-amber-600 dark:text-amber-500/90 bg-amber-200/40 dark:bg-amber-800/20 outline-1 outline-amber-300 dark:outline-amber-800/80' onClick={() => setUpdateMon(monKey, name, id, form, type1, type2, base, mon, i)}>
                                <GrUpdate className='h-2.5 mt-0.25' /> Update
                            </button>
                        </div>
                    </li>)
                })}
            </ul>

            <MonRemoveModal state={modalState} close={setModalClose} monData={monData} />
        </>
    }
}

export default Pokemon