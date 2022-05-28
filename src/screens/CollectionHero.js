import React from 'react';
import { Grid, Typography, Box, Button } from '@mui/material';
import useStyles from '../styles/styles';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Icon } from '@iconify/react';
import CollectionPopup1 from '../components/CollectionPopup1';
import CollectionPopup2 from '../components/CollectionPopup2';

export default function CollectionHero(){
  const classes = useStyles();

  return (
    <>
      <Box sx={{height:'300px', backgroundImage:'url(images/collections/collection_banner.jpg)'}}></Box>
      <Box pb={5} className={`${classes.commonBackgroundColor} ${classes.textCenter}`}>
        <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', transform: 'translate(0, -50%)', position: 'relative'}}>
          <img src='images/collections/collection_avatar.jpg' 
               style={{width: '148px', border: 'solid 3px #fff', borderRadius: '10px'}} />
          <CheckCircleIcon sx={{position: 'absolute', transform: 'translate(70px, 70px)', color: 'limegreen'}} />
        </Box>
        <Typography variant="h4">NFT Funny Cat</Typography>
         Created by <span style={{color: 'rgb(131, 88, 255)'}}>051_Hart</span>

        <Box className={`${classes.displayFlex} ${classes.justifyCenter}`}>
          <Grid mt={3} px={1} pr={2} py={3} container columnSpacing={1} borderRadius={2}
                sx={{background: '#fff', maxWidth: '440px'}}>
            <Grid item xs={6} md={3}>
              <Typography variant="h6">7.2K</Typography>
              <Typography variant="body2">Items</Typography>
            </Grid>
            <Grid item xs={6} md={3}>
              <Typography variant="h6">5.3K</Typography>
              <Typography variant="body2">Owners</Typography>
            </Grid>
            <Grid item xs={6} md={3}>
              <Box className={`${classes.displayFlex} ${classes.justifyCenter}`}>
                <Icon icon="logos:ethereum" rotate={2} hFlip={true} vFlip={true} />
                <Typography ml={1} variant="h6">2.55</Typography>
              </Box>
              <Typography variant="body2">Floor Price</Typography>
            </Grid>
            <Grid item xs={6} md={3}>
              <Box className={`${classes.displayFlex} ${classes.justifyCenter}`}>
                <Icon icon="logos:ethereum" rotate={2} hFlip={true} vFlip={true} />
                <Typography ml={1} variant="h6">17.2</Typography>
              </Box>
              <Typography variant="body2">Volume Traded</Typography>
            </Grid>
          </Grid>
        </Box>

        <Typography mt={3} variant="body2">Unique, fully 3D and built to unite the design multiverse.</Typography>
        <Typography my={1} variant="body2">Designed and styled by Digimental.</Typography>

        <Box mb={2} className={`${classes.displayFlex} ${classes.justifyCenter}`} >
          <Button className={`${classes.displayFlex}`} sx={{border:'solid 1px grey', borderRadius:'10px', padding:'8px', color: '#000'}}>
            <FavoriteBorderIcon />
          </Button>
          <CollectionPopup1 />
          <CollectionPopup2 />
        </Box>
      </Box>
    </>
  );
};