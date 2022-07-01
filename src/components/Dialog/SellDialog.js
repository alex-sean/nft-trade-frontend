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
import { LIST_TYPE, ASSETS } from '../../common/const';
import ImageCheckButton from '../Button/ImageCheckButton'

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

export default function SellDialog(props){
	const { open, setOpen, token, serviceFee } = props
	const [listType, setListType] = useState(0);
	const [price, setPrice] = useState(LIST_TYPE.FIXED_PRICE);
	const [servicePrice, setServicePrice] = useState(0);
	const [showSellProgressDlg, setShowSellProgressDlg] = useState(false);
	const [isStableCoin, setIsStableCoin] = useState(true);
	const [auctionEndTime, setAuctionEndTime] = useState(0);
	const [expired, setExpired] = useState(false);
	const [assets, setAssets] = useState([]);

	const [avaxChecked, setAvaxChecked] = useState(false);

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

	return ([
		<Dialog
			key="1"
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
								<Select sx={{paddingRight: '16px'}}  defaultValue={LIST_TYPE.FIXED_PRICE} value={listType} onChange={e => {setListType(e.target.value)}}>
              						<MenuItem value={LIST_TYPE.AUCTION}>Auction</MenuItem>
              						<MenuItem value={LIST_TYPE.FIXED_PRICE}>Fixed Price</MenuItem>
								</Select>
							</Box>
							
							{ listType == LIST_TYPE.AUCTION && (
								<Box display="flex" justifyContent='space-between' alignItems='center'>
									<Typography p={1} variant="h6">End date:</Typography>
									<input type="date"
										style={{height: '40px', fontSize: 'large', fontWeight: '700', border: '1px solid #bbb', borderRadius: '4px', padding: '4px'}} />
								</Box>
							)}
						</Box>
					</Grid>
					<Divider orientation="vertical" flexItem />
					<Grid item xs p={3}>
						<Box display='flex' justifyContent='space-evenly'>
							<ImageCheckButton imgUrl = '../../images/chains/AVAX.png' text='AVAX' content='Native' onChange={handleAssetChecked} disabled={!avaxChecked}/>
							<ImageCheckButton imgUrl = '../../images/chains/AVAX.png' text='WAVAX' content={ASSETS.AVAX} onChange={handleAssetChecked}/>
							<ImageCheckButton imgUrl = '../../images/chains/USDT.png' text='USDT' content={ASSETS.USDT} onChange={handleAssetChecked}/>
						</Box>
						<Box m={2} display='flex' justifyContent='space-evenly'>
							<ImageCheckButton imgUrl = '../../images/chains/USDT.png' text='TEST' content={ASSETS.TEST} onChange={handleAssetChecked}/>
						</Box>
					</Grid>
				</Grid>
			</DialogContent>
			<DialogActions sx={{display:'flex', justifyContent: 'center'}} className={classes.paperBackground}>
				<PrimaryButton text='SELL' onClick={() => setShowSellProgressDlg(true)}/>
			</DialogActions>
		</Dialog>,
		<SellProgressDlg 
			key='progressDlg'
			open={showSellProgressDlg}
			handleOpenDialog={setShowSellProgressDlg}
			token={token}
			usdPrice={price}
			assets={assets}
			isStableCoin={isStableCoin}
			auctionEndTime={auctionEndTime}
			sellType={listType}
		/>
	])
}