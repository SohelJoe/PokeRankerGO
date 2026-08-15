import { useRef } from 'react';
import { useSearchParams } from "react-router";

const MonIvSelector = () => {
    const hpBar = useRef()
    const attackBar = useRef()
    const defenseBar = useRef()

    const [searchParams, setSearchParams] = useSearchParams();
    const stats = Object.fromEntries(searchParams);


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

    const onIvClick = (stat, pos) => {
        setSearchParams({ ...stats, [stat]: pos + 1 }, { replace: true })
    }

    const onIvDoubleClick = (stat) => {
        setSearchParams({ ...stats, [stat]: 0 }, { replace: true })
    }


    return <>
        <div className='hidden sm:block'>
            <h6>Attack</h6>
            <div className='flex gap-0.5 mb-1.5 text-center text-sm text-gray-600 dark:text-gray-50' ref={attackBar} onMouseLeave={() => removeHoverBG(attackBar.current)}>
                {[...Array(15).keys()].map((i) => <span key={i} className={`block flex-1 bg-gray-400/30 cursor-pointer ${i == 0 ? 'rounded-l-full' : i == 14 && 'rounded-r-full'} ${(i == 4 || i == 9) && 'mr-1'} hover:rounded-r-full ${i + 1 == stats.attack && 'rounded-r-full'} select-none ${stats.attack >= i + 1 && 'bg-orange-400/80! text-black'}`} onMouseEnter={() => updateHoverBG(attackBar.current, i)} onClick={() => onIvClick('attack', i)} onDoubleClick={() => i >= 0 && onIvDoubleClick('attack')}>
                    {i + 1}
                </span>)}
            </div>
            <h6>Defense</h6>
            <div className='flex gap-0.5 mb-1.5 text-center text-sm text-gray-600 dark:text-gray-50' ref={defenseBar} onMouseLeave={() => removeHoverBG(defenseBar.current)}>
                {[...Array(15).keys()].map((i) => <span key={i} className={`block flex-1 bg-gray-400/30 cursor-pointer ${i == 0 ? 'rounded-l-full' : i == 14 && 'rounded-r-full'} ${(i == 4 || i == 9) && 'mr-1'} hover:rounded-r-full ${i + 1 == stats.defense && 'rounded-r-full'} select-none ${stats.defense >= i + 1 && 'bg-orange-400/80! text-black'}`} onMouseEnter={() => updateHoverBG(defenseBar.current, i)} onClick={() => onIvClick('defense', i)} onDoubleClick={() => i >= 0 && onIvDoubleClick('defense')}>
                    {i + 1}
                </span>)}
            </div>
            <h6>HP</h6>
            <div className='flex gap-0.5 mb-1.5 text-center text-sm text-gray-600 dark:text-gray-50' ref={hpBar} onMouseLeave={() => removeHoverBG(hpBar.current)}>
                {[...Array(15).keys()].map((i) => <span key={i} className={`block flex-1 bg-gray-400/30 cursor-pointer ${i == 0 ? 'rounded-l-full' : i == 14 && 'rounded-r-full'} ${(i == 4 || i == 9) && 'mr-1'} hover:rounded-r-full ${i + 1 == stats.hp && 'rounded-r-full'} select-none ${stats.hp >= i + 1 && 'bg-orange-400/80! text-black'}`} onMouseEnter={() => updateHoverBG(hpBar.current, i)} onClick={() => onIvClick('hp', i)} onDoubleClick={() => i >= 0 && onIvDoubleClick('hp')}>
                    {i + 1}
                </span>)}
            </div>
        </div>
        <div className='sm:hidden flex gap-2 2xs:gap-3 sm:gap-4 w-full mb-4'>
            <div className="w-full max-w-4/12">
                <h6 className='2xs:text-lg 2xs:mb-1 xs:mb-1.5'>Attack</h6>
                <select className='border-1 border-gray-700 rounded-sm px-1 py-0.5 w-9/10' value={stats.attack - 1} onChange={({ target }) => onIvClick('attack', parseInt(target.value))}>
                    {[...Array(16).keys()].map((i) => <option key={i} value={i - 1}>{i}</option>)}
                </select>
            </div>
            <div className="w-full max-w-4/12">
                <h6 className='2xs:text-lg 2xs:mb-1 xs:mb-1.5'>Defense</h6>
                <select className='border-1 border-gray-700 rounded-sm px-1 py-0.5 w-9/10' value={stats.defense - 1} onChange={({ target }) => onIvClick('defense', parseInt(target.value))}>
                    {[...Array(16).keys()].map((i) => <option key={i} value={i - 1}>{i}</option>)}
                </select>
            </div>
            <div className="w-full max-w-4/12">
                <h6 className='2xs:text-lg 2xs:mb-1 xs:mb-1.5'>Stamina</h6>
                <select className='border-1 border-gray-700 rounded-sm px-1 py-0.5 w-9/10' value={stats.hp - 1} onChange={({ target }) => onIvClick('hp', parseInt(target.value))}>
                    {[...Array(16).keys()].map((i) => <option key={i} value={i - 1}>{i}</option>)}
                </select>
            </div>
        </div>
    </>
}

export default MonIvSelector