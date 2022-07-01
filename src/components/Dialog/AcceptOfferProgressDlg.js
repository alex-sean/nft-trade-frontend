import React, {useState} from 'react';
import { styled } from '@mui/material/styles';
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
import { checkAcceptOfferSyncStatus } from '../../adapters/backend';
import { useLoadingContext } from '../../hooks/useLoadingContext';
import { toast } from 'react-toastify';
import { useWalletContext } from '../../hooks/useWalletContext';
import NFT from '../../contracts/NFT.json';
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

export default function AcceptOfferProgressDlg({
    open,
    handleOpenDialog,
    token,
    offer
}) {
    const classes = useStyles();

    const [approveButtonStatus, setApproveButtonStatus] = useState(PROGRESS_BTN_STATUS.PROCESSING);
    const [acceptOfferButtonStatus, setAcceptOfferButtonStatus] = useState(PROGRESS_BTN_STATUS.NOT_PROCESSED);

    const { setLoading } = useLoadingContext();
    const { web3, account } = useWalletContext();

    const handleApprove = async () => {
        setLoading(true);

        try {
            const erc721 = new web3.eth.Contract(NFT.abi, token.collectionAddress);
            await erc721.methods.approve(process.env.REACT_APP_CONTRACT_EXCHANGE, token.tokenID).send({ from: account });

            toast('Approving ERC721 token successed.');
        } catch (err) {
            console.log(err);
            setLoading(false);
            toast('Approving ERC721 token failed.');
            return;
        }

        setLoading(false);

        setApproveButtonStatus(PROGRESS_BTN_STATUS.PROCESSED);
        setAcceptOfferButtonStatus(PROGRESS_BTN_STATUS.PROCESSING);
    }

    const handleAcceptOffer = async () => {
        setLoading(true);

        try {
            const exchange = new web3.eth.Contract(EXCHANGE.abi, process.env.REACT_APP_CONTRACT_EXCHANGE);
            await exchange.methods.acceptOffer(token.collectionAddress, token.tokenID, offer.buyer, offer.asset, offer.amount + '').send({ from: account });

            while (true) {
                let result = await checkAcceptOfferSyncStatus(
                    token.collectionAddress,
                    token.tokenID,
                    token.owner,
                    offer.buyer,
                    offer.asset
                );
                if (!result) {
                    throw new Error('Checking accept offer sync status failed.');
                }

                if (result.data.status) {
                    break;
                }

                await snooze(100);
            }

        } catch (err) {
            console.log(err);
            setLoading(false);
            toast('Accepting offer failed.');
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
                    Accept Offer
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
                                Approve the ERC721 token.
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
                                Accept Offer
                            </Typography>
                            <Typography>
                                Accept offer to sell ERC721 token.
                            </Typography>
                        </Grid>
                    </Grid>
                    <ProgressButton
                        text="Accept"
                        status={acceptOfferButtonStatus}
                        onClick={handleAcceptOffer}
                    />
                </div>
            </DialogContent>
        </BootstrapDialog>
    )
}