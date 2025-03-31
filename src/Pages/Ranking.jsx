import React from 'react'
// Components
import SearchBar from '../Components/SearchBar'
import RankingWindow from '../Components/RankingWindow'

const Ranking = () => {
    return (<>
        <RankingWindow className='relative mx-auto mb-10' />
        <SearchBar className='relative mx-auto' />
    </>)
}

export default Ranking