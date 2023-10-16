<template>
    <div class="container">
        <header class="form-header">
            <button class="back-button" @click="goToPreviousPage">&lt;</button>
            <h1>Условия</h1>
            <div class="progress-container">
                <div class="progress-bar"></div>
            </div>
            <div class="steps">
                <div>Шаг 5 из 5</div>
                <div>Подписание договора</div>
            </div>
            <hr>
        </header>
        <body>
            <ul class="conditions-container">
                <li class="condition-block" v-for="condition in conditionsData" :key="condition.id">
                    <div class="conditions">
                        <p class="condition-name">{{ condition.name }}</p>
                        <p class="condition-value">{{ condition.value }}</p>
                    </div>
                    <hr>
                </li>
            </ul>

            <ul class="links-container">
                <li><a href="#">Проект сертификата дистанционный "Помощник Ц"</a></li>
                <li><a href="#">Памятка использования "Помощник Ц"</a></li>
                <li><a href="#">Согласие на подключение рекуррентного платежа</a></li> 
            </ul>
            <hr>

            <button class="confirm submit" @click="handleSubmit">Подписать договор</button>
        </body>
    </div>
</template>

<script lang="ts" setup>
import {onMounted, ref} from 'vue'
import {goToPreviousPage} from '../router/routerFunctions'
import {getData} from '../utils/requests'
import useAuthStore from '../stores/AuthStore'


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
const store = useAuthStore();
const submit = store.confirmPageSubmit

const handleSubmit = () => {
    submit('ConditionsList', '/loading') // см confirmPageSubmit в сторе
};
</script>

<style scoped>
.progress-container {
  width: 100%;
  background-color: #e1dddd;
  height: 1em;
  border-radius: 1em;
  position: relative;
}

.progress-bar {
  width: 100%; /* Ширина прогресса для 1 шага из 5 */
  height: 100%;
  background-color: rgb(67, 212, 67);
  border-radius: 1em;
  transition: width 0.5s;
}

.conditions{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

.conditions-container{
    padding: 0;

}

.links-container{
    list-style-type: disc;
    text-align: left;
    padding-bottom: 1em;
}
</style>