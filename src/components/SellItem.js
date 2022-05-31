import React from 'react';
import { Typography, Box } from '@mui/material';

function SellItem(props) {
  const { src, title, subtitle } = props;
  
  return (
    <Box sx={{padding: '16px', textAlign: 'center'}}>
      <img src={src} />
      <Typography variant="h6" color="#131740">{title}</Typography>
      <Typography color="#5A5D79">{subtitle}</Typography>
    </Box>
  );
}

export default SellItem;