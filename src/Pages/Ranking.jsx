import React from 'react'
// Components
import SearchBar from '../Components/SearchBar'
import RankingWindow from '../Components/RankingWindow'




const Ranking = () => {
    return (<>
        <SearchBar className='relative mx-auto' />
        <RankingWindow className='relative mx-auto mt-5' />
    </>)
}

export default Ranking