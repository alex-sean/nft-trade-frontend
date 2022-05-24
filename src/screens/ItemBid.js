import React from 'react';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import PropTypes from 'prop-types';
import { Grid, Typography, Box, Divider, Button, Card, CardActions, CardContent } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import useStyles from '../styles/styles';
import { Icon } from '@iconify/react';

export default function ItemBid(props) {
  const classes = useStyles();
  
  return (
    <>
      <Card container>
        <CardContent>
          <Grid container spacing={2} p={2}>
            <Grid item xs={12} md={6}>
              <Box>
                <Typography noWrap>
                  Highest bid by 0x695d2ef170ce69e794707eeef9497af2de25df82
                </Typography>
              </Box>
              <Grid container spacing={3} pt={2}>
                <Grid item xs='auto'>
                  <img src='images/avatars/avatar_4.jpg' style={{borderRadius: '12px'}}/>
                </Grid>
                <Grid item>
                  <Box sx={{display:'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <Icon icon="logos:ethereum" rotate={2} hFlip={true} vFlip={true} />
                    <Typography color="rgb(16, 185, 129)">4.7 ETH</Typography>
                  </Box>
                  <Typography noWrap>~10,864.10</Typography>
                </Grid>
              </Grid>
            </Grid>
            <Divider orientation="vertical" flexItem/>
            <Grid item xs={12} md={5}>
              <Box>
                <Typography noWrap>
                  Auction ends in
                </Typography>
              </Box>
              <Grid container spacing={3} pt={2}>
                <Grid item xs={3}>
                  <Typography noWrap variant="body2">106</Typography>
                  <Typography noWrap variant="body1">Days</Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography noWrap variant="body2">09</Typography>
                  <Typography noWrap variant="body1">Hrs</Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography noWrap variant="body2">21</Typography>
                  <Typography noWrap variant="body1">Min</Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography noWrap variant="body2">23</Typography>
                  <Typography noWrap variant="body1">Sec</Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
        <CardActions>
          <Button className={classes.primaryButton} sx={{width: '100%'}}>
            Place Bid
          </Button>
        </CardActions>
      </Card>
    </>
  );
}