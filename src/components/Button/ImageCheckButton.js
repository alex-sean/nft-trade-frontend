import React, { useEffect, useState } from 'react';
import { Box, Checkbox, Typography } from '@mui/material';
import useStyles from '../../styles/styles';

export default function ImageCheckButton(props) {
  const { text, imgUrl, content, handleChange, disabled, isChecked } = props;
  const classes = useStyles();
  const [checked, setChecked] = useState(false)

  const handleClick = () => {
    if (disabled) {
      return;
    }

    handleChange(!checked, content);
    setChecked(!checked);
  }

  useEffect(() => {
      setChecked(isChecked);
  }, [disabled, isChecked])
  
  return (
    <Box p={1} sx={{position: 'relative'}} onClick={handleClick}>
      <img style={{width: '40px', height: '40px'}} src={imgUrl} />
      <Typography>{text}</Typography>
      <Checkbox sx={{position: 'absolute', left: '32px', top: '-2px', background: '#fff', padding: '0'}} checked={checked} disabled={disabled}/>
    </Box>
  );
}