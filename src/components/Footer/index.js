import React from 'react';
import { Box, Typography, Link, Grid, Container } from '@mui/material';
import useStyles from '../../styles/styles';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import RedditIcon from '@mui/icons-material/Reddit';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { useTheme } from '@mui/material/styles';
import { CATEGORIES } from '../../common/const';

const Footer = () => {
  const classes = useStyles();
  const theme = useTheme();

  const redirectToMarket = (category) => {
    window.location.href = `/collections/${category}`;
  }

  return (
    <Box sx={{ flexGrow: 1 }} className={classes.footerContainer}>
      <Container maxWidth="lg">
        <Grid container spacing={5}>
          <Grid container item xs={12} sm={6}>
            <Grid item xs={12} md={8}>
              <Link href="#" underline="none">
                <Box component="img" className={classes.logo}
                  alt="Market Place"
                  src={`../../images/logo${theme.palette.mode === 'dark' ? '_white' : ''}.png`}
                />
              </Link>
              <Typography className={`${classes.my32} ${classes.footerIcons}`} fontSize={'0.9rem'}>
                Create, sell and collect truly rare digital artworks. Powered by blockchain technology.
              </Typography>
              <Box className={`${classes.displayFlex} ${classes.footerIcons}`}>
                <FacebookIcon className={classes.mr16}/>
                <TwitterIcon className={classes.mr16} />
                <RedditIcon className={classes.mr16} />
                <InstagramIcon className={classes.mr16} />
                <YouTubeIcon className={classes.mr16} />
              </Box>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <Typography className={classes.footerTitle}>Marketplace</Typography>
            <Typography className={classes.footerItem} onClick={() => redirectToMarket(0)}>All NFTs</Typography>
            <Typography className={classes.footerItem} onClick={() => redirectToMarket(CATEGORIES.ART)}>Art</Typography>
            <Typography className={classes.footerItem} onClick={() => redirectToMarket(CATEGORIES.MUSIC)}>Music</Typography>
            <Typography className={classes.footerItem} onClick={() => redirectToMarket(CATEGORIES.DOMAIN)}>Domain Names</Typography>
            <Typography className={classes.footerItem} onClick={() => redirectToMarket(CATEGORIES.COLLECTIBLE)}>Collectibles</Typography>
            <Typography className={classes.footerItem} onClick={() => redirectToMarket(CATEGORIES.VIRTUAL_WORLD)}>Virtual World</Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <Typography className={classes.footerTitle}>Company</Typography>
            {/* <Typography className={classes.footerItem}>Explore</Typography>
            <Typography className={classes.footerItem}>About</Typography> */}
            <Typography className={classes.footerItem} onClick={() => document.location.href = '/contact'}>Contact Us</Typography>
            <Typography className={classes.footerItem} onClick={() => document.location.href = '/blog'}>Our Blog</Typography>
            <Typography className={classes.footerItem} onClick={() => document.location.href = '/newsletter'}>Subscribe</Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <Typography className={classes.footerTitle}>My Account</Typography>
            {/* <Typography className={classes.footerItem}>Authors</Typography>
            <Typography className={classes.footerItem}>Collection</Typography>
            <Typography className={classes.footerItem}>Author Profile</Typography> */}
            <Typography className={classes.footerItem} onClick={() => document.location.href = '/create'}>Create Item</Typography>
          </Grid>
        </Grid>
        <Grid mt={3} container spacing={1} justifyContent="space-between" alignItems='center'>
          <Grid item xs={12} md={6}>
            <Typography className={classes.footerItem}>© 2022 Xhibiter — Made by DeoThemes</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography className={classes.footerItem}>Terms and conditions Privacy policy</Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;