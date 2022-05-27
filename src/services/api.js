import axios from "axios";
import { BACKEND_HOST } from "../constants";
import { getToken } from "./auth";
const token = getToken();

const request = axios.create({
  baseURL: BACKEND_HOST,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export default request;
