import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Dialog, DialogActions, DialogContent, DialogTitle,
  Slide,
  useTheme, Divider, Input, Grid, Select, MenuItem, FormControlLabel, Checkbox, TextField,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import PrimaryButton from '../Button/PrimaryButton';
import useStyles from '../../styles/styles';
import SellProgressDlg from './SellProgressDlg';
import { LIST_TYPE, ASSETS, BASE_CURRENCY_TYPE } from '../../common/const';
import ImageCheckButton from '../Button/ImageCheckButton'
import { toast } from 'react-toastify';

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

export default function SellDialog(props){
	const { open, setOpen, token, serviceFee } = props
	const [listType, setListType] = useState(LIST_TYPE.FIXED_PRICE);
	const [price, setPrice] = useState(0);
	const [servicePrice, setServicePrice] = useState(0);
	const [showSellProgressDlg, setShowSellProgressDlg] = useState(false);
	const [isStableCoin, setIsStableCoin] = useState(false);
	const [auctionEndTime, setAuctionEndTime] = useState(0);
	const [expired, setExpired] = useState(false);
	const [assets, setAssets] = useState([]);
	const [baseCurrency, setBaseCurrency] = useState(BASE_CURRENCY_TYPE.AVAX);

	const [avaxChecked, setAvaxChecked] = useState(false);

	const classes = useStyles();
	const theme = useTheme()
	const isDark = theme.palette.mode === 'dark'

	const handleClose = () => {
		setOpen(false);
	};

	const reverBaseCurrency = () => {
		if (baseCurrency === BASE_CURRENCY_TYPE.USD) {
			setBaseCurrency(BASE_CURRENCY_TYPE.AVAX);
		} else {
			setBaseCurrency(BASE_CURRENCY_TYPE.USD);
		}
	}

	useEffect(() => {
		if (isNaN(price)) {
			setServicePrice(0);
		} else {
			setServicePrice(parseFloat(price) * parseInt(serviceFee) / 10000);
		}
	}, [price])

	const handleAssetChecked = (checked, asset) => {
		if (checked) {
			if (asset === 'Native') {
				setIsStableCoin(true);
			} else {
				let tmpAssets = [...assets];
				tmpAssets.push(asset);
				setAssets(tmpAssets);
			}
		} else {
			if (asset === 'Native') {
				setIsStableCoin(false);
			} else {
				let tmpAssets = [...assets];
				for (let i in tmpAssets) {
					if (tmpAssets[i] === asset) {
						tmpAssets = tmpAssets.splice(i, 1);
						break;
					}
				}
				setAssets(tmpAssets);
			}
		}
	}

	useEffect(() => {
		if (listType === LIST_TYPE.AUCTION) {
			handleAssetChecked(false, 'Native');
			setAvaxChecked(false);
		} else {
			setAvaxChecked(true);
		}
	}, [listType])

	const handleAuctionTimeChanged = (date) => {
		const ts = parseInt(new Date(date).getTime() / 1000);
		if (ts < Date.now() / 1000) {
			toast('Please select the correct date.');
			return;
		}
		setAuctionEndTime(parseInt(new Date(date).getTime() / 1000));
	}

	const openSellProgressDlg = () => {
		if (isNaN(price)) {
			toast('Please input the correct price.');
			return;
		}

		if (listType === LIST_TYPE.AUCTION && auctionEndTime < Date.now() / 1000) {
			toast('Please input the correct auction time.');
			return;
		}

		if (!assets.length && !isStableCoin) {
			toast('Please select at least one asset.');
			return;
		}

		if (isNaN(price)) {
			toast('Please input correct price.');
			return;
		}

		setShowSellProgressDlg(true);
	}

	const handleListType = e => {
		setListType(e.target.value)
	}

	const getCurrencyName = () => {
		if (baseCurrency === BASE_CURRENCY_TYPE.AVAX) {
			return 'AVAX';
		}
		return 'USD';
	}

	return ([
		<Dialog
			key="1"
			open={open}
			TransitionComponent={Transition}
			keepMounted
			onClose={handleClose}
			aria-describedby="alert-dialog-slide-description"
			>
			<DialogTitle display='flex' justifyContent='center' alignItems='baseline' className={classes.paperBackground}>
				<Typography pt={3}>Base Currency</Typography>
			</DialogTitle>
			<DialogContent dividers className={classes.paperBackground}>
				<Grid container spacing={2} mb={3}>
					<Grid item xs={12} sm={6} >
						<Typography align='left'>Native Token</Typography>
						<Box display='flex' justifyContent='space-evenly'>
							<ImageCheckButton imgUrl = '../../images/chains/AVAX.png' text='' content='Native' handleChange={() => reverBaseCurrency()} isChecked={baseCurrency === BASE_CURRENCY_TYPE.AVAX}/>
						</Box>
						<Typography sx={{border: '1px solid #0f0', borderRadius: '10px', padding: '4px'}}>
							<b>Bull market proof</b>. Pick this if you believe we are in a bull market.
						</Typography>
					</Grid>
					<Grid item xs={12} sm={6}>
						<Typography align='left'>Stable Token</Typography>
						<Box display='flex' justifyContent='space-evenly'>
							<ImageCheckButton imgUrl = '../../images/chains/XTZ.png' text='' content='Stable' handleChange={() => reverBaseCurrency()} isChecked={baseCurrency === BASE_CURRENCY_TYPE.USD}/>
						</Box>
						<Typography sx={{border: '1px solid #f00', borderRadius: '10px', padding: '4px'}}>
							<b>Bear market proof</b>. Pick this if you believe we are in a bear market.
						</Typography>
					</Grid>
				</Grid>
				<Grid container>
					<Grid item xs>
						<Box p={1}>
							<Box display="flex" justifyContent='space-between' alignItems='center'>
								<Typography p={1} variant="h6">TokenName:</Typography>
								<Typography p={1} variant="body1">{token? `${token.name} #${token.tokenID}`: '...'}</Typography>
							</Box>
							<Box display="flex" justifyContent='space-between' alignItems='center'>
								<Typography p={1} variant="h6">Price:</Typography>
								<Input p={1} onChange={(e) => setPrice(e.target.value)}/> {getCurrencyName()}
							</Box>
							<Box display="flex" justifyContent='space-between' alignItems='center'>
								<Typography p={1} variant="h6">ServiceFee:</Typography>
								<Typography p={1} variant="body1">{servicePrice} {getCurrencyName()}</Typography>
							</Box>
							<Box display="flex" justifyContent='space-between' alignItems='center'>
								<Typography p={1} variant="h6">ListType:</Typography>
								<Select sx={{paddingRight: '16px'}}  defaultValue={LIST_TYPE.FIXED_PRICE} value={listType} onChange={handleListType}>
              						<MenuItem className={classes.dropdownMenu} value={LIST_TYPE.AUCTION}>Auction</MenuItem>
              						<MenuItem className={classes.dropdownMenu} value={LIST_TYPE.FIXED_PRICE}>Fixed Price</MenuItem>
								</Select>
							</Box>
							
							{ listType == LIST_TYPE.AUCTION && (
								<Box display="flex" justifyContent='space-between' alignItems='center'>
									<Typography p={1} variant="h6">End date:</Typography>
									<input type="date" onChange={(e) => handleAuctionTimeChanged(e.target.value)}
										style={{height: '40px', fontSize: 'large', fontWeight: '700', border: '1px solid #bbb', borderRadius: '4px', padding: '4px', background: 'transparent', color: `${isDark ? '#fff' : '#000'}`}}/>
								</Box>
							)}
						</Box>
					</Grid>
					<Divider orientation="vertical" flexItem />
					<Grid item xs p={3}>
						<Box display='flex' justifyContent='space-evenly'>
							<ImageCheckButton imgUrl = '../../images/chains/AVAX.png' text='AVAX' content='Native' handleChange={handleAssetChecked} disabled={!avaxChecked}/>
							<ImageCheckButton imgUrl = '../../images/chains/AVAX.png' text='WAVAX' content={ASSETS.AVAX} handleChange={handleAssetChecked}/>
							<ImageCheckButton imgUrl = '../../images/chains/USDT.png' text='USDT' content={ASSETS.USDT} handleChange={handleAssetChecked}/>
						</Box>
						<Box m={2} display='flex' justifyContent='flex-start'>
							<ImageCheckButton imgUrl = '../../images/chains/USDT.png' text='TEST' content={ASSETS.TEST} handleChange={handleAssetChecked}/>
						</Box>
					</Grid>
				</Grid>
			</DialogContent>
			<DialogActions sx={{display:'flex', justifyContent: 'center'}} className={classes.paperBackground}>
				<PrimaryButton text='LIST' onClick={openSellProgressDlg}/>
			</DialogActions>
		</Dialog>,
		<SellProgressDlg 
			key='progressDlg'
			open={showSellProgressDlg}
			handleOpenDialog={setShowSellProgressDlg}
			token={token}
			price={price}
			assets={assets}
			isStableCoin={isStableCoin}
			auctionEndTime={auctionEndTime}
			sellType={listType}
			baseCurrency={baseCurrency}
		/>
	])
}