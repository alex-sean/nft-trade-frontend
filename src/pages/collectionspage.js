import React, { useEffect, useState } from 'react';
import { Box, Container, Typography, Grid } from "@mui/material";
import CollectionsFilter from '../screens/CollectionsFilter';
import CollectionsCard from "../components/CollectionsCard";
import useStyles from '../styles/styles';
import { getCollections } from '../adapters/backend';
import { useLoadingContext } from '../hooks/useLoadingContext';
import { toast } from 'react-toastify';

export default function CollectionsPage(){
  const items = [
    {
      id: 1,
      imageURL: 'http://localhost/nft_trades/tokens/626898942749fc720adce660_story.jpg',
      img2: 'images/collections/collection_1_2.jpg',
      img3: 'images/collections/collection_1_3.jpg',
      img4: 'images/collections/collection_1_4.jpg',
      name: 'Art Me Outside',
      owner: 'Wow Frens',
      supply: '10K',
      description: 'aaaaaaaaaaaaaaaaaaaaaa'
    },
    {
      id: 1,
      imageURL: 'http://localhost/nft_trades/tokens/626898942749fc720adce660_story.jpg',
      img2: 'images/collections/collection_1_2.jpg',
      img3: 'images/collections/collection_1_3.jpg',
      img4: 'images/collections/collection_1_4.jpg',
      name: 'Art Me Outside',
      owner: 'Wow Frens',
      supply: '10K',
      description: 'aaaaaaaaaaaaaaaaaaaaaa'
    },
    {
      id: 1,
      imageURL: 'http://localhost/nft_trades/tokens/626898942749fc720adce660_story.jpg',
      img2: 'images/collections/collection_1_2.jpg',
      img3: 'images/collections/collection_1_3.jpg',
      img4: 'images/collections/collection_1_4.jpg',
      name: 'Art Me Outside',
      owner: 'Wow Frens',
      supply: '10K',
      description: 'aaaaaaaaaaaaaaaaaaaaaa'
    },
    {
      id: 1,
      imageURL: 'http://localhost/nft_trades/tokens/626898942749fc720adce660_story.jpg',
      img2: 'images/collections/collection_1_2.jpg',
      img3: 'images/collections/collection_1_3.jpg',
      img4: 'images/collections/collection_1_4.jpg',
      name: 'Art Me Outside',
      owner: 'Wow Frens',
      supply: '10K',
      description: 'aaaaaaaaaaaaaaaaaaaaaa'
    },
    {
      id: 1,
      imageURL: 'http://localhost/nft_trades/tokens/626898942749fc720adce660_story.jpg',
      img2: 'images/collections/collection_1_2.jpg',
      img3: 'images/collections/collection_1_3.jpg',
      img4: 'images/collections/collection_1_4.jpg',
      name: 'Art Me Outside',
      owner: 'Wow Frens',
      supply: '10K',
      description: 'aaaaaaaaaaaaaaaaaaaaaa'
    },
    {
      id: 1,
      imageURL: 'http://localhost/nft_trades/tokens/626898942749fc720adce660_story.jpg',
      img2: 'images/collections/collection_1_2.jpg',
      img3: 'images/collections/collection_1_3.jpg',
      img4: 'images/collections/collection_1_4.jpg',
      name: 'Art Me Outside',
      owner: 'Wow Frens',
      supply: '10K',
      description: 'aaaaaaaaaaaaaaaaaaaaaa'
    },
    {
      id: 1,
      imageURL: 'http://localhost/nft_trades/tokens/626898942749fc720adce660_story.jpg',
      img2: 'images/collections/collection_1_2.jpg',
      img3: 'images/collections/collection_1_3.jpg',
      img4: 'images/collections/collection_1_4.jpg',
      name: 'Art Me Outside',
      owner: 'Wow Frens',
      supply: '10K',
      description: 'aaaaaaaaaaaaaaaaaaaaaa'
    },
    {
      id: 1,
      imageURL: 'http://localhost/nft_trades/tokens/626898942749fc720adce660_story.jpg',
      img2: 'images/collections/collection_1_2.jpg',
      img3: 'images/collections/collection_1_3.jpg',
      img4: 'images/collections/collection_1_4.jpg',
      name: 'Art Me Outside',
      owner: 'Wow Frens',
      supply: '10K',
      description: 'aaaaaaaaaaaaaaaaaaaaaa'
    },
  ];

  const classes = useStyles();

  const [collections, setCollections] = useState([]);

  const { setLoading } = useLoadingContext();

  const initialize = async () => {
    setLoading(true);

    try {
      let collections = await getCollections(0);
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
    initialize();
  }, [])

  return (
    <Box py={4} className={classes.collectionsPage}>
      <Container maxWidth="lg">
        <Typography py={3} align="center" variant="h4">Explore Collections</Typography>
        <CollectionsFilter />
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