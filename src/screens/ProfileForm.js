import React, { useRef, useState } from 'react';
import {
  Box,
  Typography,
  TextareaAutosize,
  Button,
  Grid,
  Avatar,
  InputLabel, InputAdornment, OutlinedInput
} from '@mui/material';
import useStyles from '../styles/styles';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LanguageIcon from '@mui/icons-material/Language';

const ProfileForm = () => {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const classes = useStyles();

  const inputFile = useRef(null) 
  const onButtonClick = () => {
    // `current` points to the mounted file input element
   inputFile.current.click();
  };
  
  const submitForm = (e) => {
    e.preventDefault();
    console.log({ email, firstName, subject, message });
  };

  return (
    <Box className={classes.formContainer}>
      <Grid container spacing={5}>
        <Grid item xs={12} md>
          <Box
            component="form"
            noValidate
            autoComplete="off"
          >
            <InputLabel htmlFor="username" sx={{fontWeight: '700'}}>
              Username<span style={{color:'red'}}>*</span></InputLabel>
            <OutlinedInput placeholder="Enter username"
              id="username"
              fullWidth
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}/>

            <InputLabel htmlFor="bio" sx={{marginTop: '20px', fontWeight: '700'}}>
              Bio<span style={{color:'red'}}>*</span></InputLabel>
            <TextareaAutosize
              id="bio"
              aria-label="minimum height"
              minRows={6}
              placeholder="Tell the world your story!"
              spellCheck
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              sx={{width: '100%'}}
            />

            <InputLabel htmlFor="email" sx={{marginTop: '20px', fontWeight: '700'}}>
              Email address<span style={{color:'red'}}>*</span></InputLabel>
            <OutlinedInput placeholder="Enter email" 
              id="email"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}/>

            <InputLabel htmlFor="link" sx={{marginTop: '20px', fontWeight: '700'}}>
              Links<span style={{color:'red'}}>*</span></InputLabel>
            <OutlinedInput
              id="link"
              placeholder="@twittername"
              startAdornment={
                <InputAdornment position="start">
                  <TwitterIcon />
                </InputAdornment>
              }/>
            <OutlinedInput
              placeholder="instagramname"
              startAdornment={
                <InputAdornment position="start">
                  <InstagramIcon />
                </InputAdornment>
              }/>
            <OutlinedInput
              placeholder="yoursitename.com"
              startAdornment={
                <InputAdornment position="start">
                  <LanguageIcon />
                </InputAdornment>
              }/>

            <InputLabel htmlFor="wallet" sx={{marginTop: '20px', fontWeight: '700'}}>
              Wallet address</InputLabel>
            <OutlinedInput placeholder="Enter wallet address"
              id="wallet"
              fullWidth
              value='0x7a9fe22691c811ea339401bbb2leb' />

            <Button
              variant="contained"
              type="submit"
              color="primary"
              className={classes.primaryButton}
              onClick={submitForm}
            >
              Update Profile
            </Button>
          </Box>
        </Grid>
        <Grid item md>
          <input type='file' id='file' ref={inputFile} style={{display: 'none'}}/>
          <Box display='flex' justifyContent="flex-start" alignItems="center">
            <Box sx={{position: 'relative'}}>
              <img src='images/user/user_avatar.gif' style={{margin: 'auto', borderRadius: '10px'}}></img>
              <Avatar sx={{position: 'absolute', right: '-10px', bottom: '-10px', background:'#fff', border: 'solid 1px gray', color: 'gray'}} onClick={onButtonClick}>
                <EditOutlinedIcon />
              </Avatar>
            </Box>
            <Box pl={3}>
              <Typography variant='h6'>Profile Image</Typography>
              <Typography variant='body1'>We recommend an image of at least 300x300. Gifs work too. Max 5mb.</Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
      
    </Box>
  );
};

export default ProfileForm;