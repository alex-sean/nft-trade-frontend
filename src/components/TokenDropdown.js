import React, { useEffect } from 'react';
import useStyles from '../styles/styles';
import { MenuItem, Select, Checkbox, Switch, ListSubheader } from "@mui/material";
import { SORT_TOKEN } from '../common/const';

export default function TokenDropdown({ getItems }) {
  const [sort, setSort] = React.useState(SORT_TOKEN.RECENT);
  const [verify, setVerify] = React.useState(false);
  const [avaxListed, setAvaxListed] = React.useState(true);
  const [usdListed, setUSDListed] = React.useState(true);
  const classes = useStyles();

  const handleSortChange = (event) => {
    setSort(event.target.value);
  };

  useEffect(() => {
    getItems(sort, verify, avaxListed, usdListed);
  }, [sort, verify, avaxListed, usdListed])

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
      <MenuItem className={classes.dropdownMenu} value={SORT_TOKEN.RECENT} sx={{justifyContent: 'space-between'}}>
        Recently Added
        <Checkbox checked={sort === SORT_TOKEN.RECENT} />
      </MenuItem>
      <MenuItem className={classes.dropdownMenu} value={SORT_TOKEN.PRICE_LOW_TO_HIGH} sx={{justifyContent: 'space-between'}}>
        Price:Low to High
        <Checkbox checked={sort === SORT_TOKEN.PRICE_LOW_TO_HIGH} />
      </MenuItem>
      <MenuItem className={classes.dropdownMenu} value="Price:High to Low" sx={{justifyContent: 'space-between'}}>
        Price:High to Low
        <Checkbox checked={sort === 'Price:High to Low'} />
      </MenuItem>
      <MenuItem className={classes.dropdownMenu} value={SORT_TOKEN.AUCTION} sx={{justifyContent: 'space-between'}}>
        Auction ending soon
        <Checkbox checked={sort === SORT_TOKEN.AUCTION} />
      </MenuItem>
      <ListSubheader className={classes.dropdownMenu}>Options</ListSubheader>
      <MenuItem className={classes.dropdownMenu} sx={{justifyContent: 'space-between'}}>
        Verified Only
        <Switch onChange={e => setVerify(e.target.checked)} checked={verify} />
      </MenuItem>
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