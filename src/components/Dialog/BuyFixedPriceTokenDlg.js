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
import { ASSETS } from '../../common/const';
import { useWalletContext } from '../../hooks/useWalletContext';
import { useLoadingContext } from '../../hooks/useLoadingContext';
import BEP20Price from '../../contracts/BEP20Price.json';
import { toast } from 'react-toastify';
import BuyCoinProgressDlg from './BuyCoinProgressDlg';

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

export default function BuyFixedPriceTokenDlg(props){
	const { open, setOpen, token } = props

	const [assets, setAssets] = useState({});
	const [asset, setAsset] = useState('');
	const [price, setPrice] = useState(0);
	const [showCoinDlg, setShowCoinDlg] = useState(false);

	const { web3 } = useWalletContext();
	const { setLoading } = useLoadingContext();

	const classes = useStyles();
	const theme = useTheme()
	const isDark = theme.palette.mode === 'dark'

	const handleClose = () => {
		setOpen(false);
	};

	useEffect(() => {
		if (!token) {
			return;
		}

		let assets = {};
		if (token.isStableCoin) {
			assets['AVAX'] = 'Native';
		}

		JSON.parse(token.assets).forEach((asset) => {
			Object.keys(ASSETS).forEach((key) => {
				if (ASSETS[key] === asset) {
					assets[key] = asset;
				}
			})
		})

		setAssets(assets);
	}, [token])

	const getPrice = async (asset) => {
		setLoading(true);

		try {
			const priceContract = new web3.eth.Contract(BEP20Price.abi, process.env.REACT_APP_PRICE_CONTRACT_EXCHANGE);
			let rate = 0;
			if (asset === 'Native') {
				rate = await priceContract.methods.getAVAXPrice().call();
			} else {
				rate = await priceContract.methods.getTokenPrice(asset).call();
			}
			setPrice((token.price) * Math.pow(10, 18) / rate);
		} catch (err) {
			console.log(err);
			toast('Getting rate failed!');
			setPrice(0);
		}

		setLoading(false);
	}

	useEffect(() => {
		if (!asset) {
			return;
		}

		getPrice(asset);
	}, [asset])

	const handleOpenProgressDlg = () => {
		if (parseFloat(price) === 0) {
			toast('Something wrong with the price.');
			return;
		}

		if (asset === 'Native') {
			setShowCoinDlg(true);
		} else {

		}
	}

	return ([
		<Dialog
			borderRadius={5}
			open={open}
			TransitionComponent={Transition}
			keepMounted
			onClose={handleClose}
			aria-describedby="alert-dialog-slide-description"
			>
			<DialogTitle display='flex' justifyContent='space-between' className={classes.paperBackground}>
				<Typography>Buy Token</Typography>
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
								<Typography p={1} variant="body1">{token? `${token.price} USD`: '0 USD'}</Typography>
							</Box>
							<Box display="flex" justifyContent='space-between' alignItems='center'>
								<Box display="flex" justifyContent='space-between' alignItems='center'>
									<Typography p={2} variant="h6">Amount:</Typography>
									<Input p={1} sx="width: 50px" inputProps={{min: 0, style: { textAlign: 'center' }}} value={price.toFixed(4)} disabled/>
								</Box>
								<Select sx={{paddingRight: '16px'}} value={asset} onChange={e => {setAsset(e.target.value)}}>
									{
										Object.keys(assets).map((asset, index) => {
											return (
												<MenuItem value={assets[asset]} index={index}>{asset}</MenuItem>
											)	
										})
									}
								</Select>
							</Box>
						</Box>
					</Grid>
				</Grid>
			</DialogContent>
			<DialogActions sx={{display:'flex', justifyContent: 'center'}} className={classes.paperBackground}>
				<PrimaryButton text='Buy' onClick={handleOpenProgressDlg}/>
			</DialogActions>
		</Dialog>,
		<BuyCoinProgressDlg open={showCoinDlg} handleOpenDialog={setShowCoinDlg} token={token} amount={price.toFixed(4)}/>
	])
}