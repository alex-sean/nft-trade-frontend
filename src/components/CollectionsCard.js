import React, { useEffect, useState } from 'react';
import { Grid, Typography, Box, Card, CardActions, CardContent, Link } from '@mui/material';
import useStyles from '../styles/styles';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useWalletContext } from '../hooks/useWalletContext';
import { useLoadingContext } from '../hooks/useLoadingContext';
import { getlikeCollection, likeCollection } from '../adapters/backend';
import { toast } from 'react-toastify';

export default function CollectionsCard(props) {
  const classes = useStyles();
  const { collection } = props;

  const { account } = useWalletContext();
  const { setLoading } = useLoadingContext();

  const [like, setLike] = useState(false);
  const [likeCnt, setLikeCnt] = useState(collection.like);

  const getDeployerAvatarURL = () => {
    let avatarURL = 'user_avatar.gif';
    if (collection && collection.address && collection.address.length > 0) {
      avatarURL = collection.address[0].avatar;
    }

    return `${process.env.REACT_APP_AVATAR_PATH}/${avatarURL}`;
  }

  useEffect(() => {
    if (!collection) {
      return;
    }

    getLike();
  }, [collection, account])

  const getLike = async () => {
    if (!account) {
      return;
    }

    try {
      const likeStatus = await getlikeCollection(collection.collectionAddress, account);
      if (!likeStatus) {
        throw new Error('Getting like status failed.');
      }

      setLike(likeStatus.data.status);
    } catch (err) {
      console.log(err);
    }
  }

  const updateLike = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!account) {
      toast('Please connect the wallet.');
      return;
    }

    setLoading(true);

    try {
      const result = await likeCollection(collection.collectionAddress, account, !like);
      if (!result) {
        throw new Error('Updating like status failed.');
      }

      if (result.data.status) {
        if (like) {
          setLikeCnt(likeCnt - 1);
        } else {
          setLikeCnt(likeCnt + 1);
        }
        setLike(!like);
      }
    } catch (err) {
      console.log(err);
      toast('Updating like status failed.');
    }

    setLoading(false);
  }

  return (
    <>
      <Card container sx={{borderRadius: '15px', width: '270px', margin: 'auto'}} className={classes.paperBackground}>
        <Link underline='none' href={`/collection/${collection.collectionAddress}`}>
          <CardContent sx={{position:'relative'}}>
            <Box sx={{display:'flex', alignItems: 'flex-end', position: 'absolute', top: '20px', right: '20px', padding: '8px', background: '#fff', borderRadius: '8px'}} className={classes.hotBidLike}>
              {
                like?
                <FavoriteIcon sx={{color: 'red'}} onClick={(e) => updateLike(e)}/>
                :
                <FavoriteBorderIcon onClick={(e) => updateLike(e)}/>
              }
              <Typography className={classes.hotBidLike}>{likeCnt}</Typography>
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