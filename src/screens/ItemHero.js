import React from 'react';
import { Grid, Typography, Container, Box, Link } from '@mui/material';
import useStyles from '../styles/styles';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ItemMenu from '../components/ItemMenu';
import { Icon } from '@iconify/react';
import ItemCreator from '../components/ItemCreator';
import ItemBid from '../screens/ItemBid';
import ItemTabs from '../components/ItemTabs';

export default function ItemHero(){
  const classes = useStyles();

  return (
    <Box className={classes.itemHeroContainer}>
      <Container maxWidth="lg">
        <Grid container spacing={6} className={classes.gridContainer}>
          <Grid item xs={12} md={5}>
            <img src={'images/products/item_single_large.jpg'} alt="My Team" className={classes.largeImage} />
          </Grid>

          <Grid item xs={12} md={6}>
            <Box mb={2} className={`${classes.displayFlex} ${classes.justifyBetween}`} >
              <Box className={`${classes.displayFlex}`} >
                <Link underline="none" href="/collection" sx={{color: '#ff0'}}>
                  <Typography mr={2} color="rgb(131, 88, 255)">CryptoGuysNFT</Typography>
                </Link>
                <CheckCircleIcon sx={{color: 'rgb(16, 185, 129)'}}/>
              </Box>
              <Box className={`${classes.displayFlex}`} >
                <Typography className={`${classes.displayFlex}`} sx={{border:'solid 1px grey', borderRadius:'10px', padding:'8px'}}>
                  <FavoriteBorderIcon />188
                </Typography>
                <ItemMenu />
              </Box>
            </Box>
            <Typography variant="h4" fontWeight={700} className={classes.title}>
              TSARÉVNA
            </Typography>
            <Box className={`${classes.displayFlex} ${classes.my8}`} >
              <Icon icon="logos:ethereum" rotate={2} hFlip={true} vFlip={true} />
              <Typography ml={1} color="rgb(16 185 129)">4.7 ETH</Typography>
              <Typography ml={3} color="gray">Highest bid</Typography>
              <Typography ml={3} color="gray">1/1 available</Typography>
            </Box>
            <Typography mt={3} className={classes.itemHeroSubtitle}>
              Neque aut veniam consectetur magnam libero, natus eius numquam reprehenderit hic at, excepturi repudiandae magni optio odio doloribus? Facilisi lobortisal morbi fringilla urna amet sed ipsum.
            </Typography>
            <Grid mb={5} container spacing={3}>
              <ItemCreator src='images/avatars/avatar_7.jpg' title="Creator 10% royalties" subtitle='@creative_world'></ItemCreator>
              <ItemCreator src='images/avatars/avatar_1.jpg' title="Owned by" subtitle='@051_Hart'></ItemCreator>
            </Grid>
            <ItemBid />
          </Grid>
        </Grid>
        <ItemTabs />
      </Container>
    </Box>
  );
};