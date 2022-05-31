import request from "./api";

export async function getExchangeSubs() {
    try {
        const response = await request.get('/users/me/exchange_subscriptions');
        return response.data;
    } catch (e) {
        console.log(e);
        return [];
    }
}

export async function getCryptoSubs() {
    try {
        const response = await request.get('/users/me/crypto_subscriptions');
        return response.data;
    } catch (e) {
        console.log(e);
        return [];
    }
}

