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
import FavoriteIcon from '@mui/icons-material/Favorite';
import InventoryIcon from '@mui/icons-material/Inventory';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import React, { useState } from 'react';

export default function ActivityPage(){
  const classes = useStyles();
  const [filter, setFilter] = useState(0);
  const [search, setSearch] = useState('');
  const [tmpSearch, setTmpSearch] = useState('');

  const handleFilter = (event, newFilter) => {
    if (!newFilter)
      newFilter = '0'
    setFilter(newFilter);
  };

  const handlekeyUp = (key) => {
    if (key === 13) {
      setSearch(tmpSearch);
    }
  }

  return (
    <Box ClassName={classes.gradientBackground}>
      <Container maxWidth="lg">
        <Typography py={10} align="center" variant="h4">Activity</Typography>

        <Grid container spacing={8}>
          <Grid item xs={12} lg>
            <ActivityItemList filter={filter} search={search} />
          </Grid>
          <Grid item xs>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase className={classes.searchInput} placeholder="Please input collection address or user address" inputProps={{ 'aria-label': 'search' }} onKeyUp={(e) => handlekeyUp(e.keyCode)} onChange={(e) => setTmpSearch(e.target.value)}/>
            </Search>
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
      </Container>
    </Box>
  );
}