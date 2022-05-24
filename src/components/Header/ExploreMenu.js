import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Link, ListItemIcon, Typography } from '@mui/material';
import useStyles from '../../styles/styles';
import AppsIcon from '@mui/icons-material/Apps';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';

export default function ExploreMenu() {
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
        <Typography className={classes.link}>Explore</Typography>
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
          <ListItemIcon>
            <AppsIcon fontSize="small" />
          </ListItemIcon>
          <Link href="/collections" underline="none" key="1">
            <Typography className={classes.link}>All NFTs</Typography>
          </Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <LibraryMusicIcon sx={{fill:'#10b981'}} fontSize="small" />
          </ListItemIcon>
          <Link href="/collection" underline="none" key="2">
            <Typography className={classes.link}>Art</Typography>
          </Link>
        </MenuItem>
      </Menu>
    </div>
  );
}