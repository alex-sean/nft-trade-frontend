import { Box, Container, Typography, Grid, Card, CardMedia, CardContent, Link, Button } from "@mui/material";
import PrimaryButton from "../components/Button/PrimaryButton";
import useStyles from '../styles/styles';
import { getBlogs, decodeBase64 } from '../adapters/backend';
import { useEffect, useState } from "react";

export default function BlogPage(){
  const classes = useStyles();
  const [offset, setOffset] = useState(0)
  const [blogs, setBlogs] = useState([])
  const [total, setTotal] = useState(0)

  const loadData = async (limit) => {
    try {
      let response = await getBlogs(7, offset);
      if (response) {
        setBlogs([...blogs, ...response.data.blogs])
        setTotal(response.data.total)
        setOffset(offset + response.data.blogs.length)
      }
    } catch (err) {
      console.log(err);
    }
  }

  const loadMore = () => {
    loadData(6)
  }

  useEffect(() => {
    loadData(7)
  }, [])

  return (
    <Box py={4} className={classes.gradientBackground}>
      <Container maxWidth="lg">
        {
          offset === 0 ? (
            <Typography align="center" component="div" variant="h5">No Blogs</Typography>
          ) : (
            <>
              <Link href={`/singlepost/${blogs[0].id}`} underline="none">
                <Card sx={{display: 'flex', borderRadius: '15px'}} className={classes.paperBackground}>
                  <CardMedia>
                    <img src={`${process.env.REACT_APP_BLOG_PATH}/${blogs[0].thumbnail}`} style={{width: '100%', height: '100%'}}></img>
                  </CardMedia>
                  <CardContent>
                    <Box p={10} >
                      <Typography variant="body1">Deothemes in <span style={{color: '#8358ff'}}>NFT's DIGITAL ART</span></Typography>
                        <Typography py={2} variant="h4">{decodeBase64(blogs[0].title)}</Typography>
                        <Typography paragraph>{decodeBase64(blogs[0].description).substr(0, 100)} ...</Typography>
                      <Typography py={2} variant="body2">5 Feb • 3 min read</Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Link>

              <Grid py={8} container spacing={3}>
                {blogs.slice(1).map(blog => (
                  <Grid item xs={12} sm={6} md={4}>
                    <Link href={`/singlepost/${blog.id}`} underline="none">
                      <Card sx={{borderRadius: '15px'}} className={classes.paperBackground}>
                        <CardMedia>
                          <img src={`${process.env.REACT_APP_BLOG_PATH}/${blog.thumbnail}`} style={{width: '100%', height: '100%'}}></img>
                        </CardMedia>
                        <CardContent>
                          <Box p={2} >
                            <Typography variant="body1">Deothemes in <span style={{color: '#8358ff'}}>NFT's DIGITAL ART</span></Typography>
                              <Typography py={2} variant="h4">{decodeBase64(blog.title)}</Typography>
                              <Typography paragraph>{decodeBase64(blog.description).substr(0, 100)} ...</Typography>
                            <Typography py={2} variant="body2">5 Feb • 3 min read</Typography>
                          </Box>
                        </CardContent>
                      </Card>
                    </Link>
                  </Grid>
                ))}
              </Grid>
            </>    
          )
        }
        <Box sx={{display: 'flex', justifyContent: 'center'}}>
          <Button className={classes.primaryButton} onClick={loadMore} disabled={total <= offset}>Load More</Button>
        </Box>
      </Container>
    </Box>
  );
}