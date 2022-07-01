import React, { useRef, useState, useEffect } from 'react';
import {
  Box,
  Typography,
  TextareaAutosize,
  Button,
  Grid,
  Avatar,
  InputLabel, InputAdornment, OutlinedInput,
  Container
} from '@mui/material';
import useStyles from '../styles/styles';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LanguageIcon from '@mui/icons-material/Language';
import { useWalletContext } from '../hooks/useWalletContext';
import { useLoadingContext } from '../hooks/useLoadingContext';
import { getUserInfo, addUserInfo, updateUserInfo } from '../adapters/backend';
import { toast } from 'react-toastify';
import { validate } from 'email-validator';

const ProfileForm = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [twitterAccount, setTwitterAccount] = useState('');
  const [instagramAccount, setInstagramAccount] = useState('');
  const [ownUrl, setOwnUrl] = useState('');
  const [avatar, setAvatar] = useState(null);
  const [avatarFile, setAvatarFile] = useState(null)
  const [background, setBackground] = useState(null);
  const [backgroundFile, setBackgroundFile] = useState(null)

  const classes = useStyles();

  const { account } = useWalletContext();
  const { setLoading } = useLoadingContext();

  const [registered, setRegistered] = useState(false);

  const avatarInputFile = useRef(null);
  const backgroundInputFile = useRef(null);

  const openAvatarSelectionDlg = () => {
    // `current` points to the mounted file input element
    avatarInputFile.current.click();
  };

  const openBackgroundSelectionDlg = () => {
    // `current` points to the mounted file input element
    backgroundInputFile.current.click();
  };

  const onAvatarChanged = (e) => {
    setAvatarFile(e.target.files[0]);
  }

  const onBackgroundChanged = (e) => {
    setBackgroundFile(e.target.files[0]);
  }

  const getAvatarUrl = () => {
    if (avatarFile) {
      return URL.createObjectURL(avatarFile);
    }

    if (avatar) {
      return `${process.env.REACT_APP_AVATAR_PATH}/${avatar}`;
    }

    return 'images/user/user_avatar.gif';
  }

  const getBackgroundUrl = () => {
    if (backgroundFile) {
      return URL.createObjectURL(backgroundFile);
    }

    if (background) {
      return `${process.env.REACT_APP_BACKGROUND_PATH}/${background}`;
    }

    return 'images/user/banner.jpg';
  }

  const getAccountInfo = async () => {
    setLoading(true);

    try {
      let userInfo = await getUserInfo(account);
      if (userInfo) {
        setRegistered(true);

        setName(userInfo.name);
        setEmail(userInfo.email);
        setMessage(userInfo.description);
        setTwitterAccount(userInfo.twitter_account? userInfo.twitter_account: '');
        setInstagramAccount(userInfo.instagram_account? userInfo.instagram_account: '');
        setOwnUrl(userInfo.own_url? userInfo.own_url: '');
        setAvatar(userInfo.avatar? userInfo.avatar: null);
        setBackground(userInfo.background? userInfo.background: null);
      }
    } catch (err) {
      console.log(err);
    }

    setLoading(false);
  }

  const handleRegister = async () => {
    setLoading(true);

    try {
      const res = await addUserInfo(name, email, message, account, twitterAccount, instagramAccount, ownUrl, avatarFile, backgroundFile);
      if (res) {
        toast('Profile has been updated successfully!');
      } else {
        toast('Updating profile has been failed!');
      }
    } catch (err) {
      console.log(err);
      toast('Updating profile has been failed!');
    }

    setLoading(false);
  }

  const handleUpdate = async () => {
    setLoading(true);

    try {
      const res = await updateUserInfo(name, email, message, account, twitterAccount, instagramAccount, ownUrl, avatarFile, backgroundFile);
      if (res) {
        toast('Profile has been updated successfully!');
      } else {
        toast('Updating profile has been failed!');
      }
    } catch (err) {
      console.log(err);
      toast('Updating profile has been failed!');
    }

    setLoading(false);
  }

  const handleProcessProfile = () => {
    if (!name) {
      toast('Please input the name!');
      return;
    }

    if (!message) {
      toast('Please input the message!');
      return;
    }

    if (!email) {
      toast('Please input the email address!');
      return;
    }

    if (!validate(email)) {
      toast('Please input correct email address!');
      return;
    }

    if (!twitterAccount && instagramAccount && !ownUrl) {
      toast('Please input a social account!');
      return;
    }

    if (registered) {
      handleUpdate();
    } else {
      handleRegister();
    }
  }

  useEffect(() => {
    if (account === '') return;

    getAccountInfo();
  }, [account])

  return [
    <Box key={1} sx={{height:'300px', backgroundImage:`url(${getBackgroundUrl()})`, position: 'relative'}}>
      <Container maxWidth="lg">
        <input type='file' id='background' ref={backgroundInputFile} style={{display: 'none'}} onChange={onBackgroundChanged} accept="image/*"/>
        <Button startIcon={<EditOutlinedIcon />} className={classes.commonButton}
                sx={{position: 'absolute', right: '10%', bottom: '16px',}}
                onClick={openBackgroundSelectionDlg}>
          Edit Cover Photo
        </Button>
      </Container>
    </Box>,
    <Box key={2} className={classes.formContainer}>
      <Grid container spacing={5}>
        <Grid item xs={12} md>
          <Box
            noValidate
            autoComplete="off"
          >
            <InputLabel htmlFor="username" sx={{fontWeight: '700'}}>
              Username<span style={{color:'red'}}>*</span></InputLabel>
            <OutlinedInput placeholder="Enter username"
              id="username"
              fullWidth
              value={name}
              className={classes.paperBackground}
              onChange={(e) => setName(e.target.value)}/>

            <InputLabel htmlFor="bio" sx={{marginTop: '20px', fontWeight: '700'}}>
              Bio<span style={{color:'red'}}>*</span></InputLabel>
            <TextareaAutosize
              id="bio"
              aria-label="minimum height"
              minRows={6}
              placeholder="Tell the world your story!"
              spellCheck
              value={message}
              className={classes.paperBackground}
              onChange={(e) => setMessage(e.target.value)}
              style={{width: '100%'}}
            />

            <InputLabel htmlFor="email" sx={{marginTop: '20px', fontWeight: '700'}}>
              Email address<span style={{color:'red'}}>*</span></InputLabel>
            <OutlinedInput placeholder="Enter email" 
              id="email"
              fullWidth
              value={email}
              className={classes.paperBackground}
              onChange={(e) => setEmail(e.target.value)}/>

            <InputLabel htmlFor="link" sx={{marginTop: '20px', fontWeight: '700'}}>
              Links<span style={{color:'red'}}>*</span></InputLabel>
            <OutlinedInput
              id="link"
              placeholder="@twittername"
              className={classes.paperBackground}
              value={twitterAccount}
              onChange={(e) => setTwitterAccount(e.target.value)}
              startAdornment={
                <InputAdornment position="start">
                  <TwitterIcon />
                </InputAdornment>
              }/>
            <OutlinedInput
              placeholder="instagramname"
              className={classes.paperBackground}
              value={instagramAccount}
              onChange={(e) => setInstagramAccount(e.target.value)}
              startAdornment={
                <InputAdornment position="start">
                  <InstagramIcon />
                </InputAdornment>
              }/>
            <OutlinedInput
              placeholder="yoursitename.com"
              className={classes.paperBackground}
              value={ownUrl}
              onChange={(e) => setOwnUrl(e.target.value)}
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
              className={classes.paperBackground}
              value={account} 
              disabled
            />

            <Button
              variant="contained"
              type="submit"
              color="primary"
              className={`${classes.primaryButton} ${classes.paperBackground}`}
              onClick={handleProcessProfile}
            >
              Update Profile
            </Button>
          </Box>
        </Grid>
        <Grid item md>
          <input type='file' id='avatar' ref={avatarInputFile} style={{display: 'none'}} onChange={onAvatarChanged} accept="image/*"/>
          <Box display='flex' justifyContent="flex-start" alignItems="center">
            <Box sx={{position: 'relative'}}>
              <img src={getAvatarUrl()} style={{margin: 'auto', borderRadius: '10px', maxWidth: '150px'}}></img>
              <Avatar sx={{position: 'absolute', right: '-10px', bottom: '-10px', background:'#fff', border: 'solid 1px gray', color: 'gray'}} onClick={openAvatarSelectionDlg}>
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
  ]
};

export default ProfileForm;