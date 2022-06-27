import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { StyledEngineProvider } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { useState } from "react"
import './App.css';
import Header from "./components/Header"
import Footer from "./components/Footer"
import Home from './pages/home'
import Item from './pages/item'
import CollectionsPage from './pages/collectionspage'
import CollectionPage from './pages/collectionpage'
import ActivityPage from './pages/activitypage'
import ProfilePage from './pages/profilepage';
import ContactPage from './pages/contactpage';
import WalletPage from './pages/walletpage';
import NewsletterPage from './pages/newsletterpage';
import BlogPage from './pages/blogpage';
import SinglepostPage from './pages/singlepostpage';
import CreatePage from './pages/createpage';
import AccountPage from './pages/AccountPage';
import { WalletProvider } from './providers/WalletProvider';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
      mode: darkMode ? "dark" : "light",
      primary: {
        main: '#8258ff'
      },
      background: {
        default: darkMode ? "rgb(13, 16, 45)" : '#fff'
      }
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
          <WalletProvider>
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
              <Route exact path='/profile'>
                <ProfilePage />
              </Route>
              <Route exact path='/contact'>
                <ContactPage />
              </Route>
              <Route exact path='/wallet'>
                <WalletPage />
              </Route>
              <Route exact path='/newsletter'>
                <NewsletterPage />
              </Route>
              <Route exact path='/blog'>
                <BlogPage />
              </Route>
              <Route exact path='/singlepost/:id'>
                <SinglepostPage />
              </Route>
              <Route exact path='/create'>
                <CreatePage />
              </Route>
              <Route exact path='/account/:address'>
                <AccountPage />
              </Route>
            </Switch>
          </WalletProvider>
          <Footer />
          <ToastContainer position="top-center" autoClose={5000} />
        </ThemeProvider>
      </StyledEngineProvider>
    </Router>
  );
}

export default App;
