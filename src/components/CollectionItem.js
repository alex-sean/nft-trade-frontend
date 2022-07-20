import React from 'react';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import PropTypes from 'prop-types';
import { Grid, Typography, Box } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import useStyles from '../styles/styles';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { TOKEN_STATUS } from '../common/const';
import Web3 from 'web3';

function CollectionItem(props) {
  const { item } = props;
  const classes = useStyles();
  
  return (
    <Box className={`${classes.hoverShadow} ${classes.paperBackground}`} sx={{display:'flex', justifyContent:'flex-start', alignItems:'center', border:'solid 1px rgba(0, 0, 0, 0.2)', borderRadius:'20px', height:'85px', padding:'8px'}}>
      <Box ml={2} sx={{position: 'relative'}}>
        <img src={item.collection.imageURL} style={{borderRadius: '10px', width: '48px'}} />
        <Typography className={classes.darkCircleNumber}>{item.collection.like}</Typography>
        {
          item.collection.status === TOKEN_STATUS.VERIFIED && 
          <CheckCircleIcon className={classes.checkIconStyle} sx={{position: 'absolute', color: 'limegreen'}} />
        }
      </Box>
      <Box sx={{textAlign:'start', marginLeft:'16px'}}>
        <Typography sx={{fontWeight:'500', fontSize:'1.2rem'}}>{item.collection.name}</Typography>
        <Typography sx={{fontSize:'0.8rem'}}>$ {Web3.utils.fromWei(item.total + '')}</Typography>
      </Box>
    </Box>
  );
}

export default CollectionItem;