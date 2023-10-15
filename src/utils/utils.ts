import { Ref } from 'vue';

// Проверка формата даты dd.mm.yyyy
export const dateFormatChecker = (date: string): boolean => {
    const dateFormatRegex = /^\d{2}.\d{2}.\d{4}$/;
    return dateFormatRegex.test(date);
  };
  
// Проверка формата электронной почты
export const emailFormatChecker = (email: string): boolean => {
const emailFormatRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
return emailFormatRegex.test(email);
};

// Функция ожидания (по умолчанию секунда)
export const wait = (delay:number=1000) => {
  return new Promise((resolve) => setTimeout(resolve, delay))
}

// Обратный отсчет, по умолчанию в секундах, на вход ref (для динамичной отрисовки)
export const countdown = (time:Ref<number>, delay=1000) => {
  const countdownInterval = setInterval(() => {
      if (time.value <= 0) {
        clearInterval(countdownInterval);
      } else {
        time.value -= 1;
      }
  }, delay); 
};
  
// Корректные окончания для слова "секунда" в зависимости от количества
export const formatSeconds = (seconds:number):string => {
    if (seconds === 1) {
      return seconds + ' секунда';
    } else if (seconds >= 2 && seconds <= 4) {
      return seconds + ' секунды';
    } else {
      return seconds + ' секунд';
    }
  }