import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Grid, Typography, Container, Box, Button, Select, MenuItem, Tabs, Tab } from '@mui/material';
import useStyles from '../styles/styles';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CollectionPopup1 from '../components/CollectionPopup1';
import CollectionPopup2 from '../components/CollectionPopup2';
import PaletteIcon from '@mui/icons-material/Palette';
import LinkedCameraIcon from '@mui/icons-material/LinkedCamera';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import CardItem from '../components/CardItem';
import ActivityItemList from '../components/ActivityItemList'
import Search from '../components/Header/Search';
import SearchIconWrapper from '../components/Header/Search/SearchIconWrapper';
import StyledInputBase from '../components/Header/Search/StyledInputBase';
import SearchIcon from '@mui/icons-material/Search';
import DiscountIcon from '@mui/icons-material/Discount';
import ImportExportIcon from '@mui/icons-material/ImportExport';
import GavelIcon from '@mui/icons-material/Gavel';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import InventoryIcon from '@mui/icons-material/Inventory';
import { Icon } from '@iconify/react';
import PropTypes from 'prop-types';
import ListAltIcon from '@mui/icons-material/ListAlt';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SystemUpdateAltIcon from '@mui/icons-material/SystemUpdateAlt';
import CollectionsCard from '../components/CollectionsCard';
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import { useWalletContext } from '../hooks/useWalletContext';
import { getUserInfo, getOwnedTokens, getCreatedTokens, getSaleTokens, getOwnedCollections, getUserLike, likeUser } from '../adapters/backend';
import { useLoadingContext } from '../hooks/useLoadingContext';
import { toast } from 'react-toastify';
import { STR_MONTH, USER_STATUS } from '../common/const';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import CategoryFilter from '../screens/CategoryFilter';

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

const defaultUserInfo = {
  name: '...',
  avatar: 'user_avatar.gif',
  description: '...',
  background: 'banner.jpg',
  status: false,
  address: '0x0000000000000000000000000000000000000000',
  createdAt: new Date().toISOString()
}

export default function AccountPage(){
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const [age, setAge] = useState('');
  const [userInfo, setUserInfo] = useState(defaultUserInfo);
  const [ownedTokens, setOwnedTokens] = useState([]);
  const [createdTokens, setCreatedTokens] = useState([]);
  const [saleTokens, setSaleTokens] = useState([]);
  const [ownedCollections, setOwnedCollections] = useState([]);
  const [filter, setFilter] = React.useState(0);
  const [like, setLike] = useState(false);
  const { address } = useParams();
  const { account } = useWalletContext();
  const { setLoading } = useLoadingContext();

  const handleFilter = (event, newFilter) => {
    setFilter(newFilter);
  };

  const handleFilterChange = (event) => {
    setAge(event.target.value);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleInit = async () => {
    setLoading(true);

    try {
      let userInfo = await getUserInfo(address);
      if (!userInfo) {
        throw new Error('Getting User information failed.');
      }

      if (userInfo.data) {
        setUserInfo(userInfo.data);
      }

      let ownedTokens = await getOwnedTokens(address);
      if (!ownedTokens) {
        throw new Error('Getting owned tokens failed.');
      }
      setOwnedTokens(ownedTokens.data.tokens);

      let createdTokens = await getCreatedTokens(address);
      if (!createdTokens) {
        throw new Error('Getting created tokens failed.');
      }
      setCreatedTokens(createdTokens.data.tokens);

      let saleTokens = await getSaleTokens(address);
      if (!saleTokens) {
        throw new Error('Getting sale tokens failed.');
      }
      setSaleTokens(saleTokens.data.tokens);

      let ownedCollections = await getOwnedCollections(address);
      if (!ownedCollections) {
        throw new Error('Getting owned collection failed.');
      }

      setOwnedCollections(ownedCollections.data.collections);
    } catch (err) {
      console.log(err);
      toast('Getting user information failed.');
    }

    setLoading(false);
  }

  useEffect(() => {
    handleInit(address);
  }, [])

  const getLike = async () => {
    setLoading(true);

    try {
      const likeResult = await getUserLike(account, address);
      if (!likeResult) {
        throw new Error('Getting like status failed.');
      }

      setLike(likeResult.data);
    } catch (err) {
      console.log(err);
    }

    setLoading(false);
  }

  useEffect(() => {
    if (!account) {
      return;
    }

    getLike();
  }, [account])

  const handleLike = async () => {
    if (!account) {
      toast('Please connect the wallet.');
      return;
    }

    setLoading(true);

    try {
      const likeResult = await likeUser(account, address, !like);
      if (!likeResult) {
        throw new Error('Like user faled.');
      }
      setLike(!like);
    } catch (err) {
      console.log(err);
      toast('Like user failed.');
    }

    setLoading(false);
  }

  return (
    <>
      <Box sx={{height:'300px', backgroundImage:`url(${process.env.REACT_APP_BACKGROUND_PATH}/${userInfo.background})`}}></Box>
      <Box pb={5} className={`${classes.commonBackgroundColor} ${classes.textCenter}`}>
        <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', transform: 'translate(0, -50%)', position: 'relative'}}>
          <img src={`${process.env.REACT_APP_AVATAR_PATH}/${userInfo.avatar}`}
               style={{width: '148px', border: 'solid 3px #fff', borderRadius: '10px'}} />
          {
            userInfo.status === USER_STATUS.VERIFIED &&
            <CheckCircleIcon sx={{position: 'absolute', transform: 'translate(70px, 70px)', color: 'limegreen'}} />
          }
        </Box>
        <Typography variant="h4">{userInfo.name}</Typography>
        <Box mt={1} sx={{display:'flex', alignItems: 'center', justifyContent: 'center'}}>
          <Box p={1} sx={{display:'flex', maxWidth: '200px', alignItems: 'center', border: 'solid 1px lightgray', borderRadius: '20px'}}>
            {/* <Icon icon="logos:ethereum" rotate={2} hFlip={true} vFlip={true} /> */}
            <Typography ml={1} nowrap>{address.slice(0, 13)}...</Typography>
          </Box>
        </Box>

        <Typography mt={3} variant="body1" paragraph>{userInfo.description}</Typography>
        <Typography mb={3} variant="body2">Joined {STR_MONTH[parseInt(userInfo.createdAt.split('-')[1])]} {userInfo.createdAt.split('-')[0]}</Typography>

        <Box mb={2} className={`${classes.displayFlex} ${classes.justifyCenter}`} >
          <Button className={`${classes.displayFlex}`} sx={{border:'solid 1px grey', borderRadius:'10px',  color: '#000'}}>
            <Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite sx={{color: 'red'}} />} checked={like} onChange={() => handleLike()}/>
          </Button>
          <CollectionPopup1 />
          {/* <CollectionPopup2 /> */}
        </Box>
      </Box>
    <Container maxWidth="lg">
      <Box display='flex' justifyContent='center'>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="icon position tabs example"
          variant="scrollable"
          scrollButtons="auto"
          >
          <Tab {...a11yProps(0)} icon={<LocalAtmIcon />} iconPosition="start" label="On Sale" />
          <Tab {...a11yProps(1)} icon={<SystemUpdateAltIcon />} iconPosition="start" label="Owned" />
          <Tab {...a11yProps(2)} icon={<ListAltIcon />} iconPosition="start" label="Created(20)" />
          <Tab {...a11yProps(3)} icon={<DiscountIcon />} iconPosition="start" label="Collection" />
          <Tab {...a11yProps(4)} icon={<ImportExportIcon />} iconPosition="start" label="Activity" />
        </Tabs>
      </Box>
      
      <TabPanel value={value} index={0}>
        <Grid container direction="row" justifyContent="space-between" alignItems="flex-start">
          <CategoryFilter />
          <Grid item mb={2}>
            <Select
              displayEmpty
              value={age}
              onChange={handleFilterChange}
              inputProps={{ 'aria-label': 'Without label' }}
              sx={{width: '180px', padding: "0"}}
            >
              <MenuItem className={classes.dropdownMenu} value="">
                Recently Added
              </MenuItem>
              <MenuItem className={classes.dropdownMenu} value={10}>Top</MenuItem>
              <MenuItem className={classes.dropdownMenu} value={20}>Recent</MenuItem>
            </Select>
          </Grid>
        </Grid>

        <Grid container className={classes.sectionGridContainer} spacing={4}>
          {saleTokens.map((token) => (
            <Grid
              item
              token
              xs={12}
              sm={6}
              md={3}
              minHeight={100}
              key={token.objectId}
            >
              <CardItem token={token} />
            </Grid>
          ))}
        </Grid>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Grid container direction="row" justifyContent="space-between" alignItems="flex-start">
          <CategoryFilter />
          <Grid item>
            <Select
              displayEmpty
              value={age}
              onChange={handleFilterChange}
              inputProps={{ 'aria-label': 'Without label' }}
              sx={{width: '180px', padding: "0"}}
            >
              <MenuItem className={classes.dropdownMenu} value="">
                Recently Added
              </MenuItem>
              <MenuItem className={classes.dropdownMenu} value={10}>Top</MenuItem>
              <MenuItem className={classes.dropdownMenu} value={20}>Recent</MenuItem>
            </Select>
          </Grid>
        </Grid>

        <Grid container className={classes.sectionGridContainer} spacing={4}>
          {ownedTokens.map((token) => (
            <Grid
              item
              token
              xs={12}
              md={3}
              minHeight={100}
              key={token.objectId}
            >
              <CardItem token={token} />
            </Grid>
          ))}
        </Grid>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Grid container direction="row" justifyContent="space-between" alignItems="flex-start">
          <CategoryFilter />
          <Grid item>
            <Select
              displayEmpty
              value={age}
              onChange={handleFilterChange}
              inputProps={{ 'aria-label': 'Without label' }}
              sx={{width: '180px', padding: "0"}}
            >
              <MenuItem className={classes.dropdownMenu} value="">
                Recently Added
              </MenuItem>
              <MenuItem className={classes.dropdownMenu} value={10}>Top</MenuItem>
              <MenuItem className={classes.dropdownMenu} value={20}>Recent</MenuItem>
            </Select>
          </Grid>
        </Grid>

        <Grid container className={classes.sectionGridContainer} spacing={4} direction="row" justifyContent="flex-start">
          {createdTokens.map((token) => (
            <Grid
              item
              token
              xs={12}
              md={3}
              minHeight={100}
              key={token.objectId}
            >
              <CardItem token={token} />
            </Grid>
          ))}
        </Grid>
      </TabPanel>
      <TabPanel value={value} index={3}>
        <Grid mt={3} container spacing={3} justifyContent="center" alignItems="flex-start">
          {ownedCollections.map((collection) => (
            <Grid item xs={12} sm={6} md={4} xl={3}>
              <CollectionsCard collection={collection} />
            </Grid>
          ))}
        </Grid>
      </TabPanel>
      <TabPanel value={value} index={4}>
        <Grid mt={3} container spacing={8}>
          <Grid item xs={12} lg>
            <ActivityItemList search={address} filter={filter}/>
          </Grid>
          <Grid item xs>
            {/* <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase placeholder="Search" inputProps={{ 'aria-label': 'search' }}/>
            </Search> */}
            <Typography my={2} variant="h6">Filters</Typography>
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
              <Grid item>
                <ToggleButtonGroup
                  value={filter}
                  exclusive
                  onChange={handleFilter}
                  aria-label="Filter">
                  <ToggleButton value="5" aria-label="Purchases">
                    <FavoriteIcon />&nbsp;&nbsp;Like
                  </ToggleButton>
                </ToggleButtonGroup>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </TabPanel>
    </Container>
    </>
  );
};