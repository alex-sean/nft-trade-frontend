import React, { useState } from 'react';
import { Button } from '@mui/material';
import useStyles from '../styles/styles';
import Menu, { MenuProps } from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { styled, alpha } from '@mui/material/styles';
import { getPastTimeStamp } from '../common/CommonUtils';

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity,
        ),
      },
    },
  },
}));

function CollectionMenu(props) {
  const { getCollections } = props;
  const classes = useStyles();
  
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [periodText, setPeriodText] = useState('last 7 days');

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (from, text) => {
    setAnchorEl(null);
    if (!from) {
      return;
    }
    
    getCollections(from);
    setPeriodText(text);
  };

  return (
    <div>
      <Button
        sx={{color:'#8358ff !important', fontWeight:'600', fontSize:'2rem'}}
        id="demo-customized-button"
        aria-controls={open ? "demo-customized-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        disableElevation
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}
      >
        {periodText}
      </Button>
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          "aria-labelledby": "demo-customized-button"
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={() => handleClose()}
      >
        <MenuItem onClick={() => handleClose(getPastTimeStamp(1), 'Last 24 hours')} disableRipple className={`${classes.collectionMenuItem} ${classes.dropdownMenu}`}>
          Last 24 hours
        </MenuItem>
        <MenuItem onClick={() => handleClose(getPastTimeStamp(7), 'Last 7 days')} disableRipple className={`${classes.collectionMenuItem} ${classes.dropdownMenu}`}>
          Last 7 days
        </MenuItem>
        <MenuItem onClick={() => handleClose(getPastTimeStamp(30), 'Last 30 days')} disableRipple className={`${classes.collectionMenuItem} ${classes.dropdownMenu}`}>
          Last 30 days
        </MenuItem>
      </StyledMenu>
    </div>
  );
}

export default CollectionMenu;