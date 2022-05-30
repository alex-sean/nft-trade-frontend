import React from 'react';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import PropTypes from 'prop-types';
import { Grid, Typography, Box } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import useStyles from '../styles/styles';

function CollectionItem(props) {
  const { src, title, amount, checked } = props;
  const classes = useStyles();
  
  return (
    <Box className={classes.hoverShadow} sx={{display:'flex', justifyContent:'flex-start', alignItems:'center', border:'solid 1px rgba(0, 0, 0, 0.2)', borderRadius:'20px', height:'100px', padding:'8px'}}>
      <img src={src} />
      <Box sx={{textAlign:'start', marginLeft:'16px'}}>
        <Typography sx={{fontWeight:'500', fontSize:'1.2rem'}}>{title}</Typography>
        <Typography sx={{fontSize:'0.8rem'}}>{amount}</Typography>
      </Box>
    </Box>
  );
}

export default CollectionItem;