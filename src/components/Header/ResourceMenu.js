import * as React from 'react';
import { Link, Typography, Button, Menu, MenuItem } from '@mui/material';
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
        <Typography className={classes.link}>Resources</Typography>
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
        <MenuItem className={classes.dropdownMenu} onClick={handleClose}>
          <Link href="/blog" underline="none" key="1">
            <Typography className={classes.link}>Blog</Typography>
          </Link>
        </MenuItem>
        <MenuItem className={classes.dropdownMenu} onClick={handleClose}>
          <Link href="/singlepost" underline="none" key="2">
            <Typography className={classes.link}>Single Post</Typography>
          </Link>
        </MenuItem>
        <MenuItem className={classes.dropdownMenu} onClick={handleClose}>
          <Link href="/newsletter" underline="none" key="4">
            <Typography className={classes.link}>Newsletter</Typography>
          </Link>
        </MenuItem>
      </Menu>
    </div>
  );
}