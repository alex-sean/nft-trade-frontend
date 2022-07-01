import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Grid, Typography, Container, Box, Link } from '@mui/material';
import useStyles from '../styles/styles';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ItemMenu from '../components/ItemMenu';
import { Icon } from '@iconify/react';
import ItemCreator from '../components/ItemCreator';
import ItemBid from '../screens/ItemBid';
import ItemTabs from '../components/ItemTabs';
import { useLoadingContext } from '../hooks/useLoadingContext';
import { getTokenDetail, getServiceFee } from '../adapters/backend';
import { toast } from 'react-toastify';
import { CATEGORY_NAMES_IN_ARRAY, LIST_TYPE } from '../common/const';
import { useWalletContext } from '../hooks/useWalletContext';

export default function ItemHero(props){
  const classes = useStyles();

  const { collectionAddress, tokenID } = useParams();

  const { setLoading } = useLoadingContext();
  const { account } = useWalletContext();

  const [tokenInfo, setTokenInfo] = useState();

  const [serviceFee, setServiceFee] = useState(0);

  const getTokenInfo = async () => {
    setLoading(true);

    try {
      let tokenInfo = await getTokenDetail(collectionAddress, tokenID);
      if (!tokenInfo) {
        throw new Error('Getting token information failed.');
      }

      setTokenInfo(tokenInfo.data.token);

      const serviceFee = await getServiceFee();
      if (!serviceFee) {
        throw new Error('Getting Service fee failed.');
      }

      setServiceFee(serviceFee.data.serviceFee);
    } catch (err) {
      console.log(err);
      toast('Getting token information failed.');
    }

    setLoading(false);
  }

  useEffect(() => {
    getTokenInfo();
  }, [])

  const getTokenImageURL = () => {
    if (tokenInfo) {
      return tokenInfo.token.imageURL;
    } else {
      return '../../images/products/item_single_large.jpg';
    }
  }

  const getCategoryName = () => {
    if (tokenInfo) {
      return CATEGORY_NAMES_IN_ARRAY[tokenInfo.token.category];
    } else {
      return '...'
    }
  }

  const getLikes = () => {
    if (tokenInfo) {
      return tokenInfo.token.like;
    } else {
      return 0;
    }
  }

  const getTokenName = () => {
    if (tokenInfo) {
      return `${tokenInfo.token.name} #${tokenInfo.token.tokenID}`;
    } else {
      return '...';
    }
  }

  const getTokenPrice = () => {
    if (tokenInfo) {
      return tokenInfo.token.price;
    } else {
      return 0;
    }
  }

  const getTokenDescription = () => {
    if (tokenInfo) {
      return tokenInfo.token.description;
    } else {
      return '...';
    }
  }

  const getOwnerAvatarURL = () => {
    let avatarURL = 'user_avatar.gif';
    if (tokenInfo && tokenInfo.token.address && tokenInfo.token.address.length > 0) {
      avatarURL = tokenInfo.token.address[0].avatar;
    }

    return `${process.env.REACT_APP_AVATAR_PATH}/${avatarURL}`;
  }

  const getOwnerName = () => {
    if (tokenInfo) {
      if (tokenInfo.token.address && tokenInfo.token.address.length > 0) {
        return tokenInfo.token.address[0].name;
      } else {
        return `${tokenInfo.token.owner.slice(0, 13)}...`
      }
    } else {
      return '...'
    }
  }

  return (
    <Box className={classes.itemHeroContainer}>
      <Container maxWidth="lg">
        <Grid container spacing={6} className={classes.gridContainer}>
          <Grid item xs={12} md={5}>
            <img src={getTokenImageURL()} alt="My Team" className={classes.largeImage} />
          </Grid>

          <Grid item xs={12} md={6}>
            <Box mb={2} className={`${classes.displayFlex} ${classes.justifyBetween}`} >
              <Box className={`${classes.displayFlex}`} >
                <Link underline="none" sx={{color: '#ff0'}}>
                  <Typography mr={2} color="rgb(131, 88, 255)">{getCategoryName()}</Typography>
                </Link>
                <CheckCircleIcon sx={{color: 'rgb(16, 185, 129)'}}/>
              </Box>
              <Box className={`${classes.displayFlex}`} >
                <Typography className={`${classes.displayFlex}`} sx={{border:'solid 1px grey', borderRadius:'10px', padding:'8px'}}>
                  <FavoriteBorderIcon />{getLikes()}
                </Typography>
                <ItemMenu />
              </Box>
            </Box>
            <Typography variant="h4" fontWeight={700} className={classes.title}>
              {getTokenName()}
            </Typography>
            {
              tokenInfo && tokenInfo.token.listed &&
              (
                <Box className={`${classes.displayFlex} ${classes.my8}`} >
                  <Icon icon="logos:ethereum" rotate={2} hFlip={true} vFlip={true} />
                  <Typography ml={1} color="rgb(16 185 129)">{getTokenPrice()} USD</Typography>
                  {
                    tokenInfo.token.listType === LIST_TYPE.AUCTION &&
                    (
                      [
                        <Typography ml={3} color="gray">Highest bid 4.7 ETH</Typography>,
                        <Typography ml={3} color="gray">1/1 available</Typography>
                      ]
                    )
                  }
                </Box>
              )
            }
            
            <Typography mt={3} className={classes.itemHeroSubtitle}>
              {getTokenDescription()}
            </Typography>
            <Grid mb={5} container spacing={3}>
              {/* <ItemCreator src='../../images/avatars/avatar_7.jpg' title="Creator 10% royalties" subtitle='@creative_world'></ItemCreator> */}
              <ItemCreator src={getOwnerAvatarURL()} title="Owned by" subtitle={getOwnerName()}></ItemCreator>
            </Grid>
            <ItemBid tokenInfo={tokenInfo} serviceFee={serviceFee}/>
          </Grid>
        </Grid>
        <ItemTabs tokenInfo={tokenInfo}/>
      </Container>
    </Box>
  );
};