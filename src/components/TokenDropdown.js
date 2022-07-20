import React, { useEffect } from 'react';
import useStyles from '../styles/styles';
import { MenuItem, Select, Checkbox, Switch, ListSubheader } from "@mui/material";
import { SORT_TOKEN } from '../common/const';
import { getSortString } from '../common/CommonUtils';

export default function TokenDropdown({ getItems }) {
  const [sort, setSort] = React.useState(SORT_TOKEN.PRICE_HIGH_TO_LOW);
  const [avaxListed, setAvaxListed] = React.useState(false);
  const [usdListed, setUSDListed] = React.useState(false);
  const classes = useStyles();

  const handleSortChange = (event) => {
    setSort(event.target.value);
  };

  useEffect(() => {
    getItems(sort, avaxListed, usdListed);
  }, [sort, avaxListed, usdListed])

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
      <MenuItem className={classes.dropdownMenu} value={SORT_TOKEN.PRICE_LOW_TO_HIGH} sx={{justifyContent: 'space-between'}}>
        Price:Low to High
        <Checkbox checked={sort === SORT_TOKEN.PRICE_LOW_TO_HIGH} />
      </MenuItem>
      <MenuItem className={classes.dropdownMenu} value={SORT_TOKEN.PRICE_HIGH_TO_LOW} sx={{justifyContent: 'space-between'}}>
        Price:High to Low
        <Checkbox checked={sort === SORT_TOKEN.PRICE_HIGH_TO_LOW} />
      </MenuItem>
      <MenuItem className={classes.dropdownMenu} value={SORT_TOKEN.AUCTION} sx={{justifyContent: 'space-between'}}>
        Auction ending soon
        <Checkbox checked={sort === SORT_TOKEN.AUCTION} />
      </MenuItem>
      <ListSubheader className={classes.dropdownMenu}>Options</ListSubheader>
      <MenuItem className={classes.dropdownMenu} sx={{justifyContent: 'space-between'}}>
        Listed By AVAX
        <Switch onChange={e => setAvaxListed(e.target.checked)} checked={avaxListed} />
      </MenuItem>
      <MenuItem className={classes.dropdownMenu} sx={{justifyContent: 'space-between'}}>
        Listed By USD
        <Switch onChange={e => setUSDListed(e.target.checked)} checked={usdListed} />
      </MenuItem>
    </Select>
  );
}