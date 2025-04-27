import React from 'react'


import ImageBox from './ImageBox';

import { RxCross2 } from "react-icons/rx";
import { FaRegHeart } from "react-icons/fa";
import { RiSwordLine } from "react-icons/ri";
import { FaShieldAlt } from "react-icons/fa";


const typings = ['normal', 'fighting', 'flying', 'poison', 'ground', 'rock', 'bug', 'ghost', 'steel', 'fire', 'water', 'grass', 'electric', 'psychic', 'ice', 'dragon', 'dark', 'fairy']

const MonSaveModal = ({ state = false, close, mon, stats, CP, ranking }) => {

    const [key, monName, id, form, type1, type2] = mon;
    const { attack, defense, hp, lv } = stats;


    const onFormSubmit = (e) => {
        e.preventDefault();
        console.log(e.target);

    }


    return (state && <div className={`fixed inset-0 overflow-hidden bg-gray-600/70 dark:bg-gray-900/90 ${state == 'opening' ? 'animate-In' : 'animate-Out'}`}>
        <div className="flex h-full w-full justify-center items-center">
            <div className={`relative border-2 border-sky-500 dark:border-sky-600/60 bg-white dark:bg-slate-900 shadow-lg p-3 sm:p-4 w-11/12 xs:max-w-md mx-auto rounded-lg z-50 overflow-y-auto ${state ? 'animate-Entering' : 'animate-Leaving'}`}>
                <div className="cursor-pointer absolute right-2 top-2 text-gray-600 hover:text-black dark:hover:text-gray-300 z-99" onClick={close}>
                    <RxCross2 className='h-5 w-5' />
                </div>
                <div className="flex gap-2 items-center pr-2">
                    <ImageBox id={id} form={form} name={monName} megaClassName="w-20 h-20 opacity-40" className="w-20" w="64" />
                    <div className='flex-1'>
                        <h2 className="text-sky-700 dark:text-sky-600 text-3xl font-bold">{monName}</h2>
                        <div className="flex gap-1 mt-1">
                            <p className='mb-0.5 mr-2 leading-none max-h-max text-base font-bold text-gray-700/80 dark:text-gray-300/80'>
                                #{('000' + id).slice(-3)}
                            </p>
                            {type1 && <img className='w-5' src={`https://db.pokemongohub.net/_next/image?url=%2Fimages%2Ficons%2Fico_${typings.indexOf(type1)}_${type1}.webp&w=32&q=75`} alt={type1} />}
                            {type2 && <img className='w-5' src={`https://db.pokemongohub.net/_next/image?url=%2Fimages%2Ficons%2Fico_${typings.indexOf(type2)}_${type2}.webp&w=32&q=75`} alt={type2} />}
                        </div>
                    </div>
                </div>

                <div className="pb-0.25 relative before:absolute before:w-full before:h-0.5 before:bg-gradient-to-r before:from-transparent before:via-gray-800/50 dark:before:via-gray-200/50 before:to-transparent before:z-[1] before:left-0.25 before:bottom-0 before:rounded-l-full">
                    <div className='flex items-center justify-between gap-1'>
                        <p className='text-base font-semibold text-gray-700/80 dark:text-gray-300/80 flex gap-4 xs:gap-6'>
                            <span>Level: <span className='text-black dark:text-white'>{lv}</span></span>
                            <span>CP: <span className='text-black dark:text-white'>{CP}</span></span>
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
                                <p className='xs:mb-0.5'>{defense}</p>
                            </div>
                            <div className='pr-2 rounded-full flex items-center gap-1.5 text-rose-900 dark:text-rose-200 font-semibold text-lg leading-none bg-rose-300/30 dark:bg-rose-800/30 border-1 border-rose-900 dark:border-rose-500'>
                                <div className='bg-rose-300/40 dark:bg-rose-800/40 rounded-full p-1.25 ring-1 ring-rose-800/60 dark:ring-rose-400/80'>
                                    <FaRegHeart className='h-4 w-4' />
                                </div>
                                <p className='xs:mb-0.5'>{hp}</p>
                            </div>
                        </div>
                    </div>
                    <p className='text-lg font-semibold my-2 flex gap-4 justify-between uppercase text-sky-700/80 dark:text-sky-50/90'>
                        <span>Great: <span className='text-2xl text-sky-700 dark:text-sky-50'>{ranking.GreatLeague.rank}</span></span>
                        <span>Ultra: <span className='text-2xl text-sky-700 dark:text-sky-50'>{ranking.UltraLeague.rank}</span></span>
                        <span>Master: <span className='text-2xl text-sky-700 dark:text-sky-50'>{ranking.MasterLeague.rank}</span></span>
                    </p>
                </div>

                <form onSubmit={onFormSubmit} className="mt-5 w-full">
                    <label className='flex items-center gap-2 h-11.5 *:cursor-pointer cursor-pointer py-2 px-3 not-last:mb-2 select-none w-full text-lg font-semibold text-sky-700 dark:text-sky-400 rounded-lg border border-sky-400 bg-sky-200/40 dark:bg-sky-900/60 hover:bg-sky-300/35 dark:hover:bg-sky-800/60 has-checked:border-green-700 dark:has-checked:border-green-500/90 has-checked:bg-green-200/60 dark:has-checked:bg-green-800/60 has-checked:text-green-700 dark:has-checked:text-green-500/90 has-checked:ring-1 has-checked:ring-green-700 dark:has-checked:ring-green-500/90 has-checked:accent-green-700 dark:has-checked:accent-green-500'>
                        <input type="radio" name="monList" value="new" />
                        <span className='leading-none'>Add New Pokemon</span>
                    </label>
                    <label className='flex items-center gap-2 *:cursor-pointer cursor-pointer py-2 px-3 not-last:mb-2 select-none w-full text-lg font-semibold text-sky-700 dark:text-sky-400 rounded-lg border border-sky-400 bg-sky-200/40 dark:bg-sky-900/60 hover:bg-sky-300/35 dark:hover:bg-sky-800/60 has-checked:border-green-700 dark:has-checked:border-green-500/90 has-checked:bg-green-200/60 dark:has-checked:bg-green-800/60 has-checked:text-green-700 dark:has-checked:text-green-500/90 has-checked:ring-1 has-checked:ring-green-700 dark:has-checked:ring-green-500/90 has-checked:accent-green-700 dark:has-checked:accent-green-500'>
                        <input type="radio" name="monList" value="Replace_0" />
                        <span className='mr-auto'>Replace</span>
                        <div className='pr-2 rounded-full flex items-center gap-1.5 text-blue-900 dark:text-blue-200 font-semibold text-base xs:text-lg leading-none bg-blue-300/30 dark:bg-blue-800/30 border-1 border-blue-900 dark:border-blue-500'>
                            <div className='bg-blue-300/40 dark:bg-blue-800/40 rounded-full p-1 ring-1 ring-blue-800/60 dark:ring-blue-400/80'>
                                <RiSwordLine className='h-4 w-4 xs:h-4.5 xs:w-4.5' />
                            </div>
                            <p className='mt-0.25 xs:mb-0.5'>{('00' + '99').slice(-2)}</p>
                        </div>
                        <div className='pr-2 rounded-full flex items-center gap-1.5 text-yellow-900 dark:text-yellow-200 font-semibold text-base xs:text-lg leading-none bg-yellow-300/30 dark:bg-yellow-800/30 border-1 border-yellow-900 dark:border-yellow-500'>
                            <div className='bg-yellow-300/40 dark:bg-yellow-800/40 rounded-full p-1.25 ring-1 ring-yellow-800/60 dark:ring-yellow-400/80'>
                                <FaShieldAlt className='h-3.5 w-3.5 xs:h-4 xs:w-4' />
                            </div>
                            <p className='mt-0.25 xs:mb-0.5'>{'99'}</p>
                        </div>
                        <div className='pr-2 rounded-full flex items-center gap-1.5 text-rose-900 dark:text-rose-200 font-semibold text-base xs:text-lg leading-none bg-rose-300/30 dark:bg-rose-800/30 border-1 border-rose-900 dark:border-rose-500'>
                            <div className='bg-rose-300/40 dark:bg-rose-800/40 rounded-full p-1.25 ring-1 ring-rose-800/60 dark:ring-rose-400/80'>
                                <FaRegHeart className='h-3.5 w-3.5 xs:h-4 xs:w-4' />
                            </div>
                            <p className='mt-0.25 xs:mb-0.5'>{'99'}</p>
                        </div>
                    </label>

                    <div className="flex pt-2 mt-3 gap-2 font-semibold">
                        <button className="cursor-pointer uppercase focus:outline-none px-4 py-1.75 rounded-md flex-1 bg-red-400/60 dark:bg-red-800/60 dark:hover:bg-red-800/80 hover:bg-red-400/80 hover:outline hover:outline-red-500 dark:hover:outline-red-700 text-red-800 dark:text-red-200/80 dark:hover:text-red-200/90" onClick={close}>Cancel</button>
                        <button type='submit' className="cursor-pointer uppercase focus:outline-none px-4 py-1.75 rounded-md flex-1 bg-green-600/75 hover:bg-green-600/90 hover:outline hover:outline-green-700 dark:hover:outline-green-500/90 text-white">Save</button>
                    </div>
                </form>
            </div>
        </div>
    </div>)
}

export default MonSaveModal