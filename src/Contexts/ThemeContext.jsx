import { useEffect, useState, createContext } from "react";

export const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
    const [darkMode, setDarkMode] = useState(false);

    const toggleTheme = () => {
        const theme = localStorage.getItem('theme');

        if (theme && theme === 'light') {
            setDarkMode(true)
            document.documentElement.classList.add('dark')
            localStorage.setItem('theme', 'dark')
        } else {
            setDarkMode(false)
            document.documentElement.removeAttribute('class')
            localStorage.setItem('theme', 'light')
        }
    }

    useEffect(() => {
        const theme = localStorage.getItem('theme');
        if (theme) {
            if (theme === 'dark') {
                setDarkMode(true)
                document.documentElement.classList.add('dark')
            }
        } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            setDarkMode(true)
            document.documentElement.classList.add('dark')
        }
    }, [])

    return (
        <ThemeContext.Provider value={{ toggleTheme, darkMode }}>
            {children}
        </ThemeContext.Provider>
    )
}

export default ThemeProvider;