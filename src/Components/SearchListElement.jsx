import React from 'react'

import ImageBox from './ImageBox';


const typings = ['normal', 'fighting', 'flying', 'poison', 'ground', 'rock', 'bug', 'ghost', 'steel', 'fire', 'water', 'grass', 'electric', 'psychic', 'ice', 'dragon', 'dark', 'fairy']

const SearchListElement = ({ monKey, monData, onClick }) => {
    const [name, id, form, type1, type2] = monData;

    return <li className='flex relative first:mt-2 items-center gap-2 text-xl font-semibold hover:bg-sky-400/10 hover:text-sky-900 dark:hover:text-sky-100 py-2 px-4 rounded-lg' onClick={() => onClick(monKey, monData)}>
        <ImageBox id={id} form={form} name={name} megaClassName="h-14 w-14 opacity-40" className="h-14 w-full max-w-14" w="64" />
        <p>{name}</p>
        <div className='flex ml-auto justify-center align-middle items-center gap-1'>
            <span className='mr-2'>#{('000' + id).slice(-3)}</span>
            {type1 && <img className='w-6' src={`https://db.pokemongohub.net/_next/image?url=%2Fimages%2Ficons%2Fico_${typings.indexOf(type1)}_${type1}.webp&w=32&q=75`} alt={type1} />}
            {type2 && <img className='w-6' src={`https://db.pokemongohub.net/_next/image?url=%2Fimages%2Ficons%2Fico_${typings.indexOf(type2)}_${type2}.webp&w=32&q=75`} alt={type2} />}
        </div>
    </li>
}

export default SearchListElement