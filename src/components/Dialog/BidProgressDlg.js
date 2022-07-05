import React, {useState} from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import useStyles from '../../styles/styles';
import { Divider, Grid } from '@mui/material';
import { Avatar } from '@mui/material';
import ProgressButton from '../Button/ProgressButton';
import { PROGRESS_BTN_STATUS } from '../../common/const';
import { checkBidSyncStatus, checkBuySyncStatus } from '../../adapters/backend';
import { useLoadingContext } from '../../hooks/useLoadingContext';
import { toast } from 'react-toastify';
import { useWalletContext } from '../../hooks/useWalletContext';
import ERC20 from '../../contracts/ERC20.json';
import EXCHANGE from '../../contracts/Exchange.json';
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

export default function BidProgressDlg({
    open,
    handleOpenDialog,
    token,
    amount,
    asset
}) {
    const classes = useStyles();

    const [approveButtonStatus, setApproveButtonStatus] = useState(PROGRESS_BTN_STATUS.PROCESSING);
    const [bidButtonStatus, setBidButtonStatus] = useState(PROGRESS_BTN_STATUS.NOT_PROCESSED);

    const { setLoading } = useLoadingContext();
    const { web3, account } = useWalletContext();

    const handleApprove = async () => {
        setLoading(true);

        try {
            const erc20 = new web3.eth.Contract(ERC20.abi, asset);
            await erc20.methods.increaseAllowance(process.env.REACT_APP_CONTRACT_EXCHANGE, Web3.utils.toWei(amount + '')).send({ from: account });

            toast('Approving ERC20 token successed.');
        } catch (err) {
            console.log(err);
            setLoading(false);
            toast('Approving ERC20 token failed.');
            return;
        }

        setLoading(false);

        setApproveButtonStatus(PROGRESS_BTN_STATUS.PROCESSED);
        setBidButtonStatus(PROGRESS_BTN_STATUS.PROCESSING);
    }

    const handleBid = async () => {
        setLoading(true);

        try {
            const exchange = new web3.eth.Contract(EXCHANGE.abi, process.env.REACT_APP_CONTRACT_EXCHANGE);
            await exchange.methods.bid(token.owner, token.collectionAddress, token.tokenID, asset, Web3.utils.toWei(amount + '')).send({ from: account });

            while (true) {    
                let result = await checkBidSyncStatus(
                    token.collectionAddress,
                    token.tokenID,
                    account,
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
            toast('Bid token failed.');
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
                    Bid
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
                                Bid
                            </Typography>
                            <Typography>
                                Join auction with ERC20 token.
                            </Typography>
                        </Grid>
                    </Grid>
                    <ProgressButton
                        text="Bid"
                        status={bidButtonStatus}
                        onClick={handleBid}
                    />
                </div>
            </DialogContent>
        </BootstrapDialog>
    )
}