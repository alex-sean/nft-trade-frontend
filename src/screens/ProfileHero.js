import React, { useEffect, useRef, useState } from 'react';
import { Container, Box, Button } from '@mui/material';
import useStyles from '../styles/styles';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { useWalletContext } from '../hooks/useWalletContext';
import { getUserInfo, uploadBackground } from '../adapters/backend';

export default function ProfileHero() {
  const [background, setBackground] = useState(null);
  const [backgroundFile, setBackgroundFile] = useState(null);

  const { account } = useWalletContext();

  const classes = useStyles();
  const inputFile = useRef(null) 
  const openBackgroundSelectionDlg = () => {
    // `current` points to the mounted file input element
    inputFile.current.click();
  };

  const onBackgroundChanged = (e) => {
    setBackgroundFile(e.target.files[0]);
  }

  const getAccountInfo = async () => {
    try {
      let userInfo = await getUserInfo(account);
      if (userInfo) {
        setBackground(userInfo.background? userInfo.background: null);
      }
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getAccountInfo();
  }, [account])

  return (
    <>
      <Box sx={{height:'300px', backgroundImage:'url(images/user/banner.jpg)', position: 'relative'}}>
        <Container maxWidth="lg">
          <input type='file' id='file' ref={inputFile} style={{display: 'none'}} onChange={onBackgroundChanged}/>
          <Button startIcon={<EditOutlinedIcon />} className={classes.commonButton}
                  sx={{position: 'absolute', right: '10%', bottom: '16px',}}
                  onClick={openBackgroundSelectionDlg}>
            Edit Cover Photo
          </Button>
        </Container>
      </Box>
      
    </>
  );
};