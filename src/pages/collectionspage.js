import { Box, Container, Typography, Grid } from "@mui/material";
import CollectionsFilter from '../screens/CollectionsFilter';
import CollectionsCard from "../components/CollectionsCard";
import useStyles from '../styles/styles';

export default function CollectionsPage(){
  const items = [
    {
      id: 1,
      img1: 'images/collections/collection_1_1.jpg',
      img2: 'images/collections/collection_1_2.jpg',
      img3: 'images/collections/collection_1_3.jpg',
      img4: 'images/collections/collection_1_4.jpg',
      title: 'Art Me Outside',
      owner: 'Wow Frens',
      count: '10K',
    },
    {
      id: 2,
      img1: 'images/collections/collection_2_1.jpg',
      img2: 'images/collections/collection_2_2.jpg',
      img3: 'images/collections/collection_2_3.jpg',
      img4: 'images/collections/collection_2_4.jpg',
      title: 'PankySkal',
      owner: 'NFT stars',
      count: '2.8K',
    },
    {
      id: 3,
      img1: 'images/collections/collection_3_1.jpg',
      img2: 'images/collections/collection_3_2.jpg',
      img3: 'images/collections/collection_3_3.jpg',
      img4: 'images/collections/collection_3_4.jpg',
      title: 'VR Space_287',
      owner: 'Origin Morish',
      count: '8K',
    },
    {
      id: 4,
      img1: 'images/collections/collection_4_1.jpg',
      img2: 'images/collections/collection_4_2.jpg',
      img3: 'images/collections/collection_4_3.jpg',
      img4: 'images/collections/collection_4_4.jpg',
      title: 'Metasmorf',
      owner: 'Lazy Panda',
      count: '1.5K',
    },
    {
      id: 5,
      img1: 'images/collections/collection_5_1.jpg',
      img2: 'images/collections/collection_5_2.jpg',
      img3: 'images/collections/collection_5_3.jpg',
      img4: 'images/collections/collection_5_4.jpg',
      title: '3Landers',
      owner: '051_Hart',
      count: '15K',
    },
    {
      id: 6,
      img1: 'images/collections/collection_6_1.jpg',
      img2: 'images/collections/collection_6_2.jpg',
      img3: 'images/collections/collection_6_3.jpg',
      img4: 'images/collections/collection_6_4.jpg',
      title: 'SlimHoods',
      owner: 'Crytopank',
      count: '8.8K',
    },
    {
      id: 7,
      img1: 'images/collections/collection_7_1.jpg',
      img2: 'images/collections/collection_7_2.jpg',
      img3: 'images/collections/collection_7_3.jpg',
      img4: 'images/collections/collection_7_4.jpg',
      title: 'The Overseers',
      owner: 'Hey Mrsmeseks',
      count: '13K',
    },
    {
      id: 8,
      img1: 'images/collections/collection_8_1.jpg',
      img2: 'images/collections/collection_8_2.jpg',
      img3: 'images/collections/collection_8_3.jpg',
      img4: 'images/collections/collection_8_4.jpg',
      title: 'Dope Shibas',
      owner: 'alyxbow',
      count: '3K',
    },
  ];

  const classes = useStyles();
  return (
    <Box py={4} className={classes.collectionsPage}>
      <Container maxWidth="lg">
        <Typography py={3} align="center" variant="h4">Explore Collections</Typography>
        <CollectionsFilter />
        <Grid container spacing={3} justifyContent="space-around" alignItems="flex-start">
          {items.map((item) => (
            <Grid item xs={12} lg={4} xl={3}>
              <CollectionsCard {...item} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}