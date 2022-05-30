import React from 'react';
import { Grid, Typography, Box, Card, CardActions, CardContent, Link } from '@mui/material';
import useStyles from '../styles/styles';
import CircleIcon from '@mui/icons-material/Circle';

export default function CollectionsCard(props) {
  const classes = useStyles();
  const { img1, img2, img3, img4, title, owner, count } = props;

  return (
    <>
      <Card container sx={{borderRadius: '15px'}}>
        <Link underline='none' href='/collection'>
          <CardContent>
            <Grid pr={2} container spacing={1} direction="row" justifyContent="center" alignItems="stretch">
              <Grid item xs={9}>
                <img src={img1} />
              </Grid>
              <Grid item xs={3} container direction='column'>
                <Grid item xs>
                  <img src={img2} />
                </Grid>
                <Grid item xs>
                  <img src={img3} />
                </Grid>
                <Grid item xs>
                  <img src={img4} />
                </Grid>
              </Grid>
            </Grid>
          </CardContent>
          <CardActions>
            <Link px={1} underline="none" className={classes.text}>
              <Typography variant='body1'>{title}</Typography>
            </Link>
          </CardActions>
          <Box pb={3} px={2} display="flex" justifyContent="space-between" alignItems="center">
            <Box display="flex" alignItems="center">
              <CircleIcon color="primary" />
              <Typography variant="body1"> by {owner}</Typography>
            </Box>
            <Typography variant='body1'>{count} Items</Typography>
          </Box>
        </Link>
      </Card>
    </>
  );
}