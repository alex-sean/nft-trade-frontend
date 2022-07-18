import { ACTIVITY_TYPE, ASSETS } from './const';
import BEP20Price from '../contracts/BEP20Price.json';
import DiscountIcon from '@mui/icons-material/Discount';
import GavelIcon from '@mui/icons-material/Gavel';
import ImportExportIcon from '@mui/icons-material/ImportExport';
import InventoryIcon from '@mui/icons-material/Inventory';
import FavoriteIcon from '@mui/icons-material/Favorite';

export async function snooze(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export function getAssetName(asset) {
    const assetNames = Object.keys(ASSETS);

    if (!asset) {
        return asset;
    }

    for (let i in assetNames) {
        if (ASSETS[assetNames[i]] === asset.toLowerCase()) {
            return assetNames[i];
        }
    }

    return asset;
}

export async function getTokenPrice(web3, asset) {
    try {
        const priceContract = new web3.eth.Contract(BEP20Price.abi, process.env.REACT_APP_PRICE_CONTRACT_EXCHANGE);
        let rate = 0;
        if (asset === 'Native') {
            rate = await priceContract.methods.getAVAXPrice().call();
        } else {
            rate = await priceContract.methods.getTokenPrice(asset).call();
        }
        return rate;
    } catch (err) {
        console.log(err);
    }
}

export async function getAssetPrices(web3) {
    let ret = {};
    try {
        const assetNames = Object.keys(ASSETS);
        for (let i in assetNames) {
            const assetName = assetNames[i];

            ret[assetName] = await getTokenPrice(web3, ASSETS[assetName]);
        }

        ret['Native'] = await getTokenPrice(web3, 'Native');
    } catch (err) {
        console.log(err);
    }

    return ret;
}

export function getUSDPrice(rates, price, asset) {
    if (rates[asset]) {
        return (price * rates[asset] / Math.pow(10, 18)).toFixed(2);
    }

    return 0;
}

export function getPastTimeStamp(days) {
    return Date.now() - 3600 * 24 * days * 1000;
}

export function getActivityEvent(activityType) {
    switch (activityType) {
        case ACTIVITY_TYPE.CREATE:
            return 'Create';
        case ACTIVITY_TYPE.EXCHANGE:
            return 'Sale';
        case ACTIVITY_TYPE.LISTING:
            return 'List';
        case ACTIVITY_TYPE.OFFER:
            return 'Offer';
    }
    return '';
}

export function getActivityIcon(activityType) {
    switch (activityType) {
        case ACTIVITY_TYPE.CREATE:
            return <GavelIcon />;
        case ACTIVITY_TYPE.EXCHANGE:
            return <InventoryIcon />;
        case ACTIVITY_TYPE.LISTING:
            return <DiscountIcon />;
        case ACTIVITY_TYPE.OFFER:
            return <ImportExportIcon />;
        case ACTIVITY_TYPE.LIKE:
            return <FavoriteIcon />;
    }
    return '';
}

export function getTimeStr(dateString) {
    const date = new Date(dateString);

    if (date.getTime() > Date.now() - 60000) {
        return 'a few seconds ago';
    }

    if (date.getTime() > Date.now() - 60000 * 2) {
        return 'a min ago';
    }

    if (date.getTime() > Date.now() - 60000 * 60) {
        return `${Math.floor((Date.now() - date.getTime()) / 60000)} mins ago`;
    }

    if (date.getTime() > Date.now() - 60000 * 60 * 2) {
        return `1 hr ago`;
    }

    if (date.getTime() > Date.now() - 60000 * 60 * 24) {
        return `${Math.floor((Date.now() - date.getTime()) / (60000 * 60))} hrs ago`;
    }

    return formatDate(date);
}

function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
  }
  
export function formatDate(date) {
    return (
      [
        date.getFullYear(),
        padTo2Digits(date.getMonth() + 1),
        padTo2Digits(date.getDate()),
      ].join('-') +
      ' ' +
      [
        padTo2Digits(date.getHours()),
        padTo2Digits(date.getMinutes()),
        padTo2Digits(date.getSeconds()),
      ].join(':')
    );
  }