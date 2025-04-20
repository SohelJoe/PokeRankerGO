import React, { useState, useRef, useContext } from 'react'

import pokeListDB from '../utils/pokeListDB.json';

// Contexts
import { MonIVContext } from '../Contexts/MonIVContext';

import SearchListElement from './SearchListElement'


const SearchBar = ({ className = '' }) => {
    const searchInput = useRef()
    const [searchValue, setSearchValue] = useState('')

    const { setSelectedMonDetails, isBestBuddy, toggleBestBuddy } = useContext(MonIVContext);

    const searchFilter = (key) => {
        const lowerKey = key.toLowerCase();
        const searchString = searchValue.trim().toLowerCase();

        return (lowerKey.includes(searchString) || (pokeListDB[key][2] && pokeListDB[key][2].toLowerCase() == searchString) || (pokeListDB[key][0].toLowerCase()).includes(searchString))
    }

    const onItemClick = (monKey, monData) => {
        setSearchValue('');
        isBestBuddy && toggleBestBuddy();
        setSelectedMonDetails(monKey, monData);
    }

    return (<div className={`${className} w-full block px-4 sm:px-6 lg:px-8`}>
        <div className={`w-full max-w-4xl mx-auto px-2 py-2.25 bg-white dark:bg-black border-2 border-gray-600/40 dark:border-gray-300/30 has-focus:border-sky-600 dark:has-focus:border-sky-600/50 rounded-2xl overflow-hidden ${searchValue.length > 0 && 'before:absolute before:-z-1 before:h-30 before:w-full before:-bottom-25 before:left-0 before:bg-gradient-to-b before:from-white dark:before:from-black before:via-white dark:before:via-black before:to-transparent'}`}>
            <div className='flex w-full pl-4 pr-2.5 bg-gray-700/10 dark:bg-gray-400/10 rounded-lg has-focus:bg-sky-600/15 has-focus:outline-1 has-focus:outline-sky-500/30' onClick={() => searchInput.current.focus()}>
                <input className="w-full focus:outline-0 text-xl placeholder:text-gray-500 placeholder:italic" placeholder="Choose a Pokémon" role="combobox" type="text" aria-expanded="false" aria-autocomplete="list" data-headlessui-state="autofocus" data-autofocus="" ref={searchInput} onChange={(e) => setSearchValue(e.target.value)} value={searchValue} />
                <button className='block size-8 ml-4 my-2 text-gray-600 dark:text-gray-400 cursor-pointer disabled:cursor-auto not-disabled:hover:text-sky-600/80' onClick={() => searchValue.length > 0 && setSearchValue('')}>
                    {searchValue.length > 0 ? <svg className='fill-current hover:fill-red-600' version="1.1" x="0px" y="0px" viewBox="0 0 122.88 122.879" enableBackground="new 0 0 122.88 122.879" xmlSpace="preserve"><g><path d="M61.44,0c16.96,0,32.328,6.882,43.453,17.986c11.104,11.125,17.986,26.494,17.986,43.453 c0,16.961-6.883,32.328-17.986,43.453C93.769,115.998,78.4,122.879,61.44,122.879c-16.96,0-32.329-6.881-43.454-17.986 C6.882,93.768,0,78.4,0,61.439C0,44.48,6.882,29.111,17.986,17.986C29.112,6.882,44.48,0,61.44,0L61.44,0z M73.452,39.152 c2.75-2.792,7.221-2.805,9.986-0.026c2.764,2.776,2.775,7.292,0.027,10.083L71.4,61.445l12.077,12.25 c2.728,2.77,2.689,7.256-0.081,10.021c-2.772,2.766-7.229,2.758-9.954-0.012L61.445,71.541L49.428,83.729 c-2.75,2.793-7.22,2.805-9.985,0.025c-2.763-2.775-2.776-7.291-0.026-10.082L51.48,61.435l-12.078-12.25 c-2.726-2.769-2.689-7.256,0.082-10.022c2.772-2.765,7.229-2.758,9.954,0.013L61.435,51.34L73.452,39.152L73.452,39.152z M96.899,25.98C87.826,16.907,75.29,11.296,61.44,11.296c-13.851,0-26.387,5.611-35.46,14.685 c-9.073,9.073-14.684,21.609-14.684,35.459s5.611,26.387,14.684,35.459c9.073,9.074,21.609,14.686,35.46,14.686 c13.85,0,26.386-5.611,35.459-14.686c9.073-9.072,14.684-21.609,14.684-35.459S105.973,35.054,96.899,25.98L96.899,25.98z" /></g></svg> : <svg fill="currentColor" stroke="currentColor" viewBox="0 0 122.88 122.88" fillRule='evenodd'><path d="M42.31,0A42.31,42.31,0,0,1,77.52,65.75l8.56,8.56.09-.09a5.38,5.38,0,0,1,7.59,0l27.55,27.55a5.39,5.39,0,0,1,0,7.59l-12,12a5.39,5.39,0,0,1-7.59,0L74.22,93.76a5.38,5.38,0,0,1,0-7.59l.09-.09-8.56-8.56A42.31,42.31,0,1,1,42.31,0Zm0,9.5A32.81,32.81,0,1,1,9.5,42.31,32.81,32.81,0,0,1,42.31,9.5Z" /></svg>}
                </button>

            </div>
            {searchValue.length > 0 && <ol className='w-full max-h-107 text-lg space-y-1 cursor-pointer overflow-y-auto overflow-x-hidden'>
                {Object.keys(pokeListDB).filter(searchFilter).map((mon, i) =>
                    <SearchListElement key={i} monKey={mon} monData={pokeListDB[mon]} onClick={onItemClick} />
                )}
            </ol>}
        </div>
    </div>)
}

export default SearchBar