import React, { useEffect, useRef, useState } from 'react';
import {
  Box,
  Typography,
  TextareaAutosize,
  Button,
  Select,
  Switch,
  MenuItem,
  InputLabel, OutlinedInput, Divider
} from '@mui/material';
import { toast } from 'react-toastify';
import useStyles from '../styles/styles';
import { Container } from '@mui/system';
import { FileUploader } from "react-drag-drop-files";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import WarningIcon from '@mui/icons-material/Warning';
import CreateProgressDlg from '../components/Dialog/CreateProgressDlg';
import CreateProperty from '../screens/CreateProperty'
import CreateLevel from '../screens/CreateLevel'
import CreateStar from '../screens/CreateStar';
import { CATEGORIES, CATEGORY_NAMES } from '../common/const';
import { useWalletContext } from '../hooks/useWalletContext'

export default function CreatePage(){
  const [name, setName] = useState('');
  const [externalLink, setExternalLink] = useState('');
  const [collection, setCollection] = useState(CATEGORIES.ART);
  const [subject, setSubject] = useState('');
  const [properties, setProperties] = useState([]);
  const [levels, setLevels] = useState([]);
  const [stars, setStars] = useState([]);
  const [supply, setSupply] = useState(1);
  const [unlock, setUnlock] = useState(false);
  const [isExplicit, setIsExplicit] = useState(false);
  const [openProgressDlg, setOpenProgressDlg] = useState(false);

  const { account, isConnected } = useWalletContext();

  const classes = useStyles();

  const [file, setFile] = useState(null);
  const handleFileChange = (file) => {
    setFile(file);
  };
  
  const fileTypes = ["JPEG", "JPG", "PNG", "GIF"];

  const handleAddProperty = () => {
    let tmpProperties = [...properties];
    tmpProperties.push({name: '', value: ''});
    setProperties(tmpProperties);
  }

  const handleRemoveProperty = (index) => {
    let tmpProperties = [...properties];
    tmpProperties.splice(index, 1);
    setProperties(tmpProperties);
  }

  const handleEditPropertyName = (index, value) => {
    let tmpProperties = [...properties];
    tmpProperties[index].name = value;
    setProperties(tmpProperties);
  }

  const handleEditPropertyValue = (index, value) => {
    let tmpProperties = [...properties];
    tmpProperties[index].value = value;
    setProperties(tmpProperties);
  }

  const handleAddLevel = () => {
    let tmpLevels = [...levels];
    tmpLevels.push({name: '', value: 0, total: 0});
    setLevels(tmpLevels);
  }

  const handleRemoveLevel = (index) => {
    let tmpLevels = [...levels];
    tmpLevels.splice(index, 1);
    setLevels(tmpLevels);
  }

  const handleEditLevelName = (index, value) => {
    let tmpLevels = [...levels];
    tmpLevels[index].name = value;
    setLevels(tmpLevels);
  }

  const handleEditLevelValue = (index, value) => {
    let tmpLevels = [...levels];
    tmpLevels[index].value = value;
    setLevels(tmpLevels);
  }

  const handleEditLevelTotalValue = (index, value) => {
    let tmpLevels = [...levels];
    tmpLevels[index].total = value;
    setLevels(tmpLevels);
  }

  const handleAddStar = () => {
    let tmpStars = [...stars];
    tmpStars.push({name: '', value: 0, total: 0});
    setStars(tmpStars);
  }

  const handleRemoveStar = (index) => {
    let tmpStars = [...stars];
    tmpStars.splice(index, 1);
    setStars(tmpStars);
  }

  const handleEditStarName = (index, value) => {
    let tmpStars = [...stars];
    tmpStars[index].name = value;
    setStars(tmpStars);
  }

  const handleEditStarValue = (index, value) => {
    let tmpStars = [...stars];
    tmpStars[index].value = value;
    setStars(tmpStars);
  }

  const handleEditStarTotalValue = (index, value) => {
    let tmpStars = [...stars];
    tmpStars[index].total = value;
    setStars(tmpStars);
  }

  const handleCreate = () => {
    if (!isValid()) {
      return;
    }

    if (!account) {
      toast('Please connect the wallet.');
      return;
    }

    setOpenProgressDlg(true);
  }

  const isValid = () => {
    if (!file) {
      toast('Please select the file.');
      return false;
    }

    if (!name) {
      toast('Please input the name.');
      return false;
    }

    if (!subject) {
      toast('Please input the description.');
      return false;
    }

    if (supply <= 0) {
      toast('Please input the supply.');
      return false;
    }

    if (!account) {
      toast('Please connect the wallet.');
      return false;
    }

    return true;
  }

  useEffect(() => {
    if (!isConnected()) {
      toast('Please connect the wallet.');
    }
  }, [])

  return (
    <Box py={10} paddingTop='4rem'>
      <Container maxWidth="md">
        <Typography py={1} align="center" variant="h4" paddingBottom='4rem'>Create</Typography>
        <InputLabel htmlFor="username" className={classes.createItemTitle}>
          Image, Video, Audio, or 3D Model<span style={{color:'red'}}>*</span></InputLabel>
        <Typography mb={1} variant="body2" className={classes.createItemDetail}>Drag or choose your file to upload</Typography>
        <FileUploader
          handleChange={handleFileChange}
          name="file"
          types={fileTypes}
          style={{color: 'red'}}
          className={`${classes.fileUpload} ${classes.paperBackground}`}
        />

        <InputLabel htmlFor="username" className={classes.createItemTitle}>
          Name<span style={{color:'red'}}>*</span></InputLabel>
        <OutlinedInput placeholder="Item name"
          id="name"
          fullWidth
          value={name}
          className={classes.paperBackground}
          onChange={(e) => setName(e.target.value)}
          sx={{borderColor: '#E7E8EC', borderRadius: '0.5rem', padding: '0.5rem, 0.75rem, 0.5rem, 0.75rem'}}
        />

        <InputLabel htmlFor="link" className={classes.createItemTitle}>
          External Link</InputLabel>
        <Typography paragraph variant="body2" className={classes.createItemDetail}>We will include a link to this URL on this item's detail page, so that users can click to learn more about it. You are welcome to link to your own webpage with more details.</Typography>
        <OutlinedInput placeholder="https://yoursite.io/item/24"
          id="link"
          fullWidth
          value={externalLink}
          className={classes.paperBackground}
          onChange={(e) => setExternalLink(e.target.value)}
          sx={{borderColor: '#E7E8EC', borderRadius: '0.5rem', padding: '0.5rem, 0.75rem, 0.5rem, 0.75rem'}}
        />
        
        <InputLabel htmlFor="desc" className={classes.createItemTitle}>
          Description<span style={{color:'red'}}>*</span></InputLabel>
        <Typography paragraph variant="body2" className={classes.createItemDetail}>We will include a link to this URL on this item's detail page, so that users can click to learn more about it. You are welcome to link to your own webpage with more details.</Typography>
        <TextareaAutosize
          id="desc"
          aria-label="minimum height"
          minRows={6}
          placeholder="Provided a detailed description of your item"
          spellCheck
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          style={{width: '100%', borderColor: 'darkgray'}}
          className={`${classes.inputBorder} ${classes.paperBackground}`}
        />

        <InputLabel htmlFor="collection" className={classes.createItemTitle}>
          Collection</InputLabel>
        <Box py={1} display="flex" alignItems="end">
          <Typography mr={1} variant="body2" className={classes.createItemDetail}>This is the collection where your item will appear.</Typography>
          <InfoOutlinedIcon sx={{color: 'gray'}}/>
        </Box>
        <Select
          fullWidth
          id="collection"
          inputProps={{ 'aria-label': 'Without label' }}
          className={classes.paperBackground}
          onChange={(e) => setCollection(e.target.value)}
          defaultValue={CATEGORIES.ART}
        >
          {
            Object.keys(CATEGORIES).map((key, index) => {
              return <MenuItem value={CATEGORIES[key]} key={index}>{CATEGORY_NAMES[key]}</MenuItem>
            })
          }
        </Select>

        <CreateProperty
          properties={properties}
          handleAddProperty={handleAddProperty}
          handleRemoveProperty={handleRemoveProperty}
          handleEditPropertyName={handleEditPropertyName}
          handleEditPropertyValue={handleEditPropertyValue}
        />
        <Divider />
        {/* <CreateLevel
          levels={levels}
          handleAddLevel={handleAddLevel}
          handleRemoveLevel={handleRemoveLevel}
          handleEditLevelName={handleEditLevelName}
          handleEditLevelValue={handleEditLevelValue}
          handleEditLevelTotalValue={handleEditLevelTotalValue}
        />
        <Divider />
        <CreateStar
          stars={stars}
          handleAddStar={handleAddStar}
          handleRemoveStar={handleRemoveStar}
          handleEditStarName={handleEditStarName}
          handleEditStarValue={handleEditStarValue}
          handleEditStarTotalValue={handleEditStarTotalValue}
        /> */}
        <Divider />
        <Box py={2} sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
          <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
            <LockOpenIcon sx={{color: '#8358ff'}} />
            <Box pl={1}>
              <Typography variant="h6">Unlockable Content</Typography>
              <Typography variant='body2'>Include unlockable content that can only be revealed by the owner of the item.</Typography>
            </Box>
          </Box>
          <Switch onChange={(e) => setUnlock(e.target.value)}/>
        </Box>
        <Divider />
        <Box py={2} sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
          <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
            <WarningIcon/>
            <Box pl={1}>
              <Typography variant="h6">Explicit & Sensitive Content</Typography>
              <Box py={1} display="flex" alignItems="end">
                <Typography mr={1} variant="body2">Set this item as explicit and sensitive content.</Typography>
                <InfoOutlinedIcon sx={{color: 'gray'}}/>
              </Box>
            </Box>
          </Box>
          <Switch onChange={(e) => setIsExplicit(e.target.value)}/>
        </Box>
        <Divider />

        <InputLabel htmlFor="supply" sx={{marginTop: '20px', fontWeight: '700'}}>
          Supply</InputLabel>
        <Box py={1} display="flex" alignItems="end">
          <Typography mr={1} variant="body2">The number of items that can be minted. No gas cost to you!</Typography>
          <InfoOutlinedIcon sx={{color: 'gray'}}/>
        </Box>
        <OutlinedInput
          placeholder="1" 
          id="supply"
          value={supply}
          className={classes.paperBackground}
          fullWidth 
          onChange={(e) => setSupply(parseInt(e.target.value)? parseInt(e.target.value): 0)}
        />

        {/* <InputLabel htmlFor="blockchain" sx={{marginTop: '20px', fontWeight: '700'}}>
          Blockchain</InputLabel>
        <Select
            fullWidth
            id="blockchain"
            displayEmpty
            className={classes.paperBackground}
            inputProps={{ 'aria-label': 'Without label' }}
          >
          <MenuItem value="">
            Ethereum
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
          className={classes.paperBackground}
          disabled
           /> */}

        <Button
          variant="contained"
          type="submit"
          color="primary"
          className={classes.primaryButton}
          onClick={handleCreate}
        >
          Create
        </Button>

        <CreateProgressDlg
          open={openProgressDlg}
          handleOpenDialog={setOpenProgressDlg}
          token={file}
          name={name}
          externalLink={externalLink}
          supply={supply}
          properties={properties}
          levels={levels}
          stars={stars}
          collection={collection}
          description={subject}
          unlock={unlock}
          isExplicit={isExplicit}
        />
      </Container>      
    </Box>
  );
};