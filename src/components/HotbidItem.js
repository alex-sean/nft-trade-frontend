import React from 'react';
import { Typography, Box } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import useStyles from '../styles/styles';
import { Icon } from '@iconify/react';
import { getAssetName } from '../common/CommonUtils';
import Web3 from 'web3';

export default function HotbidItem(props) {
  const { item } = props;
  const classes = useStyles();
  
  return (
    <Box className={`${classes.hotBidItem} ${classes.hoverShadow}`} onClick={() => document.location.href=`/item/${item.collectionAddress}/${item.tokenID}`}>
      <img src={item.imageURL} className={classes.rounded} style={{width: '230px'}}/>
      <Box sx={{display:'flex', justifyContent: 'space-between', alignItems: 'center',}}>
        <Typography variant="h6">{`${item.name} #${item.tokenID}`}</Typography>
        <Box sx={{display:'flex', justifyContent: 'space-between', alignItems: 'center', border: "solid 1px rgb(54, 58, 93)", borderRadius: '8px', padding: '4px 8px 4px 8px'}}>
          {/* <Icon icon="logos:ethereum" rotate={2} hFlip={true} vFlip={true} sx={{margin: '2px'}}/> */}
          <Typography color="rgb(16, 185, 129)" className={classes.hotBidPrice}>{`$ ${item.price}`}</Typography>
        </Box>
      </Box>
      <Typography className={classes.hotBidSubtitle}>{`Last Bid ${Web3.utils.fromWei(item.orders[0].amount + '')} ${getAssetName(item.orders[0].asset)}`}</Typography>
      <Box sx={{display:'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px'}}>
        <Typography className={classes.hotBidPlaceBid}>Place Bid</Typography>
        <Box sx={{display:'flex', alignItems: 'center'}} className={classes.hotBidLike}>
          <FavoriteBorderIcon />
          <Typography className={classes.hotBidLike}>{item.like}</Typography>
        </Box>
      </Box>
    </Box>
  );
}