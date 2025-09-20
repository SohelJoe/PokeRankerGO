import { Routes, Route, Navigate, Outlet } from "react-router";

// Contexts
import ThemeProvider from './Contexts/ThemeContext';

// Components
import Navbar from "./Components/Navbar";
import SearchBar from "./Components/SearchBar";
// Pages
import Ranking from './Pages/Ranking';
import Pokedex from './Pages/Pokedex';
import UpdateMon from './Pages/UpdateMon';
import Error404 from './Pages/Error404';
import BodyWrapper from "./Components/BodyWrapper";


function App() {
    return (
        <ThemeProvider>
            <Navbar />
            <BodyWrapper>

                <Routes>
                    <Route index element={<Navigate replace to="ranking" />} />
                    <Route exact path="ranking" element={<><SearchBar /><Outlet /></>}>
                        <Route path=":monKey" element={<Ranking />} />
                    </Route>
                    <Route exact path="pokedex" >
                        <Route index element={<Pokedex />} />
                        <Route path=":monKey" element={<UpdateMon />} />
                    </Route>
                    <Route path="*" element={<Error404 />} />
                </Routes>

            </BodyWrapper>
        </ThemeProvider >
    )
}

export default App
