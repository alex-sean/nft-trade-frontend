import React from 'react';
import { Grid, Typography, Box, Button, TextField } from '@mui/material';
import useStyles from '../styles/styles';

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

  return (
    <Box className={classes.heroBox}>
      <Grid container spacing={6} className={classes.gridContainer}>
        <Grid item xs={12} md={5}>
          <Typography variant="h4" fontWeight={700} className={classes.title}>
          Sign up for The Tide, Xhibiter's newsletter!
          </Typography>
          <Typography paragraph variant="h6" className={classes.subtitle}>
            Join our mailing list to stay in the loop with our newest feature releases, NFT drops, and tips and tricks for navigating Xhibiter
          </Typography>
          <TextField  className="inputRounded" 
                  sx={{ display: 'flex', alignItems: 'center', marginTop: '20px' }}
            placeholder="Email address"
            InputProps={{endAdornment: <SubscribeButton />}}
          />
        </Grid>
        <Grid item xs={12} md={7} sx={{position:'relative'}}>
          <img src={'images/hero/story_deg.png'} className={`${classes.largeImage}`} />
          <img src={'images/hero/3D_elements.png'} className={`${classes.animateFly}`} />
        </Grid>
      </Grid>
    </Box>
  );
};