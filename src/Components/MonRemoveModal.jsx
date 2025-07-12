import React, { useContext } from 'react'


import ImageBox from './ImageBox';

import { RxCross2 } from "react-icons/rx";
import { FaRegHeart } from "react-icons/fa";
import { RiSwordLine } from "react-icons/ri";
import { FaShieldAlt } from "react-icons/fa";

// Contexts
import { MonDexContext } from '../Contexts/MonDexContext';


const typings = ['normal', 'fighting', 'flying', 'poison', 'ground', 'rock', 'bug', 'ghost', 'steel', 'fire', 'water', 'grass', 'electric', 'psychic', 'ice', 'dragon', 'dark', 'fairy']

const MonRemoveModal = ({ state = false, close, monData }) => {

    const [monKey, monName, id, form, type1, type2, stats, index] = monData || ['', '', '', '', '', '', {}, ''];
    const { attack, defense, hp, lv, cp, rank } = stats;


    const { removeMonData } = useContext(MonDexContext)

    const onRemove = () => {
        removeMonData(monKey, index);
        close();
    }



    return (state && monData && <div className={`fixed inset-0 overflow-hidden bg-gray-600/70 dark:bg-gray-900/90 ${state == 'opening' ? 'animate-In' : 'animate-Out'}`}>
        <div className="flex h-full w-full justify-center items-center">
            <div className={`relative border-2 border-sky-500 dark:border-sky-600/60 bg-sky-50 dark:bg-slate-900 shadow-lg p-3 sm:p-4 w-11/12 xs:max-w-md mx-auto rounded-lg z-500 overflow-y-auto ${state ? 'animate-Entering' : 'animate-Leaving'}`}>
                <RxCross2 onClick={close} className='h-5 w-5 cursor-pointer absolute right-2 top-2 text-gray-600 hover:text-black dark:hover:text-gray-300 z-99' />
                <h3 className='relative text-center text-lg/5 font-semibold text-red-900 dark:text-red-600/90 pb-2 px-1 mb-2 before:absolute before:w-full before:h-0.5 before:bg-gradient-to-r before:from-transparent before:via-gray-800/50 dark:before:via-gray-200/70 before:to-transparent before:z-[1] before:left-0.25 before:bottom-0 before:rounded-l-full'>
                    Are you sure to delete the below mon from Pokédex?
                </h3>

                <div className="flex gap-2 items-center pr-2">
                    <ImageBox id={id} form={form} name={monName} megaClassName="w-20 h-20 opacity-40 ml-1" imgClassName="w-22" w="64" />
                    <div className='flex-1'>
                        <h2 className="text-sky-700 dark:text-sky-600 text-3xl font-bold">{monName}</h2>
                        <div className="flex gap-1 mt-1.5">
                            <p className='mb-0.5 mr-2 leading-none max-h-max text-base font-bold text-gray-700/80 dark:text-gray-300/80'>
                                #{('000' + id).slice(-3)}
                            </p>
                            {type1 && <img className='w-5' src={`https://db.pokemongohub.net/_next/image?url=%2Fimages%2Ficons%2Fico_${typings.indexOf(type1)}_${type1}.webp&w=32&q=75`} alt={type1} />}
                            {type2 && <img className='w-5' src={`https://db.pokemongohub.net/_next/image?url=%2Fimages%2Ficons%2Fico_${typings.indexOf(type2)}_${type2}.webp&w=32&q=75`} alt={type2} />}
                        </div>
                    </div>
                </div>

                <div className="pb-0.25">
                    <div className='flex items-center justify-between gap-1'>
                        <p className='text-base font-semibold text-gray-700/80 dark:text-gray-300/80 flex gap-4 xs:gap-6'>
                            <span>Level: <span className='text-black dark:text-white'>{lv}</span></span>
                            <span>CP: <span className='text-black dark:text-white'>{cp}</span></span>
                        </p>
                        <div className='flex gap-2'>
                            <div className='pr-2 rounded-full flex items-center gap-1.5 text-blue-900 dark:text-blue-200 font-semibold text-lg leading-none bg-blue-300/30 dark:bg-blue-800/30 border-1 border-blue-900 dark:border-blue-500'>
                                <div className='bg-blue-300/40 dark:bg-blue-800/40 rounded-full p-1 ring-1 ring-blue-800/60 dark:ring-blue-400/80'>
                                    <RiSwordLine className='h-4.5 w-4.5' />
                                </div>
                                <p className='xs:mb-0.5'>{('00' + attack).slice(-2)}</p>
                            </div>
                            <div className='pr-2 rounded-full flex items-center gap-1.5 text-yellow-900 dark:text-yellow-200 font-semibold text-lg leading-none bg-yellow-300/30 dark:bg-yellow-800/30 border-1 border-yellow-900 dark:border-yellow-500'>
                                <div className='bg-yellow-300/40 dark:bg-yellow-800/40 rounded-full p-1.25 ring-1 ring-yellow-800/60 dark:ring-yellow-400/80'>
                                    <FaShieldAlt className='h-4 w-4' />
                                </div>
                                <p className='xs:mb-0.5'>{('00' + defense).slice(-2)}</p>
                            </div>
                            <div className='pr-2 rounded-full flex items-center gap-1.5 text-rose-900 dark:text-rose-200 font-semibold text-lg leading-none bg-rose-300/30 dark:bg-rose-800/30 border-1 border-rose-900 dark:border-rose-500'>
                                <div className='bg-rose-300/40 dark:bg-rose-800/40 rounded-full p-1.25 ring-1 ring-rose-800/60 dark:ring-rose-400/80'>
                                    <FaRegHeart className='h-4 w-4' />
                                </div>
                                <p className='xs:mb-0.5'>{('00' + hp).slice(-2)}</p>
                            </div>
                        </div>
                    </div>
                    <p className='text-lg font-semibold my-2 flex gap-4 justify-between uppercase text-sky-700/80 dark:text-sky-50/90'>
                        <span>Great: <span className='text-2xl text-sky-700 dark:text-sky-50'>{rank?.GreatLeague}</span></span>
                        <span>Ultra: <span className='text-2xl text-sky-700 dark:text-sky-50'>{rank?.UltraLeague}</span></span>
                        <span>Master: <span className='text-2xl text-sky-700 dark:text-sky-50'>{rank?.MasterLeague}</span></span>
                    </p>
                </div>

                <div className="flex mt-3 mb-0.25 gap-2">
                    <button className='w-full font-semibold text-lg border-2 border-red-700/70 dark:border-red-600/60 hover:border-red-700 dark:hover:border-red-600/90 text-red-700/80 dark:text-red-600/70 hover:text-red-700 dark:hover:text-red-600/90 rounded p-1 cursor-pointer bg-red-200/50 dark:bg-red-900/30 hover:bg-red-200/70 dark:hover:bg-red-900/50' onClick={close}>No</button>
                    <button className='w-full font-semibold text-lg border-2 border-green-700/70 dark:border-green-500/70 hover:border-green-700 dark:hover:border-green-500 text-green-700/80 dark:text-green-500/80 hover:text-green-700 dark:hover:text-green-500 rounded p-1 cursor-pointer bg-green-200/50 dark:bg-green-900/40 hover:bg-green-200/70 dark:hover:bg-green-900/60' onClick={onRemove}>Yes, Remove it.</button>
                </div>
            </div>
        </div>
    </div>)
}


export default MonRemoveModal