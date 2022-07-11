import React, { useEffect, useState } from 'react';
import { Box, Container, Typography, Grid, Select, MenuItem } from "@mui/material";
import CollectionsFilter from '../screens/CollectionsFilter';
import CollectionsCard from "../components/CollectionsCard";
import useStyles from '../styles/styles';
import { getCollections } from '../adapters/backend';
import { useLoadingContext } from '../hooks/useLoadingContext';
import { toast } from 'react-toastify';
import CategoryFilter from '../screens/CategoryFilter';
import { useParams } from 'react-router-dom';

export default function CollectionsPage(){
  const classes = useStyles();

  const { filter } = useParams();

  const [collections, setCollections] = useState([]);
  const [category, setCategory] = useState(filter);
  const [sort, setSort] = React.useState(0);

  const { setLoading } = useLoadingContext();

  const getCollectionsByCategory = async (category) => {
    setLoading(true);

    try {
      let collections = await getCollections(category);
      if (!collections) {
        throw new Error('Getting owned tokens failed.');
      }
      setCollections(collections.data.collections);
    } catch (err) {
      toast('Getting collections failed.');
    }

    setLoading(false);
  }

  useEffect(() => {
    getCollectionsByCategory(filter);
  }, [])

  useEffect(() => {
    getCollectionsByCategory(category);
  }, [category])

  const handleSort = (event) => {
    setSort(event.target.value);
  };

  return (
    <Box py={4} className={classes.collectionsPage}>
      <Container maxWidth="lg">
        <Typography py={3} align="center" variant="h4">Explore Collections</Typography>
        <Grid container direction="row" justifyContent="space-between" alignItems="flex-start">
          <CategoryFilter setCategory={setCategory} category={category}/>
          <Grid item mb={2}>
            <Select
              value={sort}
              onChange={handleSort}
              displayEmpty
              inputProps={{ 'aria-label': 'Without label' }}
              sx={{width: '180px', padding: "0"}}
            >
              <MenuItem value="0">Listed</MenuItem>
              <MenuItem value={1}>Verified</MenuItem>
              <MenuItem value={2}>Recent</MenuItem>
              <MenuItem value={3}>Price</MenuItem>
            </Select>
          </Grid>
        </Grid>

        <Grid mt={3} container spacing={3} alignItems="flex-start" justifyContent='flex-start'>
          {collections.map((collection) => (
            <Grid item collection xs={12} sm={6} md={4} xl={3}>
              <CollectionsCard collection={collection} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}