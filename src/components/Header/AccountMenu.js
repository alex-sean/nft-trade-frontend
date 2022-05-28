import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Box, IconButton, Link, ListItemIcon, Typography } from '@mui/material';
import useStyles from '../../styles/styles';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { Icon } from '@iconify/react';

export default function AccountMenu() {
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
        <IconButton className={classes.menuIcon}>
          <PersonIcon />
        </IconButton>
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'pages-button',
        }}
        sx={{maxWidth: "230px"}}
      >
        <Box p={2} display="flex" alignItems="center">
          <Typography noWrap>0x7a86c0b064171007716bbd6af96676935799a63e</Typography>
          <ContentCopyIcon />
        </Box>
        <Box mx={2} my={1} p={2} border={1} borderColor='lightgray' borderRadius={2}>
          <Typography variant='body1'>Balance</Typography>
          <Box mt={1} sx={{display:'flex', alignItems: 'center'}}>
            <Icon icon="logos:ethereum" rotate={2} hFlip={true} vFlip={true} />
            <Typography ml={1} color="rgb(16, 185, 129)">10 ETH</Typography>
          </Box>
        </Box>
        <MenuItem onClick={handleClose}>
          <Link href="/user" underline="none" key="1" display='flex'>
            <ListItemIcon>
              <PersonIcon fontSize="small" />
            </ListItemIcon>
            <Typography className={classes.link}>My Profile</Typography>
          </Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link href="/collection" underline="none" key="2" display='flex'>
            <ListItemIcon>
              <SettingsIcon fontSize="small" />
            </ListItemIcon>
            <Typography className={classes.link}>Edit Profile</Typography>
          </Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <MeetingRoomIcon fontSize="small" />
          </ListItemIcon>
          <Typography className={classes.link}>Sign out</Typography>
        </MenuItem>
      </Menu>
    </div>
  );
}