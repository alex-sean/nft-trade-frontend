import React from 'react';
import { Grid, Typography, Box, Card, CardActions, CardContent, Link } from '@mui/material';
import useStyles from '../styles/styles';
import CircleIcon from '@mui/icons-material/Circle';

export default function CollectionsCard(props) {
  const classes = useStyles();
  const { collection } = props;

  return (
    <>
      <Card container sx={{borderRadius: '15px', width: '270px', margin: 'auto'}} className={classes.paperBackground}>
        <Link underline='none' href='/collection'>
          <CardContent>
            <img src={collection.imageURL} style={{maxHeight: '250px', width: '100%'}}/>
          </CardContent>
          <CardActions>
            <Link px={1} underline="none" className={classes.text}>
              <Typography variant='body1'>{collection.name}</Typography>
            </Link>
          </CardActions>
          <Box pb={3} px={2} display="flex" justifyContent="space-between" alignItems="center">
            <Box display="flex" alignItems="center">
              <CircleIcon sx={{color:'gray'}} />
              <Typography variant="body1"> by {collection.address.length? collection.address[0].name: `${collection.deployer.slice(0, 13)}...`}</Typography>
            </Box>
            <Typography variant='body1'>{collection.supply} Items</Typography>
          </Box>
        </Link>
      </Card>
    </>
  );
}