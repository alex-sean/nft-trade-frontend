import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Link, ListItemIcon, MenuList, Typography } from '@mui/material';
import useStyles from '../../styles/styles';
import AppsIcon from '@mui/icons-material/Apps';
import PaletteIcon from '@mui/icons-material/Palette';
import LinkedCameraIcon from '@mui/icons-material/LinkedCamera';
import LanguageIcon from '@mui/icons-material/Language';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import FormatShapesIcon from '@mui/icons-material/FormatShapes';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';

export default function ExploreMenu() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

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
        sx={{background: 'transparent'}}
      >
        <MenuList className={classes.dropdownMenu}>
          <MenuItem onClick={handleClose}>
            <Link href="/collections/0" underline="none" key="1" display='flex' alignItems='center'>
              <ListItemIcon>
                <AppsIcon fontSize="large" sx={{padding: '8px', background:"rgb(245 248 250)", marginRight: '16px', borderRadius: '40px', fill:'#131740'}}/>
              </ListItemIcon>
              <Typography className={classes.link}>All NFTs</Typography>
            </Link>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <Link href="/collections/1" underline="none" key="2" display='flex' alignItems='center'>
              <ListItemIcon>
                <PaletteIcon fontSize="large" sx={{padding: '8px', background:"rgb(228 252 244)", marginRight: '16px', borderRadius: '40px', fill:'#10b981'}} />
              </ListItemIcon>
              <Typography className={classes.link}>Art</Typography>
            </Link>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <Link href="/collections/2" underline="none" key="2" display='flex' alignItems='center'>
              <ListItemIcon>
                <CardGiftcardIcon fontSize="large" sx={{padding: '8px', background:"rgb(253 247 238)", marginRight: '16px', borderRadius: '40px', fill:'#feb240'}} />
              </ListItemIcon>
              <Typography className={classes.link}>COLLECTIBLE</Typography>
            </Link>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <Link href="/collections/3" underline="none" key="2" display='flex' alignItems='center'>
              <ListItemIcon>
                <FormatShapesIcon fontSize="large"  sx={{padding: '8px', background:"rgb(242 238 255)", marginRight: '16px', marginRight: '16px', borderRadius: '40px', fill:'#8358ff'}} />
              </ListItemIcon>
              <Typography className={classes.link}>DOMAIN</Typography>
            </Link>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <Link href="/collections/4" underline="none" key="2" display='flex' alignItems='center'>
              <ListItemIcon>
                <MusicNoteIcon fontSize="large" sx={{padding: '8px', background:"rgb(255 238 250)", marginRight: '16px', borderRadius: '40px', fill:'#f35bc7'}} />
              </ListItemIcon>
              <Typography className={classes.link}>MUSIC</Typography>
            </Link>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <Link href="/collections/5" underline="none" key="2" display='flex' alignItems='center'>
              <ListItemIcon>
                <LinkedCameraIcon fontSize="large" sx={{padding: '8px', background:"rgb(234 242 254)", marginRight: '16px', borderRadius: '40px', fill:'#428af8'}} />
              </ListItemIcon>
              <Typography className={classes.link}>PHOTOGRAPHY</Typography>
            </Link>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <Link href="/collections/6" underline="none" key="2" display='flex' alignItems='center'>
              <ListItemIcon>
                <LanguageIcon fontSize="large" background="rgb(238 252 255)" sx={{padding: '8px', background:"rgb(242 238 255)", marginRight: '16px', borderRadius: '40px', fill:'#46c7e3'}} />
              </ListItemIcon>
              <Typography className={classes.link}>Virtual World</Typography>
            </Link>
          </MenuItem>
        </MenuList>
      </Menu>
    </div>
  );
}