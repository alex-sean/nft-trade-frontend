import { ASSETS } from './const';

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

export async function getTokenPrice(asset) {
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