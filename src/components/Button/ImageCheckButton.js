import React, { useState } from 'react';
import { Box, Checkbox, Typography } from '@mui/material';
import useStyles from '../../styles/styles';

export default function ImageCheckButton(props) {
  const { text, imgUrl } = props;
  const classes = useStyles();
  const [checked, setChecked] = useState(false)

  const handleChange = () => {
    setChecked(!checked)
  }
  
  return (
    <Box p={1} sx={{position: 'relative'}} onClick={handleChange}>
      <img style={{width: '32px', height: '32px'}} src={imgUrl} />
      <Typography>{text}</Typography>
      <Checkbox sx={{position: 'absolute', left: '20px', top: '-10px'}} checked={checked} />
    </Box>
  );
}