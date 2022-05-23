import {
  AppBar,
  Typography,
  Link,
  Box,
  Toolbar,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Drawer,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import React from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import useStyles from '../../styles/styles';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import PersonIcon from '@mui/icons-material/Person';
import BedtimeIcon from '@mui/icons-material/Bedtime';
import LightModeIcon from '@mui/icons-material/LightMode';
import StyledInputBase from './Search/StyledInputBase';
import Search from './Search';
import SearchIconWrapper from './Search/SearchIconWrapper';
import ElevationScroll from './ElevationScroll';

const Header = (props) => {
  const classes = useStyles();
  const links = [
    { id: 1, route: 'Home', url: '#' },
    { id: 2, route: 'Page', url: '#' },
    { id: 3, route: 'Explore', url: '#' },
    { id: 4, route: 'Resources', url: '#' },
    { id: 5, route: 'Create', url: '#' },
  ];

  const [state, setState] = React.useState({
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {links.map((link) => (
          <ListItem button key={link.id}>
            <ListItemText primary={link.route} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box sx={{ marginBottom: '70px' }}>
      <ElevationScroll {...props}>
        <AppBar sx={{backgroundColor:'hsla(0,0%,100%,.5)'}}>
          <Toolbar className={classes.toolBar}>
            <Box sx={{display:'flex'}}>
              <Link href="#" underline="none">
                <Box component="img" className={classes.logo}
                  alt="Market Place"
                  src={`images/logo${theme.palette.mode == 'dark' ? '_white' : ''}.png`}
                />
              </Link>
              {!matches ? (<Search>
                  <SearchIconWrapper>
                    <SearchIcon />
                  </SearchIconWrapper>
                  <StyledInputBase
                    placeholder="Search"
                    inputProps={{ 'aria-label': 'search' }}
                  />
              </Search>): ""}
            </Box>
            {matches ? (
              <Box>
              <IconButton
                size="large"
                edge="end"
                color="inherit"
                aria-label="menu"
                onClick={toggleDrawer('right', true)}
              >
                <MenuIcon className={classes.menuIcon} fontSize="" />
              </IconButton>

              <Drawer
                anchor="right"
                open={state['right']}
                onClose={toggleDrawer('right', false)}
              >
                <Search sx={{margin: "4% !important", width: "92%"}}>
                  <SearchIconWrapper>
                    <SearchIcon />
                  </SearchIconWrapper>
                  <StyledInputBase
                    placeholder="Search"
                    inputProps={{ 'aria-label': 'search' }}
                  />
              </Search>
                {list('right')}
              </Drawer>
            </Box>
            ): 
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexGrow: '0.1',
              }}
            >
              {links.map((link) => (
                <Link href={link.url} target="_blank" underline="none" key={link.id}>
                  <Typography className={classes.link}>{link.route}</Typography>
                </Link>
              ))}
              <IconButton className={classes.menuIcon}>
                <AccountBalanceWalletIcon />
              </IconButton>
              <IconButton className={classes.menuIcon}>
                <PersonIcon />
              </IconButton>
              <IconButton className={classes.menuIcon} onClick={() => props.setTheme()}>
                {theme.palette.mode == 'dark' ? <LightModeIcon /> : <BedtimeIcon />}
              </IconButton>
            </Box>}
          </Toolbar>
        </AppBar>
      </ElevationScroll>
    </Box>
  );
};

export default Header;