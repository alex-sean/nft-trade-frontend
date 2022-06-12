import React from 'react';
import { Button } from '@mui/material';
import useStyles from '../../styles/styles';
import { PROGRESS_BTN_STATUS } from '../../common/const';

function ProgressButton(props) {
  const classes = useStyles();
  const { text, status } = props;

  const getClassName = (status) => {
    switch (status) {
      case PROGRESS_BTN_STATUS.NOT_PROCESSED:
        return classes.modalProgressBtn;
      case PROGRESS_BTN_STATUS.PROCESSING:
        return classes.modalProgressBtn;
      case PROGRESS_BTN_STATUS.PROCESSED:
        return classes.modalProgressProcessedBtn;
    }
  }

  return (
    <Button 
      className={getClassName(status)}
      disabled={status === PROGRESS_BTN_STATUS.PROCESSING? false: true}
    >
      {text}
    </Button>
  );
}

export default ProgressButton;