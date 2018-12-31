export const keycloakUrlLocal = 'http://localhost:8080/auth';
export const keycloakConfigLocal = {
  'url': keycloakUrlLocal,
  'realm': 'gkoo',
  'clientId': 'version_1_0_0',  
  "enable-cors": true,
  "scope": "openid"
};

export const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
}