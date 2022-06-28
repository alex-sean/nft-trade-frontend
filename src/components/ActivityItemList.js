import React from 'react';
import { Grid, Typography, Box, Paper, Card, CardActions, CardContent, Link, Avatar } from '@mui/material';
import useStyles from '../styles/styles';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import { styled } from '@mui/material/styles';
import ButtonBase from '@mui/material/ButtonBase';
import DiscountIcon from '@mui/icons-material/Discount';
import ImportExportIcon from '@mui/icons-material/ImportExport';
import GavelIcon from '@mui/icons-material/Gavel';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

export default function ActivityItemList(props) {
  const classes = useStyles();

  return (
    <>
      <Paper className={`${`${classes.hoverShadow} ${classes.paperBackground}`} ${classes.paperBackground}`} elevation={1} sx={{p: 2, mb: 3, maxWidth: 740, borderRadius: '20px'}}>
        <Grid container spacing={2} alignItems="center">
          <Grid item>
            <ButtonBase sx={{ width: 128, height: 128 }}>
              <img style={{borderRadius: '10px'}} src="../images/products/item_21_sm.jpg" />
            </ButtonBase>
          </Grid>
          <Grid item sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="h6" component="div">Lazyone Panda</Typography>
                <Typography variant="body1" gutterBottom>sold for 1.515 ETH</Typography>
                <Typography variant="body2" color="text.secondary">30 minutes 45 seconds ago</Typography>
              </Grid>
            </Grid>
            <Grid item>
              <Avatar sx={{border:'solid 1px gray', color: 'gray', backgroundColor: '#fff'}}>
                <CardGiftcardIcon />
              </Avatar>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
      <Paper className={`${classes.hoverShadow} ${classes.paperBackground}`} elevation={1} sx={{p: 2, mb: 3,maxWidth: 740, borderRadius: '20px'}}>
        <Grid container spacing={2} alignItems="center">
          <Grid item>
            <ButtonBase sx={{ width: 128, height: 128 }}>
              <img style={{borderRadius: '10px'}} src="../images/products/item_21_sm.jpg" />
            </ButtonBase>
          </Grid>
          <Grid item sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="h6" component="div">NFT Funny Cat</Typography>
                <Typography variant="body1" gutterBottom>listed by 051_Hart .08095 ETH</Typography>
                <Typography variant="body2" color="text.secondary">40 minutes 36 seconds ago</Typography>
              </Grid>
            </Grid>
            <Grid item>
              <Avatar sx={{border:'solid 1px gray', color: 'gray', backgroundColor: '#fff'}}>
                <DiscountIcon />
              </Avatar>
            </Grid>
          </Grid>
        </Grid>
      </Paper>      
      <Paper className={`${classes.hoverShadow} ${classes.paperBackground}`} elevation={1} sx={{p: 2, mb: 3,maxWidth: 740, borderRadius: '20px'}}>
        <Grid container spacing={2} alignItems="center">
          <Grid item>
            <ButtonBase sx={{ width: 128, height: 128 }}>
              <img style={{borderRadius: '10px'}} src="../images/products/item_22_sm.jpg" />
            </ButtonBase>
          </Grid>
          <Grid item sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="h6" component="div">Prince Ape Planet</Typography>
                <Typography variant="body1" gutterBottom>tranferred from 027ab52</Typography>
                <Typography variant="body2" color="text.secondary">1 hour 15 minutes ago</Typography>
              </Grid>
            </Grid>
            <Grid item>
              <Avatar sx={{border:'solid 1px gray', color: 'gray', backgroundColor: '#fff'}}>
                <ImportExportIcon />
              </Avatar>
            </Grid>
          </Grid>
        </Grid>
      </Paper>   
      <Paper className={`${classes.hoverShadow} ${classes.paperBackground}`} elevation={1} sx={{p: 2, mb: 3,maxWidth: 740, borderRadius: '20px'}}>
        <Grid container spacing={2} alignItems="center">
          <Grid item>
            <ButtonBase sx={{ width: 128, height: 128 }}>
              <img style={{borderRadius: '10px'}} src="../images/products/item_23_sm.jpg" />
            </ButtonBase>
          </Grid>
          <Grid item sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="h6" component="div">Origin Morish</Typography>
                <Typography variant="body1" gutterBottom>bid cancelled by 0397fd</Typography>
                <Typography variant="body2" color="text.secondary">1 hour 55 minutes ago</Typography>
              </Grid>
            </Grid>
            <Grid item>
              <Avatar sx={{border:'solid 1px gray', color: 'gray', backgroundColor: '#fff'}}>
                <GavelIcon />
              </Avatar>
            </Grid>
          </Grid>
        </Grid>
      </Paper>     
      <Paper className={`${classes.hoverShadow} ${classes.paperBackground}`} elevation={1} sx={{p: 2, mb: 3,maxWidth: 740, borderRadius: '20px'}}>
        <Grid container spacing={2} alignItems="center">
          <Grid item>
            <ButtonBase sx={{ width: 128, height: 128 }}>
              <img style={{borderRadius: '10px'}} src="../images/products/item_24_sm.jpg" />
            </ButtonBase>
          </Grid>
          <Grid item sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="h6" component="div">Portrait Gallery#029</Typography>
                <Typography variant="body1" gutterBottom>liked by Trina_more</Typography>
                <Typography variant="body2" color="text.secondary">2 hours 24 minutes ago</Typography>
              </Grid>
            </Grid>
            <Grid item>
              <Avatar sx={{border:'solid 1px gray', color: 'gray', backgroundColor: '#fff'}}>
                <FavoriteBorderIcon />
              </Avatar>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
}