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

export default function ActivityPage(){
  const classes = useStyles();
  
  return (
    <Box ClassName={classes.gradientBackground}>
      <Container maxWidth="lg">
        <Typography py={3} align="center" variant="h4">Activity</Typography>

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
      </Container>
    </Box>
  );
}