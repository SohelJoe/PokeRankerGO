import React from 'react'
import { useContext } from 'react'
// Contexts
import { ThemeContext } from '../Contexts/ThemeContext';
import { NavigationContext } from '../Contexts/NavigationContext';

const Navbar = () => {
    const { toggleTheme, darkMode } = useContext(ThemeContext);
    const { changePage, page } = useContext(NavigationContext);

    return (
        <nav className="backdrop-blur bg-gray-300/30 dark:bg-gray-900/60 dark:border-gray-700">
            <div className="flex items-center justify-between mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3">
                <div className="flex items-center">
                    <div className="flex items-center shrink-0">
                        <img className="size-8" src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500" alt="PokéRankerGO" />
                        <button type="link" className="text-lg font-semibold ml-4">PokéRankerGO</button>
                    </div>
                    <div className="hidden md:flex ml-15 items-baseline space-x-4">
                        <button type="link" className={`rounded-md px-5 pt-1 pb-1.5 font-medium cursor-pointer focus:outline-sky-700/70 hover:bg-gray-300/50 dark:hover:bg-gray-50/10 ${page == 'ranking' && 'bg-gray-500/10 outline-2 outline-sky-700/50 focus:outline-2'}`} onClick={() => changePage('ranking')}>Ranking</button>
                        <button type="link" className={`rounded-md px-5 pt-1 pb-1.5 font-medium cursor-pointer focus:outline-sky-700/70 hover:bg-gray-300/50 dark:hover:bg-gray-50/10 ${page == 'pokemon' && 'bg-gray-500/10 outline-2 outline-sky-700/50 focus:outline-2'}`} onClick={() => changePage('pokémon')}>Pokémon</button>
                    </div>
                </div>
                <div className="-mr-2 flex">
                    <button type="button" className="relative rounded-full p-1 aspect-square cursor-pointer hover:bg-gray-300/50 dark:hover:bg-gray-50/10 focus:ring-2 dark:focus:ring-white focus:ring-gray-800 focus:outline-hidden" onClick={toggleTheme}>
                        <span className="sr-only">Toogle Theme</span>
                        {darkMode ? <svg className="block size-8" fill="currentColor" viewBox="0 0 32 32" strokeWidth="1" stroke="currentColor" aria-hidden="true" data-slot="icon"><g data-name="light max"><path d="M16 9a7 7 0 1 0 7 7 7 7 0 0 0-7-7zm0 12a5 5 0 1 1 5-5 5 5 0 0 1-5 5zM16 7a1 1 0 0 0 1-1V3a1 1 0 0 0-2 0v3a1 1 0 0 0 1 1zM16 25a1 1 0 0 0-1 1v3a1 1 0 0 0 2 0v-3a1 1 0 0 0-1-1zM29 15h-3a1 1 0 0 0 0 2h3a1 1 0 0 0 0-2zM7 16a1 1 0 0 0-1-1H3a1 1 0 0 0 0 2h3a1 1 0 0 0 1-1zM23.07 9.93a1 1 0 0 0 .71-.29l2.12-2.13a1 1 0 1 0-1.41-1.41l-2.13 2.12a1 1 0 0 0 0 1.42 1 1 0 0 0 .71.29zM8.22 22.36 6.1 24.49a1 1 0 0 0 0 1.41 1 1 0 0 0 .71.29 1 1 0 0 0 .7-.29l2.13-2.12a1 1 0 0 0-1.42-1.42zM23.78 22.36a1 1 0 0 0-1.42 1.42l2.13 2.12a1 1 0 0 0 .7.29 1 1 0 0 0 .71-.29 1 1 0 0 0 0-1.41zM8.22 9.64a1 1 0 0 0 .71.29 1 1 0 0 0 .71-.29 1 1 0 0 0 0-1.42L7.51 6.1A1 1 0 0 0 6.1 7.51z" /></g></svg> : <svg className="block size-8" fill="currentColor" viewBox="0 0 32 32" strokeWidth="1" stroke="currentColor" aria-hidden="true" data-slot="icon"><g data-name="moon and star"><path d="M30 8.27a1 1 0 0 0-.8-.68L25.53 7l-1.62-3.42a1 1 0 0 0-1.82 0L20.47 7l-3.62.55a1 1 0 0 0-.8.68 1 1 0 0 0 .23 1L18.93 12l-.63 3.84a1 1 0 0 0 .42 1 1 1 0 0 0 1.06.06L23 15.09l3.22 1.79a1.07 1.07 0 0 0 .49.12 1 1 0 0 0 1-1.16L27.07 12l2.65-2.72A1 1 0 0 0 30 8.27zM25.28 11a1 1 0 0 0-.27.86l.38 2.31-1.91-1.05a1 1 0 0 0-1 0l-1.91 1.05.43-2.35a1 1 0 0 0-.27-.86l-1.65-1.68 2.22-.34a1 1 0 0 0 .75-.56l.95-2 .95 2a1 1 0 0 0 .75.56l2.22.34z" /><path d="M25.44 24A12.5 12.5 0 0 1 15.7 3.74a1.1 1.1 0 0 0 .3-.46.2.2 0 0 1 0-.07A1.9 1.9 0 0 0 16 3a1 1 0 0 0-.36-.72 1 1 0 0 0-1-.14A14 14 0 0 0 8.46 4.2a1 1 0 0 0-.3 1.38A1 1 0 0 0 9 6a1 1 0 0 0 .54-.15 12 12 0 0 1 3.28-1.44A14.66 14.66 0 0 0 11 11.5a14.5 14.5 0 0 0 12 14.27A12 12 0 0 1 6.77 8.33a1 1 0 1 0-1.54-1.28A14 14 0 0 0 16 30a13.91 13.91 0 0 0 9.69-3.9.7.7 0 0 0 .13-.17 1 1 0 0 0 .62-.93 1 1 0 0 0-1-1z" /></g></svg>}
                    </button>
                    <button type="button" className="relative md:hidden inline-flex ml-4 items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden" aria-controls="mobile-menu" aria-expanded="false">
                        <span className="sr-only">Open main menu</span>
                        <svg className="block size-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                        </svg>
                        <svg className="hidden size-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            </div>

            <div className="md:hidden" id="mobile-menu">
                <div className="space-y-1 px-2 pt-2 pb-3 sm:px-3">
                    <button type="link" className="rounded-md px-3 py-2 font-medium w-100 cursor-pointer">Ranking</button>
                    <button type="link" className="rounded-md px-3 py-2 font-medium w-100 cursor-pointer">Pokémon</button>
                </div>
            </div>
        </nav>
    )
}

export default Navbar