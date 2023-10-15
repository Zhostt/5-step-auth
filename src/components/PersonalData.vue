<template>
    <div class="login container">
        <header class="form-header">
            <button class="back-button" @click="goToPreviousPage">&lt;</button>
            <h1>Личные данные</h1>
            <div class="progress-bar">Прогресс бар</div>
            <div class="steps">
                <div>Шаг 1 из 5</div>
                <div>Следующий шаг - Паспорт</div>
            </div>
        </header>
        <body>
            <form class="form-container" @submit.prevent="submitHandler(inputs)">
                <div class="inputs-container">
                    <span class="input-block" v-for="input in Object.keys(inputs)" :key="input">
                        <label :for="input" :value="input"></label>
                        <input
                        type="text"
                        :name="input"
                        :id="input"
                        :required="isRequired(input)"
                        :placeholder="placeholders[input]"
                        v-model="inputs[input]" >
                    </span>
                </div>
                <div class="link">
                    <a href="#">Заполнить через госуслуги</a>
                </div>
                <div class="checkbox">
                    <input type="checkbox" required>
                    Даю согласие на <a href="#">обработку личных данных</a> и подписание документов в электронном виде
                </div>
                <hr>
                <input type="submit" value="Продолжить">
            </form>
        </body>
    </div>
</template>

<script lang="ts" setup>
    import {post} from '../utils/requests'
    import mock from '../server/MockServer'
    import {dateFormatChecker, emailFormatChecker, } from '../utils/utils'
    import {goToNextPage, goToPreviousPage} from '../router/routerFunctions'

    type inputData = {
        surname: string,
        name: string,
        patronym: string,
        birthday: string,
        country: string,
        email: string,
    };

    // Состояние инпутов
    const inputs = {
        surname: '',
        name: '',
        patronym: '',
        birthday: '',
        country: '',
        email: '',
    } as inputData;

    // Плейсхолдеры для генерации списка инпутов
    const placeholders = {
        surname: 'Фамилия*',
        name: 'Имя*',
        patronym: 'Отчество*',
        birthday: 'Дата рождения*',
        country: 'Страна места рождения*',
        email: 'email',
    } as inputData;

    // Проверка инпута на обязательность (по * в плейсхолдерах)
    const isRequired = (key:string):boolean => {
        const input = placeholders[key]
        return input.includes('*')
    }

    // Логика отправки
    const submitHandler = (inputData:inputData) => {
        // Трим всех значений состояния, мутацию здесь считаю приемлемой
        const inputsKeys = Object.keys(inputData)
        inputsKeys.forEach((key) => inputData[key] = inputData[key].trim())
        // Если форматы даты и мейла корректные - вызываем функцию перехода на след страницу
        // Для мейла учитываем его необязательность

        if (!dateFormatChecker(inputData.birthday)){
            alert('Неверный формат даты (дд.мм.гггг)')
        } 
        else if (inputData.email && emailFormatChecker(inputData.email)){
            alert('Неверный формат почты')
        }
        else {
            post(inputData)
                .then((response) => {
                goToNextPage(response, '/confirm')
            })
            mock.onAny('/request')
        }
    }

</script>

<style lang="scss" scoped>

</style>