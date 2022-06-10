import React, { useRef } from 'react';
import { Typography, Box, Grid, Container, Paper, Avatar } from '@mui/material';
import useStyles from '../styles/styles';
import { useWalletContext } from '../hooks/useWalletContext';
import { WALLET_TYPE } from '../common/const';

export default function WalletPage(){
  const classes = useStyles();

  const { handleConnect } = useWalletContext();

  return (
    <>
      <Box sx={{height:'235px', backgroundImage:'url(images/page-title/knowledge_base_banner.jpg)', justifyContent: 'center', display: 'flex', alignItems: 'center'}}>
        <Typography variant='h4' color="#fff">Connect your wallet</Typography>
      </Box>
      <Box className={classes.gradientBackground}>
        <Container maxWidth='lg'>
          <Grid py={5} container spacing={8}>
            <Grid item xs={12} md={4}>
              <Paper className={classes.hoverShadow} elevation={1} sx={{textAlign: 'center', borderRadius: '15px', position: 'relative', minHeight: '200px'}}
                onClick={() => handleConnect(WALLET_TYPE.METAMASK)}
              >
                <Avatar src="images/wallets/metamask.svg" 
                        sx={{width: '72px', height: 'auto', position: 'absolute', top: '-36px', right: 'calc(50% - 36px)', border: 'solid 1px lightgray', background: '#fff'}}></Avatar>
                <Typography pt={5} variant='h6'>Metamask</Typography>
                <Typography p={2} variant='body1' paragraph>Start exploring blockchain applications in seconds. Trusted by over 1 million users worldwide.</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper className={classes.hoverShadow} elevation={1} sx={{textAlign: 'center', borderRadius: '15px', position: 'relative', minHeight: '200px'}}>
                <Avatar src="images/wallets/coinbase.svg" 
                        sx={{width: '72px', height: 'auto', position: 'absolute', top: '-36px', right: 'calc(50% - 36px)', border: 'solid 1px lightgray', background: '#fff'}}></Avatar>
                <Typography pt={5} variant='h6'>Coinbase</Typography>
                <Typography p={2} variant='body1' paragraph>The easiest and most secure crypto wallet. ... No Coinbase account required.</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper className={classes.hoverShadow} elevation={1} sx={{textAlign: 'center', borderRadius: '15px', position: 'relative', minHeight: '200px'}}>
                <Avatar src="images/wallets/wallet_connect.svg" 
                        sx={{width: '72px', height: 'auto', position: 'absolute', top: '-36px', right: 'calc(50% - 36px)', border: 'solid 1px lightgray', background: '#fff'}}></Avatar>
                <Typography pt={5} variant='h6'>Wallet Connect</Typography>
                <Typography p={2} variant='body1' paragraph>Open source protocol for connecting decentralised applications to mobile wallets.</Typography>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};