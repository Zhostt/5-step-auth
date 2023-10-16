<template>
    <div class="loading container">
        <div class="spinner-block">
            <div class="spinner"></div>
        </div>

        <div class="loading-text">
           <p>Проверка ваших данных!</p>
           <p>Это займет до 30 минут!</p>
           <p>(На самом деле {{delay}} секунд)</p>
        </div>
    </div>


</template>

<script lang='ts' setup>
import {onMounted} from 'vue'
import useAuthStore from '../stores/AuthStore'

// Сколько секунд идет имитация загрузки
const delay = 5


// Подтверждение данных, переход на следующую страницу
const store = useAuthStore();
const submit = store.confirmPageSubmit

const handleSubmit = () => {
    submit('AwaitCheck', '/success') // см confirmPageSubmit в сторе
};

// При монтировании запускаем таймер, по истечению - сабмит выше
onMounted(() => {
    setTimeout(() => {
         handleSubmit();
        }, delay*1000)
})
</script>

<style scoped>
.spinner-block {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 40%;
    margin: 5%;
    }

.spinner {
  border: 4px solid rgba(0, 0, 0, 0.3);
  border-top: 4px solid #3498db;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  width: 5em;
  height: 5em;
  max-width: 50%;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>