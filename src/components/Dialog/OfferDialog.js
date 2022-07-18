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
import { ASSETS } from '../../common/const';
import OfferProgressDlg from './OfferProgressDlg';
import { toast } from 'react-toastify';

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

export default function OfferDialog(props){
	const {visible, tokenInfo, setVisibility} = props;
	const [asset, setAsset] = useState(ASSETS.AVAX);
	const [showProgressDlg, setShowProgressDlg] = useState(false);
	const [offerAmount, setOfferAmount] = useState(0);

	const classes = useStyles();

	const theme = useTheme()
	const isDark = theme.palette.mode === 'dark'

	const handleClose = () => {
		setVisibility(false);
	};

	const handleOffer = () => {
		if (isNaN(offerAmount)) {
			toast('Please input the correct offer amount.');
			return;
		}

		setShowProgressDlg(true);
	}

	return [
		<Dialog
			borderRadius={5}
			open={visible}
			TransitionComponent={Transition}
			keepMounted
			onClose={handleClose}
			aria-describedby="alert-dialog-slide-description"
			>
			<DialogTitle display='flex' justifyContent='space-between' className={classes.paperBackground}>
				<Typography>Offer</Typography>
				<CloseIcon onClick={handleClose} />
			</DialogTitle>
			<DialogContent dividers className={classes.paperBackground}>
				<Box p={1}>
					<Box display="flex" justifyContent='space-between' alignItems='center'>
						<Box display="flex" justifyContent='space-between' alignItems='center'>
							<Typography p={2} variant="h6">Token Name:</Typography>
							<Typography p={1} variant="body1">{tokenInfo? `${tokenInfo.token.name} #${tokenInfo.token.tokenID}`: '...'}</Typography>
						</Box>
						<Box />
					</Box>
					<Box display="flex" justifyContent='space-between' alignItems='center'>
						<Box display="flex" justifyContent='space-between' alignItems='center'>
							<Typography p={2} variant="h6">Offer Amount:</Typography>
							<Input p={1} sx="width: 50px" inputProps={{min: 0, style: { textAlign: 'center' }}} onChange={(e) => setOfferAmount(e.target.value)}/>
						</Box>
						<Select sx={{paddingRight: '16px'}} value={asset} onChange={e => {setAsset(e.target.value)}}>
							{
								Object.keys(ASSETS).map((asset, index) => {
									return (
										<MenuItem className={classes.dropdownMenu} value={ASSETS[asset]} index={index}>{asset}</MenuItem>
									)	
								})
							}
						</Select>
					</Box>
				</Box>
			</DialogContent>
			<DialogActions sx={{display:'flex', justifyContent: 'center'}} className={classes.paperBackground}>
				<PrimaryButton text='Offer' onClick={handleOffer}/>
			</DialogActions>
		</Dialog>,
		<OfferProgressDlg open={showProgressDlg} handleOpenDialog={setShowProgressDlg} token={tokenInfo? tokenInfo.token: null} offerAmount={offerAmount} asset={asset}></OfferProgressDlg>
	]
}