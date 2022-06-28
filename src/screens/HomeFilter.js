import * as React from 'react';
import { Grid, Button, MenuItem, Select } from "@mui/material";
import PaletteIcon from '@mui/icons-material/Palette';
import LinkedCameraIcon from '@mui/icons-material/LinkedCamera';
import LanguageIcon from '@mui/icons-material/Language';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import FormatShapesIcon from '@mui/icons-material/FormatShapes';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import useStyles from '../styles/styles';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

export default function HomeFilter(){
  const classes = useStyles();
  const [age, setAge] = React.useState('');
  const [filter, setFilter] = React.useState('all');

  const handleFilter = (event, newFilter) => {
    setFilter(newFilter);
  };

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <Grid container direction="row" justifyContent="space-between" alignItems="flex-start" mb={3}>
      <Grid xs item>
        <ToggleButtonGroup
            value={filter}
            exclusive
            onChange={handleFilter}
            aria-label="Filter"
          >
          <ToggleButton value="all" aria-label="All">
            All
          </ToggleButton>
          <ToggleButton value="art" aria-label="Art">
            <PaletteIcon />Art
          </ToggleButton>
          <ToggleButton value="collectibles" aria-label="Collectibles">
            <CardGiftcardIcon />Collectibles
          </ToggleButton>
          <ToggleButton value="domain" aria-label="Domain">
            <FormatShapesIcon />Domain
          </ToggleButton>
          <ToggleButton value="music" aria-label="Music">
            <MusicNoteIcon />Music
          </ToggleButton>
          <ToggleButton value="photography" aria-label="Photography">
            <LinkedCameraIcon />Photography
          </ToggleButton>
          <ToggleButton value="virtualWorld" aria-label="VirtualWorld">
            <LanguageIcon />VirtualWorld
          </ToggleButton>
        </ToggleButtonGroup>
      </Grid>
      <Grid item mb={2}>
        <Select
          size="small"
          value={age}
          onChange={handleChange}
          displayEmpty
          inputProps={{ 'aria-label': 'Without label' }}
          sx={{width: '180px', padding: "0"}}
        >
          <MenuItem value="">
            <em>Recently Added</em>
          </MenuItem>
          <MenuItem value={10}>Price:Low to High</MenuItem>
          <MenuItem value={20}>Price:High to Low</MenuItem>
          <MenuItem value={20}>Auction ending soon</MenuItem>
        </Select>
      </Grid>
    </Grid>
  );
}