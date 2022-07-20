import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  TextareaAutosize,
  Button,
} from '@mui/material';
import useStyles from '../styles/styles';
import { subscribe } from '../adapters/backend';
import { toast } from 'react-toastify';
import { validate } from 'email-validator';

const Subscribe = () => {
  const [email, setEmail] = useState('');
  const classes = useStyles();

  const submitForm = (e) => {
    e.preventDefault();
    if (!validate(email)) {
      toast('Please input valid email addrss.')
      return
    }
    subscribe(email).then(res => {
      toast('Subscribed!');
      setEmail('')
    }, err => {
      throw new Error(err);
    })
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

      <TextField  className="inputRounded" value={email} onChange={e => setEmail(e.target.value)}
                  sx={{ display: 'flex', alignItems: 'center', marginTop: '20px' }}
        placeholder="Email address"
        InputProps={{endAdornment: <SubscribeButton />}}
      />      
    </Box>
  );
};

export default Subscribe;