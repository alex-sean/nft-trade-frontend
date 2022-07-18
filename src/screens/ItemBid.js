import React, { useEffect, useState } from 'react';
import { Grid, Typography, Box, Divider, Button, Card, CardActions, CardContent } from '@mui/material';
import useStyles from '../styles/styles';
import { Icon } from '@iconify/react';
import { BASE_CURRENCY_TYPE, LIST_TYPE } from '../common/const';
import { useWalletContext } from '../hooks/useWalletContext';
import SellDialog from '../components/Dialog/SellDialog';
import OfferDialog from '../components/Dialog/OfferDialog';
import CancelOfferProgressDlg from '../components/Dialog/CancelOfferProgressDlg';
import CancelSellProgressDlg from '../components/Dialog/CancelSellProgressDlg';
import BuyFixedPriceTokenDlg from '../components/Dialog/BuyFixedPriceTokenDlg';
import BidDialog from '../components/Dialog/BidDialog';
import { getAssetName, getUSDPrice } from '../common/CommonUtils';
import Web3 from 'web3';
import CancelBidProgressDlg from '../components/Dialog/CancelBidProgressDlg';
import AuctionCompleteProgressDlg from '../components/Dialog/AuctionCompleteProgressDlg';

export default function ItemBid(props) {
  const classes = useStyles();

  const { tokenInfo, serviceFee, rates } = props;

  const { account } = useWalletContext();

  const [showOfferDlg, setShowOfferDlg] = useState(false);
  const [showCancelOfferDlg, setShowCancelOfferDlg] = useState(false);
  const [showSellDlg, setShowSellDlg] = useState(false);
  const [showCancelSellDlg, setShowCancelSellDlg] = useState(false);
  const [showBuyFixedPriceDlg, setShowBuyFixedPriceDlg] = useState(false);
  const [showBidDlg, setShowBidDlg] = useState(false);
  const [showCancelBidProgressDlg, setShowCancelBidProgressDlg] = useState(false);
  const [showCompleteAuctionProgressDlg, setShowCompleteAuctionProgressDlg] = useState(false);

  const [highestBidIndex, setHighestBidIndex] = useState(-1);
  const [offerAsset, setOfferAsset] = useState('');
  const [myBidAsset, setMyBidAsset] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [leftDay, setLeftDay] = useState(0);
  const [leftHour, setLeftHour] = useState(0);
  const [leftMin, setLeftMin] = useState(0);
  const [leftSec, setLeftSec] = useState(0);

  const [intervalID, setIntervalID] = useState(0);

  const showItemButtons = () => {
    if (!tokenInfo) {
      return;
    }

    if (tokenInfo.token.listed) {
      if (tokenInfo.token.owner === account.toLowerCase()) {
        if (tokenInfo.token.listType === LIST_TYPE.FIXED_PRICE) {
          return (
            <Button className={classes.primaryButton} sx={{width: '100%'}} onClick={() => setShowCancelSellDlg(true)}>
              Cancel List
            </Button>
          )
        } else if (tokenInfo.token.listType === LIST_TYPE.AUCTION) {
          if (tokenInfo.token.auctionEndTime > Date.now() / 1000) {
            return (
              <Button className={classes.primaryButton} sx={{width: '100%'}} onClick={() => setShowCancelSellDlg(true)}>
                Cancel List
              </Button>
            )  
          } else {
            return (
              <Button className={classes.primaryButton} sx={{width: '100%'}} onClick={() => handleCompleteAuction()}>
                Complete Auction
              </Button>
            )
          }
        }
      } else {
        if (tokenInfo.token.listType === LIST_TYPE.FIXED_PRICE) {
          return (
            <Button className={classes.primaryButton} sx={{width: '100%'}} onClick={() => setShowBuyFixedPriceDlg(true)}>
              Buy
            </Button>
          )
        } else if (tokenInfo.token.listType === LIST_TYPE.AUCTION) {
          if (tokenInfo.token.auctionEndTime > Date.now() / 1000) {
            if (isBidded()) {
              return (
                <Button className={classes.primaryButton} sx={{width: '100%'}} onClick={() => setShowCancelBidProgressDlg(true)}>
                  Cancel Bid
                </Button>
              )
            } else {
              return (
                <Button className={classes.primaryButton} sx={{width: '100%'}} onClick={() => setShowBidDlg(true)}>
                  Bid
                </Button>
              )
            }
          } else {
            if (isBidded()) {
              return (
                <Button className={classes.primaryButton} sx={{width: '100%'}} onClick={() => setShowCancelBidProgressDlg(true)}>
                  Cancel Bid
                </Button>
              )
            } else {
              return (
                <Button className={classes.primaryButton} sx={{width: '100%'}} disabled>
                  Expired
                </Button>
              )
            }
          }
        }
      }
    } else {
      if (tokenInfo.token.owner === account.toLowerCase()) {
        return (
          <Button className={classes.primaryButton} sx={{width: '100%'}} onClick={() => setShowSellDlg(true)}>
            List Token
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

  const isBidded = () => {
    if (!tokenInfo) {
      return false;
    }

    for (let i in tokenInfo.orders) {
      const order = tokenInfo.orders[i];

      if (order.buyer === account.toLowerCase()) {
        return true;
      }
    }

    return false;
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

    if (tokenInfo.token.listType === LIST_TYPE.AUCTION) {
      const intervalID = setInterval(calculateLeftDuration, 1000);
      setIntervalID(intervalID);

      for (let i in tokenInfo.orders) {
        const order = tokenInfo.orders[i];
  
        if (order.buyer === account.toLowerCase()) {
          setMyBidAsset(order.asset);
          return;
        }
      }
    }
  }, [tokenInfo])

  useEffect(() => {
    if (!tokenInfo) {
      return;
    }

    if (rates === {}) {
      return;
    }

    getHighestBid();
  }, [tokenInfo, rates])

  const getHighestBid = () => {
    if (tokenInfo) {
      if (tokenInfo.orders.length === 0) {
        setHighestBidIndex(-1)
      } else {
        let maxUSDPrice = 0;
        let highestIndex = 0;
        tokenInfo.orders.map((order, index) => {
          const usdPrice = getUSDPrice(rates, Web3.utils.fromWei(order.amount + ''), order.asset);
          if (usdPrice > maxUSDPrice) {
            maxUSDPrice = usdPrice;
            highestIndex = index;
          }
        })

        setHighestBidIndex(highestIndex);
      }
    }
  }

  const getHighestBidText = () => {
    if (highestBidIndex === -1) {
      return 'Minimum Bid By Owner';
    } else {
      if (tokenInfo.orders[highestBidIndex].address && tokenInfo.orders[highestBidIndex].address.length) {
        return `Highest Bid By ${tokenInfo.orders[highestBidIndex].address[0].name}`;
      } else {
        return `Highest Bid By ${tokenInfo.orders[highestBidIndex].buyer.slice(0, 13)}`;
      }
    }
  }

  const getHighestBidAmountText = () => {
    if (highestBidIndex === -1) {
      return `...`;
    } else {
      return `${Web3.utils.fromWei(tokenInfo.orders[highestBidIndex].amount + '')} ${getAssetName(tokenInfo.orders[highestBidIndex].asset)}`
    }
  }

  const getHighestBidUSDAmount = () => {
    if (highestBidIndex === -1) {
      if (tokenInfo) {
        if (tokenInfo.token.listed) {
          if (tokenInfo.token.baseCurrencyType === BASE_CURRENCY_TYPE.AVAX) {
            return `$ ${Web3.utils.fromWei(tokenInfo.token.avaxPrice + '')} AVAX`;
          } else {
            return `$ ${Web3.utils.fromWei(tokenInfo.token.usdPrice + '')}`;
          }
        }
      }
    } else {
      return `$ ${getUSDPrice(rates, Web3.utils.fromWei(tokenInfo.orders[highestBidIndex].amount + ''), getAssetName(tokenInfo.orders[highestBidIndex].asset))}`
    }
  }

  const getBidUserAvatar = () => {
    let avatarURL = 'user_avatar.gif';
    if (highestBidIndex === -1) {
      if (tokenInfo && tokenInfo.token.address && tokenInfo.token.address.length > 0) {
        avatarURL = tokenInfo.token.address[0].avatar;
      }
    } else {
      if (tokenInfo.orders[highestBidIndex].address && tokenInfo.orders[highestBidIndex].address.length) {
        avatarURL = tokenInfo.orders[highestBidIndex].address[0].avatar;
      }
    }

    return `${process.env.REACT_APP_AVATAR_PATH}/${avatarURL}`;
  }

  const calculateLeftDuration = () => {
    let leftTS = tokenInfo.token.auctionEndTime - parseInt(Date.now() / 1000);

    if (leftTS < 0) {
      setLeftDay(0);
      setLeftHour(0);
      setLeftMin(0);
      setLeftSec(0);

      clearInterval(intervalID);
      return;
    }

    const tmpLeftSec = leftTS % 60;
    leftTS = Math.floor(leftTS / 60);
    const tmpLeftMin = leftTS % 60;
    leftTS = Math.floor(leftTS / 60);
    const tmpLeftHr = leftTS % 24;
    const tmpLeftDay = Math.floor(leftTS / 24);

    setLeftDay(tmpLeftDay);
    setLeftHour(tmpLeftHr);
    setLeftMin(tmpLeftMin);
    setLeftSec(tmpLeftSec);
  }

  const handleCompleteAuction = (order) => {
    if (order) {
      setSelectedOrder(order);
    } else {
      setSelectedOrder(tokenInfo.orders[highestBidIndex]);
    }

    setShowCompleteAuctionProgressDlg(true);
  }

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
                    {getHighestBidText()}
                  </Typography>
                </Box>
                <Grid container spacing={3} pt={2}>
                  <Grid item xs='auto'>
                    <img src={getBidUserAvatar()} style={{borderRadius: '12px', height: '50px'}}/>
                  </Grid>
                  <Grid item>
                    <Box sx={{display:'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                      {/* <Icon icon="logos:ethereum" rotate={2} hFlip={true} vFlip={true} /> */}
                      <Typography color="rgb(16, 185, 129)">{getHighestBidAmountText()}</Typography>
                    </Box>
                    <Typography noWrap>~{getHighestBidUSDAmount()}</Typography>
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
                    <Typography noWrap variant="body2">{leftDay}</Typography>
                    <Typography noWrap variant="body1">D</Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography noWrap variant="body2">{leftHour}</Typography>
                    <Typography noWrap variant="body1">H</Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography noWrap variant="body2">{leftMin}</Typography>
                    <Typography noWrap variant="body1">M</Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography noWrap variant="body2">{leftSec}</Typography>
                    <Typography noWrap variant="body1">S</Typography>
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
      <CancelSellProgressDlg open={showCancelSellDlg} handleOpenDialog={setShowCancelSellDlg} token={tokenInfo? tokenInfo.token: null}/>
      <BuyFixedPriceTokenDlg open={showBuyFixedPriceDlg} setOpen={setShowBuyFixedPriceDlg} token={tokenInfo? tokenInfo.token: null}/>
      <BidDialog open={showBidDlg} handleOpenDialog={setShowBidDlg} token={tokenInfo? tokenInfo.token: null} rates={rates}/>
      <CancelBidProgressDlg open={showCancelBidProgressDlg} handleOpenDialog={setShowCancelBidProgressDlg} token={tokenInfo? tokenInfo.token: null} asset={myBidAsset}/>
      <AuctionCompleteProgressDlg open={showCompleteAuctionProgressDlg} handleOpenDialog={setShowCompleteAuctionProgressDlg} order={selectedOrder} token={tokenInfo? tokenInfo.token: null}/>
    </>
  );
}