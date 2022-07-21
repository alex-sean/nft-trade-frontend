import * as React from 'react';
import { Grid, Button } from "@mui/material";
import useStyles from '../styles/styles';
import CollectionDropdown from '../components/CollectionDropdown';
import CategoryFilter from './CategoryFilter';
import { SORT_TOKEN } from '../common/const';
import { useEffect } from 'react';
import { useNonInitialEffect } from '../hooks/useNonInitialEffect';

export default function HomeFilter({ getItems }){
  const classes = useStyles();
  const [filter, setFilter] = React.useState(0);
  const [sort, setSort] = React.useState(SORT_TOKEN.RECENT);
  const [verify, setVerify] = React.useState(false);
  
  useNonInitialEffect(() => {
    getItems(filter, sort, verify);
  }, [filter, sort, verify], [0, SORT_TOKEN.RECENT, false]);

  return (
    <Grid container direction="row" justifyContent="space-between" alignItems="center">
      <CategoryFilter category={filter} setCategory={setFilter}/>
      <Grid item mb={2}>
        <CollectionDropdown sort={sort} setSort={setSort} verify={verify} setVerify={setVerify}/>
      </Grid>
    </Grid>
  );
}