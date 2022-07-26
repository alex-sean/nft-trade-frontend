import React from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Typography, Box, Container, Tabs, Tab, Button, Select, MenuItem, Grid, Divider } from '@mui/material';
import useStyles from '../styles/styles';
import StackedLineChartIcon from '@mui/icons-material/StackedLineChart';
import QrCodeIcon from '@mui/icons-material/QrCode';
import CardItem from '../components/CardItem';
import ActivityItemList from '../components/ActivityItemList'
import FavoriteIcon from '@mui/icons-material/Favorite';
import DiscountIcon from '@mui/icons-material/Discount';
import ImportExportIcon from '@mui/icons-material/ImportExport';
import GavelIcon from '@mui/icons-material/Gavel';
import InventoryIcon from '@mui/icons-material/Inventory';
import Graph from '../components/Graph';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { getCollectionPrices, getTokensByCollection } from '../adapters/backend';
import CategoryFilter from './CategoryFilter';
import TokenDropdown from '../components/TokenDropdown';
import { useLoadingContext } from '../hooks/useLoadingContext';
import { toast } from 'react-toastify';

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

  const { collectionAddress } = useParams();

  const [tab, setTab] = React.useState(TAB.ITEMS);
  const [filter, setFilter] = React.useState(0);
  const [sort, setSort] = React.useState(SORT_TYPE.PRICE);

  const { tokens, setTokens, prices } = props;

  const { setLoading } = useLoadingContext();

  const handleFilter = (event, newFilter) => {
    if (!newFilter)
      newFilter = '0'
    setFilter(newFilter);
  };

  const handleTab = (event, newValue) => {
    setTab(newValue);
  };

  const handleSort = (event) => {
    setSort(event.target.value);
  };

  const getTokens = async (sort, avaxListed, usdListed) => {
    setLoading(true);

    try {
      const result = await getTokensByCollection(collectionAddress, sort, avaxListed, usdListed);
      if (!result) {
        throw new Error('Getting tokens failed.');
      }

      setTokens(result.data.tokens);
    } catch (err) {
      console.log(err);
      toast('Getting tokens failed');
    }

    setLoading(false);
  }

  return (
    <Container maxWidth="lg">
      <Box display='flex' justifyContent='center'>
        <Tabs
          value={tab}
          onChange={handleTab}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="icon position tabs example">
          <Tab {...a11yProps(0)} icon={<QrCodeIcon />} iconPosition="start" label="Items" />
          <Tab {...a11yProps(1)} icon={<StackedLineChartIcon />} iconPosition="start" label="Activity" />
        </Tabs>
      </Box>
      <Divider />
      <TabPanel value={tab} index={0}>
        <Grid container direction="row" justifyContent="space-between" alignItems="flex-start">
          {/* <CategoryFilter category={filter} setCategory={setFilter}/> */}
          <Grid item></Grid>
          <Grid item mb={2}>
            <TokenDropdown getItems={getTokens}/>
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
        
        <Box sx={{display: 'flex', justifyContent: 'center'}}>
          <Button className={classes.primaryButton}>Load More</Button>
        </Box>
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
  );
}