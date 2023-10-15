<template>
    <div class="login-container">
        <header>
            <button class="back-button">Назад</button>
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
                        <input type="text" :name="input" :id="input" :placeholder="placeholders[input]" v-model="inputs[input]" >
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
    import {goToNextPage, gotToPreviousPage} from '../router/routerFunctions'

    type inputData = {
        surname: string,
        name: string,
        patronym: string,
        birthday: string,
        country: string,
        email: string,
    }

    const inputs = {
        surname: '',
        name: '',
        patronym: '',
        birthday: '',
        country: '',
        email: '',
    } as inputData;

    const placeholders = {
        surname: 'Фамилия*',
        name: 'Имя*',
        patronym: 'Отчество*',
        birthday: 'Дата рождения*',
        country: 'Страна места рождения*',
        email: 'email',
    } as inputData;

    // section for submit logic
    const submitHandler = (inputData:inputData) => {
        // trim all values in inputs, dont care with mutating cause its state
        const inputsKeys = Object.keys(inputData)
        inputsKeys.forEach((key) => inputData[key] = inputData[key].trim())
        // if date and email formats are right - post
        /*if (dateFormatChecker(inputData.birthday) && emailFormatChecker(inputData.email)){
            post(inputData)
                .then((response) => {
                goToNextPage(response, '/confirm')
            })
        mock.onAny('/request')
        }
        else {
            console.log('Неверный формат даты и/или почты')
        }*/
        post(inputData)
            .then((response) => {
                goToNextPage(response, '/confirm')
            })
        mock.onAny('/request')
    }


</script>

<style lang="scss" scoped>

</style>