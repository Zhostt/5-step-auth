import axios from "axios";

const host = window.location.href.host;
const path = '/request';
const headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer 12345',
};

export const post = (data:object) => {
    const config = {
        method: 'post',
        url: path,
        data,
        headers,
    };
    return axios(config)
};