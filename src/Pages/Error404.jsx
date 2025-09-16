import { Link } from "react-router";

const Error404 = () => {

    return (
        <div className="text-center">
            <p className="text-4xl font-semibold text-sky-700 mt-[10vw] sm:text-5xl">404</p>
            <h1 className="mt-4 text-5xl font-semibold tracking-tight text-balance text-gray-900 dark:text-gray-100/90 sm:text-7xl">Page not found</h1>
            <p className="mt-6 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">Sorry, we couldn’t find the page you’re looking for.</p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
                <Link className="cursor-pointer rounded-md bg-sky-700 dark:bg-sky-600/80 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-sky-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600" replace to="/ranking" >
                    Go back home
                </Link>
            </div>
        </div>
    )
}

export default Error404