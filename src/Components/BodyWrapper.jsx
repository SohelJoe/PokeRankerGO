import { useLocation, Link } from 'react-router'

import { AiTwotoneHome } from "react-icons/ai";
import { IoIosArrowForward } from "react-icons/io";

// Functions
import { getMonName } from '../utils/monFunctions';

const BodyWrapper = ({ children }) => {
    const location = useLocation();

    const pathnames = location.pathname.split('/').filter((x) => x);

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
                            <span className="leading-none pb-1 font-semibold capitalize">
                                PokeRankerGO
                            </span>
                        </div>
                    </li>
                    <li>
                        <div className="flex items-center space-x-4">
                            <IoIosArrowForward className="block size-4" />
                            {pathnames.length > 2 ? <Link to={pathnames.slice(0, 2).join('/')} className="leading-none pb-1 font-semibold capitalize hover:text-gray-800 dark:hover:text-gray-300">
                                {pathnames[1]}
                            </Link> : <span className="leading-none pb-1 font-semibold capitalize">{pathnames[1]}</span>}
                        </div>
                    </li>
                    {pathnames[2] && <li>
                        <div className="flex items-center space-x-4">
                            <IoIosArrowForward className="block size-4" />
                            <span className="leading-none pb-1 font-semibold capitalize">{getMonName(pathnames[2])}</span>
                        </div>
                    </li>}
                </ol>
            </nav>

            {children}
        </main>
    )
}

export default BodyWrapper