import Header from "../components/Header"
import Footer from "../components/Footer"
import Hero from "../screens/Hero"
import Hotbids from "../screens/Hotbids"
import Collections from "../screens/Collections"
import Category from "../screens/Category";
import SellItems from "../screens/SellItems"
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from "react"
import { WindowSharp } from "@mui/icons-material"

function Home(){
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
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header setTheme={toggleTheme} />
      <Hero />
      <Hotbids />
      <Collections/>
      <Category />
      <SellItems />
      <Footer />
    </ThemeProvider>
    </>
  );
}

export default Home;