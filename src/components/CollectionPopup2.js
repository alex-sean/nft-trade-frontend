import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Typography } from '@mui/material';
import useStyles from '../styles/styles';
import Divider from '@mui/material/Divider';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

export default function CollectionPopup2() {
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
        sx={{border:'solid 1px grey', borderRadius:'10px', padding:'16px', color:'#000', marginLeft:'8px'}}
      >
        <MoreHorizIcon color="#000" />
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
          <Typography className={classes.link}>New bid</Typography>
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleClose}>
          <Typography className={classes.link}>Refresh Metadata</Typography>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Typography className={classes.link}>Share</Typography>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Typography className={classes.link}>Report</Typography>
        </MenuItem>
      </Menu>
    </div>
  );
}