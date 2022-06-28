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
import { CATEGORIES, CATEGORY_NAMES } from '../common/const';

const CATEGORY_ICONS = {
  ART: <PaletteIcon />,
  COLLECTIBLE: <CardGiftcardIcon />,
  DOMAIN: <FormatShapesIcon />,
  MUSIC: <MusicNoteIcon />,
  PHOTOGRAPHY: <LinkedCameraIcon />,
  VIRTUAL_WORLD: <LanguageIcon />
}

export default function CategoryFilter(){
  const [filter, setFilter] = React.useState('all');

  const handleFilter = (event, newFilter) => {
    setFilter(newFilter);
  };

  return (
    <Grid xs item>
      <ToggleButtonGroup
          value={filter}
          exclusive
          onChange={handleFilter}
          aria-label="Filter"
        >
        <ToggleButton value={0} aria-label="All">
          All
        </ToggleButton>
        {
          Object.keys(CATEGORIES).map((category, index) => {
            return (
              <ToggleButton index={index} value={CATEGORIES[category]} aria-label={CATEGORY_NAMES[category]}>
                {CATEGORY_ICONS[category]}{CATEGORY_NAMES[category]}
              </ToggleButton>
            )
          })
        }
      </ToggleButtonGroup>
    </Grid>
  );
}