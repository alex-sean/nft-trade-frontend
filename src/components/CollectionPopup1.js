import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Typography } from '@mui/material';
import useStyles from '../styles/styles';
import Divider from '@mui/material/Divider';
import ShareIcon from '@mui/icons-material/Share';
import TwitterIcon from '@mui/icons-material/Twitter';
import RedditIcon from '@mui/icons-material/Reddit';
import EmailIcon from '@mui/icons-material/Email';
import LinkIcon from '@mui/icons-material/Link';

export default function CollectionPopup1() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const classes = useStyles();

  return (
    <div>
      <Button
        id="pages-button"
        aria-controls={open ? 'pages-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        sx={{border:'solid 1px grey', borderRadius:'10px', padding:'8px 0px', color:'#000', marginLeft:'8px'}}
      >
        <ShareIcon color="#000" />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        transformOrigin={{ vertical: "bottom", horizontal: "center" }}
        MenuListProps={{
          'aria-labelledby': 'pages-button',
        }}
      >
        <MenuItem onClick={handleClose}>
          <TwitterIcon /> <Typography ml={1} className={classes.link}>Twitter</Typography>
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleClose}>
          <RedditIcon /> <Typography ml={1} className={classes.link}>Discord</Typography>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <EmailIcon /> <Typography ml={1} className={classes.link}>Email</Typography>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <LinkIcon /> <Typography ml={1} className={classes.link}>Copy</Typography>
        </MenuItem>
      </Menu>
    </div>
  );
}