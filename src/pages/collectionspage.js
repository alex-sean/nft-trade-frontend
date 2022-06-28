import React, { useEffect, useState } from 'react';
import { Box, Container, Typography, Grid } from "@mui/material";
import CollectionsFilter from '../screens/CollectionsFilter';
import CollectionsCard from "../components/CollectionsCard";
import useStyles from '../styles/styles';
import { getCollections } from '../adapters/backend';
import { useLoadingContext } from '../hooks/useLoadingContext';
import { toast } from 'react-toastify';
import CategoryFilter from '../screens/CategoryFilter';

export default function CollectionsPage(){
  const classes = useStyles();

  const [collections, setCollections] = useState([]);
  const [category, setCategory] = useState(0);

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
    getCollectionsByCategory(0);
  }, [])

  useEffect(() => {
    getCollectionsByCategory(category);
  }, [category])

  return (
    <Box py={4} className={classes.collectionsPage}>
      <Container maxWidth="lg">
        <Typography py={3} align="center" variant="h4">Explore Collections</Typography>
        <CategoryFilter setCategory={setCategory} category={category}/>
        <Grid mt={3} container spacing={3} justifyContent="space-around" alignItems="flex-start">
          {collections.map((collection) => (
            <Grid collection xs={12} sm={6} md={4} xl={3}>
              <CollectionsCard collection={collection} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}