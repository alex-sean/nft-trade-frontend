import FormData from 'form-data';
import axios from 'axios';
import Utf8 from 'crypto-js/enc-utf8';
import Base64 from 'crypto-js/enc-base64';

const post = async (requestUrl, form) => {
    try {
        const res = await axios.post(process.env.REACT_APP_SERVER_URL + requestUrl, form);
        if (res.data.status !== 200) {
            throw new Error('Server Error!');
        }
        return res.data;
    } catch (err) {
        console.log(err);
        return null;
    }
}

const get = async (requestUrl) => {
    try {
        const res = await axios.get(process.env.REACT_APP_SERVER_URL + requestUrl);
        if (res.data.status !== 200) {
            throw new Error('Server Error!');
        }

        return res.data;
    } catch (err) {
        console.log(err);
        return null;
    }
}

export const getUserInfo = async (address) => {
    return await get(`/user/detail?address=${address}`);
}

export const addUserInfo = async (
    name,
    email,
    description,
    address,
    twitterAccount,
    instagramAccount,
    ownUrl,
    avatar,
    background
) => {
    let params = new FormData();
    params.append('name', name);
    params.append('email', email);
    params.append('description', description);
    params.append('address', address);
    params.append('twitter_account', twitterAccount);
    params.append('instagram_account', instagramAccount);
    params.append('own_url', ownUrl);
    if (avatar) {
        params.append('avatar', avatar, avatar.name);
    }
    if (background) {
        params.append('background', background, background.name);
    }

    return await post('/user/add', params);
}

export const updateUserInfo = async (
    name,
    email,
    description,
    address,
    twitterAccount,
    instagramAccount,
    ownUrl,
    avatar,
    background
) => {
    let params = new FormData();
    params.append('name', name);
    params.append('email', email);
    params.append('description', description);
    params.append('address', address);
    params.append('twitter_account', twitterAccount);
    params.append('instagram_account', instagramAccount);
    params.append('own_url', ownUrl);
    if (avatar) {
        params.append('avatar', avatar, avatar.name);
    }
    if (background) {
        params.append('background', background, background.name);
    }

    return await post('/user/update', params);
}

export const uploadBackground = async (
    address,
    background
) => {
    let params = new FormData();
    params.append('address', address);
    params.append('background', background, background.name);

    return await post('/user/upload/background', params);
}

export const uploadToken = async (token) => {
    let params = new FormData();
    params.append('token', token, token.name);

    return await post('/token/upload', params);
}

export const checkMintSyncStatus = async (collection, supply) => {
    return await get(`/sync/mint?collection=${collection}&supply=${supply}`);
}

export const checkOfferSyncStatus = async (collectionAddress, tokenID, owner, buyer, offerAmount, asset) => {
    return await get(`/sync/offer?collectionAddress=${collectionAddress}&tokenID=${tokenID}&owner=${owner}&buyer=${buyer}&offerAmount=${offerAmount}&asset=${asset}`);
}

export const checkCancelOfferSyncStatus = async (collectionAddress, tokenID, owner, buyer, asset) => {
    return await get(`/sync/cancel_offer?collectionAddress=${collectionAddress}&tokenID=${tokenID}&owner=${owner}&buyer=${buyer}&asset=${asset}`);
}

export const checkAcceptOfferSyncStatus = async (collectionAddress, tokenID, owner, buyer, asset) => {
    return await get(`/sync/accept_offer?collectionAddress=${collectionAddress}&tokenID=${tokenID}&owner=${owner}&buyer=${buyer}&asset=${asset}`);
}

export const checkListSyncStatus = async (collectionAddress, tokenID, owner, listType) => {
    return await get(`/sync/list?collectionAddress=${collectionAddress}&tokenID=${tokenID}&owner=${owner}&listType=${listType}`);
}

export const checkUnListSyncStatus = async (collectionAddress, tokenID, owner) => {
    return await get(`/sync/unlist?collectionAddress=${collectionAddress}&tokenID=${tokenID}&owner=${owner}`);
}

export const checkBuySyncStatus = async (collectionAddress, tokenID, owner) => {
    return await get(`/sync/buy?collectionAddress=${collectionAddress}&tokenID=${tokenID}&owner=${owner}`);
}

export const checkBidSyncStatus = async (collectionAddress, tokenID, buyer, asset) => {
    return await get(`/sync/bid?collectionAddress=${collectionAddress}&tokenID=${tokenID}&buyer=${buyer}&asset=${asset}`);
}

export const checkCancelBidSyncStatus = async (collectionAddress, tokenID, buyer, asset) => {
    return await get(`/sync/cancel_bid?collectionAddress=${collectionAddress}&tokenID=${tokenID}&buyer=${buyer}&asset=${asset}`);
}

export const checkCompleteAuctionSyncStatus = async (collectionAddress, tokenID, buyer) => {
    return await get(`/sync/cancel_bid?collectionAddress=${collectionAddress}&tokenID=${tokenID}&buyer=${buyer}`);
}

export const getHotBidItems = async () => {
    return await get(`/token/hot_bid`);
}

export const likeCollection = async (collectionAddress, address, like) => {
    return await get(`/token/like_collection?collectionAddress=${collectionAddress}&address=${address}&like=${like}`);
}

export const getlikeCollection = async (collectionAddress, address) => {
    return await get(`/token/get_like_collection?collectionAddress=${collectionAddress}&address=${address}`);
}

export const getPopularCollections = async (from) => {
    return await get(`/token/get_popular_collections?from=${from}`);
}

export const getFeaturedCollections = async (category) => {
    return await get(`/token/get_featured_collections?category=${category}`);
}

export const getServiceFee = async () => {
    return await get(`/config/service_fee`);
}

export const getOwnedTokens = async (owner) => {
    return await get(`/token/owned?owner=${owner}`);
}

export const getCreatedTokens = async (deployer) => {
    return await get(`/token/created?deployer=${deployer}`);
}

export const getSaleTokens = async (owner) => {
    return await get(`/token/sale?owner=${owner}`);
}

export const getOwnedCollections = async (owner) => {
    return await get(`/token/owned_collection?owner=${owner}`);
}

export const getCollections = async (category) => {
    return await get(`/token/collection?category=${category}`);
}

export const getCollectionDetail = async (address) => {
    return await get(`/token/collection_detail?address=${address}`);
}

export const getTokensByCollection = async (address) => {
    return await get(`/token/get_by_collection?address=${address}`);
}

export const getTokenDetail = async (collectionAddress, tokenID) => {
    return await get(`/token/detail?collectionAddress=${collectionAddress}&tokenID=${tokenID}`);
}

export const getBlogs = async (limit, offset) => {
    return await get(`/blog/list?limit=${limit}&offset=${offset}`);
}

export const getBlogInfo = async (id) => {
    return await get(`/blog/detail?id=${id}`);
}

export const getPartners = async (limit, offset) => {
    return await get(`/partner/list?limit=${limit}&offset=${offset}`);
}

export const decodeBase64 = code => {
    return Utf8.stringify(Base64.parse(code))
}