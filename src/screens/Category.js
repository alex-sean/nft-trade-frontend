import React from 'react';
import { Grid, Typography, Box, Container } from '@mui/material';
import useStyles from '../styles/styles';
import CategoryItem from '../components/CategoryItem'
import HomeFilter from './HomeFilter';

const Category = () => {
  const classes = useStyles();

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
    <Box py={5} sx={{ flexGrow: 1, minHeight: '400px'}}>
      <Box sx={{display:'flex', justifyContent: 'center', alignItems: 'center', margin: '32px'}}>
        <img style={{width: '32px'}} src="https://cdn.jsdelivr.net/npm/emoji-datasource-apple@7.0.2/img/apple/64/26a1.png" />
        <Typography variant="h4" className={classes.trendingTitle}>Featured Collections</Typography>
      </Box>
      <Container maxWidth="lg">
        <HomeFilter />
        <Grid container className={classes.sectionGridContainer} spacing={4}>
          {items.map((item) => (
            <Grid
              xs={12}
              sm={6}
              md={3}
              minHeight={100}
              key={item.id}
              sx={{padding: '5px'}}
            >
              <CategoryItem {...item} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Category;