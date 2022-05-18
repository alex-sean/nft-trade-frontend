import React from 'react';
import { Button } from '@mui/material';
import useStyles from '../../styles/styles';

function SecondaryButton(props) {
  const { text } = props;
  const classes = useStyles();
  
  return (
    <Button className={classes.secondaryButton}
      >
      {text}
    </Button>
  );
}

export default SecondaryButton;