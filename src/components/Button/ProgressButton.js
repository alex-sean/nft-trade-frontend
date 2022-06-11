import React from 'react';
import { Button } from '@mui/material';
import useStyles from '../../styles/styles';

function PrimaryButton(props) {
  const classes = useStyles();
  const { text } = props;

  return (
    <Button className={classes.modalProgressBtn}
      >
      {text}
    </Button>
  );
}

export default PrimaryButton;