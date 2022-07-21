import * as React from 'react';
import { Button, Menu, MenuItem, Typography, Divider } from '@mui/material';
import useStyles from '../styles/styles';
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
        className={classes.text}
        sx={{border:'solid 1px grey', borderRadius:'10px', padding:'16px', marginLeft:'8px'}}
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
        <MenuItem className={classes.dropdownMenu} onClick={handleClose}>
          <TwitterIcon /> <Typography ml={1} className={classes.link}>Twitter</Typography>
        </MenuItem>
        <Divider sx={{margin: '0 !important'}}/>
        <MenuItem className={classes.dropdownMenu} onClick={handleClose}>
          <RedditIcon /> <Typography ml={1} className={classes.link}>Discord</Typography>
        </MenuItem>
        <MenuItem className={classes.dropdownMenu} onClick={handleClose}>
          <EmailIcon /> <Typography ml={1} className={classes.link}>Email</Typography>
        </MenuItem>
        <MenuItem className={classes.dropdownMenu} onClick={handleClose}>
          <LinkIcon /> <Typography ml={1} className={classes.link}>Copy</Typography>
        </MenuItem>
      </Menu>
    </div>
  );
}