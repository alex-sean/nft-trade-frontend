import React, { useRef } from 'react';
import { Container, Box, Button } from '@mui/material';
import useStyles from '../styles/styles';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

export default function ProfileHero(){
  const classes = useStyles();
  const inputFile = useRef(null) 
  const onButtonClick = () => {
    // `current` points to the mounted file input element
   inputFile.current.click();
  };

  return (
    <>
      <Box sx={{height:'300px', backgroundImage:'url(images/user/banner.jpg)', position: 'relative'}}>
        <Container maxWidth="lg">
          <input type='file' id='file' ref={inputFile} style={{display: 'none'}}/>
          <Button startIcon={<EditOutlinedIcon />} className={classes.commonButton}
                  sx={{position: 'absolute', right: '10%', bottom: '16px',}}
                  onClick={onButtonClick}>
            Edit Cover Photo
          </Button>
        </Container>
      </Box>
      
    </>
  );
};