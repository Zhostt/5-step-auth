<template>
    <div class="conditions container">
        <header class="form-header">
            <button class="back-button" @click="goToPreviousPage">&lt;</button>
            <h1>Условия</h1>
            <div class="progress-bar">Прогресс бар</div>
            <div class="steps">
                <div>Шаг 5 из 5</div>
                <div>Подписание договора</div>
            </div>
            <hr>
        </header>
        <body>
            <ul class="conditions-container">
                <li class="condition-block" v-for="condition in conditionsData" :key="condition.id">
                    <div class="condition-name">{{ condition.name }}</div>
                    <div class="condition-value">{{ condition.value }}</div>
                    <hr>
                </li>
            </ul>

            <ul class="links-container">
                <li><a href="#">Проект сертификата дистанционный "Помощник Ц"</a></li>
                <li><a href="#">Памятка использования "Помощник Ц"</a></li>
                <li><a href="#">Согласие на подключение рекуррентного платежа</a></li> 
            </ul>
            <hr>

            <button class="confirm" @click="submitHandler">Подписать договор</button>
        </body>
    </div>
</template>

<script lang="ts" setup>
import {onMounted, ref} from 'vue'
import {goToNextPage, goToPreviousPage} from '../router/routerFunctions'
import {getData, post} from '../utils/requests'

// Тип для присланного с бэка условия
type Condition = {id: string, name: string, value: string}

// состояние - здесь будут данные с бэка
const conditionsData = ref<Array<Condition>>([])

// Подгружаем данные с бэка при монтировании компонента
onMounted(async() => {
    const response = await getData();
    if (response){
        conditionsData.value = response.data.conditions;
        console.log('data recieved', conditionsData);
    };
})

// Подтверждение данных, переход на следующую страницу
const submitHandler = () => {
    post()
        .then((response) => {
            goToNextPage(response, '/loading')
        })
}
</script>

<style scoped>
</style>