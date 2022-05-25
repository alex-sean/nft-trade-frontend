import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/home'
import Item from './pages/item'
import CollectionsPage from './pages/collectionspage'
import CollectionPage from './pages/collectionpage'
import ActivityPage from './pages/activitypage'
import './App.css';
import { StyledEngineProvider } from '@mui/material';
import Header from "./components/Header"
import Footer from "./components/Footer"
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from "react"

function App() {
  const [darkMode, setDarkMode] = useState(window.localStorage.getItem('darkMode') === 'true');
  const theme = createTheme({
    typography: {
      fontFamily: `CalSans-SemiBold, sans-serif`,
      h4: {
        fontWeight: '700',
        fontSize: '2.25rem',
      },
      h6: {
        fontWeight: '700',
        fontSize: '1rem',
      },
      body2: {
        color: 'rgb(90, 93, 121)'
      },
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
            <Route exact path='/collection'>
              <CollectionPage />
            </Route>
            <Route exact path='/activity'>
              <ActivityPage />
            </Route>
          </Switch>
        <Footer />
      </ThemeProvider>
      </StyledEngineProvider>
    </Router>
  );
}

export default App;
