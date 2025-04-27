import React, { useContext } from 'react'

import { AiTwotoneHome } from "react-icons/ai";
import { IoIosArrowForward } from "react-icons/io";

// Contexts
import { MonIVContext } from '../Contexts/MonIVContext';
import { NavigationContext } from '../Contexts/NavigationContext';
// Pages
import Ranking from '../Pages/Ranking';
import Pokemon from '../Pages/Pokemon';
import Error404 from '../Pages/Error404';

const PageNavigator = () => {
    const { page } = useContext(NavigationContext);
    const { selectedMon } = useContext(MonIVContext);


    return (
        <main className="relative mx-auto max-w-7xl px-4 pt-3 pb-6 sm:px-6 lg:px-8">
            <nav aria-label="Breadcrumb" className="mb-2 xs:mb-4 sm:mb-6">
                <ol role="list" className="flex items-center space-x-4 text-gray-500 text-sm xs:text-base">
                    <li>
                        <div className="flex items-center">
                            <AiTwotoneHome className="block size-5" />
                            <span className="hidden">Home</span>
                        </div>
                    </li>
                    <li>
                        <div className="flex items-center space-x-4">
                            <IoIosArrowForward className="block size-4" />
                            <span className="leading-none pb-1 font-semibold capitalize">{page}</span>
                        </div>
                    </li>
                    {page == 'ranking' && selectedMon && <li>
                        <div className="flex items-center space-x-4">
                            <IoIosArrowForward className="block size-4" />
                            <span className="leading-none pb-1 font-semibold capitalize">{selectedMon[1]}</span>
                        </div>
                    </li>}
                </ol>
            </nav>

            {page == 'ranking' ? <Ranking /> :
                page == 'pokémon' ? <Pokemon /> :
                    <Error404 />}
        </main>
    )
}

export default PageNavigator