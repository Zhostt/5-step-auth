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
  

