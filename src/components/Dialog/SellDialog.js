import React, { useState } from 'react';
import {
  Box,
  Typography,
  Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
  Slide,
  useTheme, Stack, Divider, Input, Grid, Select, MenuItem, FormControlLabel, Checkbox,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import PrimaryButton from '../Button/PrimaryButton';
import useStyles from '../../styles/styles';

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

export default function SellDialog(props){
	const {visible} = props
	const [open, setOpen] = React.useState(visible);
	const [type, setType] = useState(0)
	const classes = useStyles();
	const theme = useTheme()
	const isDark = theme.palette.mode === 'dark'

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<Dialog
			borderRadius={5}
			open={open}
			TransitionComponent={Transition}
			keepMounted
			onClose={handleClose}
			aria-describedby="alert-dialog-slide-description"
			>
			<DialogTitle display='flex' justifyContent='space-between' className={classes.paperBackground}>
				<Typography>Sell Token</Typography>
				<CloseIcon onClick={handleClose} />
			</DialogTitle>
			<DialogContent dividers className={classes.paperBackground}>
				<Grid container>
					<Grid item xs>
						<Box p={1}>
							<Box display="flex" justifyContent='space-between' alignItems='center'>
								<Typography p={1} variant="h6">TokenName:</Typography>
								<Typography p={1} variant="body1">#1</Typography>
							</Box>
							<Box display="flex" justifyContent='space-between' alignItems='center'>
								<Typography p={1} variant="h6">Price:</Typography>
								<Input p={1} />USD
							</Box>
							<Box display="flex" justifyContent='space-between' alignItems='center'>
								<Typography p={1} variant="h6">ServiceFee:</Typography>
								<Typography p={1} variant="body1">0.002USD</Typography>
							</Box>
							<Box display="flex" justifyContent='space-between' alignItems='center'>
								<Typography p={1} variant="h6">SellType:</Typography>
								<Select value={type} onChange={e => {setType(e.target.value)}}>
              						<MenuItem value="0">Auction</MenuItem>
              						<MenuItem value="1">FixedPrice</MenuItem>
								</Select>
							</Box>
						</Box>
					</Grid>
					<Divider orientation="vertical" flexItem />
					<Grid item xs>
						<FormControlLabel
							value="1"
							control={<Checkbox />}
							label="Token1"
							labelPlacement="bottom" />
						<FormControlLabel
							value="2"
							control={<Checkbox />}
							label="Token2"
							labelPlacement="bottom" />
						<FormControlLabel
							value="3"
							control={<Checkbox />}
							label="Token3"
							labelPlacement="bottom" />
						<FormControlLabel
							value="4"
							control={<Checkbox />}
							label="Token4"
							labelPlacement="bottom" />
						<FormControlLabel
							value="5"
							control={<Checkbox />}
							label="Token5"
							labelPlacement="bottom" />
						<FormControlLabel
							value="6"
							control={<Checkbox />}
							label="Token6"
							labelPlacement="bottom" />
					</Grid>
				</Grid>
			</DialogContent>
			<DialogActions sx={{display:'flex', justifyContent: 'center'}} className={classes.paperBackground}>
				<PrimaryButton text='SELL' />
			</DialogActions>
		</Dialog>
	)
}