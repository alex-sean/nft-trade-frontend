import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Grid,
  Container,
  InputLabel,
  OutlinedInput,
  Checkbox,
  FormControlLabel,
  Paper,
  Avatar,
  TextareaAutosize,
  Select,
  MenuItem
} from '@mui/material';
import useStyles from '../styles/styles';
import DraftsOutlinedIcon from '@mui/icons-material/DraftsOutlined';
import LocalPhoneTwoToneIcon from '@mui/icons-material/LocalPhoneTwoTone';
import RoomTwoToneIcon from '@mui/icons-material/RoomTwoTone';
import { validate } from 'email-validator';
import Alert from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const ContactForm = () => {
  const classes = useStyles();
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [type, setType] = useState('');
  const [message, setMessage] = useState('');
  const [isInit, setIsInit] = useState(true);
  const [errMsg, setErrMsg] = useState('')
  const [checked, setChecked] = useState(false);

  const handleChecked = (event) => {
    setChecked(event.target.checked);
  };

  const submitForm = (e) => {
    setIsInit(false)

    if (!checked){
      setErrMsg('Please check Term of service.')
      e.preventDefault();
      return
    }
    if (!firstName){
      setErrMsg('Please enter your name.')
      e.preventDefault();
      return
    }
    if (!message){
      setErrMsg('Please enter your message.')
      e.preventDefault();
      return
    }
    if (!validate(email)){
      setErrMsg('Please enter valid e-mail.')
      e.preventDefault();
      return
    }
    setErrMsg('')

    fetch(`${process.env.REACT_APP_SERVER_URL}/contact/add`, {
      method: "POST",
      headers : {'Content-Type' : 'application/x-www-form-urlencoded'},
      body: `name=${firstName}&email=${email}&type=${type}&content=${message}`,
    }).then((response) => (response.json())).then((response)=> {
      setFirstName('')
      setEmail('')
      setType('')
      setMessage('')
      setErrMsg('Success sent.')
    }, err => {setErrMsg('Network error. Please try again later.')})
  };

  return (
    <Box className={classes.gradientBackground}>
      <Container maxWidth='lg'>
        <Grid p={5} container spacing={5}>
          <Grid item xs={12} md>
            <Box
              component="form"
              noValidate
              autoComplete="off"
            >
              <Typography variant='h6'>Contact Us</Typography>
              <Typography className={classes.para} variant='body1'>Have a question? Need help? Don't hesitate, drop us a line</Typography>

              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <InputLabel htmlFor="username" sx={{marginTop: '20px', fontWeight: '700'}}>
                    Name<span style={{color:'red'}}>*</span></InputLabel>
                  <OutlinedInput
                    id="username"
                    error={!isInit && !firstName}
                    fullWidth
                    value={firstName}
                    className={classes.paperBackground}
                    onChange={(e) => setFirstName(e.target.value)}/>
                </Grid>
                <Grid item xs={6}>
                  <InputLabel htmlFor="email" sx={{marginTop: '20px', fontWeight: '700'}}>
                    Email<span style={{color:'red'}}>*</span></InputLabel>
                  <OutlinedInput
                    id="email"
                    error={!isInit && !validate(email)}
                    fullWidth
                    value={email}
                    className={classes.paperBackground}
                    onChange={(e) => setEmail(e.target.value)}/>
                </Grid>
              </Grid>

              <InputLabel htmlFor="type" sx={{marginTop: '20px', fontWeight: '700'}}>
                Type</InputLabel>
              <Select
                  fullWidth
                  id="type"
                  value={type}
                  displayEmpty
                  className={classes.paperBackground}
                  onChange={e => setType(e.target.value)}
                  inputProps={{ 'aria-label': 'Without label' }}
                >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem>
              </Select>

              <InputLabel htmlFor="message" sx={{marginTop: '20px', fontWeight: '700'}}>
                Message<span style={{color:'red'}}>*</span></InputLabel>
              <TextareaAutosize
                id="message"
                error={!isInit && !message}
                aria-label="minimum height"
                minRows={6}
                spellCheck
                value={message}
                className={classes.paperBackground}
                onChange={(e) => setMessage(e.target.value)}
                style={{width: '100%'}}
              />

              <FormControlLabel control={<Checkbox checked={checked} onChange={handleChecked} />} sx={{width: '100%'}}
                label={<span>I agree to the <span style={{color: '#8258ff'}}>Terms of Service</span></span>} />
              <Button
                variant="contained"
                color="primary"
                className={classes.primaryButton}
                onClick={submitForm}
              >
                Submit
              </Button>
              <Collapse in={errMsg}>
                <Alert severity={`${errMsg==='Success sent.' ? 'success' : "error"}`}
                  action={
                    <IconButton
                      aria-label="close"
                      color="inherit"
                      size="small"
                      onClick={() => {
                        setErrMsg('');
                      }}
                    >
                      <CloseIcon fontSize="inherit" />
                    </IconButton>
                  }
                  sx={{ mb: 2 }}
                >
                  {errMsg}
                </Alert>
              </Collapse>
            </Box>
          </Grid>
          <Grid item md>
            <Box pl={3}>
              <Typography variant='h6'>Information</Typography>
              <Typography className={classes.para} variant='body1'>Don't hesitaste, drop us a line Collaboratively administrate channels whereas virtual. Objectively seize scalable metrics whereas proactive e-services.</Typography>
              <Paper className={classes.paperBackground} elevation={1} sx={{p: 2, mt: 3,maxWidth: 740, borderRadius: '20px'}}>
                <Box className={`${classes.displayFlex}`}>
                  <Avatar>
                    <LocalPhoneTwoToneIcon /> 
                  </Avatar>
                  <Box p={2} >
                    <Typography className={classes.link}>Phone</Typography>
                    <Typography variant='body2'>(123) 123-456</Typography>
                  </Box>
                </Box>
                <Box className={`${classes.displayFlex}`}>
                  <Avatar>
                    <RoomTwoToneIcon /> 
                  </Avatar>
                  <Box p={2} >
                    <Typography className={classes.link}>Phone</Typography>
                    <Typography variant='body2'>(123) 123-456</Typography>
                  </Box>
                </Box>
                <Box className={`${classes.displayFlex}`}>
                  <Avatar>
                    <DraftsOutlinedIcon /> 
                  </Avatar>
                  <Box p={2} >
                    <Typography className={classes.link}>Phone</Typography>
                    <Typography variant='body2'>(123) 123-456</Typography>
                  </Box>
                </Box>
              </Paper>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default ContactForm;