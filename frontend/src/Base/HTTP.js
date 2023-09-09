import axios from 'axios';
import { HttpMethod } from '../Constants/HttpMethod';

export const Axios = (function () {

    let instance;

    function createInstance() {
        return axios.create({
            baseURL: process.env.REACT_APP_BASE_URL
        });
    }

    return {
        getInstance: function () {

            if(!instance) {
                instance = createInstance();
            }

            const token = getToken();

            if(token) {
                instance.defaults.headers.common['Authorization'] = getToken();
            }

            instance.all = axios.all;

            return instance;
        }
    }
})();

Axios.getInstance().interceptors.response.use(response => {

    response.ok = response.status >= 200 && response.status < 300;

    return response;
}, async error => {
    const { response: { status } } = error;
    if(status === 404) {
        window.location = '/404'
    }
    else if(status === 500) {
        if(!isLocalhost()) {
            window.location = '/500'
        }
    }
    else if(status === 401) {
        localStorage.removeItem("token");
        window.location = '/401'
    }

    return error.response;
});

export async function request(url, data = [], method = HttpMethod.GET, options = {}) {

    try {
        return await connect(url, data, method, options);
    }
    catch {
        if(!isLocalhost()) {
            window.location = '/500'
        }
    }

}

export async function connect(url, data, method, options) {

    switch (method) {
        case HttpMethod.GET : {
            return await Axios.getInstance().get(url + makeParametersList(data), options);
        }
        case HttpMethod.POST : return Axios.getInstance().post(url, data, options);
        case HttpMethod.PUT : return Axios.getInstance().put(url, data, options);
        case HttpMethod.PATCH : return Axios.getInstance().patch(url, data, options);
        case HttpMethod.DELETE : return Axios.getInstance().delete(url, options);
    }
}

export function makeParametersList(parameters){
    let parametersList = `?`;

    Object.keys(parameters).map((key, index) => (
        parametersList += parameters[key] ? `${key}=${parameters[key]}&` : ''
    ));

    parametersList = parametersList.slice(0, -1);

    return parametersList === '?' ? '' : parametersList;
}

export function getToken() {

    const token = localStorage.getItem("token");

    if(!token) {
        return null;
    }

    return 'Bearer ' + token;
}

function isLocalhost() {
    return window.location.href.includes('localhost')
}