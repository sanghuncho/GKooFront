export const isDevBuild =  true //false == Production, production build : npm run build

const KEYCLOAK_URL_DEV = 'http://localhost:8080/auth'
const KEYCLOAK_URL_PROD = 'https://www.gkoo.co.kr/auth'
export const KEYCLOAK_URL = isDevBuild ?  KEYCLOAK_URL_DEV : KEYCLOAK_URL_PROD


const BACKEND_URL_DEV = 'http://localhost:8889/gkoo'
const BACKEND_URL_PROD = 'https://www.gkoo.co.kr/gkoo'
export const BACKEND_URL = isDevBuild ? BACKEND_URL_DEV : BACKEND_URL_PROD


const OPEN_BACKEND_URL_DEV = 'http://localhost:8888/gkooOpenApi'
const OPEN_BACKEND_URL_PROD = 'https://gkoo.co.kr/gkooOpenApi'
export const OPEN_BACKEND_URL = isDevBuild ? OPEN_BACKEND_URL_DEV : OPEN_BACKEND_URL_PROD

const INITIAL_PAGE_URL_DEV = 'http://localhost:3000/'
const INITIAL_PAGE_URL_PROD = 'https://gkoo.co.kr/'
export const INITIAL_PAGE_URL = isDevBuild ? INITIAL_PAGE_URL_DEV : INITIAL_PAGE_URL_PROD
