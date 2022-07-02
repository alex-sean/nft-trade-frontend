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

const Hotbids = ({ items }) => {
  const classes = useStyles();
  const theme = useTheme();
  const matchLg = useMediaQuery(theme.breakpoints.up('lg'))
  const matctMd = useMediaQuery(theme.breakpoints.only('md'))
  const matctSm = useMediaQuery(theme.breakpoints.only('sm'))

  return (
    <Box className={classes.hotBids}>
      <Box className={`${classes.displayFlex} ${classes.justifyCenter} ${classes.my32}`}>
        <img style={{width:'32px'}} src="https://cdn.jsdelivr.net/npm/emoji-datasource-apple@7.0.2/img/apple/64/1f525.png" />
        <Typography variant="h4" className={classes.hotbidTitle}>Hot Bids</Typography>
      </Box>
      <Container maxWidth="lg" spacing={4}>
        <Swiper navigation={true} modules={[Navigation]} slidesPerView={matchLg ? '4' : (matctMd ? '3' : (matctSm ? '2' : '1'))} >
          {items.map((item) => (
            <SwiperSlide key={item.id}>
              <HotbidItem item={item} />
            </SwiperSlide>
          ))}
        </Swiper>
      </Container>
    </Box>
  );
};

export default Hotbids;