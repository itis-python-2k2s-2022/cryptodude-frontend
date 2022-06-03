import request from "./api";

export async function getAllExchanges() {
  const response = await request.get("/exchanges/");
  return response.data;
}

export async function getAllCurrencies() {
  const response = await request.get("/crypto/");
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

export async function getPrices(currency = 'all', exchange = 'all') {
  const now = new Date();
  const yesterday = new Date();
  yesterday.setDate(now.getDate() - 1);
  const response = await request.get(`/crypto_api/price_history?exchange=${exchange}&currency=${currency}&start_time=${yesterday.toISOString()}&end_time=${now.toISOString()}`);
  return response.data;
}
