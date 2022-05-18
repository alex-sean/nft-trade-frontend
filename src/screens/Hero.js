import React from 'react';
import { Grid, Typography, Box } from '@mui/material';
import useStyles from '../styles/styles';
import PrimaryButton from '../components/Button/PrimaryButton';
import SecondaryButton from '../components/Button/SecondaryButton';
import { useTheme } from '@mui/material/styles';

const Hero = () => {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <Box className={classes.heroBox}>
      <Grid container spacing={6} className={classes.gridContainer}>
        <Grid item xs={12} md={7}>
          <Typography variant="h3" fontWeight={700} className={classes.title}>
            Buy, sell and <br />collect NFTs.
          </Typography>
          <Typography variant="h6" className={classes.subtitle}>
          The world's largest digital marketplace <br />for crypto collectibles and non-fungible <br />tokens
          </Typography>
          <PrimaryButton text='Upload'></PrimaryButton>
          <SecondaryButton text="Explore" />
        </Grid>
        <Grid item xs={12} md={5}>
          <img src={'images/hero/hero.jpg'} className={classes.largeImage} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Hero;