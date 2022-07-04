import React, { useEffect, useState } from 'react';
import { Typography, Box, Link, Tooltip } from '@mui/material';
import HistoryIcon from '@mui/icons-material/History';
import useStyles from '../styles/styles';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useWalletContext } from '../hooks/useWalletContext';
import { useLoadingContext } from '../hooks/useLoadingContext';
import { getlikeToken, likeToken } from '../adapters/backend';
import { toast } from 'react-toastify';

function CardItem(props) {
  const { token } = props;
  const classes = useStyles();

  const { account } = useWalletContext();
  const { setLoading } = useLoadingContext();

  const [like, setLike] = useState(false);
  const [likeCnt, setLikeCnt] = useState(token.like);

  useEffect(() => {
    if (!token) {
      return;
    }

    getLike();
  }, [token, account])

  const getLike = async () => {
    if (!account) {
      return;
    }

    try {
      const likeStatus = await getlikeToken(token.collectionAddress, token.tokenID, account);
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
      const result = await likeToken(token.collectionAddress, token.tokenID, account, !like);
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
    <Box className={`${classes.hoverShadow} ${classes.paperBackground}`} sx={{border:'solid 1px rgba(0, 0, 0, 0.1)', borderRadius:'1.25rem', padding: '1.1875rem', marginBottom: '16px'}} onClick={() => document.location.href=`/item/${token.collectionAddress}/${token.tokenID}`}>
      <Box sx={{position: 'relative'}}>
        <img style={{width: '100%'}} src={`${token.imageURL}`} className={classes.rounded}/>
        <Box sx={{display:'flex', position: 'absolute', top: '16px', right: '16px', padding: '8px', background: '#fff', borderRadius: '8px'}} className={classes.hotBidLike}>
          {
            like?
            <FavoriteIcon sx={{color: 'red'}} onClick={(e) => updateLike(e)}/>
            :
            <FavoriteBorderIcon onClick={(e) => updateLike(e)}/>
          }
          <Typography className={classes.hotBidLike}>{likeCnt}</Typography>
        </Box>
        <Box sx={{display:'flex', position: 'absolute', bottom: '-12px', left: '16px'}}>
          <Link>
            <Tooltip title="Creator: Sussygirl">
              <img src="../images/avatars/creator_1.png" className={classes.creatorLink}/>
            </Tooltip>
          </Link>
          <Link sx={{marginLeft: '-6px'}}>
            <Tooltip title="Owner: Sussygirl">
              <img src="../images/avatars/owner_1.png" className={classes.creatorLink}/>
            </Tooltip>
          </Link>
        </Box>
      </Box>
      <Box mt={2} sx={{display:'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <Typography variant="h6" className={classes.collectionItemTitle}>{token.name} #{token.tokenID}</Typography>
        {/* <MoreHorizIcon /> */}
        {`$ ${token.price}`}
      </Box>
      <Typography className={[classes.collectionSubtitle, classes.ellipseText]}>{token.description}</Typography>
      <Box sx={{display:'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px'}}>
        <Typography className={classes.collectionBuy}>Buy now</Typography>
        <Box sx={{display:'flex', color: '#5A5D79'}}>
          <HistoryIcon />
          <Typography className={classes.collectionHistory}>View History</Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default CardItem;