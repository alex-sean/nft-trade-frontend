import React, { useState } from 'react';
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

export default function BidDialog(props){
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
			open={open}
			TransitionComponent={Transition}
			keepMounted
			onClose={handleClose}
			aria-describedby="alert-dialog-slide-description"
			>
			<DialogTitle display='flex' justifyContent='space-between' className={classes.paperBackground}>
				<Typography>Bid</Typography>
				<CloseIcon onClick={handleClose} />
			</DialogTitle>
			<DialogContent dividers className={classes.paperBackground}>
				<Box p={1}>
					<Box display="flex" justifyContent='space-between' alignItems='center'>
						<Box display="flex" justifyContent='space-between' alignItems='center'>
							<Typography p={2} variant="h6">TokenName:</Typography>
							<Typography p={1} variant="body1">#1</Typography>
						</Box>
						<Box />
					</Box>
					<Box display="flex" justifyContent='space-between' alignItems='center'>
						<Box display="flex" justifyContent='space-between' alignItems='center'>
							<Typography p={2} variant="h6">Bid Amount:</Typography>
							<Input p={1} sx={{width: "50px"}} inputProps={{min: 0, style: { textAlign: 'center' }}} />
						</Box>
						<Select sx={{paddingRight: '16px', marginLeft: '16px'}} value={type} onChange={e => {setType(e.target.value)}}>
							<MenuItem value="0">Token1</MenuItem>
							<MenuItem value="1">Token2</MenuItem>
						</Select>
					</Box>
					<Box display="flex" justifyContent='space-between' alignItems='center'>
						<Box display="flex" justifyContent='space-between' alignItems='center'>
							<Typography p={2} variant="h6">USD Amount:</Typography>
							<Typography p={1} variant="body1">25USD</Typography>
						</Box>
						<Box />
					</Box>
				</Box>
			</DialogContent>
			<DialogActions sx={{display:'flex', justifyContent: 'center'}} className={classes.paperBackground}>
				<PrimaryButton text='BID' />
			</DialogActions>
		</Dialog>
	)
}