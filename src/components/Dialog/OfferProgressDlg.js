import React, {useState} from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import PrimaryButton from '../Button/PrimaryButton';
import useStyles from '../../styles/styles';
import { Divider, Grid } from '@mui/material';
import { Avatar } from '@mui/material';
import ProgressButton from '../Button/ProgressButton';
import { PROGRESS_BTN_STATUS } from '../../common/const';
import { checkOfferSyncStatus } from '../../adapters/backend';
import { useLoadingContext } from '../../hooks/useLoadingContext';
import { toast } from 'react-toastify';
import { useWalletContext } from '../../hooks/useWalletContext';
import ERC20 from '../../contracts/ERC20.json';
import EXCHANGE from '../../contracts/Exchange.json';
import { getGas } from '../../common/Web3Utils';
import { snooze } from '../../common/CommonUtils';
import Web3 from 'web3';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
      padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
      padding: theme.spacing(1),
    },
}));

const BootstrapDialogTitle = (props) => {
    const classes = useStyles();

    const { children, onClose, ...other } = props;

    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
        {children}
        <IconButton
            aria-label="close"
            onClick={onClose}
            className={classes.modalCloseButton}
            >
            <CloseIcon onClick={onClose}/>
        </IconButton>
        </DialogTitle>
    );
};

export default function OfferProgressDlg({
    open,
    handleOpenDialog,
    token,
    offerAmount,
    asset
}) {
    const classes = useStyles();

    const [approveButtonStatus, setApproveButtonStatus] = useState(PROGRESS_BTN_STATUS.PROCESSING);
    const [offerButtonStatus, setOfferButtonStatus] = useState(PROGRESS_BTN_STATUS.NOT_PROCESSED);

    const { setLoading } = useLoadingContext();
    const { web3, account } = useWalletContext();

    const handleApprove = async () => {
        setLoading(true);

        try {
            const erc20 = new web3.eth.Contract(ERC20.abi, asset);
            await erc20.methods.approve(process.env.REACT_APP_CONTRACT_EXCHANGE, Web3.utils.toWei(offerAmount + '')).send({ from: account });

            toast('Approving ERC20 token successed.');
        } catch (err) {
            console.log(err);
            setLoading(false);
            toast('Approving ERC20 token failed.');
            return;
        }

        setLoading(false);

        setApproveButtonStatus(PROGRESS_BTN_STATUS.PROCESSED);
        setOfferButtonStatus(PROGRESS_BTN_STATUS.PROCESSING);
    }

    const handleOffer = async () => {
        setLoading(true);

        try {
            const exchange = new web3.eth.Contract(EXCHANGE.abi, process.env.REACT_APP_CONTRACT_EXCHANGE);
            await exchange.methods.offer(token.owner, token.collectionAddress, token.tokenID, asset, Web3.utils.toWei(offerAmount + '')).send({ from: account });

            while (true) {
                let result = await checkOfferSyncStatus(
                    token.collectionAddress,
                    token.tokenID,
                    token.owner,
                    account,
                    offerAmount,
                    asset
                );
                if (!result) {
                    throw new Error('Minting failed.');
                }

                if (result.data.status) {
                    break;
                }

                await snooze(100);
            }

        } catch (err) {
            console.log(err);
            setLoading(false);
            toast('Offering token failed.');
            return;
        }

        document.location.reload();
    }

    return (
        <BootstrapDialog
            onClose={() => handleOpenDialog(false)}
            aria-labelledby="customized-dialog-title"
            open={open}
        >
            <BootstrapDialogTitle 
                id="customized-dialog-title" 
                onClose={() => handleOpenDialog(false)} 
                sx={{display: 'flex'}}
            >
                <Typography variant='h5' sx={{marginTop: '5px'}}>
                    Offer token
                </Typography>
            </BootstrapDialogTitle>
            <DialogContent dividers sx={{padding: '30px'}}>
                <div style={{marginBottom: '10px'}}>
                    <Grid container spacing={2}>
                        <Grid item md={3}>
                            <Avatar src="../../images/wallets/metamask.svg" 
                                sx={{width: '72px', height: 'auto', border: 'solid 1px lightgray', background: '#fff'}}>
                            </Avatar>
                        </Grid>
                        <Grid item md={9} className={classes.modalProgressContent}>
                            <Typography variant='h5'>
                                Approve
                            </Typography>
                            <Typography>
                                Approve the ERC20 token.
                            </Typography>
                        </Grid>
                    </Grid>
                    <ProgressButton
                        text="Approve"
                        status={approveButtonStatus}
                        onClick={handleApprove}
                    />
                    <Divider/>
                </div>
                
                <div style={{marginBottom: '10px'}}>
                    <Grid container spacing={2}>
                        <Grid item md={3}>
                            <Avatar src="../../images/wallets/metamask.svg" 
                                sx={{width: '72px', height: 'auto', border: 'solid 1px lightgray', background: '#fff'}}>
                            </Avatar>
                        </Grid>
                        <Grid item md={9} className={classes.modalProgressContent}>
                            <Typography variant='h5'>
                                Offer
                            </Typography>
                            <Typography>
                                Offer to ERC721 token with ERC20 token.
                            </Typography>
                        </Grid>
                    </Grid>
                    <ProgressButton
                        text="Offer"
                        status={offerButtonStatus}
                        onClick={handleOffer}
                    />
                </div>
            </DialogContent>
        </BootstrapDialog>
    )
}