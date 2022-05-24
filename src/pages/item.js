import Header from "../components/Header"
import Footer from "../components/Footer"
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from "react"
import ItemHero from "../screens/ItemHero"
import ItemCollection from "../screens/ItemCollection"

export default function Item(){
  const [darkMode, setDarkMode] = useState(window.localStorage.getItem('darkMode') == 'true');
  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light"
    }
  })

  const toggleTheme = () => {
    window.localStorage.setItem('darkMode', !darkMode)
    setDarkMode(!darkMode)
  }
  
    return (
    <>
      <ItemHero />
      <ItemCollection />
    </>
  );
}