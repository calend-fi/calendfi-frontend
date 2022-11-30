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
    // 添加请求拦截器
    instance.interceptors.request.use(function(config) {
        // 在发送请求之前做些什么
        config.headers['Content-type'] = 'application/json';
        config.headers['accessToken'] = localStorage.getItem("accessToken");
        return config;
    }, function(error) {
        // 对请求错误做些什么
        return Promise.reject(error);
    });
    // 添加响应拦截器
    instance.interceptors.response.use(function(response) {
        // 对响应数据做点什么
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
        // 对响应错误做点什么
        Notification.error({
            title: "Error",
            message: 'Network Error',
        });
        return Promise.reject(error);
    });

    return instance;
}