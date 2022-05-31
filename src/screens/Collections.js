import React from 'react';
import { Grid, Typography, Box, Container, useMediaQuery } from '@mui/material';
import useStyles from '../styles/styles';
import CollectionItem from '../components/CollectionItem';
import PrimaryButton from '../components/Button/PrimaryButton';
import CollectionMenu from '../components/CollectionMenu';
import { useTheme } from '@mui/material/styles';

const Collections = (props) => {
  const classes = useStyles();

  const items = [
    {
      id: 1,
      src: 'images/avatars/avatar_1.jpg',
      title: 'NFT Funny Cat',
      amount: '7,080.95ETH',
      checked: true,
    },
    {
      id: 2,
      src: 'images/avatars/avatar_2.jpg',
      title: 'Cryptopank',
      amount: '6,548.133ETH',
      checked: true,
    },
    {
      id: 3,
      src: 'images/avatars/avatar_3.jpg',
      title: 'Prince Ape Planet',
      amount: '4,823927ETH',
      checked: false,
    },
    {
      id: 4,
      src: 'images/avatars/avatar_4.jpg',
      title: 'Hey Mrsmeseks',
      amount: '3,186ETH',
      checked: false,
    },
    {
      id: 5,
      src: 'images/avatars/avatar_5.jpg',
      title: 'NFT Funny Cat',
      amount: '7.080.95ETH',
      checked: false,
    },
    {
      id: 6,
      src: 'images/avatars/avatar_6.gif',
      title: 'NFT Funny Cat',
      amount: '7.080.95ETH',
      checked: false,
    },
    {
      id: 7,
      src: 'images/avatars/avatar_7.jpg',
      title: 'NFT Funny Cat',
      amount: '7.080.95ETH',
      checked: true,
    },
    {
      id: 8,
      src: 'images/avatars/avatar_8.jpg',
      title: 'NFT Funny Cat',
      amount: '7.080.95ETH',
      checked: true,
    },
    {
      id: 9,
      src: 'images/avatars/avatar_9.jpg',
      title: 'NFT Funny Cat',
      amount: '7.080.95ETH',
      checked: false,
    },
    {
      id: 10,
      src: 'images/avatars/avatar_10.jpg',
      title: 'NFT Funny Cat',
      amount: '7.080.95ETH',
      checked: true,
    },
    {
      id: 11,
      src: 'images/avatars/avatar_11.jpg',
      title: 'NFT Funny Cat',
      amount: '7.080.95ETH',
      checked: false,
    },
    {
      id: 12,
      src: 'images/avatars/avatar_12.jpg',
      title: 'NFT Funny Cat',
      amount: '7.080.95ETH',
      checked: true,
    },
    {
      id: 13,
      src: 'images/avatars/avatar_9.jpg',
      title: 'Arcahorizons',
      amount: '7.080.95ETH',
      checked: true,
    },
    {
      id: 14,
      src: 'images/avatars/avatar_10.jpg',
      title: 'NFT Funny Cat',
      amount: '1,157 ETH',
      checked: false,
    },
    {
      id: 15,
      src: 'images/avatars/avatar_11.jpg',
      title: 'NFT Funny Cat',
      amount: '7.080.95ETH',
      checked: true,
    },
    {
      id: 16,
      src: 'images/avatars/avatar_12.jpg',
      title: 'NFT Funny Cat',
      amount: '7.080.95ETH',
      checked: false,
    },
  ];
  const theme = useTheme();
  const matctMd = useMediaQuery(theme.breakpoints.up('md'))

  return (
    <Box className={classes.collections}>
      <Container maxWidth="lg">
        <Box sx={{display:`${matctMd ? 'flex' : 'block'}`, justifyContent: 'center', alignItems: 'center', margin: '32px'}}>
          <Typography variant="h4" className={classes.collectionTitle}>Top collections over</Typography>
          <CollectionMenu />
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
              <CollectionItem {...item} />
            </Grid>
          ))}
        </Grid>
      </Container>
      <PrimaryButton text="Go to Rankings" />
    </Box>
  );
};

export default Collections;