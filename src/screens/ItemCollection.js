import React from 'react';
import { Typography, Box, Container } from '@mui/material';
import useStyles from '../styles/styles';
import HotbidItem from '../components/HotbidItem'
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from "swiper";
import "swiper/css/navigation";
import 'swiper/css';

export default function ItemCollection(){
  const classes = useStyles();
  const theme = useTheme();
  const matchLg = useMediaQuery(theme.breakpoints.up('lg'))
  const matctMd = useMediaQuery(theme.breakpoints.only('md'))
  const matctSm = useMediaQuery(theme.breakpoints.only('sm'))

  const sectionItems = [
    {
      id: 1,
      src: 'images/products/item_1.jpg',
      title: 'ETH Me Outside',
      subtitle: 'Current Bid 1.3ETH',
      amount: '1.55ETH',
      like: '159',
    },
    {
      id: 2,
      src: 'images/products/item_2.jpg',
      title: 'Lazyone Panda',
      subtitle: 'Current Bid 2ETH',
      amount: '1.55ETH',
      like: '75',
    },
    {
      id: 3,
      src: 'images/products/item_3.jpg',
      title: 'Splendid Girl',
      subtitle: 'Current Bid 4.7ETH',
      amount: '5.1ETH',
      like: '253',
    },
    {
      id: 4,
      src: 'images/products/item_4.jpg',
      title: 'Amazing NFT Art',
      subtitle: 'Current Bid 1.2ETH',
      amount: '7ETH',
      like: '324',
    },
    {
      id: 5,
      src: 'images/products/item_3.gif',
      title: 'Portrait Gallery',
      subtitle: 'Current Bid 0.05ETH',
      amount: '0.7ETH',
      like: '54',
    },
    {
      id: 6,
      src: 'images/products/item_5.jpg',
      title: 'Flourishing Cat #180',
      subtitle: 'Current Bid 0.25ETH',
      amount: '3ETH',
      like: '125',
    },
  ];

  return (
    <Box className={`${classes.hotBids} ${classes.commonBackgroundColor}`}>
      <Typography py={4} align="center" variant="h4">More from this collection</Typography>
      <Container maxWidth="lg" spacing={4}>
        <Swiper navigation={true} modules={[Navigation]} slidesPerView={matchLg ? '4' : (matctMd ? '3' : (matctSm ? '2' : '1'))}>
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