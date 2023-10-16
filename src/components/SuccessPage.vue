<template>
    <div class="success container">
        <img class="success-img" src="../assets/success.svg" alt="Это успех!">
        <div class="success-text">
            <p>Договор подписан.</p>
            <p>Ожидайте поступления денежных средств</p>
        </div>
        <button class="complete-btn submit" @click="completeAuth">ОК</button>
    </div>
</template>

<script lang='ts' setup>
import useAuthStore from '../stores/AuthStore'

const store = useAuthStore()

// Завершаем авторизацию, обнуляем стор
const {completeAuth} = store
</script>

<style scoped>
.success-img{
    max-width: 50%;
}

</style>