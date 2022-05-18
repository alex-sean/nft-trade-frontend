import React from 'react';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import PropTypes from 'prop-types';
import { Grid, Typography, Box } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import useStyles from '../styles/styles';

function HotbidItem(props) {
  const { src, title, subtitle, amount, like } = props;
  const classes = useStyles();
  
  return (
    <Box className={classes.hotBidItem}>
      <img src={src} />
      <Box sx={{display:'flex', justifyContent: 'space-between', alignItems: 'center',}}>
        <Typography variant="h6">{title}</Typography>
        <Box sx={{border: "solid 1px rgba(0, 0, 0, 0.2)", borderRadius: '8px', padding: '4px'}}>
          <Typography color="rgb(16 185 129)">{amount}</Typography>
        </Box>
      </Box>
      <Typography>{subtitle}</Typography>
      <Box sx={{display:'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px'}}>
        <Typography color="#8358ff">PlaceBid</Typography>
        <Box sx={{display:'flex', }}>
          <FavoriteBorderIcon />
          <Typography>{like}</Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default HotbidItem;