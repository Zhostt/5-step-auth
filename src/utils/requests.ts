import axios, {AxiosRequestConfig} from "axios";

const defaultPath = '/request';
const headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer 12345',
};

// Проверка реквеста на соответствие нашим требованиям к заголовкам
export const checkRequest = (request:AxiosRequestConfig):boolean => {
    if (request.headers['Content-Type'] === headers['Content-Type'] && request.headers['Authorization'] === headers['Authorization']) {
        console.log('request headers correct. Request data: ', request.data)
        return true;
    }
    console.log('Request headers error')
    return false;
};

// функция для ПОСТ (отправка форм например)
export const post = (data:object={}, path:string = defaultPath) => {
    const config = {
        method: 'post',
        url: path,
        data,
        headers,
    };
    return axios(config)
};

// функция для ГЕТ (получаем расчитанные данные с сервера)
export const getData = (data:object={}, path:string = defaultPath) => {
    const config = {
        method: 'get',
        url: path,
        data,
        headers,
    };
    return axios(config)
};