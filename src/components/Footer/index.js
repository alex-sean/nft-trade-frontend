import React from 'react';
import { Box, Typography, Link, Grid, Container } from '@mui/material';
import useStyles from '../../styles/styles';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import RedditIcon from '@mui/icons-material/Reddit';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { useTheme } from '@mui/material/styles';

const Footer = () => {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <Box sx={{ flexGrow: 1 }} className={classes.footerContainer}>
      <Container maxWidth="lg">
        <Grid container >
          <Grid container item xs="12" md="6">
            <Grid item xs="12" md="8">
              <Link href="#" underline="none">
                <Box component="img" className={classes.logo}
                  alt="Market Place"
                  src={`images/logo${theme.palette.mode === 'dark' ? '_white' : ''}.png`}
                />
              </Link>
              <Typography className={classes.my32} color="#5A5D79" fontSize={'0.9rem'}>
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
          <Grid container item xs="12" md="6">
            <Grid item xs="12" md="4">
              <Typography className={classes.footerTitle}>Marketplace</Typography>
              <Typography className={classes.footerItem}>All NFTs</Typography>
              <Typography className={classes.footerItem}>Art</Typography>
              <Typography className={classes.footerItem}>Music</Typography>
              <Typography className={classes.footerItem}>Domain Names</Typography>
              <Typography className={classes.footerItem}>Collectibles</Typography>
              <Typography className={classes.footerItem}>Virtual World</Typography>
            </Grid>
            <Grid item xs="12" md="4">
              <Typography className={classes.footerTitle}>Company</Typography>
              <Typography className={classes.footerItem}>Explore</Typography>
              <Typography className={classes.footerItem}>About</Typography>
              <Typography className={classes.footerItem}>Contact Us</Typography>
              <Typography className={classes.footerItem}>Our Blog</Typography>
              <Typography className={classes.footerItem}>FAQ</Typography>
            </Grid>
            <Grid item xs="12" md="4">
              <Typography className={classes.footerTitle}>My Account</Typography>
              <Typography className={classes.footerItem}>Authors</Typography>
              <Typography className={classes.footerItem}>Collection</Typography>
              <Typography className={classes.footerItem}>Author Profile</Typography>
              <Typography className={classes.footerItem}>Create Item</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Box className={`${classes.mt32} ${classes.displayFlex} ${classes.justifyBetween}`}>
          <Typography className={classes.footerItem}>© 2022 Xhibiter — Made by DeoThemes</Typography>
          <Typography className={classes.footerItem}>Terms and conditions Privacy policy</Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;