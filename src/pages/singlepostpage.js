import { Box, Container, Typography, Grid, Card, CardMedia, CardContent, Avatar, Stack, Paper, ButtonBase } from "@mui/material";
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import useStyles from '../styles/styles';

export default function SinglepostPage(){
  const classes = useStyles();

  return (
    <Box py={4} className={classes.gradientBackground}>
      <Container maxWidth="lg">
        <Typography py={1} align="center" variant="body1" color='#8358ff'>NFT's DIGITAL ART</Typography>
        <Typography align="center" variant="h4">List your collection for</Typography>
        <Typography align="center" variant="h4">secondary sales</Typography>
        <Box pt={2} pb={10} sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <Avatar src='images/blog/author.jpg' sx={{border: 'solid 1px lightgray', background: '#fff'}} />
          <Box pl={2}>
            <Typography varisnt="body1">Deothemes</Typography>
            <Typography varisnt="body2">5 Feb • 3 min read</Typography>
          </Box>
        </Box>
        <img style={{borderRadius: '15px', width: '100%'}} src="images/blog/single_post_featured.jpg" />
        
        <Box px={10} py={5}>
          <Typography paragraph variant='body1'>
            Since we launched Tezos at the end of 2021, many awesome creator. From a barely understood abbreviation (hello, right click savers!), it turned into a massive cultural phenomenon adopted by blue chip companies like Adidas and Twitter in a few short months.
          </Typography>
          <Typography paragraph variant='body2'>
            Just like the NFT space has grown, so has Rarible.com. What started with a few people in a café grew into a passionate team of over 100, and counting!
          </Typography>
          <Typography paragraph variant='body2'>
            And that team has been busy. In 2021, we've shipped more features than ever before, scaled to a multi-chain platform with Flow and Tezos integrations, and watched our community soar on every social media channel.
          </Typography>
          <Typography paragraph variant='body2'>
            And of course, we couldn't have done it without you! You are creating Rarible day by day - by using the platform, requesting features, sharing your feedback, being as active and passionate as you are.
          </Typography>
          <Typography mt={3} mb={2} variant="h4">A Picture is Worth a Thousand Words</Typography>
          <Typography paragraph variant='body2'>
            Ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa, quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt, explicabo. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.
          </Typography>
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <img style={{borderRadius: '15px', width: '100%'}} src="images/blog/gallery_1.jpg" />
          </Grid>
          <Grid item xs={12} md={6}>
            <img style={{borderRadius: '15px', width: '100%'}} src="images/blog/gallery_2.jpg" />
          </Grid>
        </Grid>

        <Box px={10} py={5}>
          <Typography paragraph variant='body2'>
            Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis Theme natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aenean imperdiet. Etiam ultricies. Ut enim.
          </Typography>
          <Typography variant='h6'>
            “Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis.”
          </Typography>
          <Typography variant='body2'>
            — Vincent De Paul
          </Typography>
          <Typography mt={2} paragraph variant='body2'>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cum sociis Theme natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aenean imperdiet. Etiam ultricies. Ut enim.
          </Typography>

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

          <Paper elevation={1} sx={{p: 2, mb: 3, borderRadius: '20px'}}>
            <Grid container spacing={2} alignItems="center">
              <Grid item>
                <ButtonBase sx={{ width: 144, height: 144 }}>
                  <img src="images/blog/author_large.jpg" />
                </ButtonBase>
              </Grid>
              <Grid item sm>
                <Typography gutterBottom variant="h6" component="div">DeoThemes</Typography>
                <Typography paragraph variant="body1" gutterBottom>
                  Aenean commodo ligula eget dolor. Aenean massa. Cum sociis Theme natoque penatibus et magnis dis parturient montes.
                </Typography>
                <Box my={3} className={classes.displayFlex} sx={{color: 'gray'}}>
                  <FacebookIcon sx={{marginRight: '8px'}}/>
                  <TwitterIcon sx={{marginRight: '8px'}}/>
                  <LinkedInIcon sx={{marginRight: '8px'}}/>
                </Box>
              </Grid>
            </Grid>
          </Paper>

          <Typography mt={10} gutterBottom variant="h4" component="div">Related Posts</Typography>
          <Grid py={5} container spacing={3}>
            <Grid item xs={12} sm={6}>
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
            </Grid>
            <Grid item xs={12} sm={6}>
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
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}