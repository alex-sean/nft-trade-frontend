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
  ListItemIcon,
  Divider,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import React from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import useStyles from '../../styles/styles';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import BedtimeIcon from '@mui/icons-material/Bedtime';
import LightModeIcon from '@mui/icons-material/LightMode';
import StyledInputBase from './Search/StyledInputBase';
import Search from './Search';
import SearchIconWrapper from './Search/SearchIconWrapper';
import ElevationScroll from './ElevationScroll';
import PagesMenu from './PagesMenu';
import ResourceMenu from './ResourceMenu';
import ExploreMenu from './ExploreMenu';
import AccountMenu from './AccountMenu';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AppsIcon from '@mui/icons-material/Apps';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import PersonIcon from '@mui/icons-material/Person';
import PrimaryButton from "../../components/Button/PrimaryButton";
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import RedditIcon from '@mui/icons-material/Reddit';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { useWalletContext } from '../../hooks/useWalletContext';

const Header = (props) => {
  const classes = useStyles();
  const [state, setState] = React.useState({
    right: false,
  });
  const { account } = useWalletContext();

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
    >
      <List>
        <Link href="/" underline='none'>
          <ListItem button key={1}>
            <ListItemText className={classes.mobileLink} primary='Home' />
          </ListItem>
        </Link>
        <Accordion sx={{boxShadow: 'none'}}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className={classes.mobileLink}>Pages</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Link href="/item" underline='none'>
              <Typography className={classes.mobileLink}>Item Details</Typography>
            </Link>
            <Link href="/activity" underline='none'>
              <Typography className={classes.mobileLink}>Activity</Typography>
            </Link>
            <Link href="/profile" underline='none'>
              <Typography className={classes.mobileLink}>Edit Profile</Typography>
            </Link>
            <Link href="/contact" underline='none'>
              <Typography className={classes.mobileLink}>Contact</Typography>
            </Link>
            <Link href="/wallet" underline='none'>
              <Typography className={classes.mobileLink}>Wallet</Typography>
            </Link>
          </AccordionDetails>
        </Accordion>
        <Accordion sx={{boxShadow: 'none'}}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className={classes.mobileLink}>Explopre</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Link href="/collections" underline="none" key="1" display='flex'>
              <ListItemIcon>
                <AppsIcon fontSize="small" />
              </ListItemIcon>
              <Typography className={classes.mobileLink}>All NFTs</Typography>
            </Link>
            <Link href="/collection" underline="none" key="2" display='flex'>
              <ListItemIcon>
                <LibraryMusicIcon sx={{fill:'#10b981'}} fontSize="small" />
              </ListItemIcon>
              <Typography className={classes.mobileLink}>Art</Typography>
            </Link>
          </AccordionDetails>
        </Accordion>
        <Accordion sx={{boxShadow: 'none'}}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className={classes.mobileLink}>Resources</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Link href="/blog" underline='none'>
              <Typography className={classes.mobileLink}>Blog</Typography>
            </Link>
            <Link href="/singlepost" underline='none'>
              <Typography className={classes.mobileLink}>Single Post</Typography>
            </Link>
            <Link href="/newsletter" underline='none'>
              <Typography className={classes.mobileLink}>Newsletter</Typography>
            </Link>
          </AccordionDetails>
        </Accordion>
        <Link href="/newsletter" underline='none'>
          <ListItem button key={1}>
            <ListItemText className={classes.mobileLink} primary='Create' />
          </ListItem>
        </Link>
        <Box display='flex' justifyContent='center'>
          <PrimaryButton text="Connect Wallet"></PrimaryButton>
        </Box>
        <Divider />
        <Box p={2} display='flex' justifyContent='center' color={'gray'}>
          <FacebookIcon className={classes.mr16}/>
          <TwitterIcon className={classes.mr16} />
          <RedditIcon className={classes.mr16} />
          <InstagramIcon className={classes.mr16} />
          <YouTubeIcon className={classes.mr16} />
        </Box>
      </List>
    </Box>
  );

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box sx={{ marginBottom: '90px' }}>
      <ElevationScroll {...props}>
        <AppBar sx={{backgroundColor:'hsla(0,0%,100%,.5)', backdropFilter: 'blur(8px)'}}>
          <Toolbar className={classes.toolBar} sx={{padding: `${matches ? '1rem !important' : ''}`}}>
            <Box sx={{display:'flex'}}>
              <Link href="/" underline="none" mr={8}>
                <Box component="img" className={classes.logo}
                  alt="Market Place"
                  src={`images/logo${theme.palette.mode === 'dark' ? '_white' : ''}.png`}
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
              </Search>): ''}
            </Box>
            {matches ? (
            <Box display='flex' alignItems={'center'} pr={1}>
              <Link mr={1} href="/profile" underline='none'>
                <IconButton className={classes.menuIcon}>
                  <PersonIcon />
                </IconButton>
              </Link>
              <IconButton className={classes.menuIcon} onClick={() => props.setTheme()}>
                {theme.palette.mode === 'dark' ? <LightModeIcon /> : <BedtimeIcon />}
              </IconButton>
              <IconButton
                size="large"
                edge="end"
                color="inherit"
                aria-label="menu"
                onClick={toggleDrawer('right', true)}
              >
                <MenuIcon sx={{borderRadius: '20px', padding: '8px'}} className={classes.menuIcon} fontSize="" />
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
              <Link href="/" underline="none" key="1">
                <Typography className={classes.link}>Home</Typography>
              </Link>
              <PagesMenu />
              <ExploreMenu />
              <ResourceMenu />
              <Link href="/create" underline="none" key="1">
                <Typography className={classes.link}>Create</Typography>
              </Link>
              {
                account === '' ?
                  <Link href="/wallet" underline="none" key="1">
                    <IconButton className={classes.menuIcon}>
                      <AccountBalanceWalletIcon />
                    </IconButton>
                  </Link>:
                  <AccountMenu />
              }
              <IconButton className={classes.menuIcon} onClick={() => props.setTheme()}>
                {theme.palette.mode === 'dark' ? <LightModeIcon /> : <BedtimeIcon />}
              </IconButton>
            </Box>}
          </Toolbar>
        </AppBar>
      </ElevationScroll>
    </Box>
  );
};

export default Header;