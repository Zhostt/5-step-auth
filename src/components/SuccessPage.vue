<template>
    <div class="success container">
        <img class="success-img" src="../assets/success.svg" alt="Это успех!">
        <div class="success-text">
            <p>Договор подписан.</p>
            <p>Ожидайте поступления денежных средств</p>
        </div>
        <button class="complete-btn" @click="completeAuth">ОК</button>
    </div>
</template>

<script lang='ts' setup>
import {post} from '../utils/requests'
import {goToNextPage} from '../router/routerFunctions'

const completeAuth = (() => {
    post()
    .then((res) => {
        goToNextPage(res, '/')
    })
})
</script>

<style scoped>
.success-img{
    max-width: 50%;
}

</style>