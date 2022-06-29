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
  