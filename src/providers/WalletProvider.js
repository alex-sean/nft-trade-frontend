import React, { useEffect, useState, useRef } from "react";
import Web3 from 'web3'
import WalletConnectProvider from '@walletconnect/web3-provider'
import { WalletContext } from '../contexts/WalletContext'

import { LOCAL_STORAGE_KEY, WALLET_TYPE } from '../common/const'
import { ToastContainer, toast } from "react-toastify";
import { getAssetPrices } from "../common/CommonUtils";

const providerParam = {
    infuraId: 'a7a08bee7e2e427591a17baafee2c515',
    rpc: { 
        43113: 'https://api.avax-test.network/ext/bc/C/rpc'
    },
}

export const WalletProvider = ({ children }) => {
    const [account, setAccount] = useState('');
    const [balance, setBalance] = useState(0);
    const [web3, setWeb3] = useState(null);

    const handleConnect = async (type) => {
        if (type === WALLET_TYPE.METAMASK) {
            if (!window.ethereum) {
                toast('No Ethereum browser extension detected, install MetaMask on desktop or visit from a dApp browser on mobile.');
                return;
            }

            const accounts = await window.ethereum.request({method: 'eth_requestAccounts'})
            localStorage.setItem(LOCAL_STORAGE_KEY.CONNECTED, 1)
            localStorage.setItem(LOCAL_STORAGE_KEY.WALLET_TYPE, WALLET_TYPE.METAMASK);

            if (accounts.length > 0) {
                if (await getCurrentChainId() !== parseInt(process.env.REACT_APP_CHAIN_ID)) {
                    const web3 = new Web3(Web3.givenProvider)
                    try {
                        await web3.currentProvider.request({
                            method: 'wallet_switchEthereumChain',
                            params: [{ chainId: '0x' + Number(process.env.REACT_APP_CHAIN_ID).toString(16) }],
                        })
                    } catch (error) {
                        if (error.code === 4902) {
                            try {
                                await web3.currentProvider.request({
                                    method: 'wallet_addEthereumChain',
                                    params: [
                                        {
                                            chainId: '0x' + Number(process.env.REACT_APP_CHAIN_ID).toString(16),
                                            chainName: process.env.REACT_APP_CHAIN_NAME,
                                            rpcUrls: [ process.env.REACT_APP_RPC_URL ],
                                            nativeCurrency: {
                                                name: 'AVAX',
                                                symbol: 'AVAX',
                                                decimals: 18,
                                            },
                                            blockExplorerUrls: [ process.env.REACT_APP_BLOCKEXPLORER ],
                                        },
                                    ],
                                })
                            } catch (error) {
                                console.log(error)
                            }
                        } else {
                            localStorage.setItem(LOCAL_STORAGE_KEY.CONNECTED, 0)
                            localStorage.setItem(LOCAL_STORAGE_KEY.WALLET_TYPE, 0)
                        }
                    }
                }

                if (await getCurrentChainId() === parseInt(process.env.REACT_APP_CHAIN_ID)) {
                    const account = await getCurrentWallet();
                    setAccount(!account? '': account);
                }
            }
        } else {
            const provider = new WalletConnectProvider(providerParam)
            const walletConnectInfo = localStorage.getItem(LOCAL_STORAGE_KEY.WALLET_CONNECT)
            if (walletConnectInfo && walletConnectInfo.chainId !== parseInt(process.env.REACT_APP_CHAIN_ID, 10)) {
                localStorage.setItem(LOCAL_STORAGE_KEY.WALLET_CONNECT, '')
                localStorage.setItem(LOCAL_STORAGE_KEY.WALLET_TYPE, 0)
                localStorage.setItem(LOCAL_STORAGE_KEY.CONNECTED, 0)
            }

            provider.onConnect(async () => {
                localStorage.setItem(LOCAL_STORAGE_KEY.WALLET_TYPE, WALLET_TYPE.WALLETCONNECT)
                localStorage.setItem(LOCAL_STORAGE_KEY.CONNECTED, 1)
                document.location.reload()
            })

            provider.on('disconnect', (code, reason) => {
                document.location.reload()
            })

            provider.on('error', (code, reason) => {
                console.log(code)
            })

            //  Enable session (triggers QR Code modal)
            provider.enable()
            .then(accounts => accounts[0])
            .catch((error) => {
                console.log(error)
            })
        }
    }

    const getCurrentChainId = async () => {
        const walletType = parseInt(localStorage.getItem(LOCAL_STORAGE_KEY.WALLET_TYPE))
    
        if (walletType === null) return null
    
        if (walletType === WALLET_TYPE.METAMASK) {
            return parseInt(Web3.givenProvider.chainId, 16)
        } else if (walletType === WALLET_TYPE.WALLETCONNECT) {
            let provider = await getCurrentProvider()
            const chainId = await (new Web3(provider)).eth.net.getId()
            return chainId
        }
    
        return null
    }

    const getCurrentProvider = async () => {
        const walletType = parseInt(localStorage.getItem(LOCAL_STORAGE_KEY.WALLET_TYPE))
        if (walletType === null) return null
    
        if (
            localStorage.getItem(LOCAL_STORAGE_KEY.CONNECTED) === null || 
            localStorage.getItem(LOCAL_STORAGE_KEY.CONNECTED) === 0
        ) {
            return null
        }
    
        if (walletType === WALLET_TYPE.METAMASK) {
            return Web3.givenProvider
        } else if (walletType === WALLET_TYPE.WALLETCONNECT) {
            const provider = new WalletConnectProvider(providerParam)
    
            provider.on('disconnect', () => {
                localStorage.setItem(LOCAL_STORAGE_KEY.CONNECTED, 0)
                localStorage.setItem(LOCAL_STORAGE_KEY.WALLET_TYPE, WALLET_TYPE.NONE)
                document.location.reload()
            })
    
            provider.on('error', (code) => {
                console.log(code)
            })
        
            await provider.enable()
        
            return provider
        }
    }

    const getCurrentWallet = async () => {
        const walletType = parseInt(localStorage.getItem(LOCAL_STORAGE_KEY.WALLET_TYPE))
        const connected = parseInt(localStorage.getItem(LOCAL_STORAGE_KEY.CONNECTED))
    
        if (walletType === null) return null
        if (connected === null || connected === 0) return null
    
        if (walletType === WALLET_TYPE.METAMASK) {
        if (
            parseInt(process.env.REACT_APP_CHAIN_ID, 10) !== await getCurrentChainId()
        ) {
            return null
        }
    
        const accounts = await new Web3(Web3.givenProvider).eth.getAccounts()
            return Web3.utils.toChecksumAddress(accounts[0])
        } else if (walletType === WALLET_TYPE.WALLETCONNECT) {
            console.log(parseInt(process.env.REACT_APP_CHAIN_ID, 10));
            console.log(await getCurrentChainId());
            if (
                parseInt(process.env.REACT_APP_CHAIN_ID, 10) !== await getCurrentChainId()
            ) {
                return null
            }

            var provider = await getCurrentProvider()
            const accounts = await (new Web3(provider)).eth.getAccounts();
            if (accounts.length === 0) return null;
            return accounts[0];
        }
    
        return null
    }

    useEffect(() => {
        const initBalanceByAccount = async () => {
            if (account === '') return;
    
            web3.eth.getBalance(account)
            .then((balance) => {
                setBalance(parseFloat(web3.utils.fromWei(balance + '')));
            })
            .catch((err) => {
                console.log(err);
            })
        }

        initBalanceByAccount();
    }, [account, web3])

    useEffect(() => {
        const initWeb3 = async () => {
            const web3 = new Web3(await getCurrentProvider());
            setWeb3(web3);
        }

        initWeb3();

        const connected = localStorage.getItem(LOCAL_STORAGE_KEY.CONNECTED);
        if (parseInt(connected)) {
            const walletType = localStorage.getItem(LOCAL_STORAGE_KEY.WALLET_TYPE);
            if (walletType) {
                handleConnect(parseInt(walletType));
            }
        }
    }, []);

    const handleDisconnect = () => {
        localStorage.setItem(LOCAL_STORAGE_KEY.CONNECTED, 0)
        localStorage.setItem(LOCAL_STORAGE_KEY.WALLET_TYPE, WALLET_TYPE.NONE)
        localStorage.setItem(LOCAL_STORAGE_KEY.WALLET_CONNECT, '')
        setAccount('')
    }

    useEffect(() => {
        const initAccount = async () => {
            const account = await getCurrentWallet();
            setAccount(account? account: '');   
        }

        initAccount();
    }, [])

    const refreshBalance = async() => {
        if (account === '') return;

        const web3 = new Web3(await getCurrentProvider());
        setWeb3(web3);

        web3.eth.getBalance(account)
        .then((balance) => {
            setBalance(parseFloat(web3.utils.fromWei(balance + '')));
        })
        .catch((err) => {
            console.log(err);
        })
    }

    useEffect(() => {
        if (!window.ethereum) {
            return;
        }
        
        window.ethereum.on('chainChanged', refreshAccount);
        window.ethereum.on('accountsChanged', refreshAccount);
    }, [window.ethereum])

    const refreshAccount = async () => {
        const account = await getCurrentWallet();
        setAccount(account? account: '');
    }

    const isConnected = () => {
        const connected = localStorage.getItem(LOCAL_STORAGE_KEY.CONNECTED);
        if (parseInt(connected)) {
            const walletType = localStorage.getItem(LOCAL_STORAGE_KEY.WALLET_TYPE);
            if (walletType) {
                return true;
            }
        }
        return false;
    }

    return  (
        <WalletContext.Provider value={{
            web3,
            account,
            balance,
            handleConnect,
            handleDisconnect,
            refreshBalance,
            isConnected
        }}>
            {children}
        </WalletContext.Provider>
    )
}