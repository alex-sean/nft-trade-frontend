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
import { checkUnListSyncStatus } from '../../adapters/backend';
import { useLoadingContext } from '../../hooks/useLoadingContext';
import { toast } from 'react-toastify';
import { useWalletContext } from '../../hooks/useWalletContext';
import EXCHANGE from '../../contracts/Exchange.json';
import { snooze } from '../../common/CommonUtils';

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

export default function CancelSellProgressDlg({
    open,
    handleOpenDialog,
    token
}) {
    const classes = useStyles();

    const [cancelSellButtonStatus, setCancelSellButtonStatus] = useState(PROGRESS_BTN_STATUS.PROCESSING);

    const { setLoading } = useLoadingContext();
    const { web3, account } = useWalletContext();

    const handleCancelSell = async () => {
        setLoading(true);

        try {
            const exchange = new web3.eth.Contract(EXCHANGE.abi, process.env.REACT_APP_CONTRACT_EXCHANGE);
            await exchange.methods.cancelSell(token.collectionAddress, token.tokenID).send({ from: account });

            while (true) {
                let result = await checkUnListSyncStatus(
                    token.collectionAddress,
                    token.tokenID,
                    token.owner,
                );
                if (!result) {
                    throw new Error('Checking Cancel sell Sync Status failed.');
                }

                if (result.data.status) {
                    break;
                }

                await snooze(100);
            }

        } catch (err) {
            console.log(err);
            setLoading(false);
            toast('Unlisting token failed.');
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
                    Unlist
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
                                Unlist
                            </Typography>
                            <Typography>
                                Unlist ERC721 token from the market.
                            </Typography>
                        </Grid>
                    </Grid>
                    <ProgressButton
                        text="Unlist"
                        status={cancelSellButtonStatus}
                        onClick={handleCancelSell}
                    />
                </div>
            </DialogContent>
        </BootstrapDialog>
    )
}