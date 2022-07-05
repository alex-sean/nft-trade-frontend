import React, { useEffect, useState } from 'react';
import { Grid, Typography, Box, Paper, Card, CardActions, CardContent, Link, Avatar, Button } from '@mui/material';
import useStyles from '../styles/styles';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import { styled } from '@mui/material/styles';
import ButtonBase from '@mui/material/ButtonBase';
import DiscountIcon from '@mui/icons-material/Discount';
import ImportExportIcon from '@mui/icons-material/ImportExport';
import GavelIcon from '@mui/icons-material/Gavel';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import PrimaryButton from './Button/PrimaryButton';
import { getActivity } from '../adapters/backend';
import { useLoadingContext } from '../hooks/useLoadingContext';
import { toast } from 'react-toastify';
import ActivityItem from './ActivityItem';

export default function ActivityItemList({ filter, search }) {
  const classes = useStyles();

  const [activities, setActivities] = useState([]);
  const [pageNum, setPageNum] = useState(0);

  const { setLoading } = useLoadingContext();

  useEffect(() => {
    setPageNum(0);
    refreshActivities(0);
  }, [filter, search])

  const refreshActivities = async (pageNum) => {
    setLoading(true);

    try {
      let result = await getActivity(search, filter, pageNum * 10, 10);
      if (!result) {
        throw new Error('Getting activities failed.');
      }

      if (pageNum) {
        let tmpActivities = [...activities];
        tmpActivities.push(...result.data.activities);
        setActivities(tmpActivities);
      } else {
        setActivities(result.data.activities);
      }
    } catch (err) {
      console.log(err);
      toast('Getting activities failed');
    }

    setLoading(false);
  }

  const handleLoadMore = () => {
    refreshActivities(pageNum + 1);
    setPageNum(pageNum + 1);
  }

  return (
    <>
      {
        activities.map((activity) => {
          return (
            <ActivityItem key={activity.objectId} activity={activity}/>
          )
        })
      }
      <Box sx={{width: '100%'}}>
        <Button className={classes.primaryButton} style={{display: 'block', marginLeft:'auto', marginRight:'auto'}} onClick={() => handleLoadMore()}>Load more
        </Button>
      </Box>
    </>
  );
}