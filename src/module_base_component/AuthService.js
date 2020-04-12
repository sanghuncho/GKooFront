import { KEYCLOAK_URL, BACKEND_URL, OPEN_BACKEND_URL, INITIAL_PAGE_URL } from "../Config"

export const keycloakUrlLocal = KEYCLOAK_URL
export const basePort = BACKEND_URL
export const openBasePort = OPEN_BACKEND_URL

export const keycloakConfigLocal = {
  'url': keycloakUrlLocal,
  'realm': 'gkoo',
  'clientId': 'version_0_1_0',  
  "enable-cors": true,
  "scope": "openid"
};

export const headers = {
    'Accept': 'application/json, text/plain',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': "Origin, X-Requested-With, Access-Control-Allow-Headers, Content-Type, Authorization",
    'Allow-Control-Allow-Methods': "GET, POST, OPTIONS",
}

export const openHeaders = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': "Origin, X-Requested-With, Access-Control-Allow-Headers, Content-Type, Authorization",
  'Allow-Control-Allow-Methods': "GET, POST, OPTIONS",
}

export function setTokenHeader(token){
  headers ['Authorization'] = 'Bearer ' + token;
}

export function validToken(token){
  return token === "" ? false : true
}

export function getEmptyPage(){
  return ""
}

export const INITIAL_PAGE = INITIAL_PAGE_URL

export function getUseridKeycloak(keycloak){
  return keycloak.tokenParsed.preferred_username
}