import { Box, Button, Container, Grid, Typography } from '@mui/material';
import useStyles from '../styles/styles';
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
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import React from 'react';

export default function ActivityPage(){
  const classes = useStyles();
  const [filter, setFilter] = React.useState('all');

  const handleFilter = (event, newFilter) => {
    setFilter(newFilter);
  };

  return (
    <Box ClassName={classes.gradientBackground}>
      <Container maxWidth="lg">
        <Typography py={10} align="center" variant="h4">Activity</Typography>

        <Grid container spacing={8}>
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
              <ToggleButton value="likes" aria-label="Likes">
                <FavoriteBorderIcon />Likes
              </ToggleButton>
              <ToggleButton value="purchases" aria-label="Purchases">
                <InventoryIcon />Purchases
              </ToggleButton>
            </ToggleButtonGroup>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}