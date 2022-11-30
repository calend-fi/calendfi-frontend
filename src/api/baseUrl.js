const host = window.location.host;

let api = ''
if (host.indexOf('localhost') !== -1) {
    api = 'localhost'
} else {
    api = 'prod'
}
const httpUrl = {
    localhost: 'http://18.222.137.245:9080',
    prod: 'https://api.encent.io/',
}

const baseUrl = httpUrl[api]
export default baseUrl