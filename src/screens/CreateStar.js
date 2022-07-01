import React from 'react';
import {
  Box,
  Typography,
  Button,
  Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
  Slide,
	Table, TableBody, TableHead, TableRow, TableCell, TableContainer, Input, useTheme,
} from '@mui/material';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import CloseIcon from '@mui/icons-material/Close';
import PrimaryButton from '../components/Button/PrimaryButton';
import useStyles from '../styles/styles';

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="down" ref={ref} {...props} />;
});

export default function CreateStar({
	stars,
	setStars,
	handleAddStar,
	handleRemoveStar,
	handleEditStarName,
	handleEditStarValue,
	handleEditStarTotalValue
}){
	const [open, setOpen] = React.useState(false);
	const classes = useStyles();
	const theme = useTheme()
	const isDark = theme.palette.mode === 'dark'

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
		setStars([]);
	};

	return (
		<Box py={2} sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
          <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
            <EqualizerIcon />
            <Box pl={1}>
              <Typography variant="h6">Stars</Typography>
              <Typography variant='body2'>Numerical traits that just show as numbers.</Typography>
            </Box>
		</Box>
		<Button variant="outlined" sx={{color: "#8358ff", fontSize: '25px', borderRadius: '10px'}} onClick={handleClickOpen}>+</Button>
			<Dialog
				open={open}
				TransitionComponent={Transition}
				keepMounted
				onClose={handleClose}
				aria-describedby="alert-dialog-slide-description"
				>
				<DialogTitle display='flex' justifyContent='space-between' className={classes.paperBackground}>
					<Typography>Add stars</Typography>
					<CloseIcon onClick={handleClose} />
				</DialogTitle>
				<DialogContent dividers className={classes.paperBackground}>
					<DialogContentText id="alert-dialog-slide-description">
						Stars show up underneath your item, are clickable, and can be filtered in your collection's sidebar.
					</DialogContentText>
					<TableContainer>
						<Table aria-label="simple table">
							<TableHead>
								<TableRow>
									<TableCell></TableCell>
									<TableCell>Name</TableCell>
									<TableCell>Value</TableCell>
									<TableCell></TableCell>
									<TableCell></TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{
									stars.map((star, index) => {
										return (
											<TableRow key={index}>
												<TableCell sx={{background:`${isDark?'transparent':'lightgray'}`, textAlign:'center'}} onClick={handleRemoveStar}><CloseIcon /></TableCell>
												<TableCell><Input disableUnderline placeholder='Character' onChange={(e) => handleEditStarName(index, e.target.value)} value={star.name}/></TableCell>
												<TableCell sx={{display: 'flex'}}><Input type='number' disableUnderline placeholder='3' onChange={(e) => handleEditStarValue(index, e.target.value)} value={star.value}/></TableCell>
												<TableCell sx={{background:`${isDark?'transparent':'lightgray'}`, textAlign:'center'}}>Of</TableCell>
												<TableCell><Input type='number' disableUnderline placeholder='10' onChange={(e) => handleEditStarTotalValue(index, e.target.value)} value={star.total}/></TableCell>
											</TableRow>
										)
									})
								}
							</TableBody>
						</Table>
					</TableContainer>
					<Button sx={{margin:'24px 0', border: 'solid 2px #8358ff', borderRadius: '20px', padding: '8px 32px'}} onClick={handleAddStar}>Add More</Button>
				</DialogContent>
				<DialogActions sx={{display:'flex', justifyContent: 'center'}} className={classes.paperBackground}>
					<PrimaryButton text='SAVE' />
				</DialogActions>
			</Dialog>
		</Box>
	)
}