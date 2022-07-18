import React from 'react';
import useStyles from '../styles/styles';
import { MenuItem, Select, Checkbox, Switch, ListSubheader } from "@mui/material";

export default function Dropdown() {
  const [sort, setSort] = React.useState('');
  const [verify, setVerify] = React.useState(false);
  const [nfsw, setNfsw] = React.useState(false);
  const [lazyMint, setLazyMint] = React.useState(false);
  const classes = useStyles();

  const handleSortChange = (event) => {
    setSort(event.target.value);
  };

  return (
    <Select
        size="small"
        value={sort}
        onChange={handleSortChange}
        // displayEmpty
        renderValue={(selected) => selected}
        inputProps={{ 'aria-label': 'Without label' }}
        sx={{width: '250px', padding: "0"}}>
      <ListSubheader className={classes.dropdownMenu}>Sort By</ListSubheader>
      <MenuItem className={classes.dropdownMenu} value="Recently Added" sx={{justifyContent: 'space-between'}}>
        Recently Added
        <Checkbox checked={sort === 'Recently Added'} />
      </MenuItem>
      <MenuItem className={classes.dropdownMenu} value="Price:Low to height" sx={{justifyContent: 'space-between'}}>
        Price:Low to height
        <Checkbox checked={sort === 'Price:Low to height'} />
      </MenuItem>
      <MenuItem className={classes.dropdownMenu} value="Price:High to Low" sx={{justifyContent: 'space-between'}}>
        Price:High to Low
        <Checkbox checked={sort === 'Price:High to Low'} />
      </MenuItem>
      <MenuItem className={classes.dropdownMenu} value="Auction ending soon" sx={{justifyContent: 'space-between'}}>
        Auction ending soon
        <Checkbox checked={sort === 'Auction ending soon'} />
      </MenuItem>
      <ListSubheader className={classes.dropdownMenu}>Options</ListSubheader>
      <MenuItem className={classes.dropdownMenu} sx={{justifyContent: 'space-between'}}>
        Verified Only
        <Switch onChange={e => setVerify(e.target.checked)} checked={verify} />
      </MenuItem>
      <MenuItem className={classes.dropdownMenu} sx={{justifyContent: 'space-between'}}>
        NFSW Only
        <Switch onChange={e => setNfsw(e.target.checked)} checked={nfsw} />
      </MenuItem>
      <MenuItem className={classes.dropdownMenu} sx={{justifyContent: 'space-between'}}>
        Show Lazy Minted
        <Switch onChange={e => setLazyMint(e.target.checked)} checked={lazyMint} />
      </MenuItem>
    </Select>
  );
}