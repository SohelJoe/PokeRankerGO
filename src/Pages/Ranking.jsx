import React from 'react'
// Components
import SearchBar from '../Components/SearchBar'
import RankingWindow from '../Components/RankingWindow'




const Ranking = () => {
    return (<>
        <SearchBar className='absolute w-full left-[50%] transform-[translateX(-50%)] z-99' />
        <RankingWindow className='relative mx-auto mt-28' />
    </>)
}

export default Ranking