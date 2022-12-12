import axios from 'axios';

import baseUrl from './baseUrl'


import { Notification } from 'element-ui';

export async function asyncRequest() {
    let instance = axios.create({
        baseURL: baseUrl,
        timeout: 600000,
        headers: {

        }
    });
    instance.interceptors.request.use(function(config) {
        config.headers['Content-type'] = 'application/json';
        config.headers['accessToken'] = localStorage.getItem("accessToken");
        return config;
    }, function(error) {
        return Promise.reject(error);
    });
    instance.interceptors.response.use(function(response) {
        if (response.status === 200) {
            if (response.data.code === '200') {
                return response;
            } else {
                Notification.error({
                    title: "Error",
                    message: response.data.message,
                });
                return response;
            }
        } else {
            Notification.error({
                title: "Error",
                message: 'Network Error',

            });
        }
    }, function(error) {
        Notification.error({
            title: "Error",
            message: 'Network Error',
        });
        return Promise.reject(error);
    });

    return instance;
}