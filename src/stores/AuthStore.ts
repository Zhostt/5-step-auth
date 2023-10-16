import {defineStore} from 'pinia'
import _ from 'lodash'
import {goToNextPage, goToNextPageDirectly} from '../router/routerFunctions'
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
        // Отметки подверждения в соотв компонентах
        IdentityConfirm: false,
        ConditionsList: false,
        AwaitCheck: false,
    }),

    getters: {
        // геттер состояния инпутов личных данных (1 страница)
        getPersonInputData: (state) => state.personInputData,
    },

    actions: {
        // Логика для компонента с инпутами
        // Сохранение данных состояния инпутов в общее состояние
        setPersonInputData(inputs: inputData) {
            this.personInputData = inputs;
        },
        // Проверка, изменилось ли состояние инпутов. По ней решаем, отправлять запрос или нет
        inputsChanged(inputs:inputData) {
            return !(_.isEqual(inputs, this.personInputData))
        },

        // Логика для комопонентов с простым сабмитом - "Ок", "Подтверждаю" и тп
        // Переключение значения "Посещено-Подтверждено" по ключу в состоянии
        confirmPage(stateKey:string) {
            if (typeof(this[stateKey]) === 'boolean'){
                this[stateKey] = true;
            };
        },
        // Простой сабмит с отправкой и переход на следующую страницу
        basicSubmit(pathToNext:string, data:object={}) {
            post(data)
            .then((response) => {
                goToNextPage(response, pathToNext);
            })
        },
        // Полный сабмит для простых страниц с проверкой на то, посещались ли они уже
        confirmPageSubmit(stateKey:string, pathToNext:string, data:object={}) {
            // Если страница уже была посещена - просто переходим на следующую без запроса
            if (this[stateKey]) {
                console.log('Simple page already visited. No request neeeded.')
                goToNextPageDirectly(pathToNext);
            } else {
                // Если не посещали ранее
                console.log('Simple page first time confirmed, sending request')
                this.confirmPage(stateKey); // Отмечаем как посещенную
                this.basicSubmit(pathToNext, data) // Отправляем запрос и идем дальше
            }
        },
        // завершение авторизации, обнуление стора
        completeAuth() {
            post()
            .then((res) => {
                goToNextPage(res, '/')
                const store = useAuthStore();
                store.$reset();
            })
        },
        }
    });

export default useAuthStore;