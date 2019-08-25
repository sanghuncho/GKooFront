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

export const localPort = 'http://localhost:8888'
export const basePort = 'http://localhost:8888'