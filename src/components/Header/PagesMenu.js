import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Link, Typography } from '@mui/material';
import useStyles from '../../styles/styles';

export default function PagesMenu() {
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
      >
        <Typography className={classes.link}>Page</Typography>
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'pages-button',
        }}
      >
        <MenuItem onClick={handleClose}>
          <Link href="/item" underline="none" key="1">
            <Typography className={classes.link}>Item Details</Typography>
          </Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link href="/activity" underline="none" key="1">
            <Typography className={classes.link}>Activity</Typography>
          </Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link href="/rankings" underline="none" key="1">
            <Typography className={classes.link}>Rankings</Typography>
          </Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link href="/profile" underline="none" key="1">
            <Typography className={classes.link}>Edit Profile</Typography>
          </Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link href="/contact" underline="none" key="1">
            <Typography className={classes.link}>Contact</Typography>
          </Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link href="/login" underline="none" key="1">
            <Typography className={classes.link}>Login</Typography>
          </Link>
        </MenuItem>
      </Menu>
    </div>
  );
}