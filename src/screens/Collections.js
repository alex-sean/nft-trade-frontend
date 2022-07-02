import React from 'react';
import { Grid, Typography, Box, Container, useMediaQuery } from '@mui/material';
import useStyles from '../styles/styles';
import CollectionItem from '../components/CollectionItem';
import PrimaryButton from '../components/Button/PrimaryButton';
import CollectionMenu from '../components/CollectionMenu';
import { useTheme } from '@mui/material/styles';
import { getPopularCollections } from '../adapters/backend';
import { toast } from 'react-toastify';
import { useLoadingContext } from '../hooks/useLoadingContext';

const Collections = ({ items, setItems }) => {
  const classes = useStyles();

  const theme = useTheme();
  const matctMd = useMediaQuery(theme.breakpoints.up('md'))

  const { setLoading } = useLoadingContext();

  const getCollections = async (from) => {
    setLoading(true);

    try {
      let popularCollections = await getPopularCollections(from);
      if (!popularCollections) {
        throw new Error('Getting popular collections failed.');
      }
      setItems(popularCollections.data.collections);
    } catch (err) {
      console.log(err);
      toast('Getting popular collections failed.');
    }

    setLoading(false);
  }

  return (
    <Box py={5} className={classes.collections}>
      <Container maxWidth="lg">
        <Box sx={{display:`${matctMd ? 'flex' : 'block'}`, justifyContent: 'center', alignItems: 'center', margin: '32px'}}>
          <Typography variant="h4" className={classes.collectionTitle}>Top collections over</Typography>
          <CollectionMenu getCollections={getCollections}/>
        </Box>

        <Grid container className={classes.sectionGridContainer} spacing={4}>
          {items.map((item) => (
            <Grid
              item
              xs={12}
              sm={6}
              lg={3}
              minHeight={100}
              key={item.id}
            >
              <CollectionItem item={item} />
            </Grid>
          ))}
        </Grid>
      </Container>
      {/* <PrimaryButton text="Go to Rankings" /> */}
    </Box>
  );
};

export default Collections;