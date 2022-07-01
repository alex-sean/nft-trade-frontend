import React, { useEffect, useState } from 'react';
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
import { getAssetName, getUSDPrice } from '../../common/CommonUtils';
import { toast } from 'react-toastify';
import BidProgressDlg from './BidProgressDlg';

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

export default function BidDialog(props){
	const {open, handleOpenDialog, token, rates } = props
	const classes = useStyles();
	const theme = useTheme()
	const isDark = theme.palette.mode === 'dark'

	const [assets, setAssets] = useState({});
	const [asset, setAsset] = useState('');
	const [bidAmount, setBidAmount] = useState('');
	const [usdPrice, setUSDPrice] = useState(0);

	const [showBidProgressDlg, setShowBidProgressDlg] = useState(false);

	const handleClose = () => {
		handleOpenDialog(false);
	};

	useEffect(() => {
		if (!token) {
			return;
		}

		const assets = {};
		const assetAddresses = JSON.parse(token.assets);
		assetAddresses.forEach((address) => {
			assets[getAssetName(address)] = address;
		})

		setAssets(assets);
		setAsset(assetAddresses[0]);
	}, [token])

	const getTokenName = () => {
		if (token) {
			return `${token.name} #${token.tokenID}`;
		}
		return '...'
	}

	useEffect(() => {
		if (isNaN(bidAmount)) {
			setUSDPrice(0);
			return;
		}

		setUSDPrice(getUSDPrice(rates, bidAmount, getAssetName(asset)));
	}, [bidAmount]);

	const handleBid = () => {
		if (usdPrice < token.price) {
			toast('Bid amount is less than minimum price.');
			return;
		}

		setShowBidProgressDlg(true);
	}

	return (
		[
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
								<Typography p={1} variant="body1">{getTokenName()}</Typography>
							</Box>
							<Box />
						</Box>
						<Box display="flex" justifyContent='space-between' alignItems='center'>
							<Box display="flex" justifyContent='space-between' alignItems='center'>
								<Typography p={2} variant="h6">Bid Amount:</Typography>
								<Input p={1} sx={{width: "50px"}} inputProps={{min: 0, style: { textAlign: 'center' }}} onChange={(e) => setBidAmount(e.target.value)}/>
							</Box>
							<Select sx={{paddingRight: '16px', marginLeft: '16px'}} value={asset} onChange={e => {setAsset(e.target.value)}}>
								{
									Object.keys(assets).map((name, index) => {
										return (
											<MenuItem value={assets[name]} key={index}>{name}</MenuItem>
										)
									})
								}
							</Select>
						</Box>
						<Box display="flex" justifyContent='space-between' alignItems='center'>
							<Box display="flex" justifyContent='space-between' alignItems='center'>
								<Typography p={2} variant="h6">USD Amount:</Typography>
								<Typography p={1} variant="body1">$ {usdPrice}</Typography>
							</Box>
							<Box />
						</Box>
						<Box display="flex" justifyContent='space-between' alignItems='center'>
							<Box display="flex" justifyContent='space-between' alignItems='center'>
								<Typography p={2} variant="h6">Minium Price:</Typography>
								<Typography p={1} variant="body1">$ {token? token.price: 0}</Typography>
							</Box>
							<Box />
						</Box>
					</Box>
				</DialogContent>
				<DialogActions sx={{display:'flex', justifyContent: 'center'}} className={classes.paperBackground}>
					<PrimaryButton text='BID' onClick={handleBid}/>
				</DialogActions>
			</Dialog>,
			<BidProgressDlg open={showBidProgressDlg} handleOpenDialog={setShowBidProgressDlg} token={token} amount={bidAmount} asset={asset}/>
		]
	)
}