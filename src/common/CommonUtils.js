import { ASSETS } from './const';
import BEP20Price from '../contracts/BEP20Price.json';

export async function snooze(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export function getAssetName(asset) {
    const assetNames = Object.keys(ASSETS);

    for (let i in assetNames) {
        if (ASSETS[assetNames[i]] === asset) {
            return assetNames[i];
        }
    }

    return 'NULL';
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