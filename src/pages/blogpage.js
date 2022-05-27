import { Box, Container, Typography, Grid, Card, CardMedia, CardContent, Link } from "@mui/material";
import PrimaryButton from "../components/Button/PrimaryButton";
import useStyles from '../styles/styles';

export default function BlogPage(){
  const classes = useStyles();

  return (
    <Box py={4} className={classes.gradientBackground}>
      <Container maxWidth="lg">
        <Link href="/singlepost" underline="none">
          <Card sx={{display: 'flex', borderRadius: '15px'}}>
            <CardMedia>
              <img src='images/blog/post_1.jpg' style={{width: '100%', height: '100%'}}></img>
            </CardMedia>
            <CardContent>
              <Box p={10} >
                <Typography variant="body1">Deothemes in <span style={{color: '#8358ff'}}>NFT's DIGITAL ART</span></Typography>
                <Typography py={2} variant="h4">List your collection for secondary sales</Typography>
                <Typography paragraph>Since we launched Tezos at the end of 2021, many awesome creators...</Typography>
                <Typography py={2} variant="body2">5 Feb • 3 min read</Typography>
              </Box>
            </CardContent>
          </Card>
        </Link>

        <Grid py={8} container spacing={3}>
          <Grid item xs={12} sm={6} md={4}>
            <Link href="/singlepost" underline="none">
              <Card sx={{borderRadius: '15px'}}>
                <CardMedia>
                  <img src='images/blog/post_2.jpg' style={{width: '100%', height: '100%'}}></img>
                </CardMedia>
                <CardContent>
                  <Box p={2} >
                    <Typography variant="body1">Deothemes in <span style={{color: '#8358ff'}}>NFT's DIGITAL ART</span></Typography>
                    <Typography py={2} variant="h4">Mint your own Tezos collections</Typography>
                    <Typography paragraph>Since we launched Tezos at the end of 2021, many awesome creators...</Typography>
                    <Typography py={2} variant="body2">5 Feb • 3 min read</Typography>
                  </Box>
                </CardContent>
              </Card>
            </Link>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Link href="/singlepost" underline="none">
              <Card sx={{borderRadius: '15px'}}>
                <CardMedia>
                  <img src='images/blog/post_3.jpg' style={{width: '100%', height: '100%'}}></img>
                </CardMedia>
                <CardContent>
                  <Box p={2} >
                    <Typography variant="body1">Deothemes in <span style={{color: '#8358ff'}}>NFT's DIGITAL ART</span></Typography>
                    <Typography py={2} variant="h4">List your collection for secondary sales</Typography>
                    <Typography paragraph>Since we launched Tezos at the end of 2021, many awesome creators...</Typography>
                    <Typography py={2} variant="body2">22 Feb • 3 min read</Typography>
                  </Box>
                </CardContent>
              </Card>
            </Link>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Link href="/singlepost" underline="none">
              <Card sx={{borderRadius: '15px'}}>
                <CardMedia>
                  <img src='images/blog/post_4.jpg' style={{width: '100%', height: '100%'}}></img>
                </CardMedia>
                <CardContent>
                  <Box p={2} >
                    <Typography variant="body1">Deothemes in <span style={{color: '#8358ff'}}>NFT's DIGITAL ART</span></Typography>
                    <Typography py={2} variant="h4">The biggest moves in NFTs, Bitcoin, crypto rules</Typography>
                    <Typography paragraph>Since we launched Tezos at the end of 2021, many awesome creators...</Typography>
                    <Typography py={2} variant="body2">18 Jan • 3 min read</Typography>
                  </Box>
                </CardContent>
              </Card>
            </Link>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Link href="/singlepost" underline="none">
              <Card sx={{borderRadius: '15px'}}>
                <CardMedia>
                  <img src='images/blog/post_5.jpg' style={{width: '100%', height: '100%'}}></img>
                </CardMedia>
                <CardContent>
                  <Box p={2} >
                    <Typography variant="body1">Deothemes in <span style={{color: '#8358ff'}}>NFT's DIGITAL ART</span></Typography>
                    <Typography py={2} variant="h4">Incredible Amount of Developer Energy' in Web3</Typography>
                    <Typography paragraph>Since we launched Tezos at the end of 2021, many awesome creators...</Typography>
                    <Typography py={2} variant="body2">15 Jan • 3 min read</Typography>
                  </Box>
                </CardContent>
              </Card>
            </Link>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Link href="/singlepost" underline="none">
              <Card sx={{borderRadius: '15px'}}>
                <CardMedia>
                  <img src='images/blog/post_6.jpg' style={{width: '100%', height: '100%'}}></img>
                </CardMedia>
                <CardContent>
                  <Box p={2} >
                    <Typography variant="body1">Deothemes in <span style={{color: '#8358ff'}}>NFT's DIGITAL ART</span></Typography>
                    <Typography py={2} variant="h4">Inflation is up, it matters: High prices plague Biden's</Typography>
                    <Typography paragraph>Since we launched Tezos at the end of 2021, many awesome creators...</Typography>
                    <Typography py={2} variant="body2">23 Dec • 3 min read</Typography>
                  </Box>
                </CardContent>
              </Card>
            </Link>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Link href="/singlepost" underline="none">
              <Card sx={{borderRadius: '15px'}}>
                <CardMedia>
                  <img src='images/blog/post_7.jpg' style={{width: '100%', height: '100%'}}></img>
                </CardMedia>
                <CardContent>
                  <Box p={2} >
                    <Typography variant="body1">Deothemes in <span style={{color: '#8358ff'}}>NFT's DIGITAL ART</span></Typography>
                    <Typography py={2} variant="h4">What to do when the market is going everywhere</Typography>
                    <Typography paragraph>Since we launched Tezos at the end of 2021, many awesome creators...</Typography>
                    <Typography py={2} variant="body2">15 Dec • 3 min read</Typography>
                  </Box>
                </CardContent>
              </Card>
            </Link>
          </Grid>
        </Grid>
        <Box sx={{display: 'flex', justifyContent: 'center'}}>
          <PrimaryButton text="Load More" />
        </Box>
      </Container>
    </Box>
  );
}