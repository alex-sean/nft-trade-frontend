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
  FormControl,
  Select,
  MenuItem
} from '@mui/material';
import useStyles from '../styles/styles';
import DraftsOutlinedIcon from '@mui/icons-material/DraftsOutlined';
import LocalPhoneTwoToneIcon from '@mui/icons-material/LocalPhoneTwoTone';
import RoomTwoToneIcon from '@mui/icons-material/RoomTwoTone';

const ContactForm = () => {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const classes = useStyles();

  const submitForm = (e) => {
    e.preventDefault();
    console.log({ email, firstName, subject, message });
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
              <Typography variant='body1'>Have a question? Need help? Don't hesitate, drop us a line</Typography>

              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <InputLabel htmlFor="username" sx={{marginTop: '20px', fontWeight: '700'}}>
                    Name<span style={{color:'red'}}>*</span></InputLabel>
                  <OutlinedInput
                    id="username"
                    fullWidth
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}/>
                </Grid>
                <Grid item xs={6}>
                  <InputLabel htmlFor="email" sx={{marginTop: '20px', fontWeight: '700'}}>
                    Email<span style={{color:'red'}}>*</span></InputLabel>
                  <OutlinedInput
                    id="email"
                    fullWidth
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}/>
                </Grid>
              </Grid>

              <InputLabel htmlFor="type" sx={{marginTop: '20px', fontWeight: '700'}}>
                Email</InputLabel>
                <Select
                    fullWidth
                    id="type"
                    displayEmpty
                    inputProps={{ 'aria-label': 'Without label' }}
                  >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={10}>Type A</MenuItem>
                  <MenuItem value={20}>Type B</MenuItem>
                  <MenuItem value={30}>Type C</MenuItem>
                </Select>

              <InputLabel htmlFor="message" sx={{marginTop: '20px', fontWeight: '700'}}>
                Message<span style={{color:'red'}}>*</span></InputLabel>
              <textarea
                id="message"
                aria-label="minimum height"
                rows={6}
                spellCheck
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                style={{width: '100%'}}
              />

              <FormControlLabel control={<Checkbox defaultChecked />} sx={{width: '100%'}}
                label={<span>I agree to the <span style={{color: '#8258ff'}}>Terms of Service</span></span>} />
              <Button
                variant="contained"
                type="submit"
                color="primary"
                className={classes.primaryButton}
                onClick={submitForm}
              >
                Submit
              </Button>
            </Box>
          </Grid>
          <Grid item md>
            <Box pl={3}>
              <Typography variant='h6'>Information</Typography>
              <Typography variant='body1'>Don't hesitaste, drop us a line Collaboratively administrate channels whereas virtual. Objectively seize scalable metrics whereas proactive e-services.</Typography>
              <Paper elevation={3} sx={{p: 2, mt: 3,maxWidth: 740, borderRadius: '20px'}}>
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