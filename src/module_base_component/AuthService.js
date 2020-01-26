export const keycloakUrlLocal = 'http://localhost:8080/auth';
export const keycloakConfigLocal = {
  'url': keycloakUrlLocal,
  'realm': 'gkoo',
  'clientId': 'version_0_1_0',  
  "enable-cors": true,
  "scope": "openid"
};

export const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
}

export const openHeaders = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'enable-cors':'false'
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

export const basePort = 'http://localhost:8888'
export const openBasePort = 'http://localhost:8889'

export const INITIAL_PAGE = 'http://localhost:3000/'