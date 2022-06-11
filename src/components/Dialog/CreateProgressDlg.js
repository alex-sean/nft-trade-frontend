import React from 'react';
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

export default function CreateProgressDlg({ open, handleClose }) {
    const classes = useStyles();

    return (
        <BootstrapDialog
            onClose={handleClose}
            aria-labelledby="customized-dialog-title"
            open={open}
        >
            <BootstrapDialogTitle 
                id="customized-dialog-title" 
                onClose={handleClose} 
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
                    />
                </div>
            </DialogContent>
        </BootstrapDialog>
    )
}