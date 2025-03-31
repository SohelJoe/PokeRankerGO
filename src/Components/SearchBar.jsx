import React, { useState, useRef } from 'react'

const SearchBar = ({ className = '' }) => {
    const searchInput = useRef()
    const [searchValue, setSearchValue] = useState('')


    return (<div className={`max-w-4xl ${className}`}>
        <div className="px-2 py-2.25 border-2 border-gray-600/40 dark:border-gray-300/30 has-focus:border-sky-600 dark:has-focus:border-sky-600/50 rounded-2xl overflow-hidden">
            <div className='flex w-full pl-4 pr-2.5 bg-gray-700/10 dark:bg-gray-400/10 rounded-lg has-focus:bg-sky-600/15 has-focus:outline-1 has-focus:outline-sky-500/30' onClick={() => searchInput.current.focus()}>
                <input className="w-full focus:outline-0 text-xl placeholder:text-gray-500 placeholder:italic" placeholder="Choose a Pokémon" role="combobox" type="text" aria-expanded="false" aria-autocomplete="list" data-headlessui-state="autofocus" data-autofocus="" ref={searchInput} onChange={(e) => setSearchValue(e.target.value)} value={searchValue} />
                <button className='block size-8 ml-4 my-2 text-gray-600 dark:text-gray-400 cursor-pointer disabled:cursor-auto not-disabled:hover:text-sky-600/80'>
                    <svg fill="currentColor" stroke="currentColor" viewBox="0 0 122.88 122.88" fillRule='evenodd'><path d="M42.31,0A42.31,42.31,0,0,1,77.52,65.75l8.56,8.56.09-.09a5.38,5.38,0,0,1,7.59,0l27.55,27.55a5.39,5.39,0,0,1,0,7.59l-12,12a5.39,5.39,0,0,1-7.59,0L74.22,93.76a5.38,5.38,0,0,1,0-7.59l.09-.09-8.56-8.56A42.31,42.31,0,1,1,42.31,0Zm0,9.5A32.81,32.81,0,1,1,9.5,42.31,32.81,32.81,0,0,1,42.31,9.5Z" /></svg>
                </button>

            </div>
            <ol className='w-full max-h-107 text-lg mt-2 space-y-1 cursor-pointer overflow-auto'>
                <li className='hover:bg-sky-400/10 hover:text-sky-900 dark:hover:text-sky-100 py-2 px-4 rounded-lg'>
                    <span className='font-semibold mr-2'>#1</span> Bulbasuar
                </li>
                <li className='hover:bg-sky-400/10 hover:text-sky-900 dark:hover:text-sky-100 py-2 px-4 rounded-lg'>
                    <span className='font-semibold mr-2'>#2</span> Ivysuar
                </li>
                <li className='hover:bg-sky-400/10 hover:text-sky-900 dark:hover:text-sky-100 py-2 px-4 rounded-lg'>
                    <span className='font-semibold mr-2'>#3</span> Venasuar
                </li>
            </ol>
        </div>
    </div>)
}

export default SearchBar