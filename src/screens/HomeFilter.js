import * as React from 'react';
import { Grid, Button, MenuItem, Select } from "@mui/material";
import PaletteIcon from '@mui/icons-material/Palette';
import LinkedCameraIcon from '@mui/icons-material/LinkedCamera';
import LanguageIcon from '@mui/icons-material/Language';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import FormatShapesIcon from '@mui/icons-material/FormatShapes';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';

export default function HomeFilter(){
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <Grid container direction="row" justifyContent="space-between" alignItems="flex-start">
      <Grid xs spacing={2} item container direction="row" justifyContent="flex-start">
        <Grid item>
          <Button variant="contained">All</Button>
        </Grid>
        <Grid item>
          <Button variant="outlined" startIcon={<PaletteIcon />}>Art</Button>
        </Grid>
        <Grid item>
          <Button variant="outlined" startIcon={<CardGiftcardIcon />}>Collectibles</Button>
        </Grid>
        <Grid item>
          <Button variant="outlined" startIcon={<FormatShapesIcon />}>Domain</Button>
        </Grid>
        <Grid item>
          <Button variant="outlined" startIcon={<MusicNoteIcon />}>Music</Button>
        </Grid>
        <Grid item>
          <Button variant="outlined" startIcon={<LinkedCameraIcon />}>Photography</Button>
        </Grid>
        <Grid item>
          <Button variant="outlined" startIcon={<LanguageIcon />}>VirtualWorld</Button>
        </Grid>
      </Grid>
      <Grid item>
        <Select
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