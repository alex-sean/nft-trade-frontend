import React, { useEffect } from 'react';
import useStyles from '../styles/styles';
import { MenuItem, Select, Checkbox, Switch, ListSubheader } from "@mui/material";
import { SORT_TOKEN } from '../common/const';
import { getSortString } from '../common/CommonUtils';

export default function CollectionDropdown({ sort, setSort, verify, setVerify }) {
  const classes = useStyles();

  const handleSortChange = (event) => {
    setSort(event.target.value);
  };

  return (
    <Select
        size="small"
        value={getSortString(sort)}
        onChange={handleSortChange}
        // displayEmpty
        renderValue={(selected) => selected}
        inputProps={{ 'aria-label': 'Without label' }}
        sx={{width: '250px', padding: "0"}}>
      <ListSubheader className={classes.dropdownMenu}>Sort By</ListSubheader>
      <MenuItem className={classes.dropdownMenu} value={SORT_TOKEN.RECENT} sx={{justifyContent: 'space-between'}}>
        Recently Added
        <Checkbox checked={sort === SORT_TOKEN.RECENT} />
      </MenuItem>
      <MenuItem className={classes.dropdownMenu} value={SORT_TOKEN.PRICE_LOW_TO_HIGH} sx={{justifyContent: 'space-between'}}>
        Price:Low to High
        <Checkbox checked={sort === SORT_TOKEN.PRICE_LOW_TO_HIGH} />
      </MenuItem>
      <MenuItem className={classes.dropdownMenu} value={SORT_TOKEN.PRICE_HIGH_TO_LOW} sx={{justifyContent: 'space-between'}}>
        Price:High to Low
        <Checkbox checked={sort === SORT_TOKEN.PRICE_HIGH_TO_LOW} />
      </MenuItem>
      <ListSubheader className={classes.dropdownMenu}>Options</ListSubheader>
      <MenuItem className={classes.dropdownMenu} sx={{justifyContent: 'space-between'}}>
        Verified Only
        <Switch onChange={e => setVerify(e.target.checked)} checked={verify} />
      </MenuItem>
    </Select>
  );
}