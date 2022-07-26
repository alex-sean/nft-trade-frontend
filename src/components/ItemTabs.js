import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Typography, Box, Container, Tabs, Tab, Grid, Paper, Button,
         Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import useStyles from '../styles/styles';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import EarbudsIcon from '@mui/icons-material/Earbuds';
import ListAltIcon from '@mui/icons-material/ListAlt';
import StackedLineChartIcon from '@mui/icons-material/StackedLineChart';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import Graph from '../components/Graph'
import DiscountIcon from '@mui/icons-material/Discount';
import GavelIcon from '@mui/icons-material/Gavel';
import ImportExportIcon from '@mui/icons-material/ImportExport';
import InventoryIcon from '@mui/icons-material/Inventory';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { getAssetName, getUSDPrice, getActivityEvent, getActivityIcon, getTimeStr } from '../common/CommonUtils';
import { useWalletContext } from '../hooks/useWalletContext';
import { useLoadingContext } from '../hooks/useLoadingContext';
import Web3 from 'web3';
import AcceptOfferProgressDlg from './Dialog/AcceptOfferProgressDlg';
import { LIST_TYPE, ACTIVITY_TYPE } from '../common/const';
import AuctionCompleteProgressDlg from './Dialog/AuctionCompleteProgressDlg';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getActivitiesByToken } from '../adapters/backend';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export default function ItemTabs(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [filter, setFilter] = React.useState(-1);
  const [properties, setProperties] = useState([]);
  const [offer, setOffer] = useState(null);
  const [showAcceptOfferDlg, setShowAcceptOfferDlg] = useState(false);
  const [showAuctionCompleteProgressDlg, setShowAuctionCompleteProgressDlg] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState();
  const [activities, setActivities] = useState([]);

  const { tokenInfo, rates } = props;

  const { account } = useWalletContext();
  const { setLoading } = useLoadingContext();

  const handleFilter = (event, newFilter) => {
    if (!newFilter)
      newFilter = '0'
    setFilter(newFilter);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    if (!tokenInfo) {
      return;
    }

    setProperties(JSON.parse(tokenInfo.token.tokenURIData).properties);
    setActivities(tokenInfo.activities);
  }, [tokenInfo])

  const getOffererName = (offer) => {
    if (offer.address && offer.address.length > 0) {
      return offer.address[0].name;
    } else {
      return `${offer.buyer.slice(0, 13)}...`;
    }
  }

  const getBidderName = (order) => {
    if (order.address && order.address.length > 0) {
      return order.address[0].name;
    } else {
      return `${order.buyer.slice(0, 13)}...`;
    }
  }

  const handleAcceptOffer = (offer) => {
    setOffer(offer);
    setShowAcceptOfferDlg(true);
  }

  const handleCompleteOrder = (order) => {
    setSelectedOrder(order);
    setShowAuctionCompleteProgressDlg(true);
  }

  const getActivityPrice = (activity) => {
    if (activity.amount) {
      if (activity.asset === 'USD') {
        return `$ ${parseFloat(Web3.utils.fromWei(activity.amount + '')).toFixed(2)}`;
      } else {
        return `${parseFloat(Web3.utils.fromWei(activity.amount + '')).toFixed(4)} ${getAssetName(activity.asset)}`;
      }
    } else {
      return '';
    }
  }

  const refreshActivities = async () => {
    setLoading(true);

    try {
      let activities = await getActivitiesByToken(tokenInfo.token.collectionAddress, tokenInfo.token.tokenID, filter);
      if (!activities) {
        throw new Error('Getting activities failed.');
      }

      setActivities(activities.data.activities);
    } catch (err) {
      console.log(err);
      toast('Getting activities failed.');
    }
    
    setLoading(false);
  }

  useEffect(() => {
    if (filter === -1) {
      return;
    }

    refreshActivities();
  }, [filter])

  return (
    <Container maxWidth="lg">
      <Box display='flex' justifyContent='center'>
        <Tabs value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="icon position tabs example">
          {
            (!tokenInfo || !tokenInfo.token.listed) ?
            <Tab {...a11yProps(0)} icon={<FormatListBulletedIcon />} iconPosition="start" label="Offers" />
            :
            <Tab {...a11yProps(0)} icon={<FormatListBulletedIcon />} iconPosition="start" label="Bids" />
          }
          <Tab {...a11yProps(1)} icon={<EarbudsIcon />} iconPosition="start" label="Properties" />
          <Tab {...a11yProps(2)} icon={<ListAltIcon />} iconPosition="start" label="Details" />
          <Tab {...a11yProps(3)} icon={<StackedLineChartIcon />} iconPosition="start" label="Activity" />
          <Tab {...a11yProps(4)} icon={<AutoGraphIcon />} iconPosition="start" label="Price History" />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0} className={classes.paperBackground}>
        <TableContainer className={classes.paperBackground} component={Paper}>
          <Table sx={{ minWidth: 650, width:'100%' }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Price</TableCell>
                <TableCell align="center">USD Price</TableCell>
                <TableCell align={"center"}>From</TableCell>
                {
                  tokenInfo && tokenInfo.token.owner === account.toLowerCase() &&
                  <TableCell align="center">Action</TableCell>
                }
              </TableRow>
            </TableHead>
            <TableBody>
              {tokenInfo && !tokenInfo.token.listed && tokenInfo.offers.map((offer, index) => (
                <TableRow
                  key={index}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {Web3.utils.fromWei(offer.amount + '')} {getAssetName(offer.asset)}
                  </TableCell>
                  <TableCell align="center">{getUSDPrice(rates, Web3.utils.fromWei(offer.amount + ''), getAssetName(offer.asset))}</TableCell>
                  <TableCell align="center">{getOffererName(offer)}</TableCell>
                  {
                    tokenInfo && tokenInfo.token.owner === account.toLowerCase() &&
                    <TableCell align="center">
                      <Button className={classes.primaryButton} onClick={() => handleAcceptOffer(offer)}>Accept</Button>
                    </TableCell>
                  }
                </TableRow>
              ))}

              {tokenInfo && tokenInfo.token.listed && tokenInfo.orders.map((order, index) => (
                <TableRow
                  key={index}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {Web3.utils.fromWei(order.amount + '')} {getAssetName(order.asset)}
                  </TableCell>
                  <TableCell align="center">{getUSDPrice(rates, Web3.utils.fromWei(order.amount + ''), getAssetName(order.asset))}</TableCell>
                  <TableCell align="center">{getBidderName(order)}</TableCell>
                  {
                    tokenInfo && tokenInfo.token.owner === account.toLowerCase() && tokenInfo.token.auctionEndTime > Date.now() / 1000 &&
                    <TableCell align="center">
                      <Button className={classes.primaryButton} onClick={() => handleAcceptOffer(order)} disabled={true}>Waiting...</Button>
                    </TableCell>
                  }
                  {
                    tokenInfo && tokenInfo.token.owner === account.toLowerCase() && tokenInfo.token.auctionEndTime < Date.now() / 1000 &&
                    <TableCell align="center">
                      <Button className={classes.primaryButton} onClick={() => handleAcceptOffer(order)} >Accept</Button>
                    </TableCell>
                  }
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </TabPanel>
      <TabPanel className={classes.paperBackground} value={value} index={1} style={{border: 'solid 1px gainsboro', borderRadius: '8px'}}>
        <Grid container spacing={5}>
          {
            properties.map((property, index) => {
              return (
                <Grid item xs={6} md={3} key={index}>
                  <Paper className={`${classes.hoverShadow} ${classes.dropdownMenu}`} sx={{borderRadius: '15px', padding: '16px'}}>
                    <Typography align='center' color="primary" variant='body1'>{property.name}</Typography>
                    <Typography align='center' variant='h6'>{property.value}</Typography>
                  </Paper>
                </Grid>
              )
            })
          }
        </Grid>
      </TabPanel>
      <TabPanel className={classes.paperBackground} value={value} index={2} style={{border: 'solid 1px gainsboro', borderRadius: '8px', padding: '32px'}}>
        <Box display='flex' sx={{overflow: 'auto'}}>
          <Box>
            <Typography p={1} variant='body2'>Contract Address:</Typography>
            <Typography p={1} variant='body2'>Token ID:</Typography>
            <Typography p={1} variant='body2'>Token Standard:</Typography>
            <Typography p={1} variant='body2'>Blockchain:</Typography>
          </Box>
          <Box>
            <Typography p={1} color="primary" variant='body2'>{tokenInfo? tokenInfo.token.collectionAddress: '...'}</Typography>
            <Typography p={1} variant='body2'>{tokenInfo? tokenInfo.token.tokenID: '0'}</Typography>
            <Typography p={1} variant='body2'>ERC-721</Typography>
            <Typography p={1} variant='body2'>Avalanche Network</Typography>
          </Box>
        </Box>
      </TabPanel>
      <TabPanel className={classes.paperBackground} value={value} index={3}>
        <TableContainer className={classes.paperBackground} component={Paper}>
          <Grid container direction="row" justifyContent="flex-start" alignItems="flex-start" mb={3} rowSpacing={1}>
            <Grid item>
              <ToggleButtonGroup
                  value={filter}
                  exclusive
                  onChange={handleFilter}
                  aria-label="Filter">
                  <ToggleButton value="0" aria-label="Listing">
                    All
                  </ToggleButton>
              </ToggleButtonGroup>
            </Grid>
            <Grid item>
              <ToggleButtonGroup
                  value={filter}
                  exclusive
                  onChange={handleFilter}
                  aria-label="Filter">
                <ToggleButton value="3" aria-label="Listing">
                  <DiscountIcon />Listing
                </ToggleButton>
              </ToggleButtonGroup>
            </Grid>
            <Grid item>
              <ToggleButtonGroup
                  value={filter}
                  exclusive
                  onChange={handleFilter}
                  aria-label="Filter">
                <ToggleButton value="1" aria-label="Bids">
                  <GavelIcon />Create
                </ToggleButton>
              </ToggleButtonGroup>
            </Grid>
            <Grid item>
              <ToggleButtonGroup
                  value={filter}
                  exclusive
                  onChange={handleFilter}
                  aria-label="Filter">
                <ToggleButton value="2" aria-label="Transfer">
                  <ImportExportIcon />Offer
                </ToggleButton>
              </ToggleButtonGroup>
            </Grid>
            <Grid item>
              <ToggleButtonGroup
                  value={filter}
                  exclusive
                  onChange={handleFilter}
                  aria-label="Filter">
                <ToggleButton value="4" aria-label="Purchases">
                  <InventoryIcon />Exchange
                </ToggleButton>
              </ToggleButtonGroup>
            </Grid>
          </Grid>
          <Table sx={{ minWidth: 650, width:'100%', marginTop: '32px' }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Event</TableCell>
                <TableCell align="center">Price</TableCell>
                <TableCell align="center">Operator</TableCell>
                <TableCell align="center">Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {activities.map((activity) => activity.type !== ACTIVITY_TYPE.LIKE && (
                <TableRow
                  key={activity.objectId}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row" align="center" alignItems="flex-end">
                    <Box display='flex' alignItems='flex-end' justifyContent='center'>
                      {getActivityIcon(activity.type)}{getActivityEvent(activity.type)}
                    </Box>
                  </TableCell>
                  <TableCell align="center">{getActivityPrice(activity)}</TableCell>
                  <TableCell align="center"><Link href={`/account/${activity.operator}`}>{activity.Operator && activity.Operator.length > 0? activity.Operator[0].name: activity.operator.slice(0, 13)}</Link></TableCell>
                  <TableCell align="center">{getTimeStr(activity.updatedAt)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </TabPanel>
      <TabPanel className={classes.paperBackground} value={value} index={4}>
        <Graph prices={tokenInfo? tokenInfo.prices: []}/>
      </TabPanel>
      <AcceptOfferProgressDlg open={showAcceptOfferDlg} handleOpenDialog={setShowAcceptOfferDlg} token={tokenInfo? tokenInfo.token: null} offer={offer}/>
      <AuctionCompleteProgressDlg open={showAuctionCompleteProgressDlg} handleOpenDialog={setShowAuctionCompleteProgressDlg} order={selectedOrder} token={tokenInfo? tokenInfo.token: null}/>
    </Container>
  );
}