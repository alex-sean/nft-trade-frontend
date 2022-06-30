import React, { useEffect, useState } from 'react';
import { Grid, Typography, Box, Divider, Button, Card, CardActions, CardContent } from '@mui/material';
import useStyles from '../styles/styles';
import { Icon } from '@iconify/react';
import { LIST_TYPE } from '../common/const';
import { useWalletContext } from '../hooks/useWalletContext';
import SellDialog from '../components/Dialog/SellDialog';
import OfferDialog from '../components/Dialog/OfferDialog';
import CancelOfferProgressDlg from '../components/Dialog/CancelOfferProgressDlg';
import CancelSellProgressDlg from '../components/Dialog/CancelSellProgressDlg';

export default function ItemBid(props) {
  const classes = useStyles();

  const { tokenInfo, serviceFee } = props;

  const { account } = useWalletContext();

  const [showOfferDlg, setShowOfferDlg] = useState(false);
  const [showCancelOfferDlg, setShowCancelOfferDlg] = useState(false);
  const [showSellDlg, setShowSellDlg] = useState(false);
  const [showCancelSellDlg, setShowCancelSellDlg] = useState(false);

  const [offerAsset, setOfferAsset] = useState('');

  const showItemButtons = () => {
    if (!tokenInfo) {
      return;
    }

    if (tokenInfo.token.listed) {
      if (tokenInfo.token.listType === LIST_TYPE.FIXED_PRICE) {
        return (
          <Button className={classes.primaryButton} sx={{width: '100%'}} onClick={() => setShowCancelSellDlg(true)}>
            Cancel Sell
          </Button>
        )
      } else if (tokenInfo.token.listType === LIST_TYPE.AUCTION) {
        if (tokenInfo.token.auctionEndTime > Date.now()) {
          return (
            <Button className={classes.primaryButton} sx={{width: '100%'}}>
              Cancel Sell
            </Button>
          )  
        } else {
          return (
            <Button className={classes.primaryButton} sx={{width: '100%'}}>
              Complete Auction
            </Button>
          )
        }
      } else {
        return;
      }
    } else {
      if (tokenInfo.token.owner === account.toLowerCase()) {
        return (
          <Button className={classes.primaryButton} sx={{width: '100%'}} onClick={() => setShowSellDlg(true)}>
            Sell Token
          </Button>
        )
      } else {
        if (offerAsset) {
          return (
            <Button className={classes.primaryButton} sx={{width: '100%'}} onClick={() => setShowCancelOfferDlg(true)}>
              Cancel Offer
            </Button>
          )
        }

        return (
          <Button className={classes.primaryButton} sx={{width: '100%'}} onClick={() => setShowOfferDlg(true)}>
            Offer
          </Button>
        )
      }
    }
  }

  useEffect(() => {
    if (!tokenInfo) {
      return;
    }

    for (let i in tokenInfo.offers) {
      if (tokenInfo.offers[i].buyer === account.toLowerCase()) {
        setOfferAsset(tokenInfo.offers[i].asset);
      }
    }
  }, [tokenInfo])

  return (
    <>
      <Card container className={classes.paperBackground}>
        {
          tokenInfo && tokenInfo.token.listType === LIST_TYPE.AUCTION &&
          <CardContent>
            <Grid container spacing={2} p={2}>
              <Grid item xs={12} md={6}>
                <Box>
                  <Typography noWrap>
                    Highest bid by 0x695d2ef170ce69e794707eeef9497af2de25df82
                  </Typography>
                </Box>
                <Grid container spacing={3} pt={2}>
                  <Grid item xs='auto'>
                    <img src='images/avatars/avatar_4.jpg' style={{borderRadius: '12px'}}/>
                  </Grid>
                  <Grid item>
                    <Box sx={{display:'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                      <Icon icon="logos:ethereum" rotate={2} hFlip={true} vFlip={true} />
                      <Typography color="rgb(16, 185, 129)">4.7 ETH</Typography>
                    </Box>
                    <Typography noWrap>~10,864.10</Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Divider orientation="vertical" flexItem/>
              <Grid item xs={12} md={5}>
                <Box>
                  <Typography noWrap>
                    Auction ends in
                  </Typography>
                </Box>
                <Grid container spacing={3} pt={2}>
                  <Grid item xs={3}>
                    <Typography noWrap variant="body2">106</Typography>
                    <Typography noWrap variant="body1">Days</Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography noWrap variant="body2">09</Typography>
                    <Typography noWrap variant="body1">Hrs</Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography noWrap variant="body2">21</Typography>
                    <Typography noWrap variant="body1">Min</Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography noWrap variant="body2">23</Typography>
                    <Typography noWrap variant="body1">Sec</Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </CardContent>
        }
        <CardActions>
          {
            showItemButtons()
          }
        </CardActions>
      </Card>
      <SellDialog visible={false}/>
      <OfferDialog visible={showOfferDlg} tokenInfo={tokenInfo} setVisibility={setShowOfferDlg}/>
      <CancelOfferProgressDlg open={showCancelOfferDlg} asset={offerAsset} handleOpenDialog={setShowCancelOfferDlg} token={tokenInfo? tokenInfo.token: null}/>
      <SellDialog open={showSellDlg} setOpen={setShowSellDlg} serviceFee={serviceFee} token={tokenInfo? tokenInfo.token: null}/>
      <CancelSellProgressDlg open={showCancelSellDlg} handleOpenDialog={setShowCancelOfferDlg} token={tokenInfo? tokenInfo.token: null}/>
    </>
  );
}