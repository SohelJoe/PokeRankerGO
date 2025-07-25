import ImageBox from './ImageBox'

const MonRankingBox = ({ family, monFamily, rankings, level, isShadow = false }) => {

    return family.map(monKey => <div key={monKey} className="flex items-stretch w-full gap-1 mt-1.75 p-1 border-1 border-sky-600 dark:border-sky-800 rounded-lg bg-sky-50 dark:bg-sky-950/60 drop-shadow-sm">
        <div className="relative z-0 w-full max-w-16 2xs:max-w-18 sm:max-w-22 lg:max-w-25 text-center text-sky-700 dark:text-sky-50 sm:px-2 lg:px-4">
            <ImageBox id={monFamily[monKey][1]} form={monFamily[monKey][2]} name={monFamily[monKey][0]} megaClassName="h-14 w-14 opacity-30 left-[50%] transform-[translateX(-50%)]" shadowClassName="w-full max-w-3/4 left-[50%] -translate-x-[50%] opacity-50 dark:opacity-40 bottom-[10%]" imgClassName="h-14 w-full max-w-14 mx-auto" isShadow={isShadow && monKey == family[0]} w="64" />
            <p className='font-semibold text-sm leading-none mt-0.5'>{monFamily[monKey][0]}</p>
        </div>
        <div className={`flex flex-col justify-center w-full max-w-4/12 text-center font-semibold p-0.75 rounded-md border-2 ${(!rankings[monKey].GreatLeague || rankings[monKey].GreatLeague.L < level) ? 'opacity-50 bg-red-300/40 dark:bg-red-800/40 border-red-800/80 dark:border-red-600/40' : rankings[monKey].GreatLeague.rank < 151 ? 'bg-green-300/40 dark:bg-green-700/45 border-green-600 dark:border-green-700' : 'bg-sky-200/40 dark:bg-sky-800/40 border-sky-600 dark:border-sky-800'}`}>
            <h6 className='xs:text-lg uppercase text-sky-700/90 dark:text-sky-50/90 leading-[1] my-0.5 pb-0.5'>Great League</h6>
            <h2 className='text-sm xs:text-md text-sky-700/60 font-normal dark:text-sky-50/60'>Rank. <span className='text-xl xs:text-2xl font-semibold uppercase text-sky-700 dark:text-sky-50 leading-none'>{rankings[monKey].GreatLeague ? rankings[monKey].GreatLeague.rank : '-'}</span></h2>
            <p className='flex gap-2 justify-center text-xs xs:text-sm mb-0.5 text-gray-600/80 dark:text-gray-400/70'><span>CP {rankings[monKey].GreatLeague ? rankings[monKey].GreatLeague.CP : '-'}</span> <span>Lvl. {rankings[monKey].GreatLeague ? rankings[monKey].GreatLeague.L : '-'}</span></p>
        </div>
        <div className={`flex flex-col justify-center w-full max-w-4/12 text-center font-semibold p-0.75 rounded-md border-2 ${(!rankings[monKey].UltraLeague || rankings[monKey].UltraLeague.L < level) ? 'opacity-50 bg-red-300/40 dark:bg-red-800/40 border-red-800/80 dark:border-red-600/40' : rankings[monKey].UltraLeague.rank < 151 ? 'bg-green-300/40 dark:bg-green-700/45 border-green-600 dark:border-green-700' : 'bg-sky-200/40 dark:bg-sky-800/40 border-sky-600 dark:border-sky-800'}`}>
            <h6 className='xs:text-lg uppercase text-sky-700/90 dark:text-sky-50/90 leading-[1] my-0.5 pb-0.5'>Ultra League</h6>
            <h2 className='text-sm xs:text-md text-sky-700/60 font-normal dark:text-sky-50/60'>Rank. <span className='text-xl xs:text-2xl font-semibold uppercase text-sky-700 dark:text-sky-50 leading-none'>{rankings[monKey].UltraLeague ? rankings[monKey].UltraLeague.rank : '-'}</span></h2>
            <p className='flex gap-2 justify-center text-xs xs:text-sm mb-0.5 text-gray-600/80 dark:text-gray-400/70'><span>CP {rankings[monKey].UltraLeague ? rankings[monKey].UltraLeague.CP : '-'}</span> <span>Lvl. {rankings[monKey].UltraLeague ? rankings[monKey].UltraLeague.L : '-'}</span></p>
        </div>
        <div className={`flex flex-col justify-center w-full max-w-4/12 text-center font-semibold p-0.75 rounded-md border-2 ${(!rankings[monKey].MasterLeague || rankings[monKey].MasterLeague.L < level) ? 'opacity-50 bg-red-300/40 dark:bg-red-800/40 border-red-800/80 dark:border-red-600/40' : rankings[monKey].MasterLeague.rank < 151 ? 'bg-green-300/40 dark:bg-green-700/45 border-green-600 dark:border-green-700' : 'bg-sky-200/40 dark:bg-sky-800/40 border-sky-600 dark:border-sky-800'}`}>
            <h6 className='xs:text-lg uppercase text-sky-700/90 dark:text-sky-50/90 leading-[1] my-0.5 pb-0.5'>Master League</h6>
            <h2 className='text-sm xs:text-md text-sky-700/60 font-normal dark:text-sky-50/60'>Rank. <span className='text-xl xs:text-2xl font-semibold uppercase text-sky-700 dark:text-sky-50 leading-none'>{rankings[monKey].MasterLeague ? rankings[monKey].MasterLeague.rank : '-'}</span></h2>
            <p className='flex gap-2 justify-center text-xs xs:text-sm mb-0.5 text-gray-600/80 dark:text-gray-400/70'><span>CP {rankings[monKey].MasterLeague ? rankings[monKey].MasterLeague.CP : '-'}</span> <span>Lvl. {rankings[monKey].MasterLeague ? rankings[monKey].MasterLeague.L : '-'}</span></p>
        </div>
    </div>)
}

export default MonRankingBox