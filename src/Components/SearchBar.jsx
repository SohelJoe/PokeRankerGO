import React, { useState, useRef, useContext } from 'react'

// Contexts
import { MonIVContext } from '../Contexts/MonIVContext';

import SearchListElement from './SearchListElement'

const searchData = [
    { entity: "Pokemon", id: 1, name: "Bulbasaur", type1: "grass", type2: "poison", form: null },
    { entity: "Pokemon", id: 2, name: "Ivysaur", type1: "grass", type2: "poison", form: null },
    { entity: "Pokemon", id: 3, name: "Venusaur", type1: "grass", type2: "poison", form: null },
    { entity: "Pokemon", id: 3, name: "Mega Venusaur", type1: "grass", type2: "poison", form: "Mega" },
    { entity: "Pokemon", id: 4, name: "Charmander", type1: "fire", type2: null, form: null },
    { entity: "Pokemon", id: 4, name: "Shadow Charmander", type1: "fire", type2: null, form: "Shadow" },
    { entity: "Pokemon", id: 5, name: "Charmeleon", type1: "fire", type2: null, form: null },
    { entity: "Pokemon", id: 5, name: "Shadow Charmeleon", type1: "fire", type2: null, form: "Shadow" },
    { entity: "Pokemon", id: 6, name: "Gigantamax Charizard", type1: "fire", type2: "flying", form: "Gigantamax" },
    { entity: "Pokemon", id: 6, name: "Charizard", type1: "fire", type2: "flying", form: null },
    { entity: "Pokemon", id: 6, name: "Shadow Charizard", type1: "fire", type2: "flying", form: "Shadow" },
    { entity: "Pokemon", id: 6, name: "Mega X Charizard", type1: "fire", type2: "dragon", form: "Mega X" },
    { entity: "Pokemon", id: 6, name: "Mega Y Charizard", type1: "fire", type2: "flying", form: "Mega Y" },
    { entity: "Pokemon", id: 7, name: "Shadow Squirtle", type1: "water", type2: null, form: "Shadow" },
    { entity: "Pokemon", id: 8, name: "Wartortle", type1: "water", type2: null, form: null },
    { entity: "Pokemon", id: 8, name: "Shadow Wartortle", type1: "water", type2: null, form: "Shadow" },
    { entity: "Pokemon", id: 9, name: "Gigantamax Blastoise", type1: "water", type2: null, form: "Gigantamax" },
    { entity: "Pokemon", id: 9, name: "Blastoise", type1: "water", type2: null, form: null },
    { entity: "Pokemon", id: 9, name: "Shadow Blastoise", type1: "water", type2: null, form: "Shadow" },
    { entity: "Pokemon", id: 9, name: "Mega Blastoise", type1: "water", type2: null, form: "Mega" },
    { entity: "Pokemon", id: 10, name: "Caterpie", type1: "bug", type2: null, form: null },
    { entity: "Pokemon", id: 10, name: "Shadow Caterpie", type1: "bug", type2: null, form: "Shadow" },
    { entity: "Pokemon", id: 11, name: "Metapod", type1: "bug", type2: null, form: null },
    { entity: "Pokemon", id: 11, name: "Shadow Metapod", type1: "bug", type2: null, form: "Shadow" },
    { entity: "Pokemon", id: 12, name: "Shadow Butterfree", type1: "bug", type2: "flying", form: "Shadow" },
    { entity: "Pokemon", id: 13, name: "Shadow Weedle", type1: "bug", type2: "poison", form: "Shadow" },
    { entity: "Pokemon", id: 14, name: "Kakuna", type1: "bug", type2: "poison", form: null },
    { entity: "Pokemon", id: 14, name: "Shadow Kakuna", type1: "bug", type2: "poison", form: "Shadow" },
    { entity: "Pokemon", id: 15, name: "Shadow Beedrill", type1: "bug", type2: "poison", form: "Shadow" },
    { entity: "Pokemon", id: 15, name: "Mega Beedrill", type1: "bug", type2: "poison", form: "Mega" },
    { entity: "Pokemon", id: 16, name: "Shadow Pidgey", type1: "normal", type2: "flying", form: "Shadow" },
    { entity: "Pokemon", id: 17, name: "Shadow Pidgeotto", type1: "normal", type2: "flying", form: "Shadow" },
    { entity: "Pokemon", id: 18, name: "Shadow Pidgeot", type1: "normal", type2: "flying", form: "Shadow" },
    { entity: "Pokemon", id: 18, name: "Mega Pidgeot", type1: "normal", type2: "flying", form: "Mega" },
    { entity: "Pokemon", id: 19, name: "Rattata", type1: "normal", type2: null, form: null },
    { entity: "Pokemon", id: 19, name: "Shadow Rattata", type1: "normal", type2: null, form: "Shadow" },
    { entity: "Pokemon", id: 19, name: "Alolan Rattata", type1: "dark", type2: "normal", form: "Alola" },
    { entity: "Pokemon", id: 19, name: "Shadow Alolan Rattata", type1: "dark", type2: "normal", form: "Alola Shadow" },
    { entity: "Pokemon", id: 20, name: "Raticate", type1: "normal", type2: null, form: null },
    { entity: "Pokemon", id: 20, name: "Shadow Raticate", type1: "normal", type2: null, form: "Shadow" },
    { entity: "Pokemon", id: 20, name: "Alolan Raticate", type1: "dark", type2: "normal", form: "Alola" },
    { entity: "Pokemon", id: 20, name: "Shadow Alolan Raticate", type1: "dark", type2: "normal", form: "Alola Shadow" },
    { entity: "Pokemon", id: 21, name: "Spearow", type1: "normal", type2: "flying", form: null },
    { entity: "Pokemon", id: 22, name: "Fearow", type1: "normal", type2: "flying", form: null },
    { entity: "Pokemon", id: 23, name: "Ekans", type1: "poison", type2: null, form: null },
    { entity: "Pokemon", id: 23, name: "Shadow Ekans", type1: "poison", type2: null, form: "Shadow" },
    { entity: "Pokemon", id: 122, name: "Mr. Mime", type1: "psychic", type2: "fairy", form: null },
    { entity: "Pokemon", id: 122, name: "Shadow Mr. Mime", type1: "psychic", type2: "fairy", form: "Shadow" },
    { entity: "Pokemon", id: 122, name: "Galarian Mr. Mime", type1: "ice", type2: "psychic", form: "Galarian" },
    { entity: "Pokemon", id: 122, name: "Galarian Shadow Mr. Mime", type1: "ice", type2: "psychic", form: "Galarian Shadow" },
    { entity: "Pokemon", id: 439, name: "Mime Jr.", type1: "psychic", type2: "fairy", form: null }
]

const SearchBar = ({ className = '' }) => {
    const searchInput = useRef()
    const [searchValue, setSearchValue] = useState('')

    const { setSelectedMonDetails } = useContext(MonIVContext);

    const onItemClick = (id, type1, type2, form, name) => {
        setSearchValue('');
        setSelectedMonDetails(id, type1, type2, form, name);
    }

    return (<div className={`max-w-4xl ${className}`}>
        <div className="px-2 py-2.25 border-2 border-gray-600/40 dark:border-gray-300/30 has-focus:border-sky-600 dark:has-focus:border-sky-600/50 rounded-2xl overflow-hidden">
            <div className='flex w-full pl-4 pr-2.5 bg-gray-700/10 dark:bg-gray-400/10 rounded-lg has-focus:bg-sky-600/15 has-focus:outline-1 has-focus:outline-sky-500/30' onClick={() => searchInput.current.focus()}>
                <input className="w-full focus:outline-0 text-xl placeholder:text-gray-500 placeholder:italic" placeholder="Choose a Pokémon" role="combobox" type="text" aria-expanded="false" aria-autocomplete="list" data-headlessui-state="autofocus" data-autofocus="" ref={searchInput} onChange={(e) => setSearchValue(e.target.value)} value={searchValue} />
                <button className='block size-8 ml-4 my-2 text-gray-600 dark:text-gray-400 cursor-pointer disabled:cursor-auto not-disabled:hover:text-sky-600/80'>
                    <svg fill="currentColor" stroke="currentColor" viewBox="0 0 122.88 122.88" fillRule='evenodd'><path d="M42.31,0A42.31,42.31,0,0,1,77.52,65.75l8.56,8.56.09-.09a5.38,5.38,0,0,1,7.59,0l27.55,27.55a5.39,5.39,0,0,1,0,7.59l-12,12a5.39,5.39,0,0,1-7.59,0L74.22,93.76a5.38,5.38,0,0,1,0-7.59l.09-.09-8.56-8.56A42.31,42.31,0,1,1,42.31,0Zm0,9.5A32.81,32.81,0,1,1,9.5,42.31,32.81,32.81,0,0,1,42.31,9.5Z" /></svg>
                </button>

            </div>
            {searchData.length > 0 && <ol className='w-full max-h-107 text-lg mt-2 space-y-1 cursor-pointer overflow-auto'>
                {searchData.map((data, i) => <SearchListElement key={i} data={data} onClick={onItemClick} />)}
            </ol>}
        </div>
    </div>)
}

export default SearchBar