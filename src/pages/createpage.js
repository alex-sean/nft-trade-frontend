import React, { useRef, useState } from 'react';
import {
  Box,
  Typography,
  TextareaAutosize,
  Button,
  Select,
  Switch,
  MenuItem,
  InputLabel, InputAdornment, OutlinedInput, Divider
} from '@mui/material';
import useStyles from '../styles/styles';
import { Container } from '@mui/system';
import { FileUploader } from "react-drag-drop-files";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import StarIcon from '@mui/icons-material/Star';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import WarningIcon from '@mui/icons-material/Warning';
import AddIcon from '@mui/icons-material/Add';

export default function CreatePage(){
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const classes = useStyles();

  const [file, setFile] = useState(null);
  const handleFileChange = (file) => {
    setFile(file);
  };
  
  const fileTypes = ["JPEG", "JPG", "PNG", "GIF"];

  const submitForm = (e) => {
    e.preventDefault();
    console.log({ email, firstName, subject, message });
  };

  return (
    <Box py={10} paddingTop='4rem'>
      <Container maxWidth="md">
        <Typography py={1} align="center" variant="h4" paddingBottom='4rem'>Create</Typography>
        <InputLabel htmlFor="username" className={classes.createItemTitle} marginTop="0px">
          Image, Video, Audio, or 3D Model<span style={{color:'red'}}>*</span></InputLabel>
        <Typography mb={1} variant="body2" className={classes.createItemDetail}>Drag or choose your file to upload</Typography>
        <FileUploader
          handleChange={handleFileChange}
          name="file"
          types={fileTypes}
          style={{color: 'red'}}
          className={classes.fileUpload}
        />

        <InputLabel htmlFor="username" className={classes.createItemTitle}>
          Name<span style={{color:'red'}}>*</span></InputLabel>
        <OutlinedInput placeholder="Item name"
          id="username"
          fullWidth
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          sx={{borderColor: '#E7E8EC', borderRadius: '0.5rem', padding: '0.5rem, 0.75rem, 0.5rem, 0.75rem'}}
        />

        <InputLabel htmlFor="link" className={classes.createItemTitle}>
          External Link<span style={{color:'red'}}>*</span></InputLabel>
        <Typography paragraph variant="body2" className={classes.createItemDetail}>We will include a link to this URL on this item's detail page, so that users can click to learn more about it. You are welcome to link to your own webpage with more details.</Typography>
        <OutlinedInput placeholder="https://yoursite.io/item/24"
          id="link"
          fullWidth
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          sx={{borderColor: '#E7E8EC', borderRadius: '0.5rem', padding: '0.5rem, 0.75rem, 0.5rem, 0.75rem'}}
        />
        
        <InputLabel htmlFor="desc" className={classes.createItemTitle}>
          Description</InputLabel>
        <Typography paragraph variant="body2" className={classes.createItemDetail}>We will include a link to this URL on this item's detail page, so that users can click to learn more about it. You are welcome to link to your own webpage with more details.</Typography>
        <TextareaAutosize
          id="desc"
          aria-label="minimum height"
          minRows={6}
          placeholder="Provided a detailed description of your item"
          spellCheck
          fullWidth
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          style={{width: '100%', borderColor: 'darkgray'}}
          className={classes.inputBorder}
        />

        <InputLabel htmlFor="collection" className={classes.createItemTitle}>
          Collection</InputLabel>
        <Box py={1} display="flex" alignItems="center">
          <Typography mr={1} variant="body2" className={classes.createItemDetail}>This is the collection where your item will appear.</Typography>
          <InfoOutlinedIcon sx={{color: 'gray'}}/>
        </Box>
        <Select
            fullWidth
            id="collection"
            inputProps={{ 'aria-label': 'Without label' }}
          >
          <MenuItem value="">
            <em>Cryptokities</em>
          </MenuItem>
          <MenuItem value={20}>KaijuKings</MenuItem>
          <MenuItem value={30}>Cozy penguin</MenuItem>
        </Select>

        <Box py={2} sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
          <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
            <FormatListBulletedIcon />
            <Box pl={1}>
              <Typography variant="h6">Properties</Typography>
              <Typography variant='body2'>Textual traits that show up as rectangles.</Typography>
            </Box>
          </Box>
          <Button variant="outlined" sx={{color: "#8358ff", fontSize: '25px', borderRadius: '10px'}}>+</Button>
        </Box>
        <Divider />
        <Box py={2} sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
          <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
            <StarIcon />
            <Box pl={1}>
              <Typography variant="h6">Levels</Typography>
              <Typography variant='body2'>Numerical traits that show as a progress bar.</Typography>
            </Box>
          </Box>
          <Button variant="outlined" sx={{color: "#8358ff", fontSize: '25px', borderRadius: '10px'}}>+</Button>
        </Box>
        <Divider />
        <Box py={2} sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
          <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
            <EqualizerIcon />
            <Box pl={1}>
              <Typography variant="h6">Stars</Typography>
              <Typography variant='body2'>Numerical traits that just show as numbers.</Typography>
            </Box>
          </Box>
          <Button variant="outlined" sx={{color: "#8358ff", fontSize: '25px', borderRadius: '10px'}}>+</Button>
        </Box>
        <Divider />
        <Box py={2} sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
          <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
            <LockOpenIcon sx={{color: '#8358ff'}} />
            <Box pl={1}>
              <Typography variant="h6">Unlockable Content</Typography>
              <Typography variant='body2'>Include unlockable content that can only be revealed by the owner of the item.</Typography>
            </Box>
          </Box>
          <Switch />
        </Box>
        <Divider />
        <Box py={2} sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
          <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
            <WarningIcon/>
            <Box pl={1}>
              <Typography variant="h6">Explicit & Sensitive Content</Typography>
              <Box py={1} display="flex" alignItems="center">
                <Typography mr={1} variant="body2">Set this item as explicit and sensitive content.</Typography>
                <InfoOutlinedIcon sx={{color: 'gray'}}/>
              </Box>
            </Box>
          </Box>
          <Switch />
        </Box>
        <Divider />

        <InputLabel htmlFor="supply" sx={{marginTop: '20px', fontWeight: '700'}}>
          Supply</InputLabel>
        <Box py={1} display="flex" alignItems="center">
          <Typography mr={1} variant="body2">The number of items that can be minted. No gas cost to you!</Typography>
          <InfoOutlinedIcon sx={{color: 'gray'}}/>
        </Box>
        <OutlinedInput
          placeholder="1" 
          id="supply"
          fullWidth />

        <InputLabel htmlFor="blockchain" sx={{marginTop: '20px', fontWeight: '700'}}>
          Blockchain</InputLabel>
        <Select
            fullWidth
            id="blockchain"
            displayEmpty
            inputProps={{ 'aria-label': 'Without label' }}
          >
          <MenuItem value="">
            <em>Ethereum</em>
          </MenuItem>
          <MenuItem value={20}>Flow</MenuItem>
          <MenuItem value={30}>FUSD</MenuItem>
        </Select>

        <InputLabel htmlFor="metadata" sx={{marginTop: '20px', fontWeight: '700', display: 'flex', alignItems: 'center'}}>
          Freeze metadata 
          <InfoOutlinedIcon sx={{color: 'gray', marginLeft: '8px'}}/>
        </InputLabel>
        <Typography mt={1} paragraph variant="body2">Freezing your metadata will allow you to permanently lock and store all of this item's content in decentralized file storage.</Typography>
        <OutlinedInput value="To freeze your metadata, you must create your item first."
          id="metadata"
          fullWidth
          disabled
           />

        <Button
          variant="contained"
          type="submit"
          color="primary"
          className={classes.primaryButton}
          onClick={submitForm}
        >
          Create
        </Button>
      </Container>      
    </Box>
  );
};