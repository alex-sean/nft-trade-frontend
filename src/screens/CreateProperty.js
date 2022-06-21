import React from 'react';
import {
  Box,
  Typography,
  Button,
  Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
  Slide,
	Table, TableBody, TableHead, TableRow, TableCell, TableContainer, Input, useTheme,
} from '@mui/material';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import CloseIcon from '@mui/icons-material/Close';
import PrimaryButton from '../components/Button/PrimaryButton';
import useStyles from '../styles/styles';

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="down" ref={ref} {...props} />;
});

export default function CreateProperty({
	properties,
	setProperties,
	handleAddProperty,
	handleRemoveProperty,
	handleEditPropertyName,
	handleEditPropertyValue
}) {
	const [open, setOpen] = React.useState(false);
	const classes = useStyles();
	const theme = useTheme()
	const isDark = theme.palette.mode === 'dark'

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
		setProperties([]);
	};

	return (
		<Box py={2} sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
			<Box sx={{display: 'flex', justifyContent: 'space-between'}}>
				<FormatListBulletedIcon/>
				<Box pl={1}>
					<Typography variant="h6">Properties</Typography>
					<Typography variant='body2'>Textual traits that show up as rectangles.</Typography>
				</Box>
			</Box>
			<Button variant="outlined" sx={{color: "#8358ff", fontSize: '25px', borderRadius: '10px'}} onClick={handleClickOpen}>+</Button>
			<Dialog
				borderRadius={5}
				open={open}
				TransitionComponent={Transition}
				keepMounted
				onClose={handleClose}
				aria-describedby="alert-dialog-slide-description"
				>
				<DialogTitle display='flex' justifyContent='space-between' className={classes.paperBackground}>
					<Typography>Add Properties</Typography>
					<CloseIcon onClick={handleClose} />
				</DialogTitle>
				<DialogContent dividers className={classes.paperBackground}>
					<DialogContentText id="alert-dialog-slide-description">
						Item Properties show up underneath your item, are clickable, and can be filtered in your collection's sidebar.
					</DialogContentText>
					<TableContainer>
						<Table aria-label="simple table">
							<TableHead>
								<TableRow>
									<TableCell></TableCell>
									<TableCell>Name</TableCell>
									<TableCell>Value</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{
									properties.map((property, index) => {
										return (
											<TableRow key={index}>
												<TableCell  sx={{background:`${isDark?'transparent':'lightgray'}`, textAlign:'center', height:'10px'}} onClick={() => handleRemoveProperty(index)}><CloseIcon /></TableCell>
												<TableCell><Input disableUnderline placeholder='Character' onChange={(e) => handleEditPropertyName(index, e.target.value)} value={property.name}/></TableCell>
												<TableCell><Input disableUnderline placeholder='Male' onChange={(e) => handleEditPropertyValue(index, e.target.value)} value={property.value}/></TableCell>
											</TableRow>
										)
									})
								}
							</TableBody>
						</Table>
					</TableContainer>
					<Button sx={{margin:'24px 0', border: 'solid 2px #8358ff', borderRadius: '20px', padding: '8px 32px'}} onClick={handleAddProperty}>Add More</Button>
				</DialogContent>
				<DialogActions sx={{display:'flex', justifyContent: 'center'}} className={classes.paperBackground}>
					<PrimaryButton text='SAVE' onClick={() => setOpen(false)}/>
				</DialogActions>
			</Dialog>
		</Box>
	)
}