import * as React from 'react';
import { Grid, Button, MenuItem, Select } from "@mui/material";
import PaletteIcon from '@mui/icons-material/Palette';
import LinkedCameraIcon from '@mui/icons-material/LinkedCamera';
import LanguageIcon from '@mui/icons-material/Language';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import FormatShapesIcon from '@mui/icons-material/FormatShapes';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import useStyles from '../styles/styles';

export default function CollectionsFilter(){
  const classes = useStyles();
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <Grid container direction="row" justifyContent="space-between" alignItems="flex-start">
      <Grid xs spacing={2} item container direction="row" justifyContent="flex-start">
        <Grid item>
          <Button variant="contained" className={classes.commonButton}>All</Button>
        </Grid>
        <Grid item>
          <Button variant="contained"  className={classes.commonButton} startIcon={<PaletteIcon />}>Art</Button>
        </Grid>
        <Grid item>
          <Button variant="contained"  className={classes.commonButton} startIcon={<CardGiftcardIcon />}>Collectibles</Button>
        </Grid>
        <Grid item>
          <Button variant="contained"  className={classes.commonButton} startIcon={<FormatShapesIcon />}>Domain</Button>
        </Grid>
        <Grid item>
          <Button variant="contained"  className={classes.commonButton} startIcon={<MusicNoteIcon />}>Music</Button>
        </Grid>
        <Grid item>
          <Button variant="contained"  className={classes.commonButton} startIcon={<LinkedCameraIcon />}>Photography</Button>
        </Grid>
        <Grid item>
          <Button variant="contained"  className={classes.commonButton} startIcon={<LanguageIcon />}>VirtualWorld</Button>
        </Grid>
      </Grid>
      <Grid item>
        <Select
          value={age}
          onChange={handleChange}
          displayEmpty
          inputProps={{ 'aria-label': 'Without label' }}
          sx={{width: '120px', padding: "0"}}
        >
          <MenuItem value="">
            <em>Trending</em>
          </MenuItem>
          <MenuItem value={10}>Top</MenuItem>
          <MenuItem value={20}>Recent</MenuItem>
        </Select>
      </Grid>
    </Grid>
  );
}