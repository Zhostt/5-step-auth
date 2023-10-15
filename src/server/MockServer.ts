import axios, {AxiosRequestConfig} from 'axios';
import MockAdapter from 'axios-mock-adapter';

const mock = new MockAdapter(axios);

mock.onAny('/request')
.reply(config => {
console.log('mock server catched request')
const checkRequest = (request:AxiosRequestConfig):boolean => {
    if (request.headers['Authorization'] === 'Bearer 12345' &&  (request.headers['Content-Type'] === 'application/json')){
        return true;
    }
    return false;
};
if (!checkRequest(config)) {
    return [200, { success: false, error: 'Текст ошибки' }];
};

return [200, {
    success: true,
    data: {},
}];
});


  

export default mock;