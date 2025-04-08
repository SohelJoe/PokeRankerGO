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
    const [stats, setStats] = useState({ attack: 0, defense: 0, hp: 0 });

    const { selectedMon, isBestBuddy, toggleBestBuddy } = useContext(MonIVContext);
    const [monName, id, form, type1, type2, bAtt, bDef, bHp, ...family] = selectedMon ? selectedMon : [...Array(10).keys()];

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

    return (selectedMon && <div className={`max-w-4xl ${className}`}>
        <div className="relative p-4 border-2 border-sky-600 bg-sky-50 dark:border-sky-600/60 dark:bg-sky-700/10 rounded-3xl overflow-hidden">
            <div className='absolute flex items-center gap-1.5 z-10 right-2.25 top-2'>
                <button className='relative text-md z-0 px-3.5 pb-1 pt-0.75 border-2 border-sky-700 dark:border-sky-600/80 dark:hover:border-sky-600/90 rounded-full h-max cursor-pointer text-sky-800 dark:text-sky-500/80 dark:hover:text-sky-500/90 text-center uppercase font-semibold bg-sky-300/20 dark:bg-sky-100/10 hover:bg-sky-300/30 dark:hover:bg-sky-200/10 hover:drop-shadow-lg' onClick={toggleBestBuddy}>
                    Best Buddy
                </button>
                <button className='p-1.75 border-2 border-sky-700 dark:border-sky-600/80 rounded-full h-max cursor-pointer bg-sky-300/20 dark:bg-sky-100/10 hover:bg-sky-300/30 dark:hover:bg-sky-50/10 dark:hover:brightness-[1.1] hover:drop-shadow-lg'>
                    <img className='h-4 w-4 dark:brightness-[1.15]' src={AddSVG} alt="Add" />
                </button>
            </div>
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
                        <div>
                            <h6>Attack</h6>
                            <div className='flex gap-0.5 mb-1.5 text-center text-sm text-gray-600 dark:text-gray-50' ref={attackBar} onMouseLeave={() => removeHoverBG(attackBar.current)}>
                                {[...Array(15).keys()].map((i) => <span key={i} className={`block flex-1 bg-gray-400/30 cursor-pointer ${i == 0 ? 'rounded-l-full' : i == 14 && 'rounded-r-full'} ${(i == 4 || i == 9) && 'mr-1'} hover:rounded-r-full ${i + 1 == stats.attack && 'rounded-r-full'} select-none ${stats.attack >= i + 1 && 'bg-orange-400/80! text-black'}`} onMouseEnter={() => updateHoverBG(attackBar.current, i)} onClick={() => setStats({ ...stats, attack: i + 1 })} onDoubleClick={() => i == 0 && setStats({ ...stats, attack: 0 })}>
                                    {i + 1}
                                </span>)}
                            </div>
                        </div>
                        <div>
                            <h6>Defense</h6>
                            <div className='flex gap-0.5 mb-1.5 text-center text-sm text-gray-600 dark:text-gray-50' ref={defenseBar} onMouseLeave={() => removeHoverBG(defenseBar.current)}>
                                {[...Array(15).keys()].map((i) => <span key={i} className={`block flex-1 bg-gray-400/30 cursor-pointer ${i == 0 ? 'rounded-l-full' : i == 14 && 'rounded-r-full'} ${(i == 4 || i == 9) && 'mr-1'} hover:rounded-r-full ${i + 1 == stats.defense && 'rounded-r-full'} select-none ${stats.defense >= i + 1 && 'bg-orange-400/80! text-black'}`} onMouseEnter={() => updateHoverBG(defenseBar.current, i)} onClick={() => setStats({ ...stats, defense: i + 1 })} onDoubleClick={() => i == 0 && setStats({ ...stats, defense: 0 })}>
                                    {i + 1}
                                </span>)}
                            </div>
                        </div>
                        <div>
                            <h6>HP</h6>
                            <div className='flex gap-0.5 mb-1.5 text-center text-sm text-gray-600 dark:text-gray-50' ref={hpBar} onMouseLeave={() => removeHoverBG(hpBar.current)}>
                                {[...Array(15).keys()].map((i) => <span key={i} className={`block flex-1 bg-gray-400/30 cursor-pointer ${i == 0 ? 'rounded-l-full' : i == 14 && 'rounded-r-full'} ${(i == 4 || i == 9) && 'mr-1'} hover:rounded-r-full ${i + 1 == stats.hp && 'rounded-r-full'} select-none ${stats.hp >= i + 1 && 'bg-orange-400/80! text-black'}`} onMouseEnter={() => updateHoverBG(hpBar.current, i)} onClick={() => setStats({ ...stats, hp: i + 1 })} onDoubleClick={() => i == 0 && setStats({ ...stats, hp: 0 })}>
                                    {i + 1}
                                </span>)}
                            </div>
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
            </div>
        </div>
    </div>)
}

export default RankingWindow