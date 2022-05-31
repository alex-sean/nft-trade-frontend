import React from 'react';
import { Grid, Typography, Container, Box, Button, Select, MenuItem, Tabs, Tab } from '@mui/material';
import useStyles from '../styles/styles';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CollectionPopup1 from '../components/CollectionPopup1';
import CollectionPopup2 from '../components/CollectionPopup2';
import PaletteIcon from '@mui/icons-material/Palette';
import LinkedCameraIcon from '@mui/icons-material/LinkedCamera';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import CategoryItem from '../components/CategoryItem';
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
import SystemUpdateAltIcon from '@mui/icons-material/SystemUpdateAlt';
import CollectionsCard from '../components/CollectionsCard';
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';

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

export default function CollectionHero(){
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [age, setAge] = React.useState('');

  const handleFilterChange = (event) => {
    setAge(event.target.value);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const items = [
    {
      id: 1,
      src: 'images/products/item_5.jpg',
      title: 'Flourishing Cat #180',
      subtitle: 'From 8.49 ETH 2/8',
      like: '15',
    },
    {
      id: 2,
      src: 'images/products/item_4.jpg',
      title: 'Amazing NFT art',
      subtitle: 'From 5.9 ETH 1/7',
      like: '188',
    },
    {
      id: 3,
      src: 'images/products/item_7.jpg',
      title: 'SwagFox#133',
      subtitle: '0.078 ETH 1/3',
      like: '160',
    },
    {
      id: 4,
      src: 'images/products/item_6.jpg',
      title: 'Splendid Girl',
      subtitle: '10 ETH 2/3',
      like: '159',
    },
    {
      id: 5,
      src: 'images/products/item_8.jpg',
      title: 'Monkeyme#155',
      subtitle: 'From 5 FLOW 1/1',
      like: '32',
    },
    {
      id: 6,
      src: 'images/products/item_9.jpg',
      title: 'Jedidia#149',
      subtitle: '0.16 ETH 1/1',
      like: '25',
    },
    {
      id: 7,
      src: 'images/products/item_10.jpg',
      title: 'Artof Eve',
      subtitle: '0.13 FLOW 1/1',
      like: '55',
    },
    {
      id: 8,
      src: 'images/products/item_11.gif',
      title: 'Asuna #1649',
      subtitle: '0.8 ETH 1/1',
      like: '70',
    },
  ];

  const cardItems = [
    {
      id: 1,
      img1: 'images/collections/collection_1_1.jpg',
      img2: 'images/collections/collection_1_2.jpg',
      img3: 'images/collections/collection_1_3.jpg',
      img4: 'images/collections/collection_1_4.jpg',
      title: 'Art Me Outside',
      owner: 'Wow Frens',
      count: '10K',
    },
    {
      id: 2,
      img1: 'images/collections/collection_2_1.jpg',
      img2: 'images/collections/collection_2_2.jpg',
      img3: 'images/collections/collection_2_3.jpg',
      img4: 'images/collections/collection_2_4.jpg',
      title: 'PankySkal',
      owner: 'NFT stars',
      count: '2.8K',
    },
    {
      id: 3,
      img1: 'images/collections/collection_3_1.jpg',
      img2: 'images/collections/collection_3_2.jpg',
      img3: 'images/collections/collection_3_3.jpg',
      img4: 'images/collections/collection_3_4.jpg',
      title: 'VR Space_287',
      owner: 'Origin Morish',
      count: '8K',
    },
    {
      id: 4,
      img1: 'images/collections/collection_4_1.jpg',
      img2: 'images/collections/collection_4_2.jpg',
      img3: 'images/collections/collection_4_3.jpg',
      img4: 'images/collections/collection_4_4.jpg',
      title: 'Metasmorf',
      owner: 'Lazy Panda',
      count: '1.5K',
    },
  ];

  return (
    <>
      <Box sx={{height:'300px', backgroundImage:'url(images/user/banner.jpg)'}}></Box>
      <Box pb={5} className={`${classes.commonBackgroundColor} ${classes.textCenter}`}>
        <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', transform: 'translate(0, -50%)', position: 'relative'}}>
          <img src='images/user/user_avatar.gif' 
               style={{width: '148px', border: 'solid 3px #fff', borderRadius: '10px'}} />
          <CheckCircleIcon sx={{position: 'absolute', transform: 'translate(70px, 70px)', color: 'limegreen'}} />
        </Box>
        <Typography variant="h4">Sad Ducks</Typography>
        <Box mt={1} sx={{display:'flex', alignItems: 'center', justifyContent: 'center'}}>
          <Box p={1} sx={{display:'flex', maxWidth: '200px', alignItems: 'center', border: 'solid 1px lightgray', borderRadius: '20px'}}>
            <Icon icon="logos:ethereum" rotate={2} hFlip={true} vFlip={true} />
            <Typography ml={1} nowrap>0x7a86c0b0640...</Typography>
          </Box>
        </Box>

        <Typography mt={3} variant="body1" paragraph>I make art with the simple goal of giving you something pleasing to look at for a few seconds.</Typography>
        <Typography mb={3} variant="body2">Joined December 2019</Typography>

        <Box mb={2} className={`${classes.displayFlex} ${classes.justifyCenter}`} >
          <Button className={`${classes.displayFlex}`} sx={{border:'solid 1px grey', borderRadius:'10px',  color: '#000'}}>
            <Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite sx={{color: 'red'}} />} />
          </Button>
          <CollectionPopup1 />
          <CollectionPopup2 />
        </Box>
      </Box>
    <Container maxWidth="lg">
      <Tabs centered
        value={value}
        onChange={handleChange}
        aria-label="icon position tabs example"
        >
        <Tab {...a11yProps(0)} icon={<LocalAtmIcon />} iconPosition="start" label="On Sale" />
        <Tab {...a11yProps(1)} icon={<SystemUpdateAltIcon />} iconPosition="start" label="Owned" />
        <Tab {...a11yProps(2)} icon={<ListAltIcon />} iconPosition="start" label="Created(20)" />
        <Tab {...a11yProps(3)} icon={<DiscountIcon />} iconPosition="start" label="Collection" />
        <Tab {...a11yProps(4)} icon={<ImportExportIcon />} iconPosition="start" label="Activity" />
      </Tabs>
      <TabPanel value={value} index={0}>
        <Grid container direction="row" justifyContent="space-between" alignItems="flex-start">
          <Grid xs={12} md spacing={2} mb={2} item container direction="row" justifyContent="flex-start">
            <Grid item>
              <Button variant="outlined" className={classes.commonButton} startIcon={<PaletteIcon />}>Collections</Button>
            </Grid>
            <Grid item>
              <Button variant="outlined" className={classes.commonButton} startIcon={<CardGiftcardIcon />}>Category</Button>
            </Grid>
            <Grid item>
              <Button variant="outlined" className={classes.commonButton} startIcon={<LinkedCameraIcon />}>Price Range</Button>
            </Grid>
          </Grid>
          <Grid item mb={2}>
            <Select
              displayEmpty
              value={age}
              onChange={handleFilterChange}
              inputProps={{ 'aria-label': 'Without label' }}
              sx={{width: '180px', padding: "0"}}
            >
              <MenuItem value="">
                <em>Recently Added</em>
              </MenuItem>
              <MenuItem value={10}>Top</MenuItem>
              <MenuItem value={20}>Recent</MenuItem>
            </Select>
          </Grid>
        </Grid>

        <Grid container className={classes.sectionGridContainer} spacing={4}>
          {items.map((item) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={3}
              minHeight={100}
              key={item.id}
            >
              <CategoryItem {...item} />
            </Grid>
          ))}
        </Grid>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Grid container direction="row" justifyContent="space-between" alignItems="flex-start">
          <Grid xs spacing={2} item container direction="row" justifyContent="flex-start">
            <Grid item>
              <Button variant="outlined" className={classes.commonButton} startIcon={<PaletteIcon />}>Collections</Button>
            </Grid>
            <Grid item>
              <Button variant="outlined" className={classes.commonButton} startIcon={<CardGiftcardIcon />}>Category</Button>
            </Grid>
            <Grid item>
              <Button variant="outlined" className={classes.commonButton} startIcon={<LinkedCameraIcon />}>Price Range</Button>
            </Grid>
          </Grid>
          <Grid item>
            <Select
              displayEmpty
              value={age}
              onChange={handleFilterChange}
              inputProps={{ 'aria-label': 'Without label' }}
              sx={{width: '180px', padding: "0"}}
            >
              <MenuItem value="">
                <em>Recently Added</em>
              </MenuItem>
              <MenuItem value={10}>Top</MenuItem>
              <MenuItem value={20}>Recent</MenuItem>
            </Select>
          </Grid>
        </Grid>

        <Grid container className={classes.sectionGridContainer} spacing={4}>
          {items.map((item) => (
            <Grid
              item
              xs={12}
              md={3}
              minHeight={100}
              key={item.id}
            >
              <CategoryItem {...item} />
            </Grid>
          ))}
        </Grid>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Grid container direction="row" justifyContent="space-between" alignItems="flex-start">
          <Grid xs spacing={2} item container direction="row" justifyContent="flex-start">
            <Grid item>
              <Button variant="outlined" className={classes.commonButton} startIcon={<PaletteIcon />}>Collections</Button>
            </Grid>
            <Grid item>
              <Button variant="outlined" className={classes.commonButton} startIcon={<CardGiftcardIcon />}>Category</Button>
            </Grid>
            <Grid item>
              <Button variant="outlined" className={classes.commonButton} startIcon={<LinkedCameraIcon />}>Price Range</Button>
            </Grid>
          </Grid>
          <Grid item>
            <Select
              displayEmpty
              value={age}
              onChange={handleFilterChange}
              inputProps={{ 'aria-label': 'Without label' }}
              sx={{width: '180px', padding: "0"}}
            >
              <MenuItem value="">
                <em>Recently Added</em>
              </MenuItem>
              <MenuItem value={10}>Top</MenuItem>
              <MenuItem value={20}>Recent</MenuItem>
            </Select>
          </Grid>
        </Grid>

        <Grid container className={classes.sectionGridContainer} spacing={4}>
          {items.map((item) => (
            <Grid
              item
              xs={12}
              md={3}
              minHeight={100}
              key={item.id}
            >
              <CategoryItem {...item} />
            </Grid>
          ))}
        </Grid>
      </TabPanel>
      <TabPanel value={value} index={3}>
        <Grid mt={3} container spacing={3} justifyContent="center" alignItems="flex-start">
          {cardItems.map((item) => (
            <Grid item xs={12} sm={6} md={4} xl={3}>
              <CollectionsCard {...item} />
            </Grid>
          ))}
        </Grid>
      </TabPanel>
      <TabPanel value={value} index={4}>
        <Grid mt={3} container spacing={8}>
          <Grid item xs={12} lg>
            <ActivityItemList />
          </Grid>
          <Grid item xs>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase placeholder="Search" inputProps={{ 'aria-label': 'search' }}/>
            </Search>
            <Typography my={2} variant="h6">Filters</Typography>
            <Grid xs spacing={2} container direction="row" justifyContent="flex-start">
              <Grid item>
                <Button variant="contained" className={classes.commonButton} startIcon={<DiscountIcon />}>Listing</Button>
              </Grid>
              <Grid item>
                <Button variant="contained" className={classes.commonButton} startIcon={<GavelIcon />}>Bids</Button>
              </Grid>
              <Grid item>
                <Button variant="contained" className={classes.commonButton} startIcon={<ImportExportIcon />}>Transfer</Button>
              </Grid>
              <Grid item>
                <Button variant="contained" className={classes.commonButton} startIcon={<FavoriteBorderIcon />}>Likes</Button>
              </Grid>
              <Grid item>
                <Button variant="contained" className={classes.commonButton} startIcon={<InventoryIcon />}>Purchases</Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </TabPanel>
    </Container>
    </>
  );
};