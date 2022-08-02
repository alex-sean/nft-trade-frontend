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
import React, { useState } from 'react';
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
import PersonIcon from '@mui/icons-material/Person';
import PrimaryButton from "../../components/Button/PrimaryButton";
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import RedditIcon from '@mui/icons-material/Reddit';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { useWalletContext } from '../../hooks/useWalletContext';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import LinkedCameraIcon from '@mui/icons-material/LinkedCamera';
import LanguageIcon from '@mui/icons-material/Language';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import FormatShapesIcon from '@mui/icons-material/FormatShapes';
import PaletteIcon from '@mui/icons-material/Palette';

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
        {/* <Accordion sx={{boxShadow: 'none'}}>
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
        </Accordion> */}
        <Accordion sx={{boxShadow: 'none'}} className={classes.mobileNav}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className={classes.mobileLink}>Explopre</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Link href="/collections/0" py={1} underline="none" key="1" alignItems='center' display='flex'>
              <ListItemIcon>
                <AppsIcon fontSize="large" sx={{padding: '8px', background:"rgb(245 248 250)", marginRight: '16px', borderRadius: '40px', fill:'#131740'}}/>
              </ListItemIcon>
              <Typography className={classes.mobileLink}>All NFTs</Typography>
            </Link>
            <Link href="/collections/1" py={1} underline="none" key="2" alignItems='center' display='flex'>
              <ListItemIcon>
                <PaletteIcon fontSize="large" sx={{padding: '8px', background:"rgb(228 252 244)", marginRight: '16px', borderRadius: '40px', fill:'#10b981'}} />
              </ListItemIcon>
              <Typography className={classes.mobileLink}>Art</Typography>
            </Link>
            <Link href="/collections/2" py={1} underline="none" key="3" display='flex' alignItems='center'>
              <ListItemIcon>
                <CardGiftcardIcon fontSize="large" sx={{padding: '8px', background:"rgb(253 247 238)", marginRight: '16px', borderRadius: '40px', fill:'#feb240'}} />
              </ListItemIcon>
              <Typography className={classes.mobileLink}>COLLECTIBLE</Typography>
            </Link>
            <Link href="/collections/3" py={1} underline="none" key="4" display='flex' alignItems='center'>
              <ListItemIcon>
                <FormatShapesIcon fontSize="large"  sx={{padding: '8px', background:"rgb(242 238 255)", marginRight: '16px', marginRight: '16px', borderRadius: '40px', fill:'#8358ff'}} />
              </ListItemIcon>
              <Typography className={classes.mobileLink}>DOMAIN</Typography>
            </Link>
            <Link href="/collections/4" py={1} underline="none" key="5" display='flex' alignItems='center'>
              <ListItemIcon>
                <MusicNoteIcon fontSize="large" sx={{padding: '8px', background:"rgb(255 238 250)", marginRight: '16px', borderRadius: '40px', fill:'#f35bc7'}} />
              </ListItemIcon>
              <Typography className={classes.mobileLink}>MUSIC</Typography>
            </Link>
            <Link href="/collections/5" py={1} underline="none" key="6" display='flex' alignItems='center'>
              <ListItemIcon>
                <LinkedCameraIcon fontSize="large" sx={{padding: '8px', background:"rgb(234 242 254)", marginRight: '16px', borderRadius: '40px', fill:'#428af8'}} />
              </ListItemIcon>
              <Typography className={classes.mobileLink}>PHOTOGRAPHY</Typography>
            </Link>
            <Link href="/collections/6" py={1} underline="none" key="7" display='flex' alignItems='center'>
              <ListItemIcon>
                <LanguageIcon fontSize="large" background="rgb(238 252 255)" sx={{padding: '8px', background:"rgb(242 238 255)", marginRight: '16px', borderRadius: '40px', fill:'#46c7e3'}} />
              </ListItemIcon>
              <Typography className={classes.mobileLink}>Virtual World</Typography>
            </Link>
          </AccordionDetails>
        </Accordion>
        <Link href="/activity" underline='none'>
          <ListItem button key={3}>
            <ListItemText className={classes.mobileLink} primary='Activity' />
          </ListItem>
        </Link>
        <Link href="/contact" underline='none'>
          <ListItem button key={4}>
            <ListItemText className={classes.mobileLink} primary='Contact' />
          </ListItem>
        </Link>
        <Accordion sx={{boxShadow: 'none'}} className={classes.mobileNav}>
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
        <Link href="/create" underline='none'>
          <ListItem button key={5}>
            <ListItemText className={classes.mobileLink} primary='Create' />
          </ListItem>
        </Link>
        {
          !account &&
          <Box display='flex' justifyContent='center'>
            <PrimaryButton text="Connect Wallet" onClick={() => document.location.href = '/wallet'}></PrimaryButton>
          </Box>
        }
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
  const [keyword, setKeyword] = useState('');

  const handlekeyUp = (key) => {
    if (key === 13) {
      document.location.href=`/collections/${keyword}`;
    }
  }

  return (
    <Box sx={{ marginBottom: '90px' }}>
      <ElevationScroll {...props}>
        <AppBar sx={{backgroundColor:'hsla(0,0%,100%,.5)', backdropFilter: 'blur(8px)'}}>
          <Toolbar className={classes.toolBar} sx={{padding: `${matches ? '1rem !important' : ''}`}}>
            <Box sx={{display:'flex'}}>
              <Link href="/" underline="none" mr={8}>
                <Box component="img" className={classes.logo}
                  alt="Market Place"
                  src={`../../images/logo${theme.palette.mode === 'dark' ? '_white' : ''}.png`}
                />
              </Link>
              {!matches ? (<Search>
                  <SearchIconWrapper>
                    <SearchIcon />
                  </SearchIconWrapper>
                  <StyledInputBase
                    placeholder="Search"
                    inputProps={{ 'aria-label': 'search' }}
                    onChange={(e) => setKeyword(e.target.value)}
                    onKeyUp={(e) => handlekeyUp(e.keyCode)}
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
                classes={{paper: classes.mobileNav}}
                onClose={toggleDrawer('right', false)}
              >
                <Search sx={{margin: "4% !important", width: "92%"}}>
                  <SearchIconWrapper>
                    <SearchIcon />
                  </SearchIconWrapper>
                  <StyledInputBase
                    placeholder="Search"
                    inputProps={{ 'aria-label': 'search' }}
                    onChange={(e) => setKeyword(e.target.value)}
                    onKeyUp={(e) => handlekeyUp(e.keyCode)}
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
              <ExploreMenu />
              <Link href="/activity" underline="none" key="2">
                <Typography className={classes.link}>Activity</Typography>
              </Link>
              <Link href="/contact" underline="none" key="3">
                <Typography className={classes.link}>Contact</Typography>
              </Link>
              <ResourceMenu />
              <Link href="/create" underline="none" key="4">
                <Typography className={classes.link}>Create</Typography>
              </Link>
              {
                account === '' ?
                  <Link href="/wallet" underline="none" key="5">
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