import FormData from 'form-data';
import axios from 'axios';

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

        return res.data.data;
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
    let params = new FormData();
    params.append('collection', collection);
    params.append('supply', supply);

    return await get(`/sync/mint?collection=${collection}&supply=${supply}`);
}