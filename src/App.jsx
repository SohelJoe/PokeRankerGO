import { Routes, Route, Navigate, Outlet } from "react-router";

// Contexts
import ThemeProvider from './Contexts/ThemeContext';
import MonDexProvider from './Contexts/MonDexContext';

// Components
import Navbar from "./Components/Navbar";
import SearchBar from "./Components/SearchBar";
// Pages
import Ranking from './Pages/Ranking';
import Pokemon from './Pages/Pokemon';
import Error404 from './Pages/Error404';
import BodyWrapper from "./Components/BodyWrapper";


function App() {
    return (
        <ThemeProvider>
            <MonDexProvider>
                <Navbar />
                <BodyWrapper>

                    <Routes>
                        <Route index element={<Navigate replace to="ranking" />} />
                        <Route exact path="ranking" element={<><SearchBar /><Outlet /></>}>
                            <Route path=":monKey" element={<Ranking />} />
                        </Route>
                        <Route exact path="pokedex" element={<Pokemon />} />
                        <Route path="*" element={<Error404 />} />
                    </Routes>

                </BodyWrapper>
            </MonDexProvider>
        </ThemeProvider >
    )
}

export default App
