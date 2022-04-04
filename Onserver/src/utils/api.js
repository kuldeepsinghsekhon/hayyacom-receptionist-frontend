import axios from 'axios';
import qs from 'query-string';

export function logOut() {
    if (window.refreshTokenInterval) {
        clearInterval(window.refreshTokenInterval)
        window.refreshTokenInterval = null
    }
    if (window.refreshDataInterval) {
        clearInterval(window.refreshDataInterval)
        window.refreshDataInterval = null
    }
}

export const checkUserAuth = () => localStorage.getItem('login user')

export function getHeaders() {
    let token = localStorage.getItem('token');
    
    const headers = {
        "Access-Control-Allow-Origin": "*",
        'Authorization': `Bearer ${token}` || '',
        'Content-Type': 'application/json',
    }
    return headers
}

export function apiReq(endPoint, data, method, headers, requestOptions = {}, shouldRefreshToken = true) {
    return new Promise((resolve, reject) => {
        headers = {
            ...getHeaders(),
            ...headers,
        }
        if (method === 'get' || method === 'delete') {
            data = {
                ...requestOptions,
                params: data,
                headers,
                data: {},
            }
            data.paramsSerializer = params => qs.stringify(params, { arrayFormat: 'repeat' })
        }
        axios[method](endPoint, data, { headers })
            .then((result) => {
                const { data } = result
                if (data.status === false) {
                    return reject(data)
                }
                return resolve(data)
            })
            .catch(error => {
                return reject(error)
            })
    })
}
export function apiGet(endPoint, data, headers = {}, requestOptions) {
    return apiReq(endPoint, data, 'get', headers, requestOptions)
}
export function apiPost(endPoint, data, headers = {}, requestOptions) {
    return apiReq(endPoint, data, 'post', headers, requestOptions)
}
export function apiPatch(endPoint, data, headers = {}, requestOptions) {
    return apiReq(endPoint, data, 'patch', headers, requestOptions)
}
export function apiPut(endPoint, data, headers = {}, requestOptions) {
    return apiReq(endPoint, data, 'put', headers, requestOptions)
}
export function apiDelete(endPoint, data, headers = {}, requestOptions) {
    return apiReq(endPoint, data, 'delete', headers, requestOptions)
}