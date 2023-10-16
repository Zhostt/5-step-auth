import {defineStore} from 'pinia'
import _ from 'lodash'
import {goToNextPage} from '../router/routerFunctions'
import {post} from '../utils/requests'

export type inputData = {
    surname: string,
    name: string,
    patronym: string,
    birthday: string,
    country: string,
    email: string,
};

const useAuthStore = defineStore('auth', {
    // Состояние для сохранения данных при переходе между страницами 
    // + для понимания, отправлять запрос вновь или нет
    state: () => ({
        personInputData: {
            surname: '',
            name: '',
            patronym: '',
            birthday: '',
            country: '',
            email: '',
        } as inputData,
        authConfirm: false,
        conditionsAccepted: false,
        checkFinished: false,
    }),

    getters: {
        // геттер состояния инпутов личных данных (1 страница)
        getPersonInputData: (state) => state.personInputData,
    },

    actions: {
        // Сохранение данных состояния инпутов в общее состояние
        setPersonInputData(inputs: inputData) {
            this.personInputData = inputs;
        },
        // Проверка, изменилось ли состояние инпутов. По ней решаем, отправлять запрос или нет
        inputsChanged(inputs:inputData) {
            return !(_.isEqual(inputs, this.personInputData))
        },
        // Переключение значения "Посещено-Подтверждено" для простых страниц
        confirmPage(stateKey:string) {
            console.log('Confirmation', this[stateKey])
            if (typeofthis[stateKey] === boolean){
                this[stateKey] = true;
            };
        },
        // Простой сабмит где надо жать кнопку "ОК", без инпутов. Однотипный для большинства страниц
        simpleSubmit(pathToNext:string, data:object={}) {
            post(data)
            .then((response) => {
                goToNextPage(response, pathToNext);
            })
        }
    },
    })

export default useAuthStore;