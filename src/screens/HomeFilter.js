import * as React from 'react';
import { Grid, Button } from "@mui/material";
import PaletteIcon from '@mui/icons-material/Palette';
import LinkedCameraIcon from '@mui/icons-material/LinkedCamera';
import LanguageIcon from '@mui/icons-material/Language';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import FormatShapesIcon from '@mui/icons-material/FormatShapes';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import useStyles from '../styles/styles';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Dropdown from '../components/Dropdown';

export default function HomeFilter(){
  const classes = useStyles();
  const [filter, setFilter] = React.useState('all');

  const handleFilter = (event, newFilter) => {
    setFilter(newFilter);
  };

  return (
    <Grid container direction="row" justifyContent="space-between" alignItems="center">
      <Grid sm item container justifyContent="flex-start" alignItems="flex-start" mb={3} rowSpacing={1}>
        <Grid item>
          <ToggleButtonGroup
              value={filter}
              exclusive
              onChange={handleFilter}
              aria-label="Filter">
            <ToggleButton value="all" aria-label="All">
              All
            </ToggleButton>
          </ToggleButtonGroup>
        </Grid>
        <Grid item>
          <ToggleButtonGroup
              value={filter}
              exclusive
              onChange={handleFilter}
              aria-label="Filter">
            <ToggleButton value="art" aria-label="Art">
              <PaletteIcon />Art
            </ToggleButton>
          </ToggleButtonGroup>
        </Grid>
        <Grid item>
          <ToggleButtonGroup
            value={filter}
            exclusive
            onChange={handleFilter}
            aria-label="Filter">
            <ToggleButton value="collectibles" aria-label="Collectibles">
              <CardGiftcardIcon />Collectibles
            </ToggleButton>
          </ToggleButtonGroup>
        </Grid>
        <Grid item>
          <ToggleButtonGroup
            value={filter}
            exclusive
            onChange={handleFilter}
            aria-label="Filter">
            <ToggleButton value="domain" aria-label="Domain">
              <FormatShapesIcon />Domain
            </ToggleButton>
          </ToggleButtonGroup>
        </Grid>
        <Grid item>
          <ToggleButtonGroup
              value={filter}
              exclusive
              onChange={handleFilter}
              aria-label="Filter">
            <ToggleButton value="music" aria-label="Music">
              <MusicNoteIcon />Music
            </ToggleButton>
          </ToggleButtonGroup>
        </Grid>
        <Grid item>
          <ToggleButtonGroup
            value={filter}
            exclusive
            onChange={handleFilter}
            aria-label="Filter">
            <ToggleButton value="photography" aria-label="Photography">
              <LinkedCameraIcon />Photography
            </ToggleButton>
          </ToggleButtonGroup>
        </Grid>
        <Grid item>
          <ToggleButtonGroup
            value={filter}
            exclusive
            onChange={handleFilter}
            aria-label="Filter">
            <ToggleButton value="virtualWorld" aria-label="VirtualWorld">
              <LanguageIcon />VirtualWorld
            </ToggleButton>
          </ToggleButtonGroup>
        </Grid>
      </Grid>
      <Grid item mb={2}>
        <Dropdown />
      </Grid>
    </Grid>
  );
}