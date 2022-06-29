import React from 'react';
import { Button } from '@mui/material';
import useStyles from '../../styles/styles';

function PrimaryButton(props) {
  const classes = useStyles();
  const { text, onClick } = props;

  return (
    <Button className={classes.primaryButton} onClick={onClick}
      >
      {text}
    </Button>
  );
}

export default PrimaryButton;