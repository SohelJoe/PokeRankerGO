import { useContext, useState } from 'react'
import { NavLink, Link } from "react-router";


import { RxCross2 } from "react-icons/rx";
import { PiSunDuotone } from "react-icons/pi";
import { HiMiniBars3 } from "react-icons/hi2";
import { PiMoonStarsDuotone } from "react-icons/pi";

// Contexts
import { ThemeContext } from '../Contexts/ThemeContext';

const Navbar = () => {
    const [navOpen, setNavOpen] = useState(false);

    const { toggleTheme, darkMode } = useContext(ThemeContext);

    const toggleNavState = () => {
        if (!navOpen) {
            setNavOpen('opening');
        } else if (navOpen == 'opening') {
            setNavOpen('closing');

            setTimeout(() => {
                setNavOpen(false);
            }, 125);
        }
    }

    return (
        <nav className="sticky top-0 left-0 right-0 z-199 backdrop-blur bg-gray-300/30 dark:bg-gray-900/60 dark:border-gray-700">
            <div className="flex items-center justify-between mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3">
                <div className="flex items-center">
                    <Link className="flex items-center shrink-0" to="/PokeRankerGO">
                        <img className="size-8" src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500" alt="PokéRankerGO" />
                        <button type="link" className="text-lg font-semibold ml-4">PokéRankerGO</button>
                    </Link>
                    <div className="hidden sm:flex ml-15 items-baseline space-x-4">
                        <NavLink to="/PokeRankerGO/ranking" className={({ isActive }) => isActive ? "rounded-md px-5 pt-1 pb-1.5 font-medium cursor-pointer focus:outline-sky-700/70 hover:bg-gray-300/50 bg-gray-300/50 dark:bg-gray-600/10 outline-2 outline-sky-700/50 dark:outline-sky-500/50 focus:outline-2 dark:hover:bg-gray-400/10" : "rounded-md px-5 pt-1 pb-1.5 font-medium cursor-pointer focus:outline-sky-700/70 hover:bg-gray-300/50 dark:hover:bg-gray-50/10"} >
                            Ranking
                        </NavLink>
                        <NavLink to="/PokeRankerGO/pokedex" className={({ isActive }) => isActive ? "rounded-md px-5 pt-1 pb-1.5 font-medium cursor-pointer focus:outline-sky-700/70 hover:bg-gray-300/50 bg-gray-300/50 dark:bg-gray-600/10 outline-2 outline-sky-700/50 dark:outline-sky-500/50 focus:outline-2 dark:hover:bg-gray-400/10" : "rounded-md px-5 pt-1 pb-1.5 font-medium cursor-pointer focus:outline-sky-700/70 hover:bg-gray-300/50 dark:hover:bg-gray-50/10"} >
                            Pokédex
                        </NavLink>
                    </div>
                </div>
                <div className="-mr-2 flex">
                    <button type="button" className="relative rounded-full p-1 aspect-square cursor-pointer hover:bg-gray-300/50 dark:hover:bg-gray-50/10 focus:ring-2 dark:focus:ring-white focus:ring-gray-800 focus:outline-hidden" onClick={toggleTheme}>
                        <span className="sr-only">Toogle Theme</span>
                        {darkMode ? <PiSunDuotone className='size-8' /> : <PiMoonStarsDuotone className='size-8' />}
                    </button>
                    <button type="button" className="relative sm:hidden inline-flex ml-4 items-center justify-center rounded-md cursor-pointer bg-gray-500/30 hover:bg-gray-500/40 dark:bg-gray-800 p-2 dark:text-gray-400 dark:hover:bg-gray-700 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden" aria-controls="mobile-menu" aria-expanded={navOpen} onClick={toggleNavState}>
                        <span className="sr-only">Open main menu</span>
                        <HiMiniBars3 className={navOpen ? 'hidden' : 'block size-6'} />
                        <RxCross2 className={!navOpen ? 'hidden' : 'block size-6'} />
                    </button>
                </div>
            </div>

            {navOpen && <div className={`overflow-hidden sm:hidden ${navOpen == 'opening' ? 'animate-Down' : 'animate-Up'}`} id="mobile-menu">
                <div className="flex flex-col pb-2 pt-0.5">
                    <NavLink to="/PokeRankerGO/ranking" className="text-left px-4 py-2 font-medium w-full cursor-pointer hover:bg-gray-300/20 focus:ring-2 focus:ring-white focus:ring-offset-1 focus:ring-offset-gray-800 focus:outline-hidden" >Ranking</NavLink>
                    <NavLink to="/PokeRankerGO/pokedex" className="text-left px-4 py-2 font-medium w-full cursor-pointer hover:bg-gray-300/20 focus:ring-2 focus:ring-white focus:ring-offset-1 focus:ring-offset-gray-800 focus:outline-hidden">Pokédex</NavLink>
                </div>
            </div>}
        </nav>
    )
}

export default Navbar