import React from 'react';
import { Grid, Typography, Box, Card, CardActions, CardContent, Link } from '@mui/material';
import useStyles from '../styles/styles';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

export default function CollectionsCard(props) {
  const classes = useStyles();
  const { collection } = props;

  const getDeployerAvatarURL = () => {
    let avatarURL = 'user_avatar.gif';
    if (collection && collection.address && collection.address.length > 0) {
      avatarURL = collection.address[0].avatar;
    }

    return `${process.env.REACT_APP_AVATAR_PATH}/${avatarURL}`;
  }

  return (
    <>
      <Card container sx={{borderRadius: '15px', width: '270px', margin: 'auto'}} className={classes.paperBackground}>
        <Link underline='none' href={`/collection/${collection.collectionAddress}`}>
          <CardContent sx={{position:'relative'}}>
            <Box sx={{display:'flex', alignItems: 'flex-end', position: 'absolute', top: '20px', right: '20px', padding: '8px', background: '#fff', borderRadius: '8px'}} className={classes.hotBidLike}>
              {
                collection.like?
                <FavoriteIcon sx={{color: 'red'}}/>
                :
                <FavoriteBorderIcon/>
              }
              <Typography className={classes.hotBidLike}>{collection.like}</Typography>
            </Box>
            <img src={collection.imageURL} style={{maxHeight: '250px', width: '100%'}}/>
            <Link px={1} underline="none" className={classes.text}>
              <Typography variant='body1'>{collection.name}</Typography>
            </Link>
            <Typography variant='body2' className={classes.ellipseText}>{collection.description}</Typography>
          </CardContent>
          <Box pb={3} px={2} display="flex" justifyContent="space-between" alignItems="center">
            <Box display="flex" alignItems="flex-end">
              <img src={getDeployerAvatarURL()} className={classes.creatorLink}/>
              <Typography ml={1} variant="body1"> by {collection.address && collection.address.length? collection.address[0].name: `${collection.deployer.slice(0, 13)}...`}</Typography>
            </Box>
            <Typography variant='body1'>{collection.supply} Items</Typography>
          </Box>
        </Link>
      </Card>
    </>
  );
}