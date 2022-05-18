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
      <Typography variant="h6">{title}</Typography>
      <Typography>{subtitle}</Typography>
     </Box>
  );
}

export default SellItem;