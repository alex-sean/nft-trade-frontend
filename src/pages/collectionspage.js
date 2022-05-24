import ItemHero from "../screens/ItemHero"
import ItemCollection from "../screens/ItemCollection"
import { Container, Typography, Grid } from "@mui/material";

export default function CollectionsPage(){
  const items = [
    {
      id: 1,
      img1: 'images/products/item_1.jpg',
      img2: 'images/products/item_1.jpg',
      img3: 'images/products/item_1.jpg',
      img4: 'images/products/item_1.jpg',
      title: 'ETH Me Outside',
      owner: 'Current Bid 1.3ETH',
      count: '1.55ETH',
    },
  ];

  return (
    <Container maxWidth="lg">
      <Typography pt={3} align="center" variant="h4">Explore Collections</Typography>
    </Container>
  );
}