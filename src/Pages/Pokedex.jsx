import { useState } from 'react'
import { Link } from 'react-router';

// Components
import ImageBox from '../Components/ImageBox';
import MonIdType from '../Components/MonIdType';
import MonRemoveModal from '../Components/MonRemoveModal';
// Functions
import { getMonByKey } from '../utils/monFunctions.js';
import { getPokeDex, removeMonFromDex } from '../utils/pokeDexFunctions.js';
// React Icons
import { GrUpdate } from "react-icons/gr";
import { FaRegHeart } from "react-icons/fa";
import { RiSwordLine } from "react-icons/ri";
import { FaShieldAlt } from "react-icons/fa";
import { RiDeleteBin2Line } from "react-icons/ri";
import { IoSearch } from "react-icons/io5";

import GreatLeague from "../assets/Battle_League_Great.png";
import UltraLeague from "../assets/Battle_League_Ultra.png";
import MasterLeague from "../assets/Battle_League_Master.png";


const Pokedex = () => {
    const [monData, setMonData] = useState(null);
    const [monDex, setMonDex] = useState(getPokeDex());
    const [modalState, setModalState] = useState(false);

    const setModalOpen = (key, name, id, form, type1, type2, mon, index) => {
        setModalState('opening');
        setMonData([key, name, id, form, type1, type2, mon, index]);
        document.body.className = "h-screen overflow-y-hidden";
    }

    const setModalClose = () => {
        setModalState('closing');
        document.body.removeAttribute("class");

        setTimeout(() => {
            setMonData(null);
            setModalState(false);
        }, 300);
    }

    const handleRemoveMon = () => {
        if (!monData) return;

        const [monKey, , , , , , , index] = monData;
        const updatedDex = removeMonFromDex(monKey, index);

        setMonDex(updatedDex);
        setModalClose();
    }


    return monDex ? <>
        <div class="mb-5">
            <div class="flex items-center rounded-full bg-white/5 pl-3 outline-1 -outline-offset-1 outline-gray-600 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-sky-400/80 dark:has-[input:focus-within]:outline-sky-700 gap-2">
                <IoSearch class="shrink-0 text-xl text-gray-400 select-none" />
                <input id="price" type="text" name="price" placeholder="Search" class="block min-w-0 grow py-1.5 pr-3 pl-1 text-lg text-white placeholder:text-gray-500 focus:outline-none" />
            </div>
        </div>
        <ul role="list" className="grid xs:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 3xl:grid-cols-5 gap-4 2xs:gap-6 md:gap-4">
            {Object.keys(monDex).map(monKey => {
                const { name, id, form, type1, type2 } = getMonByKey(monKey);

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
                        <Link type='button' to={`/PokeRankerGO/pokedex/${monKey}?index=${i}`} className='flex gap-1 justify-center items-center w-full pt-1 pb-1.5 cursor-pointer uppercase font-semibold text-sm leading-none text-amber-600 dark:text-amber-500/90 bg-amber-200/40 dark:bg-amber-800/20 outline-1 outline-amber-300 dark:outline-amber-800/80'>
                            <GrUpdate className='h-2.5 mt-0.25' /> Update
                        </Link>
                    </div>
                </li>)
            })}
        </ul>

        <MonRemoveModal state={modalState} close={setModalClose} monData={monData} removeMonData={handleRemoveMon} />
    </> : <div className='text-center text-gray-600 dark:text-gray-400 font-semibold'>Loading...</div>
}

export default Pokedex