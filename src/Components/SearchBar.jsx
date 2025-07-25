import { useState, useRef, useContext } from 'react'

import pokeListDB from '../utils/pokeListDB.json';

import { ImSearch } from "react-icons/im";
import { MdOutlineCancel } from "react-icons/md";

// Contexts
import { MonIVContext } from '../Contexts/MonIVContext';
// Components
import ImageBox from '../Components/ImageBox';
import MonIdType from '../Components/MonIdType';


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
        <div className={`w-full max-w-4xl mx-auto px-2 py-2.25 bg-white dark:bg-black border-2 border-gray-600/40 dark:border-gray-300/30 has-focus:border-sky-600 dark:has-focus:border-sky-600/50 rounded-2xl overflow-hidden ${searchValue.length > 0 && 'before:absolute before:-z-1 before:h-30 before:w-full before:-bottom-25 before:left-0 before:bg-gradient-to-b before:from-white dark:before:from-[#090C08] before:via-white dark:before:via-[#090C08] before:to-transparent'}`}>
            <div className='flex w-full pl-4 pr-2.5 bg-gray-700/10 dark:bg-gray-400/10 rounded-lg has-focus:bg-sky-600/15 has-focus:outline-1 has-focus:outline-sky-500/30' onClick={() => searchInput.current.focus()}>
                <input className="w-full focus:outline-0 text-xl placeholder:text-gray-500 placeholder:italic" placeholder="Choose a Pokémon" role="combobox" type="text" aria-expanded="false" aria-autocomplete="list" data-headlessui-state="autofocus" data-autofocus="" ref={searchInput} onChange={(e) => setSearchValue(e.target.value)} value={searchValue} />
                <button className='block ml-4 my-2 text-gray-600 dark:text-gray-400 cursor-pointer disabled:cursor-auto not-disabled:hover:text-sky-600/80' onClick={() => searchValue.length > 0 && setSearchValue('')}>
                    {searchValue.length > 0 ? <MdOutlineCancel className='size-7 hover:fill-red-600' /> : <ImSearch className='h-7 w-7.5' />}
                </button>
            </div>

            {searchValue.length > 0 && <ol className='w-full max-h-107 text-lg space-y-1 cursor-pointer overflow-y-auto overflow-x-hidden'>
                {Object.keys(pokeListDB).filter(searchFilter).map((mon, i) => <li key={i} className='flex relative z-0 first:mt-2 items-center gap-2 text-xl font-semibold hover:bg-sky-400/10 hover:text-sky-900 dark:hover:text-sky-100 py-2 px-4 rounded-lg' onClick={() => onItemClick(mon, pokeListDB[mon])}>
                    <ImageBox id={pokeListDB[mon][1]} form={pokeListDB[mon][2]} name={pokeListDB[mon][0]} megaClassName="h-14 w-14 opacity-40" className="h-14 w-full max-w-14" w="64" />
                    <p>{pokeListDB[mon][0]}</p>

                    <MonIdType id={pokeListDB[mon][1]} type1={pokeListDB[mon][3]} type2={pokeListDB[mon][4]} className='flex ml-auto justify-center align-middle items-center gap-1' idClassName="!text-black dark:!text-white !font-semibold mr-2" typeClassName="w-6" />
                </li>)}
            </ol>}

        </div>
    </div>)
}

export default SearchBar