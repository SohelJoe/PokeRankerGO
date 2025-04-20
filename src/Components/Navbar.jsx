import React, { useContext, useState } from 'react'

import SunSVG from '../assets/sun.svg';
import MoonSVG from '../assets/moon.svg';

// Contexts
import { ThemeContext } from '../Contexts/ThemeContext';
import { NavigationContext } from '../Contexts/NavigationContext';

const Navbar = () => {
    const [navOpen, setNavOpen] = useState(false);

    const { toggleTheme, darkMode } = useContext(ThemeContext);
    const { changePage, page } = useContext(NavigationContext);

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
                    <div className="flex items-center shrink-0">
                        <img className="size-8" src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500" alt="PokéRankerGO" />
                        <button type="link" className="text-lg font-semibold ml-4">PokéRankerGO</button>
                    </div>
                    <div className="hidden sm:flex ml-15 items-baseline space-x-4">
                        <button type="link" className={`rounded-md px-5 pt-1 pb-1.5 font-medium cursor-pointer focus:outline-sky-700/70 hover:bg-gray-300/50 dark:hover:bg-gray-50/10 ${page == 'ranking' && 'bg-gray-500/10 outline-2 outline-sky-700/50 focus:outline-2'}`} onClick={() => changePage('ranking')}>Ranking</button>
                        <button type="link" className={`rounded-md px-5 pt-1 pb-1.5 font-medium cursor-pointer focus:outline-sky-700/70 hover:bg-gray-300/50 dark:hover:bg-gray-50/10 ${page == 'pokémon' && 'bg-gray-500/10 outline-2 outline-sky-700/50 focus:outline-2'}`} onClick={() => changePage('pokémon')}>Pokémon</button>
                    </div>
                </div>
                <div className="-mr-2 flex">
                    <button type="button" className="relative rounded-full p-1 aspect-square cursor-pointer hover:bg-gray-300/50 dark:hover:bg-gray-50/10 focus:ring-2 dark:focus:ring-white focus:ring-gray-800 focus:outline-hidden" onClick={toggleTheme}>
                        <span className="sr-only">Toogle Theme</span>
                        <img className="block size-8 dark:invert-90" src={darkMode ? SunSVG : MoonSVG} alt={darkMode ? 'Dark' : 'Light'} />
                    </button>
                    <button type="button" className="relative sm:hidden inline-flex ml-4 items-center justify-center rounded-md cursor-pointer bg-gray-500/30 hover:bg-gray-500/40 dark:bg-gray-800 p-2 dark:text-gray-400 dark:hover:bg-gray-700 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden" aria-controls="mobile-menu" aria-expanded={navOpen} onClick={toggleNavState}>
                        <span className="sr-only">Open main menu</span>
                        <svg className={navOpen ? 'hidden' : 'block size-6'} fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" /></svg>
                        <svg className={!navOpen ? 'hidden' : 'block size-6'} fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" /></svg>
                    </button>
                </div>
            </div>

            {navOpen && <div className={`overflow-hidden sm:hidden ${navOpen == 'opening' ? 'animate-Down' : 'animate-Up'}`} id="mobile-menu">
                <div className="flex flex-col pb-2 pt-0.5">
                    <button type="link" className="text-left px-4 py-2 font-medium w-full cursor-pointer hover:bg-gray-300/20 focus:ring-2 focus:ring-white focus:ring-offset-1 focus:ring-offset-gray-800 focus:outline-hidden" onClick={() => changePage('ranking')}>Ranking</button>
                    <button type="link" className="text-left px-4 py-2 font-medium w-full cursor-pointer hover:bg-gray-300/20 focus:ring-2 focus:ring-white focus:ring-offset-1 focus:ring-offset-gray-800 focus:outline-hidden" onClick={() => changePage('pokémon')}>Pokémon</button>
                </div>
            </div>}
        </nav>
    )
}

export default Navbar