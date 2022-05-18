import React from 'react';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import PropTypes from 'prop-types';
import { Grid, Typography, Box } from '@mui/material';
import HistoryIcon from '@mui/icons-material/History';

function CategoryItem(props) {
  const { src, title, subtitle, amount, like } = props;
  
  return (
    <Box sx={{border:'solid 1px rgba(0, 0, 0, 0.2)', borderRadius:'10px', padding: '16px', marginBottom: '16px'}}>
      <img style={{width: '100%'}} src={src} />
      <Box sx={{display:'flex', justifyContent: 'space-between', alignItems: 'center',}}>
        <Typography variant="h6">{title}</Typography>
        <Typography variant="h6">...</Typography>
      </Box>
      <Typography>{subtitle}</Typography>
      <Box sx={{display:'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px'}}>
        <Typography color="#8358ff">Buy now</Typography>
        <Box sx={{display:'flex', }}>
          <HistoryIcon />
          <Typography>View History</Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default CategoryItem;