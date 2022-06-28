import React from 'react';
import { Divider, Typography, Box, Button, Stack } from '@mui/material';
import useStyles from '../styles/styles';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Icon } from '@iconify/react';
import CollectionPopup1 from '../components/CollectionPopup1';
import CollectionPopup2 from '../components/CollectionPopup2';
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';

export default function CollectionHero(props){
  const classes = useStyles();

  const { collection } = props;

  const getCollectionAvatarURL = () => {
    if (collection) {
      return collection.collection.imageURL;
    } else {
      return '../images/collections/collection_avatar.jpg';
    }
  }

  const getDeployer = () => {
    if (collection) {
      if (collection.collection.address && collection.collection.address.length) {
        return collection.collection.address[0].name;
      } else {
        return `${collection.collection.deployer.slice(0, 13)}...`;
      }
    } else {
      return '...'
    }
  }

  return (
    <>
      <Box sx={{height:'300px', backgroundImage:`url(../images/collections/collection_banner.jpg)`}}></Box>
      <Box pb={5} className={`${classes.commonBackgroundColor} ${classes.textCenter}`}>
        <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', transform: 'translate(0, -50%)', position: 'relative'}}>
          <img src={`${getCollectionAvatarURL()}`}
               style={{width: '148px', border: 'solid 3px #fff', borderRadius: '10px'}} />
          {
            collection && collection.collection.status &&
            <CheckCircleIcon sx={{position: 'absolute', transform: 'translate(70px, 70px)', color: 'limegreen'}} />
          }
        </Box>
        <Typography variant="h4">{collection? collection.collection.name: '...'}</Typography>
         Created by <span style={{color: 'rgb(131, 88, 255)'}}>{getDeployer()}</span>

        <Box className={`${classes.displayFlex} ${classes.justifyCenter}`}>
          <Stack mt={2} p={2} divider={<Divider orientation="vertical" flexItem />} direction={{ xs: 'column', sm: 'row' }} spacing={{xs: 1, sm: 2, md: 4 }}
              className={classes.borderColor}  sx={{ borderRadius: '15px'}}>
            <Stack divider={<Divider orientation="vertical" flexItem />} direction='row' spacing={{ xs: 1, sm: 2, md: 4 }}>
              <Box sx={{width: '95px'}}>
                <Typography className={classes.darkText} variant="h6">{collection? collection.collection.supply: 0}</Typography>
                <Typography variant="body2">Items</Typography>
              </Box>
              <Box sx={{width: '95px'}}>
                <Typography className={classes.darkText} variant="h6">{collection? collection.ownerCnt: 0}</Typography>
                <Typography variant="body2">Owners</Typography>
              </Box>
            </Stack>
            <Stack divider={<Divider orientation="vertical" flexItem />} direction='row' spacing={{ xs: 1, sm: 2, md: 4 }}>
              <Box sx={{width: '95px'}}>
                <Box className={`${classes.displayFlex} ${classes.justifyCenter}`}>
                  <Icon icon="logos:ethereum" rotate={2} hFlip={true} vFlip={true} />
                  <Typography className={classes.darkText} ml={1} variant="h6">{collection? collection.floorPrice: 0}</Typography>
                </Box>
                <Typography variant="body2">Floor Price</Typography>
              </Box>
              <Box sx={{width: '95px'}}>
                <Box className={`${classes.displayFlex} ${classes.justifyCenter}`}>
                  <Icon icon="logos:ethereum" rotate={2} hFlip={true} vFlip={true} />
                  <Typography className={classes.darkText} ml={1} variant="h6">{collection? collection.collection.volume: 0}</Typography>
                </Box>
                <Typography variant="body2">Volume Traded</Typography>
              </Box>
            </Stack>
          </Stack>
        </Box>

        <Typography mt={3} variant="body2">{collection? collection.collection.description: '...'}</Typography>

        <Box mb={2} className={`${classes.displayFlex} ${classes.justifyCenter}`} >
          <Button className={`${classes.displayFlex}`} sx={{border:'solid 1px grey', borderRadius:'10px', padding:'8px', color: '#000'}}>
            <Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite sx={{color: 'red'}} />} />
          </Button>
          <CollectionPopup1 />
          <CollectionPopup2 />
        </Box>
      </Box>
    </>
  );
};