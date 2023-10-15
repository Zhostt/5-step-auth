import {AxiosResponse} from 'axios'
import router from './routes'

// Переход по пути в случае успешного запроса, переход на страницу ошибку в случае неуспеха
export const goToNextPage = (response:AxiosResponse, path:string):void => {
    if (response.data.success){
        router.push(path)
    } else {
        router.push('/error')
    }
}

// Функция для кнопки Назад - возврат на предыдущую страницу
export const goToPreviousPage = () => {
    router.go(-1)
}