import React from 'react';
import { Typography, Box, Container } from '@mui/material';
import useStyles from '../styles/styles';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import HotbidItem from '../components/HotbidItem'
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const Hotbids = () => {
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));

  const sectionItems = [
    {
      id: 1,
      src: 'images/products/item_1.jpg',
      title: 'ETH Me Outside',
      subtitle: 'Current Bid 1.3ETH',
      amount: '1.55 ETH',
      like: '159',
    },
    {
      id: 2,
      src: 'images/products/item_2.jpg',
      title: 'Lazyone Panda',
      subtitle: 'Current Bid 2ETH',
      amount: '1.55 ETH',
      like: '75',
    },
    {
      id: 3,
      src: 'images/products/item_3.jpg',
      title: 'Splendid Girl',
      subtitle: 'Current Bid 4.7ETH',
      amount: '5.1 ETH',
      like: '253',
    },
    {
      id: 4,
      src: 'images/products/item_4.jpg',
      title: 'Amazing NFT Art',
      subtitle: 'Current Bid 1.2ETH',
      amount: '7 ETH',
      like: '324',
    },
    {
      id: 5,
      src: 'images/products/item_3.gif',
      title: 'Portrait Gallery',
      subtitle: 'Current Bid 0.05ETH',
      amount: '0.7 ETH',
      like: '54',
    },
    {
      id: 6,
      src: 'images/products/item_5.jpg',
      title: 'Flourishing Cat #180',
      subtitle: 'Current Bid 0.25ETH',
      amount: '3 ETH',
      like: '125',
    },
  ];

  return (
    <Box className={classes.hotBids}>
      <Box className={`${classes.displayFlex} ${classes.justifyCenter} ${classes.my32}`}>
        <img style={{width:'32px'}} src="https://cdn.jsdelivr.net/npm/emoji-datasource-apple@7.0.2/img/apple/64/1f525.png" />
        <Typography variant="h4" className={classes.hotbidTitle}>Hot Bids</Typography>
      </Box>
      <Container maxWidth="lg" spacing={4}>
        <Swiper slidesPerView={matches ? 1 : 4} >
          {sectionItems.map((item) => (
            <SwiperSlide key={item.id}>
              <HotbidItem {...item} />
            </SwiperSlide>
          ))}
        </Swiper>
      </Container>
    </Box>
  );
};

export default Hotbids;