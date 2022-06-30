import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Dialog, DialogActions, DialogContent, DialogTitle,
  Slide,
  useTheme, Divider, Input, Grid, Select, MenuItem, FormControlLabel, Checkbox,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import PrimaryButton from '../Button/PrimaryButton';
import useStyles from '../../styles/styles';

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

export default function SellDialog(props){
	const { open, setOpen, token, serviceFee } = props
	const [type, setType] = useState(0);
	const [price, setPrice] = useState(0);
	const [servicePrice, setServicePrice] = useState(0);

	const classes = useStyles();
	const theme = useTheme()
	const isDark = theme.palette.mode === 'dark'

	const handleClose = () => {
		setOpen(false);
	};

	useEffect(() => {
		if (isNaN(price)) {
			setServicePrice(0);
		} else {
			setServicePrice(parseFloat(price) * parseInt(serviceFee) / 10000);
		}
	}, [price])

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
								<Typography p={1} variant="body1">{token? `${token.name} #${token.tokenID}`: '...'}</Typography>
							</Box>
							<Box display="flex" justifyContent='space-between' alignItems='center'>
								<Typography p={1} variant="h6">Price:</Typography>
								<Input p={1} onChange={(e) => setPrice(e.target.value)}/> USD
							</Box>
							<Box display="flex" justifyContent='space-between' alignItems='center'>
								<Typography p={1} variant="h6">ServiceFee:</Typography>
								<Typography p={1} variant="body1">{servicePrice} USD</Typography>
							</Box>
							<Box display="flex" justifyContent='space-between' alignItems='center'>
								<Typography p={1} variant="h6">SellType:</Typography>
								<Select sx={{paddingRight: '16px'}} value={type} onChange={e => {setType(e.target.value)}}>
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