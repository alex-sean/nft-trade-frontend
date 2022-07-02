import React, { useEffect, useState } from 'react';
import { Divider, Typography, Box, Button, Stack } from '@mui/material';
import useStyles from '../styles/styles';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Icon } from '@iconify/react';
import CollectionPopup1 from '../components/CollectionPopup1';
import CollectionPopup2 from '../components/CollectionPopup2';
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import { TOKEN_STATUS } from '../common/const';
import { useLoadingContext } from '../hooks/useLoadingContext';
import { useWalletContext } from '../hooks/useWalletContext';
import { toast } from 'react-toastify';
import { getlikeCollection, likeCollection } from '../adapters/backend';

export default function CollectionHero(props){
  const classes = useStyles();

  const { collection } = props;

  const { setLoading } = useLoadingContext();
  const { account } = useWalletContext();

  const [like, setLike] = useState(false);

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

  const initLike = async () => {
    try {
      const result = await getlikeCollection(collection.collection.collectionAddress, account);
      if (!result) {
        throw new Error('Getting like status failed.');
      }

      setLike(result.data.status);
    } catch (err) {
      console.log(err);
      toast('Getting like status failed.');
    }
  }

  const setLikeCollection = async () => {
    if (!account) {
      toast('Please connect the wallet.');
      return;
    }

    setLoading(true);
    try {
      const result = await likeCollection(collection.collection.collectionAddress, account, !like);
      if (result.data.status) {
        setLike(!like);
      }
    } catch (err) {
      console.log(err);
    }

    setLoading(false);
  }

  useEffect(() => {console.log(collection, account);
    if (!collection || !account) {
      return;
    }

    initLike();
  }, [collection, account])

  return (
    <>
      <Box sx={{height:'300px', backgroundImage:`url(../images/collections/collection_banner.jpg)`}}></Box>
      <Box pb={5} className={`${classes.commonBackgroundColor} ${classes.textCenter}`}>
        <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', transform: 'translate(0, -50%)', position: 'relative'}}>
          <img src={`${getCollectionAvatarURL()}`}
               style={{width: '148px', border: 'solid 3px #fff', borderRadius: '10px'}} />
          {
            collection && collection.collection.status === TOKEN_STATUS.VERIFIED &&
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
                  {/* <Icon icon="logos:ethereum" rotate={2} hFlip={true} vFlip={true} /> */}
                  <Typography className={classes.darkText} ml={1} variant="h6">$ {collection? collection.floorPrice: 0}</Typography>
                </Box>
                <Typography variant="body2">Floor Price</Typography>
              </Box>
              <Box sx={{width: '95px'}}>
                <Box className={`${classes.displayFlex} ${classes.justifyCenter}`}>
                  {/* <Icon icon="logos:ethereum" rotate={2} hFlip={true} vFlip={true} /> */}
                  <Typography className={classes.darkText} ml={1} variant="h6">$ {collection? collection.collection.volume: 0}</Typography>
                </Box>
                <Typography variant="body2">Volume Traded</Typography>
              </Box>
            </Stack>
          </Stack>
        </Box>

        <Typography mt={3} variant="body2">{collection? collection.collection.description: '...'}</Typography>

        <Box mb={2} className={`${classes.displayFlex} ${classes.justifyCenter}`} >
          <Button className={`${classes.displayFlex}`} sx={{border:'solid 1px grey', borderRadius:'10px', padding:'8px', color: '#000'}}>
            <Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite sx={{color: 'red'}} />} checked={like} onChange={(e) => setLikeCollection()}/>
          </Button>
          <CollectionPopup1 />
          {/* <CollectionPopup2 /> */}
        </Box>
      </Box>
    </>
  );
};