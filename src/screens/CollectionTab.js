import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Box, Container, Tabs, Tab, Button, Select, MenuItem, Grid } from '@mui/material';
import useStyles from '../styles/styles';
import StackedLineChartIcon from '@mui/icons-material/StackedLineChart';
import QrCodeIcon from '@mui/icons-material/QrCode';
import PaletteIcon from '@mui/icons-material/Palette';
import LinkedCameraIcon from '@mui/icons-material/LinkedCamera';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import FormatShapesIcon from '@mui/icons-material/FormatShapes';
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
import Graph from '../components/Graph';

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

export default function CollectionTab(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [age, setAge] = React.useState('');

  const handleAgeChange = (event) => {
    setAge(event.target.value);
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

  return (
    <Container maxWidth="lg">
      <Tabs centered
        value={value}
        onChange={handleChange}
        aria-label="icon position tabs example"
        >
        <Tab {...a11yProps(0)} icon={<QrCodeIcon />} iconPosition="start" label="Items" />
        <Tab {...a11yProps(1)} icon={<StackedLineChartIcon />} iconPosition="start" label="Activity" />
      </Tabs>
      <TabPanel value={value} index={0}>
        <Grid container direction="row" justifyContent="space-between" alignItems="flex-start">
          <Grid xs spacing={2} item container direction="row" justifyContent="flex-start">
            <Grid item>
              <Button variant="contained">All</Button>
            </Grid>
            <Grid item>
              <Button variant="outlined" startIcon={<PaletteIcon />}>Blockchain</Button>
            </Grid>
            <Grid item>
              <Button variant="outlined" startIcon={<CardGiftcardIcon />}>Category</Button>
            </Grid>
            <Grid item>
              <Button variant="outlined" startIcon={<FormatShapesIcon />}>Properties</Button>
            </Grid>
            <Grid item>
              <Button variant="outlined" startIcon={<MusicNoteIcon />}>Sale Type</Button>
            </Grid>
            <Grid item>
              <Button variant="outlined" startIcon={<LinkedCameraIcon />}>Price Range</Button>
            </Grid>
          </Grid>
          <Grid item>
            <Select
              value={age}
              onChange={handleAgeChange}
              displayEmpty
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
              md={2.5}
              minHeight={100}
              key={item.id}
            >
              <CategoryItem {...item} />
            </Grid>
          ))}
        </Grid>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Graph />
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
  );
}