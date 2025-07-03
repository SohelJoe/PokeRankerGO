import React from 'react'

// Contexts
import ThemeProvider from './Contexts/ThemeContext';
import MonIVProvider from './Contexts/MonIVContext';
import MonDexProvider from './Contexts/MonDexContext';
import NavigationProvider from './Contexts/NavigationContext';



// Components
import Navbar from "./Components/Navbar";
import PageNavigator from './Components/PageNavigator';


function App() {
    return (
        <ThemeProvider>
            <NavigationProvider>
                <MonIVProvider>
                    <MonDexProvider>
                        <Navbar />
                        <PageNavigator />
                    </MonDexProvider>
                </MonIVProvider>
            </NavigationProvider>
        </ThemeProvider>
    )
}

export default App
