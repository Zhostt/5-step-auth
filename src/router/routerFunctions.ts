import {AxiosResponse} from 'axios'
import router from './routes'

// Переход по пути в случае успешного запроса, переход на страницу ошибки в случае неуспеха
export const goToNextPage = (response:AxiosResponse, path:string):void => {
    if (response.data.success){
        router.push(path)
    } else {
        router.push('/error')
    }
};

// Переход по указанному пути без проверок ответа
export const goToNextPageDirectly = (path:string) => {
    router.push(path)
}

// Функция для кнопки Назад - возврат на предыдущую страницу
export const goToPreviousPage = () => {
    router.go(-1)
};