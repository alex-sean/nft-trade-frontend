import React from 'react';
import { Grid, Typography, Box, Button, TextField, useThemeProps } from '@mui/material';
import useStyles from '../styles/styles';
import { useTheme } from '@mui/material/styles';
import Subscribe from '../screens/Subscribe';

export default function NewsletterPage(){
  const classes = useStyles();
  const SubscribeButton = () => (
    <Button
      variant="contained"
      type="submit"
      color="primary"
      sx={{ width: '200px', fontSize: '16px', borderRadius: '20px', background: '#8358ff', '&:hover': {backgroundColor: '#8358ff'}, }}
    >
      Subscribe
    </Button>
  )
  const theme = useTheme()
  const isDark = theme.palette.mode === 'dark'

  return (
    <Box className={classes.heroBox} sx={{background: `rgb(${isDark ? '16, 20, 54' : '245, 248, 250'}) !important`}}>
      <Grid container spacing={6} className={classes.gridContainer}>
        <Grid item xs={12} md={5}>
          <Typography variant="h4" fontWeight={700} className={classes.title}>
          Sign up for The Tide, Xhibiter's newsletter!
          </Typography>
          <Typography paragraph variant="h6" className={classes.subtitle}>
            Join our mailing list to stay in the loop with our newest feature releases, NFT drops, and tips and tricks for navigating Xhibiter
          </Typography>
          <Subscribe />
        </Grid>
        <Grid item xs={12} md={7} sx={{position:'relative'}}>
          <img src={'images/hero/story_deg.png'} className={`${classes.largeImage}`} />
          <img src={'images/hero/3D_elements.png'} className={`${classes.animateFly}`} />
        </Grid>
      </Grid>
    </Box>
  );
};