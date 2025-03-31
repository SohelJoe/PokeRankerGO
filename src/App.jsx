import React from 'react'

// Contexts
import ThemeProvider from './Contexts/ThemeContext';
import NavigationProvider from './Contexts/NavigationContext';


// Components
import Navbar from "./Components/Navbar";
import PageNavigator from './Components/PageNavigator';


function App() {
    return (
        <ThemeProvider>
            <NavigationProvider>
                <Navbar />
                <PageNavigator />
            </NavigationProvider>
        </ThemeProvider>
    )
}

export default App
