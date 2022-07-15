import React, { useEffect, useState } from 'react';
import { Grid, Typography, Box, Paper, Card, CardActions, CardContent, Link, Avatar, Button } from '@mui/material';
import useStyles from '../styles/styles';
import ButtonBase from '@mui/material/ButtonBase';
import { getActivityIcon, getAssetName, getTimeStr } from '../common/CommonUtils';
import Web3 from 'web3';

export default function ActivityItem({ activity }) {
  const classes = useStyles();

  const getActivityContent = () => {
    let ret = activity.content;
    ret = ret.replace(
      '%USER%',
      activity.Operator && activity.Operator.length > 0? activity.Operator[0].name: `${activity.operator.slice(0, 13)}..`
    );

    ret = ret.replace(
      '%ASSET%',
      getAssetName(activity.asset)
    )

    let amountReplacement = '';
    if (activity.asset === 'USD') {
      amountReplacement = parseFloat(Web3.utils.fromWei(activity.amount +'')).toFixed(2);
    } else if (!activity.asset) {
      if (activity.amount) {
        amountReplacement = parseFloat(Web3.utils.fromWei(activity.amount +'')).toFixed(4);
      }
    } else if (activity.asset) {
      amountReplacement = parseFloat(Web3.utils.fromWei(activity.amount +'')).toFixed(4);
    }

    ret = ret.replace(
      '%AMOUNT%',
      amountReplacement
    );

    return ret;
  }

  const getEventTitle = () => {
    if (activity.collectionAddress) {
      if (activity.tokenID) {
        return `${activity.Collection[0].name} #${activity.tokenID}`;
      }
      return activity.Collection[0].name;
    }

    if (activity.Operator && activity.Operator.length > 0) {
      return activity.Operator[0].name;
    }
    return `${activity.operator.slice(0, 13)}...`;
  }

  const getOperatorAvatarURL = () => {
    let avatarURL = 'user_avatar.gif';
    if (activity.Operator && activity.Operator.length > 0) {
      avatarURL = activity.Operator[0].avatar;
    }

    return `${process.env.REACT_APP_AVATAR_PATH}/${avatarURL}`;
  }

  const getActivityAvatarURL = () => {
    if (activity.collectionAddress) {
      return activity.Collection[0].imageURL;
    } else {
      return getOperatorAvatarURL();
    }
  }

  return (
    <>
      <Paper className={`${`${classes.hoverShadow} ${classes.paperBackground}`} ${classes.paperBackground}`} elevation={1} sx={{p: 2, mb: 3, maxWidth: 740, borderRadius: '20px'}}>
        <Grid container spacing={2} alignItems="center">
          <Grid item>
            <ButtonBase sx={{ display:'flex', justifyContent: 'center', padding: '32px' }}>
              <img style={{borderRadius: '10px', width: '48px'}} src={getActivityAvatarURL()} />
            </ButtonBase>
          </Grid>
          <Grid item xs container alignItems='center'>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="h6" component="div">{getEventTitle(activity)}</Typography>
                <Typography variant="body1" gutterBottom>{getActivityContent(activity)}</Typography>
                <Typography variant="body2" color="text.secondary">{getTimeStr(activity.updatedAt)}</Typography>
              </Grid>
            </Grid>
            <Grid item>
              <Avatar sx={{border:'solid 1px gray', color: 'gray', backgroundColor: '#fff'}}>
                {getActivityIcon(activity.type)}
              </Avatar>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
}