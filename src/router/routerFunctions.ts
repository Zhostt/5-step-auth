import {axiosResponse} from 'axios'
import router from './routes'

// Переход по пути в случае успешного запроса, ошибка в случае неуспеха
export const goToNextPage = (response:axiosResponse, path:url):never => {
    if (response.data.success){
        router.push(path)
    } else {
        router.push('/error')
    }
}

// Функция для кнопки Назад - возврат на предыдущую страницу
export const gotToPreviousPage = () => {
    router.go(-1)
}