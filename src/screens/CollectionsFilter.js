import * as React from 'react';
import { Grid, MenuItem, Select } from "@mui/material";
import PaletteIcon from '@mui/icons-material/Palette';
import LinkedCameraIcon from '@mui/icons-material/LinkedCamera';
import LanguageIcon from '@mui/icons-material/Language';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import FormatShapesIcon from '@mui/icons-material/FormatShapes';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import useStyles from '../styles/styles';
import CategoryFilter from './CategoryFilter';

export default function CollectionsFilter(){
  const classes = useStyles();
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <Grid container direction="row" justifyContent="space-between" alignItems="flex-start">
      <CategoryFilter/>
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