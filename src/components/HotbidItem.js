import React from 'react';
import { Typography, Box } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import useStyles from '../styles/styles';
import { Icon } from '@iconify/react';

export default function HotbidItem(props) {
  const { src, title, subtitle, amount, like } = props;
  const classes = useStyles();
  
  return (
    <Box className={`${classes.hotBidItem} ${classes.hoverShadow}`}>
      <img src={src} className={classes.rounded}/>
      <Box sx={{display:'flex', justifyContent: 'space-between', alignItems: 'center',}}>
        <Typography variant="h6">{title}</Typography>
        <Box sx={{display:'flex', justifyContent: 'space-between', alignItems: 'center', border: "solid 1px rgb(54, 58, 93)", borderRadius: '8px', padding: '4px 8px 4px 8px'}}>
          <Icon icon="logos:ethereum" rotate={2} hFlip={true} vFlip={true} sx={{margin: '2px'}}/>
          <Typography color="rgb(16, 185, 129)" className={classes.hotBidPrice}>{amount}</Typography>
        </Box>
      </Box>
      <Typography className={classes.hotBidSubtitle}>{subtitle}</Typography>
      <Box sx={{display:'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px'}}>
        <Typography className={classes.hotBidPlaceBid}>Place Bid</Typography>
        <Box sx={{display:'flex'}} className={classes.hotBidLike}>
          <FavoriteBorderIcon />
          <Typography className={classes.hotBidLike}>{like}</Typography>
        </Box>
      </Box>
    </Box>
  );
}