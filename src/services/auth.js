import request from "./api";
import { CLIENT_ID, FRONTEND_FOR_BACKEND_HOST } from "../constants";

const CALLBACK_URL = `${FRONTEND_FOR_BACKEND_HOST}/oauth_callback`;

export function getOAuthUrl() {
  return `https://accounts.google.com/o/oauth2/v2/auth?scope=https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile&include_granted_scopes=true&response_type=token&redirect_uri=${CALLBACK_URL}&client_id=${CLIENT_ID}`;
}

export function setToken(token) {
  localStorage.setItem("token", token);
}

export function getToken() {
  return localStorage.getItem("token");
}

export function removeToken() {
  localStorage.removeItem("token")
}

export async function retrieveProfile() {
  const response = await request.get("/auth/users/me");
  return response.data;
}

export function hasAccessToRoute(isAuth, route) {
  return (
    route.name !== undefined &&
    ((isAuth === route.meta.userIsAuthenticated && isAuth !== null) ||
      route.meta.userIsAuthenticated === undefined)
  );
}
