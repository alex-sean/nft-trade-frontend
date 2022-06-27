import React from 'react';
import { Typography, Box } from '@mui/material';
import HistoryIcon from '@mui/icons-material/History';
import useStyles from '../styles/styles';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

function CardItem(props) {
  const { token } = props;
  const classes = useStyles();
  
  return (
    <Box className={`${classes.hoverShadow} ${classes.paperBackground}`} sx={{border:'solid 1px rgba(0, 0, 0, 0.1)', borderRadius:'1.25rem', padding: '1.1875rem', marginBottom: '16px'}}>
      <Box sx={{position: 'relative'}}>
        <img style={{width: '100%'}} src={`${token.imageURL}`} className={classes.rounded}/>
        <Box sx={{display:'flex', position: 'absolute', top: '16px', right: '16px', padding: '8px', background: '#fff', borderRadius: '8px'}} className={classes.hotBidLike}>
          <FavoriteBorderIcon />
          <Typography className={classes.hotBidLike}>{token.like}</Typography>
        </Box>
      </Box>
      <Box mt={2} sx={{display:'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <Typography variant="h6" className={classes.collectionItemTitle}>{token.name} #{token.tokenID}</Typography>
        {/* <MoreHorizIcon /> */}
        {`$ ${token.price} USD`}
      </Box>
      <Typography className={classes.collectionSubtitle}>{token.description.slice(0, 30)}...</Typography>
      <Box sx={{display:'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px'}}>
        <Typography className={classes.collectionBuy}>Buy now</Typography>
        <Box sx={{display:'flex', color: '#5A5D79'}}>
          <HistoryIcon />
          <Typography className={classes.collectionHistory}>View History</Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default CardItem;