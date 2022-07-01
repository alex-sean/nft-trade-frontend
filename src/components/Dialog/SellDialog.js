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
import SellProgressDlg from './SellProgressDlg';
import { LIST_TYPE } from '../../common/const';
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
						</Box>
					</Grid>
					<Divider orientation="vertical" flexItem />
					<Grid item xs p={3}>
						<ImageCheckButton imgUrl = 'images/avatars/avatar_1.jpg' text='Token1' />
						<ImageCheckButton imgUrl = 'images/avatars/avatar_2.jpg' text='Token2' />
						<ImageCheckButton imgUrl = 'images/avatars/avatar_3.jpg' text='Token3' />
						<ImageCheckButton imgUrl = 'images/avatars/avatar_4.jpg' text='Token4' />
						<ImageCheckButton imgUrl = 'images/avatars/avatar_5.jpg' text='Token5' />
						<ImageCheckButton imgUrl = 'images/avatars/avatar_6.jpg' text='Token6' />
					</Grid>
				</Grid>
			</DialogContent>
			<DialogActions sx={{display:'flex', justifyContent: 'center'}} className={classes.paperBackground}>
				<PrimaryButton text='SELL' onClick={() => setShowSellProgressDlg(true)}/>
			</DialogActions>
		</Dialog>,
		<SellProgressDlg 
			open={showSellProgressDlg}
			handleOpenDialog={setShowSellProgressDlg}
			token={token}
			usdPrice={price}
			assets={['0x5509122913a941960a434200213c999b515b50e4']}
			isStableCoin={isStableCoin}
			auctionEndTime={auctionEndTime}
			sellType={listType}
		/>
	])
}