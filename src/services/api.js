import axios from "axios";
// import { UNIENV_HOST } from "../constants"; TODO host in constants
import { getToken } from "./auth";
const token = getToken();

const request = axios.create({
  baseURL: "http://localhost:8000",
  headers: {
    Authorization: `Bearer ${token}`,
    'Content-Type': "multipart/form-data"
  },
});

export default request;
