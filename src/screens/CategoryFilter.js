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

export default function CategoryFilter(props){
  const { setCategory, category } = props;

  const handleFilter = (event, newFilter) => {
    if (!newFilter)
      newFilter = 0
    setCategory(newFilter);
  };

  return (
    <Grid xs={12} sm item container direction="row" justifyContent="flex-start" alignItems="flex-start" rowSpacing={1} mb={3}>
      <Grid item>
        <ToggleButtonGroup
            value={category}
            exclusive
            onChange={handleFilter}
            aria-label="Filter">
          <ToggleButton key="all" value={0} aria-label="All">
            All
          </ToggleButton>
        </ToggleButtonGroup>
      </Grid>
          {
            Object.keys(CATEGORIES).map((category, index) => {
              return (
                <Grid item>
                  <ToggleButtonGroup
                      value={category}
                      exclusive
                      onChange={handleFilter}
                      aria-label="Filter">
                    <ToggleButton key={index} index={index} value={CATEGORIES[category]} aria-label={CATEGORY_NAMES[category]}>
                      {CATEGORY_ICONS[category]}{CATEGORY_NAMES[category]}
                    </ToggleButton>
                  </ToggleButtonGroup>
                </Grid>
              )
            })
          }
    </Grid>
  );
}