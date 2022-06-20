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
import PrimaryButton from '../components/Button/PrimaryButton';
import useStyles from '../styles/styles';
import { Divider, Grid } from '@mui/material';
import { Avatar } from '@mui/material';
import ProgressButton from '../components/Button/ProgressButton';
import { PROGRESS_BTN_STATUS } from '../common/const';
import { uploadToken, checkMintSyncStatus } from '../adapters/backend';
import { useLoadingContext } from '../hooks/useLoadingContext';
import { toast } from 'react-toastify';
import { useWalletContext } from '../hooks/useWalletContext';
import ERC721 from '../contracts/NFT.json';
import { getGas } from '../common/Web3Utils';
import { snooze } from '../common/CommonUtils';

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

const items = [
    {
        title: 'title',
        value: 'value',
    },
    {
        title: 'title',
        value: 'value',
    },
    {
        title: 'title',
        value: 'value',
    },
    {
        title: 'title',
        value: 'value',
    },
    {
        title: 'title',
        value: 'value',
    },
]

export default function CreateProgressDlg({
    open,
    handleOpenDialog,
    token,
    name,
    externalLink,
    supply,
    properties,
    levels,
    stars,
    collection,
    description,
    unlock,
    isExplicit
}) {
    const classes = useStyles();

    const [uploadButtonStatus, setUploadButtonStatus] = useState(PROGRESS_BTN_STATUS.PROCESSING);
    const [deployButtonStatus, setDeployButtonStatus] = useState(PROGRESS_BTN_STATUS.NOT_PROCESSED);
    const [mintButtonStatus, setMintButtonStatus] = useState(PROGRESS_BTN_STATUS.NOT_PROCESSED);
    const [tokenURL, setTokenURL] = useState('');
    const [contractAddress, setContractAddress] = useState('');

    const { setLoading } = useLoadingContext();
    const { web3, account } = useWalletContext();

    const handleUpload = async () => {
        setLoading(true);

        try {
            let tokenInfo = await uploadToken(token);
            if (!tokenInfo) {
                throw new Error('Uploading token failed.');
            }
            setTokenURL(tokenInfo.tokenURL);
            toast('Uploading token successed.');
        } catch (err) {
            console.log(err);
            setLoading(false);
            toast('Uploading token failed.');
            return;
        }

        setLoading(false);

        setUploadButtonStatus(PROGRESS_BTN_STATUS.PROCESSED);
        setDeployButtonStatus(PROGRESS_BTN_STATUS.PROCESSING);
    }

    const composeMetaData = () => {
        let tmpProperties = [];
        properties.forEach((property) => {
            if (!(property.name === '' && property.value === '')) {
                tmpProperties.push(property);
            }
        })

        let tmpLevels = [];
        levels.forEach((level) => {
            if (!(level.name === '' || level.totalValue === 0)) {
                tmpLevels.push(level);
            }
        })

        let tmpStars = [];
        stars.forEach((star) => {
            if (!(star.name === '' || star.totalValue === 0)) {
                tmpStars.push(star);
            }
        })

        let metadata = {
            name: name,
            symbol: name.toUpperCase(),
            imgURL: tokenURL,
            description: description,
            category: collection,
            properties: tmpProperties,
            levels: tmpLevels,
            stars: tmpStars,
            unlock: unlock,
            isExplicit: isExplicit
        };

        if (externalLink) {
            metadata.externalLink = externalLink;
        }

        return metadata;
    }

    const handleDeploy = async () => {
        setLoading(true);

        const NFT = new web3.eth.Contract(ERC721.abi);

        const metadata = composeMetaData();

        let NFTTx = NFT.deploy({
            data: '0x' + ERC721.bytecode,
            arguments: [name, name.toUpperCase(), process.env.REACT_APP_CONTRACT_EXCHANGE, metadata],
        });

        const gas = await getGas(NFTTx, {from: account});
        const gasPrice = await web3.eth.getGasPrice();

        try {
            const txHash = await NFTTx.send({
                from: account,
                gas: gas,
                gasPrice: web3.utils.toWei(gasPrice + '', 'gwei')
            });

            setContractAddress(txHash);

            toast('Deploying token successed.');
        } catch (err) {
            console.log(err);
            toast('Deploying token failed.');
            setLoading(false);
            return;
        }

        setLoading(false);

        setDeployButtonStatus(PROGRESS_BTN_STATUS.PROCESSED);
        setMintButtonStatus(PROGRESS_BTN_STATUS.PROCESSING);
    }

    const handleMint = async () => {
        setLoading(true);

        const NFT = new web3.eth.Contract(ERC721.abi, contractAddress);

        try {
            await NFT.methods.mintAll(supply).send();

            while (true) {
                let result = await checkMintSyncStatus(contractAddress, supply);
                if (!result) {
                    throw new Error('Minting failed.');
                }

                if (result.status) {
                    break;
                }

                await snooze(100);
            }
        } catch (err) {
            console.log(err);
            toast('Minting failed.');
            setLoading(false);
            return;
        }

        document.location.href="/account"
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
                    Create a new collection
                </Typography>
            </BootstrapDialogTitle>
            <DialogContent dividers sx={{padding: '30px'}}>
                <div style={{marginBottom: '10px'}}>
                    <Grid container spacing={2}>
                        <Grid item md={3}>
                            <Avatar src="images/wallets/metamask.svg" 
                                sx={{width: '72px', height: 'auto', border: 'solid 1px lightgray', background: '#fff'}}>
                            </Avatar>
                        </Grid>
                        <Grid item md={9} className={classes.modalProgressContent}>
                            <Typography variant='h5'>
                                Upload
                            </Typography>
                            <Typography>
                                Upload metadatas onto the server.
                            </Typography>
                        </Grid>
                    </Grid>
                    <ProgressButton
                        text="Upload"
                        status={uploadButtonStatus}
                        onClick={handleUpload}
                    />
                    <Divider/>
                </div>
                
                <div style={{marginBottom: '10px'}}>
                    <Grid container spacing={2}>
                        <Grid item md={3}>
                            <Avatar src="images/wallets/metamask.svg" 
                                sx={{width: '72px', height: 'auto', border: 'solid 1px lightgray', background: '#fff'}}>
                            </Avatar>
                        </Grid>
                        <Grid item md={9} className={classes.modalProgressContent}>
                            <Typography variant='h5'>
                                Deploy
                            </Typography>
                            <Typography>
                                Deploy the smart contract for the collection.
                            </Typography>
                        </Grid>
                    </Grid>
                    <ProgressButton
                        text="Upload"
                        status={deployButtonStatus}
                        onClick={handleDeploy}
                    />
                    <Divider/>
                </div>

                <div style={{marginBottom: '10px'}}>
                    <Grid container spacing={2}>
                        <Grid item md={3}>
                            <Avatar src="images/wallets/metamask.svg" 
                                sx={{width: '72px', height: 'auto', border: 'solid 1px lightgray', background: '#fff'}}>
                            </Avatar>
                        </Grid>
                        <Grid item md={9} className={classes.modalProgressContent}>
                            <Typography variant='h5'>
                                Mint
                            </Typography>
                            <Typography>
                                Mint all tokens.
                            </Typography>
                        </Grid>
                    </Grid>
                    <ProgressButton
                        text="Upload"
                        status={mintButtonStatus}
                        onClick={handleMint}
                    />
                </div>
            </DialogContent>
        </BootstrapDialog>
    )
}