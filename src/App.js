import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/home'
import Item from './pages/item'
import CollectionsPage from './pages/collectionspage'
import './App.css';
import { StyledEngineProvider } from '@mui/material';
import Header from "./components/Header"
import Footer from "./components/Footer"
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from "react"

function App() {
  const [darkMode, setDarkMode] = useState(window.localStorage.getItem('darkMode') == 'true');
  const theme = createTheme({
    typography: {
      "fontFamily": `CalSans-SemiBold, sans-serif`,
      button: {
        textTransform: 'none'
      },
     },
    palette: {
      mode: darkMode ? "dark" : "light"
    }
  })

  const toggleTheme = () => {
    window.localStorage.setItem('darkMode', !darkMode)
    setDarkMode(!darkMode)
  }

  return (
    <Router>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Header setTheme={toggleTheme} />
          <Switch>
            <Route exact path='/'>
              <Home/>
            </Route>
            <Route exact path='/item'>
              <Item />
            </Route>
            <Route exact path='/collections'>
              <CollectionsPage />
            </Route>
          </Switch>
        <Footer />
      </ThemeProvider>
      </StyledEngineProvider>
    </Router>
  );
}

export default App;
