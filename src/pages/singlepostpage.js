import { Box, Container, Typography, Grid, Card, CardMedia, CardContent, Avatar, Stack, Paper, ButtonBase } from "@mui/material";
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import useStyles from '../styles/styles';
import { useParams } from 'react-router-dom';
import { getBlogInfo, decodeBase64, getPartners } from '../adapters/backend';
import { useEffect, useState } from "react";
import { useLoadingContext } from '../hooks/useLoadingContext';

export default function SinglepostPage(){
  const classes = useStyles();
  const [blog, setBlog] = useState({})
  const [partners, setPartners] = useState([])
  const { id } = useParams();
  const { setLoading } = useLoadingContext();
  
  const handleInit = async () => {
    setLoading(true);
    let blogInfo = await getBlogInfo(id)
    if (blogInfo) {
      setBlog(blogInfo.data)
    }
    
    let partnerInfo = await getPartners(10, 0)
    if (partnerInfo) {
      setPartners(partnerInfo.data.partners)
    }

    setLoading(false);
  }

  useEffect(() => {
    handleInit()
  }, [])

  return (
    <Box py={4} className={classes.gradientBackground}>
      <Container maxWidth="lg">
        {!blog.id ? '' : (
          <>
            <Typography py={1} align="center" variant="body1" color='#8358ff'>NFT's DIGITAL ART</Typography>
            <Typography align="center" variant="h4">{decodeBase64(blog.title)}</Typography>
            <Box pt={2} pb={10} sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
              <Avatar src='images/blog/author.jpg' sx={{border: 'solid 1px lightgray', background: '#fff'}} />
              <Box pl={2}>
                <Typography varisnt="body1">Deothemes</Typography>
                <Typography varisnt="body2">5 Feb • 3 min read</Typography>
              </Box>
            </Box>
            <img style={{borderRadius: '15px', width: '100%'}} src={`${process.env.REACT_APP_BLOG_PATH}/${blog.image1}`} />
            
            <Box px={10} py={5}>
              <Typography paragraph variant='body1'>
                {decodeBase64(blog.description)}
              </Typography>
            </Box>

            <Box px={10} py={5}>
              <Box my={5} className={classes.displayFlex}>
                <Typography variant="body1">Share:</Typography>
                <Avatar sx={{border: 'solid 1px lightgray', background: '#fff', color: 'gray', marginLeft: '16px'}}>
                  <FacebookIcon />
                </Avatar>
                <Avatar sx={{border: 'solid 1px lightgray', background: '#fff', color: 'gray', marginLeft: '16px'}}>
                  <TwitterIcon />
                </Avatar>
                <Avatar sx={{border: 'solid 1px lightgray', background: '#fff', color: 'gray', marginLeft: '16px'}}>
                  <LinkedInIcon />
                </Avatar>
              </Box>

              <img style={{borderRadius: '15px', width: '100%'}} src={`${process.env.REACT_APP_BLOG_PATH}/${blog.image2}`} />

              <Typography mt={10} gutterBottom variant="h4" component="div">Partners</Typography>
              <Grid py={5} container spacing={3}>
                {partners.map(partner => (
                <Grid item xs={12} sm={6}>
                  <Card sx={{borderRadius: '15px'}} className={classes.paperBackground}>
                    <CardMedia>
                      <img src={`${process.env.REACT_APP_BLOG_PATH}/${partner.thumbnail}`} style={{width: '100%', height: '100%'}}></img>
                    </CardMedia>
                    <CardContent>
                      <Box p={2} >
                        <Typography variant="body1">Deothemes in <span style={{color: '#8358ff'}}>NFT's DIGITAL ART</span></Typography>
                        <Typography py={2} variant="h4">{decodeBase64(partner.title)}</Typography>
                        <Typography paragraph>{decodeBase64(partner.description).substring(0, 100)} ...</Typography>
                        <Typography py={2} variant="body2">5 Feb • 3 min read</Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
                ))}
              </Grid>
            </Box>
          </>
        )}
      </Container>
    </Box>
  );
}