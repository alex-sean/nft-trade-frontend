import React, { useRef } from 'react';
import { Grid, Typography, Container, Box, Link, Button } from '@mui/material';
import useStyles from '../styles/styles';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Icon } from '@iconify/react';
import CollectionPopup1 from '../components/CollectionPopup1';
import CollectionPopup2 from '../components/CollectionPopup2';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { ClassNames } from '@emotion/react';

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