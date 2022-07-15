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
import { BASE_CURRENCY_TYPE } from '../common/const';
import Web3 from 'web3';

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

  const getDeployerAvatarURL = () => {
    let avatarURL = 'user_avatar.gif';
    if (token && token.Deployer && token.Deployer.length > 0) {
      avatarURL = token.Deployer[0].avatar;
    }

    return `${process.env.REACT_APP_AVATAR_PATH}/${avatarURL}`;
  }

  const getOwnerAvatarURL = () => {
    let avatarURL = 'user_avatar.gif';
    if (token && token.Owner && token.Owner.length > 0) {
      avatarURL = token.Owner[0].avatar;
    }

    return `${process.env.REACT_APP_AVATAR_PATH}/${avatarURL}`;
  }

  const getOwnerName = () => {
    if (token && token.Owner && token.Owner.length > 0) {
      return token.Owner[0].name;
    } 

    return `${token.owner.slice(0, 13)}...`;
  }

  const getDeployerName = () => {
    if (token && token.Deployer && token.Deployer.length > 0) {
      return token.Deployer[0].name;
    } 

    return `${token.deployer.slice(0, 13)}...`;
  }

  const getPrice = () => {
    if (token.listed) {
      if (token.baseType === BASE_CURRENCY_TYPE.USD) {
        return `$ ${Web3.utils.fromWei(token.usdPrice + '')}`;
      } else {
        return `${Web3.utils.fromWei(token.avaxPrice + '')} AVAX`;
      }
    } else {
      return '$ 0'
    }
  }
  
  return (
    <Box className={`${classes.hoverShadow} ${classes.paperBackground}`} sx={{border:'solid 1px rgba(0, 0, 0, 0.1)', borderRadius:'1.25rem', padding: '1.1875rem', marginBottom: '16px'}} onClick={() => document.location.href=`/item/${token.collectionAddress}/${token.tokenID}`}>
      <Box sx={{position: 'relative'}}>
        <img style={{width: '100%'}} src={`${token.imageURL}`} className={classes.rounded}/>
        <Box sx={{display:'flex', alignItems: 'flex-end', position: 'absolute', top: '16px', right: '16px', padding: '8px', background: '#fff', borderRadius: '8px'}} className={classes.hotBidLike}>
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
            <Tooltip title={`Creator: ${getDeployerName()}`}>
              <img src={getDeployerAvatarURL()} className={classes.creatorLink}/>
            </Tooltip>
          </Link>
          <Link sx={{marginLeft: '-6px'}}>
          <Tooltip title={`Owner: ${getOwnerName()}`}>
              <img src={getOwnerAvatarURL()} className={classes.creatorLink}/>
            </Tooltip>
          </Link>
        </Box>
      </Box>
      <Box mt={2} sx={{display:'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <Typography variant="h6" className={classes.collectionItemTitle}>{token.name} #{token.tokenID}</Typography>
        {/* <MoreHorizIcon /> */}
        {getPrice()}
      </Box>
      <Typography className={[classes.collectionSubtitle, classes.ellipseText]}>{token.description}</Typography>
      <Box sx={{display:'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px'}}>
        <Typography className={classes.collectionBuy}>Buy now</Typography>
        <Box sx={{display:'flex', alignItems:'end', color: '#5A5D79'}}>
          <HistoryIcon />
          <Typography className={classes.collectionHistory}>View History</Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default CardItem;