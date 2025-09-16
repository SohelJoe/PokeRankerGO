import { useState, useEffect, createContext } from "react";

export const NavigationContext = createContext();

const NavigationProvider = ({ children }) => {
    const pageIndex = {
        "/": {
            component: null,
            breadCrumb: "Home",
            redirect: {
                page: "ranking",
                url: "/ranking"
            }
        },
        ranking: {
            component: "ranking",
            breadCrumb: "Ranking",
            redirect: null,
        },
        pokedex: {
            component: "pokedex",
            breadCrumb: "Pokédex",
            redirect: null
        },
        update: {
            component: "update",
            breadCrumb: "Update",
            redirect: null
        },
        error: {
            component: "error404",
            breadCrumb: "Error-404",
            redirect: null
        }
    }


    const [page, setPage] = useState(null);


    const changePage = (pageKey) => {
        const newPage = pageIndex[pageKey];

        if (newPage) {
            console.log("Changing page to", newPage.component);
            setPage(newPage);
            window.history.pushState({ page: newPage.component }, '', `/${pageKey}`);
        } else {
            console.error("Page not found:", pageKey);
            setPage(pageIndex.error);
        }
    }

    const handlePageChange = () => {
        console.log("Page URL Change to", window.location.pathname);

        const pageChain = window.location.pathname.split('/');
        const lastPageData = pageIndex[pageChain.at(-1) !== '' ? pageChain.at(-1) : '/'];

        if (lastPageData) {
            if (lastPageData.redirect) {
                console.log('Redirect to', lastPageData.redirect.page, 'with URL', lastPageData.redirect.url);

                window.history.pushState({ page: lastPageData.redirect.page }, '', lastPageData.redirect.url);
            } else {
                setPage(lastPageData)
            }
        } else {
            setPage(pageIndex.error)
        }
    }


    useEffect(() => {
        handlePageChange();
    }, [])


    window.onpopstate = handlePageChange



    return (
        <NavigationContext.Provider value={{ pageIndex, page, changePage }}>
            {children}
        </NavigationContext.Provider>
    )
}

export default NavigationProvider;