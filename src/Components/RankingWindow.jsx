import React, { useRef, useState } from 'react'

const RankingWindow = ({ className = '' }) => {
    const hpBar = useRef()
    const attackBar = useRef()
    const defenseBar = useRef()
    const [stats, setStats] = useState({ attack: 0, defense: 0, hp: 0 })

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

    return (<div className={`max-w-4xl ${className}`}>
        <div className="p-4 border-2 border-sky-600 bg-sky-50 dark:border-sky-600/50 dark:bg-sky-700/10 rounded-2xl overflow-hidden">
            <div className='flex items-center'>
                <img className='pr-2 w-full max-w-3/10 aspect-square h-max' src="https://db.pokemongohub.net/_next/image?url=%2Fimages%2Fofficial%2Ffull%2F001.webp&w=256&q=75" alt="" />
                <div className='font-semibold w-full max-w-7/10'>
                    <span className='text-sm leading-none text-gray-500/80 dark:text-gray-500'>Selected Pokémon</span>
                    <h2 className='relative text-4xl leading-none text-sky-700 font-bold pb-2 before:absolute before:block before:w-full before:h-0.5 before:bg-linear-to-r before:from-gray-800/60 dark:before:from-gray-200/60 before:from-30% before:to-transparent before:z-[1] before:left-0.25 before:bottom-0 before:rounded-l-full'>
                        Bulbausar
                    </h2>
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
            <div className='flex items-center'>
                <div className='flex w-full max-w-3/10 justify-center align-middle items-center gap-1'>
                    <h6 className='block leading-none max-h-max mr-1 md:mr-2 text-xl md:text-2xl font-bold text-sky-600'>#001</h6>
                    <img className='w-full max-w-1/7' src="https://db.pokemongohub.net/_next/image?url=%2Fimages%2Ficons%2Fico_11_grass.webp&w=32&q=75" alt="" />
                    <img className='w-full max-w-1/7' src="https://db.pokemongohub.net/_next/image?url=%2Fimages%2Ficons%2Fico_3_poison.webp&w=32&q=75" alt="" />
                </div>
                <div className="text-center grow-1 text-gray-400 dark:text-gray-200/50 font-semibold gap-1">
                    <p className='min-w-fit text-sm'> Species Base Stats </p>
                    <p className='min-w-fit'>
                        Attack: <span className='text-gray-800 dark:text-gray-200'>118{stats.attack > 0 && '+' + stats.attack}</span> |
                        Defense: <span className='text-gray-800 dark:text-gray-200'>111{stats.defense > 0 && '+' + stats.defense}</span> |
                        Stamina: <span className='text-gray-800 dark:text-gray-200'>128{stats.hp > 0 && '+' + stats.hp}</span>
                    </p>
                </div>

            </div>
        </div>
    </div>)
}

export default RankingWindow