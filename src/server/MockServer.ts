import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import {checkRequest} from '../utils/requests'

const mock = new MockAdapter(axios);

// Мок отправки запроса ПОСТ (отправка формы и тп)
mock.onPost('/request')
    .reply(config => {
    console.log('mock server catched request')

    if (!checkRequest(config)) {
        return [200, { success: false, error: 'Текст ошибки' }];
    };

    return [200, {
        success: true,
        data: {},
    }];
});

// мок запроса ГЕТ (расчеты стоимости с сервера)
mock.onGet('/request')
    .reply(config => {
    console.log('mock server sending data')

    if (!checkRequest(config)) {
        return [200, { success: false, error: 'Текст ошибки' }];
    };

    return [200, {
        success: true,
        conditions: [
            {id: 'debt', name: 'Сумма займа', value: '23000р'},
            {id: 'returnDate', name: 'Дата возврата', value: '25500р'},
            {id: 'fee', name: 'Плата за заём', value: '300р'},
            {id: 'stake', name: 'Ставка', value: '0,9%'},
            {id: 'PSK', name: 'ПСК', value: '30.04.2020'},
        ],
    }];
});


  

export default mock;