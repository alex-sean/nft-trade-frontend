import React from 'react';
import { Typography, Box } from '@mui/material';
import useStyles from '../styles/styles';

function SellItem(props) {
  const { src, title, subtitle } = props;
  const classes = useStyles();
  
  return (
    <Box sx={{padding: '16px', textAlign: 'center'}}>
      <img src={src} />
      <Typography variant="h6" className={classes.text}>{title}</Typography>
      <Typography color="#5A5D79">{subtitle}</Typography>
    </Box>
  );
}

export default SellItem;