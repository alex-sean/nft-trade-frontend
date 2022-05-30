import React from 'react';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import PropTypes from 'prop-types';
import { Grid, Typography, Box } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

function SellItem(props) {
  const { src, title, subtitle, amount, like } = props;
  
  return (
    <Box sx={{padding: '16px', textAlign: 'center'}}>
      <img src={src} />
      <Typography variant="h6" color="#131740">{title}</Typography>
      <Typography color="#5A5D79">{subtitle}</Typography>
     </Box>
  );
}

export default SellItem;