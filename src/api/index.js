import { asyncRequest } from './request.js'

export const getpool = (data) => {
    return new Promise((resolve) => {
        asyncRequest().then((requestInstance) => {
            let params = data
            params = JSON.stringify(params);
            console.log(params);
            requestInstance({
                method: 'GET',
                url: 'encentive/getpool',
                data: params
            }).then((res) => {
                resolve(res.data)
            })
        })
    })
}

export const createpool = (data) => {
    return new Promise((resolve) => {
        asyncRequest().then((requestInstance) => {
            let params = data;
            params = JSON.stringify(params);
            requestInstance({
                method: 'POST',
                url: 'encentive/createpool',
                data: params
            }).then((res) => {
                resolve(res.data)
            })
        })
    })
}