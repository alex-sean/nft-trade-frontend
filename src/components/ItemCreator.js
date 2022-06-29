import React from 'react';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import PropTypes from 'prop-types';
import { Grid, Typography, Box } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import useStyles from '../styles/styles';
import { Icon } from '@iconify/react';

export default function ItemCreator(props) {
  const { src, title, subtitle } = props;
  const classes = useStyles();
  
  return (
    <Grid item xs={12} md={6}>
      <Grid container spacing={1}>
        <Grid item xs='auto'>
          <img src={src} style={{borderRadius: '12px', width: '40px'}}/>
        </Grid>
        <Grid item>
          <Typography noWrap variant="body2">{title}</Typography>
          <Typography noWrap>{subtitle}</Typography>
        </Grid>
      </Grid>
    </Grid>
  );
}