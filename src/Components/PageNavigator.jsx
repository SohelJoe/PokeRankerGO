import React, { useContext } from 'react'

// Contexts
import { NavigationContext } from '../Contexts/NavigationContext';
// Pages
import Ranking from '../Pages/Ranking';
import Pokemon from '../Pages/Pokemon';
import Error404 from '../Pages/Error404';

const PageNavigator = () => {
    const { page, breadCrumps } = useContext(NavigationContext);

    return (
        <main className="mx-auto max-w-7xl px-4 pt-3 pb-6 sm:px-6 lg:px-8">
            <nav aria-label="Breadcrumb" className="mb-6">
                <ol role="list" className="flex items-center space-x-4 text-gray-500">
                    <li>
                        <div className="flex items-center">
                            <svg className="block size-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon"><path fillRule="evenodd" d="M9.293 2.293a1 1 0 0 1 1.414 0l7 7A1 1 0 0 1 17 11h-1v6a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-6H3a1 1 0 0 1-.707-1.707l7-7Z" clipRule="evenodd"></path></svg>
                            <span className="hidden">Home</span>
                        </div>
                    </li>
                    {breadCrumps.map((breadCrump, i) => (
                        <li key={i}>
                            <div className="flex items-center space-x-4">
                                <svg className="block size-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon"><path fillRule="evenodd" d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd"></path></svg>
                                <span className="leading-none pb-1 font-semibold capitalize">{breadCrump}</span>
                            </div>
                        </li>
                    ))}
                </ol>
            </nav>

            {page == 'ranking' ? <Ranking /> :
                page == 'pokémon' ? <Pokemon /> :
                    <Error404 />}
        </main>
    )
}

export default PageNavigator