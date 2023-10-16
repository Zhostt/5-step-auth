<template>
    <div class="confirm container">
        <div class="headers">
            <h2>Подтверждение удаленной идентификации</h2>
            <h3>Мы отправили SMS с кодом на ваш номер телефона</h3>
        </div>
        <form class="form" @submit.prevent="handleSubmit(code)">
            <label for="code" class="input">
                Код
                <input type="number" name="code" id="code" v-model="code">
            </label>
            <label for="submit" value="Добавить"></label>
            <input 
                type="submit"
                id="submit" name="submit"
                :class="['submit', {'disabled':!code}]"
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
    let code:string = '';

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
    .disabled{
        background-color: rgb(215, 214, 214);
    }
</style>