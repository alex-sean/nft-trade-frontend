import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Box, Container, Tabs, Tab, Button, Select, MenuItem, Grid, Divider } from '@mui/material';
import useStyles from '../styles/styles';
import StackedLineChartIcon from '@mui/icons-material/StackedLineChart';
import QrCodeIcon from '@mui/icons-material/QrCode';
import PaletteIcon from '@mui/icons-material/Palette';
import LinkedCameraIcon from '@mui/icons-material/LinkedCamera';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import FormatShapesIcon from '@mui/icons-material/FormatShapes';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import CardItem from '../components/CardItem';
import ActivityItemList from '../components/ActivityItemList'
import Search from '../components/Header/Search';
import SearchIconWrapper from '../components/Header/Search/SearchIconWrapper';
import StyledInputBase from '../components/Header/Search/StyledInputBase';
import SearchIcon from '@mui/icons-material/Search';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DiscountIcon from '@mui/icons-material/Discount';
import ImportExportIcon from '@mui/icons-material/ImportExport';
import GavelIcon from '@mui/icons-material/Gavel';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import InventoryIcon from '@mui/icons-material/Inventory';
import Graph from '../components/Graph';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { getCollectionPrices } from '../adapters/backend';
import CategoryFilter from './CategoryFilter';

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

const SORT_TYPE = {
  PRICE: 0,
  RECENT: 1
}

const TAB = {
  ITEMS: 0,
  ACTIVITY: 1
}

export default function CollectionTab(props) {
  const classes = useStyles();
  const [tab, setTab] = React.useState(TAB.ITEMS);
  const [filter, setFilter] = React.useState(0);
  const [sort, setSort] = React.useState(SORT_TYPE.PRICE);

  const { tokens, prices } = props;

  const handleFilter = (event, newFilter) => {
    setFilter(newFilter);
  };

  const handleTab = (event, newValue) => {
    setTab(newValue);
  };

  const handleSort = (event) => {
    setSort(event.target.value);
  };

  return (
    <Container maxWidth="lg">
      <Tabs centered
        value={tab}
        onChange={handleTab}
        aria-label="icon position tabs example"
        >
        <Tab {...a11yProps(0)} icon={<QrCodeIcon />} iconPosition="start" label="Items" />
        <Tab {...a11yProps(1)} icon={<StackedLineChartIcon />} iconPosition="start" label="Activity" />
      </Tabs>
      <Divider />
      <TabPanel value={tab} index={0}>
        <Grid container direction="row" justifyContent="space-between" alignItems="flex-start">
          <CategoryFilter category={filter} setCategory={setFilter}/>
          <Grid item mb={2}>
            <Select
              value={sort}
              onChange={handleSort}
              displayEmpty
              inputProps={{ 'aria-label': 'Without label' }}
              sx={{width: '180px', padding: "0"}}
            >
              <MenuItem value="">
                <em>Recently Added</em>
              </MenuItem>
              <MenuItem value={SORT_TYPE.PRICE}>Top</MenuItem>
              <MenuItem value={SORT_TYPE.RECENT}>Recent</MenuItem>
            </Select>
          </Grid>
        </Grid>

        <Grid container className={classes.sectionGridContainer} spacing={4}>
          {tokens.map((token) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={3}
              minHeight={100}
              key={token.tokenID}
            >
              <CardItem token={token} />
            </Grid>
          ))}
        </Grid>
      </TabPanel>
      <TabPanel value={tab} index={1}>
        <Graph prices={prices}/>
        <Grid mt={3} container spacing={8}>
          <Grid item xs={12} lg>
            <ActivityItemList search={tokens.length? tokens[0].collectionAddress: ''} filter={filter}/>
          </Grid>
          <Grid item xs>
            {/* <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase placeholder="Please input collection address or user address" inputProps={{ 'aria-label': 'search' }}/>
            </Search> */}
            <Typography my={2} variant="h6">Filters</Typography>
            <ToggleButtonGroup
              value={filter}
              exclusive
              onChange={handleFilter}
              aria-label="Filter"
            >
              <ToggleButton value="0" aria-label="Listing">
                All
              </ToggleButton>
              <ToggleButton value="3" aria-label="Listing">
                <DiscountIcon />Listing
              </ToggleButton>
              <ToggleButton value="1" aria-label="Bids">
                <GavelIcon />Create
              </ToggleButton>
              <ToggleButton value="2" aria-label="Transfer">
                <ImportExportIcon />Offer
              </ToggleButton>
              <ToggleButton value="4" aria-label="Purchases">
                <InventoryIcon />Exchange
              </ToggleButton>
              <ToggleButton value="5" aria-label="Purchases">
                <FavoriteIcon />Like
              </ToggleButton>
            </ToggleButtonGroup>
          </Grid>
        </Grid>
      </TabPanel>
    </Container>
  );
}