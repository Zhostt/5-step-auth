<template>
    <div class="confirm container">
        <h1>Подтверждение удаленной идентификации</h1>
        <h2>Мы отправили SMS с кодом на ваш номер телефона</h2>
        <form class="form" @submit.prevent="handleSubmit(code)">
            <label for="code" class="input">
                Код
                <input type="number" name="code" id="code" v-model="code">
            </label>
            <label for="submit" value="Добавить"></label>
            <input 
                type="submit"
                id="submit" name="submit"
                :class="['submit-btn', {'active':code}]"
                :disabled="!code"
                value="Проверить код" >
        </form>
        <div class="send-again-block">
            <div>Отправить код повторно через {{ secondsFormatted }}</div>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import {ref, computed, onMounted } from 'vue'
    import {formatSeconds, countdown} from '../utils/utils'
    import useAuthStore from '../stores/AuthStore'

    // Состояния инпута кода подтверждения (инпут + класс active на кнопке проверки)
    const code:string = '';

    // Логика таймера обратного отсчета
    const seconds = ref(80);
    onMounted(() => { // Таймер начинается при монтировании компонента
        countdown(seconds);
    });
    // Форматированное значение (секунд, секунды и тп)
    const secondsFormatted = computed(() => formatSeconds(seconds.value));

    // Обработка проверки кода подтверждения, сейчас примет любой код лишь бы был
    // Используем типовую фию сабмита из стора
    const store = useAuthStore();
    const submit = store.confirmPageSubmit

    const handleSubmit = (code:string) => {
        if (code){
            submit('IdentityConfirm','/conditions', {code}); // см confirmPageSubmit в сторе
            };
    };
</script>

<style scoped>
    .active{
        background-color: red;
    }

</style>