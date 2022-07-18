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
import { ASSETS, BASE_CURRENCY_TYPE } from '../../common/const';
import { useWalletContext } from '../../hooks/useWalletContext';
import { useLoadingContext } from '../../hooks/useLoadingContext';
import BEP20Price from '../../contracts/BEP20Price.json';
import { toast } from 'react-toastify';
import BuyCoinProgressDlg from './BuyCoinProgressDlg';
import BuyTokenProgressDlg from './BuyTokenProgressDlg';
import { getTokenPrice } from '../../common/CommonUtils';
import Web3 from 'web3';

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

export default function BuyFixedPriceTokenDlg(props){
	const { open, setOpen, token } = props

	const [assets, setAssets] = useState({});
	const [asset, setAsset] = useState('');
	const [price, setPrice] = useState(0);
	const [showCoinDlg, setShowCoinDlg] = useState(false);
	const [showTokenDlg, setShowTokenDlg] = useState(false);

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
			if (token.baseCurrencyType === BASE_CURRENCY_TYPE.AVAX && (asset === 'Native' || asset === ASSETS.AVAX)) {
				setPrice(Web3.utils.fromWei(token.avaxPrice + ''));
			} else if (token.baseCurrencyType === BASE_CURRENCY_TYPE.USD && asset === 'USDT') {
				setPrice(Web3.utils.fromWei(token.usdPrice + ''));
			} else {
				if (token.baseCurrencyType === BASE_CURRENCY_TYPE.AVAX) {
					const usdPrice = token.avaxPrice * (await getTokenPrice(web3, 'Native')) / Math.pow(10, 18);
					const rate = await getTokenPrice(web3, asset);
					setPrice(usdPrice / rate);
				} else {
					const rate = await getTokenPrice(web3, asset);
					setPrice(token.usdPrice / rate);
				}
			}
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
			setShowTokenDlg(true);
		}
	}

	const getUITokenPrice = () => {
		if (!token || !token.listed) {
			return 0;
		}

		if (token.baseCurrencyType === BASE_CURRENCY_TYPE.AVAX) {
			return `${Web3.utils.fromWei(token.avaxPrice + '')} AVAX`;
		}
		return `${Web3.utils.fromWei(token.usdPrice + '')} USD`;
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
								<Typography p={1} variant="body1">{getUITokenPrice()}</Typography>
							</Box>
							<Box display="flex" justifyContent='space-between' alignItems='center'>
								<Box display="flex" justifyContent='space-between' alignItems='center'>
									<Typography p={2} variant="h6">Amount:</Typography>
									<Input p={1} sx="width: 50px" inputProps={{min: 0, style: { textAlign: 'center' }}} value={parseFloat(price).toFixed(4)} disabled/>
								</Box>
								<Select sx={{paddingRight: '16px'}} value={asset} onChange={e => {setAsset(e.target.value)}}>
									{
										Object.keys(assets).map((asset, index) => {
											return (
												<MenuItem className={classes.dropdownMenu} value={assets[asset]} index={index}>{asset}</MenuItem>
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
		<BuyCoinProgressDlg open={showCoinDlg} handleOpenDialog={setShowCoinDlg} token={token} amount={parseFloat(price).toFixed(4)}/>,
		<BuyTokenProgressDlg open={showTokenDlg} handleOpenDialog={setShowTokenDlg} token={token} asset={asset} amount={parseFloat(price).toFixed(4)} />
	])
}