import { Typography, Box } from '@mui/material';

export default function ContactHero(){
  return (
    <>
      <Box sx={{height:'300px', backgroundImage:'url(images/page-title/knowledge_base_banner.jpg)', justifyContent: 'center', display: 'flex', alignItems: 'center'}}>
        <Typography variant='h4' color="#fff">Get in touch</Typography>
      </Box>
    </>
  );
};