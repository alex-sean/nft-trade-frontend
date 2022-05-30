import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  TextareaAutosize,
  Button,
} from '@mui/material';
import useStyles from '../styles/styles';

const Subscribe = () => {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const classes = useStyles();

  const submitForm = (e) => {
    e.preventDefault();
    console.log({ email, firstName, subject, message });
  };
  const SubscribeButton = () => (
    <Button
      variant="contained"
      type="submit"
      color="primary"
      sx={{ width: '180px', fontSize: '.875rem', borderRadius: '20px', background: '#8358ff', '&:hover': {backgroundColor: '#8358ff'}, fontWeight: 'bold'}}
      onClick={submitForm}
    >
      Subscribe
    </Button>
  )
  return (
    <Box className={classes.formContainer}>
      <Typography className={classes.formHeading}>
        Join our mailing list to stay in the loop with our newest feature releases, NFT drops, and tips and tricks for navigating Xhibiter
      </Typography>

      <TextField  className="inputRounded" 
                  sx={{ display: 'flex', alignItems: 'center', marginTop: '20px' }}
        placeholder="Email address"
        InputProps={{endAdornment: <SubscribeButton />}}
      />      
    </Box>
  );
};

export default Subscribe;