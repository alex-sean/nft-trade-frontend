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
  const [filter, setFilter] = React.useState('all');
  const [properties, setProperties] = useState([]);

  const { tokenInfo } = props;

  const handleFilter = (event, newFilter) => {
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
  }, [tokenInfo])

  return (
    <Container maxWidth="lg">
      <Tabs
      value={value}
      onChange={handleChange}
      aria-label="icon position tabs example"
      >
        <Tab {...a11yProps(0)} icon={<FormatListBulletedIcon />} iconPosition="start" label="Offers" />
        <Tab {...a11yProps(1)} icon={<EarbudsIcon />} iconPosition="start" label="Properties" />
        <Tab {...a11yProps(2)} icon={<ListAltIcon />} iconPosition="start" label="Details" />
        <Tab {...a11yProps(3)} icon={<StackedLineChartIcon />} iconPosition="start" label="Activity" />
        <Tab {...a11yProps(4)} icon={<AutoGraphIcon />} iconPosition="start" label="Price History" />
      </Tabs>
      <TabPanel value={value} index={0} className={classes.paperBackground}>
        <TableContainer className={classes.paperBackground} component={Paper}>
          <Table sx={{ minWidth: 650, width:'100%' }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Price</TableCell>
                <TableCell align="right">USD Price</TableCell>
                <TableCell align="right">From</TableCell>
                <TableCell align="right">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{row.calories}</TableCell>
                  <TableCell align="right">{row.fat}</TableCell>
                  <TableCell align="right">{row.carbs}</TableCell>
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
                  <Paper className={classes.hoverShadow} sx={{borderRadius: '15px', background: 'rgb(245, 248, 250)', padding: '16px'}}>
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
        <Grid container spacing={4}>
          <Grid sx>
            <Typography p={1} variant='body2'>Contract Address:</Typography>
            <Typography p={1} variant='body2'>Token ID:</Typography>
            <Typography p={1} variant='body2'>Token Standard:</Typography>
            <Typography p={1} variant='body2'>Blockchain:</Typography>
          </Grid>
          <Grid sx>
            <Typography p={1} color="primary" variant='body2'>0x1cBB182322Aee8ce9F4F1f98d7460173ee30Af1F</Typography>
            <Typography p={1} variant='body2'>7714</Typography>
            <Typography p={1} variant='body2'>ERC-721</Typography>
            <Typography p={1} variant='body2'>Ethereum</Typography>
          </Grid>
        </Grid>
      </TabPanel>
      <TabPanel className={classes.paperBackground} value={value} index={3}>
        <TableContainer className={classes.paperBackground} component={Paper}>
          <ToggleButtonGroup
              value={filter}
              exclusive
              onChange={handleFilter}
              aria-label="Filter"
            >
            <ToggleButton value="listing" aria-label="Listing">
              <DiscountIcon />Listing
            </ToggleButton>
            <ToggleButton value="bids" aria-label="Bids">
              <GavelIcon />Bids
            </ToggleButton>
            <ToggleButton value="transfer" aria-label="Transfer">
              <ImportExportIcon />Transfer
            </ToggleButton>
            <ToggleButton value="purchases" aria-label="Purchases">
              <InventoryIcon />Purchases
            </ToggleButton>
          </ToggleButtonGroup>
          <Table sx={{ minWidth: 650, width:'100%', marginTop: '32px' }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Dessert (100g serving)</TableCell>
                <TableCell align="right">Calories</TableCell>
                <TableCell align="right">Fat&nbsp;(g)</TableCell>
                <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                <TableCell align="right">Protein&nbsp;(g)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{row.calories}</TableCell>
                  <TableCell align="right">{row.fat}</TableCell>
                  <TableCell align="right">{row.carbs}</TableCell>
                  <TableCell align="right">{row.protein}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </TabPanel>
      <TabPanel className={classes.paperBackground} value={value} index={4}>
        <Graph />
      </TabPanel>
    </Container>
  );
}