import React from 'react';
import { Grid, Typography, Box, Container } from '@mui/material';
import useStyles from '../styles/styles';
import CardItem from '../components/CardItem'
import HomeFilter from './HomeFilter';
import CollectionItem from '../components/CollectionItem';
import CollectionsCard from '../components/CollectionsCard';
import { useLoadingContext } from '../hooks/useLoadingContext';
import { toast } from 'react-toastify';
import { getFeaturedCollections } from '../adapters/backend';

const Category = ({ items, setItems }) => {
  const classes = useStyles();

  const { setLoading } = useLoadingContext();

  const getItems = async (category, sort, verify) => {
    setLoading(true);

    try {
      let collections = await getFeaturedCollections(category, sort, verify);
      if (!collections) {
        throw new Error('Getting collections failed.');
      }

      setItems(collections.data.collections);
    } catch (err) {
      console.log(err);
      toast('Getting collections failed.');
    }

    setLoading(false);
  }

  return (
    <Box py={5} sx={{ flexGrow: 1, minHeight: '400px'}}>
      <Box sx={{display:'flex', justifyContent: 'center', alignItems: 'center', margin: '32px'}}>
        <img style={{width: '32px'}} src="https://cdn.jsdelivr.net/npm/emoji-datasource-apple@7.0.2/img/apple/64/26a1.png" />
        <Typography variant="h4" className={classes.trendingTitle}>Featured Collections</Typography>
      </Box>
      <Container maxWidth="lg">
        <HomeFilter getItems={getItems}/>
        <Grid container className={classes.sectionGridContainer} spacing={4}>
          {items.map((item) => (
            <Grid
              xs={12}
              sm={6}
              md={3}
              minHeight={100}
              key={item.objectId}
              sx={{padding: '5px'}}
            >
              <CollectionsCard collection={item}/>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Category;