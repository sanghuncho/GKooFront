 /* production build : npm run build, changing server-url in keycloak.json */
export const isDevBuild =  false //false == Production, 

const KEYCLOAK_URL_DEV = 'http://localhost:8080/auth'
const KEYCLOAK_URL_PROD = 'https://www.gkoo.co.kr/auth'
export const KEYCLOAK_URL = isDevBuild ?  KEYCLOAK_URL_DEV : KEYCLOAK_URL_PROD


const BACKEND_URL_DEV = 'http://localhost:8889/gkoo'
const BACKEND_URL_PROD = 'https://www.gkoo.co.kr/gkoo'
export const BACKEND_URL = isDevBuild ? BACKEND_URL_DEV : BACKEND_URL_PROD


const OPEN_BACKEND_URL_DEV = 'http://localhost:8888/gkooOpenApi'
const OPEN_BACKEND_URL_PROD = 'https://www.gkoo.co.kr/gkooOpenApi'
export const OPEN_BACKEND_URL = isDevBuild ? OPEN_BACKEND_URL_DEV : OPEN_BACKEND_URL_PROD

const INITIAL_PAGE_URL_DEV = 'http://localhost:3000/'
const INITIAL_PAGE_URL_PROD = 'https://gkoo.co.kr/'

const KEYCLOAK_ACCOUNT_DEV = KEYCLOAK_URL_DEV + '/realms/gkoo/account'
const KEYCLOAK_ACCOUNT_PROD = 'http://security.gkoo.co.kr/auth/realms/gkoo/account'
export const KEYCLOAK_USER_ACCOUNT = isDevBuild ? KEYCLOAK_ACCOUNT_DEV : KEYCLOAK_ACCOUNT_PROD

export const INITIAL_PAGE_URL = isDevBuild ? INITIAL_PAGE_URL_DEV : INITIAL_PAGE_URL_PROD

//배송대행 주소 안내 동기화
export var deliveryMapGer = new Map();
deliveryMapGer.set("company", "ilogexpress")
deliveryMapGer.set("street", "Richard-Wagner-Strasse 12")
deliveryMapGer.set("plz", "65830")
deliveryMapGer.set("city", "Kriftel")
deliveryMapGer.set("federal_state", "Hessen")
deliveryMapGer.set("land", "Deutschland")