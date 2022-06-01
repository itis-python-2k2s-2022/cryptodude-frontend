import request from "./api";

export async function getAllExchanges() {
    const response = await request.get('/exchanges/');
    return response.data;
}

export async function getAllCurrencies() {
    const response = await request.get('/crypto/');
    return response.data;
}

export async function getExchange(id) {
    const response = await request.get(`/exchanges/${id}`);
    return response.data;
}

export async function getCurrency(id) {
    const response = await request.get(`/crypto/${id}`);
    return response.data;
}
