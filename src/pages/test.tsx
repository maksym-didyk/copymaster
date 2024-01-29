import axios from 'axios';
import { useEffect } from 'react';

export const TestPage = () => { 
  // const corsAnywhereUrl = 'https://cors-anywhere.herokuapp.com/';
  // const apiUrl = 'https://185.25.118.208/';
  // const apiUrl = 'https://185.25.118.208/j_spring_security_check?j_login=maxim&j_password=maxim&remember-me=true';

  useEffect(() => {
    // // const currentHost = window.location.host;

    //   // fetch(corsAnywhereUrl + apiUrl, {
    //   fetch(apiUrl, {
    //     method: 'POST',
    //     // mode: 'no-cors', // Установите режим no-cors
    //     headers: {
    //       'Content-Type': 'application/json',
    //       // 'Current-Host': 'http://localhost:3000/',
    //     },
    //     // body: JSON.stringify({
    //     //   // Ваш запрос тело
    //     //   j_login: 'maxim',
    //     //   j_password: 'maxim',
    //     //   // 'remember-me': true,
    //     // }),
    //     // credentials: 'include', // Важно установить этот параметр для передачи cookies
    //   })
    //     .then(response => {
    //       // Обработка ответа
    //       // if (!response.ok) {
    //       //   throw new Error('Network response was not ok');
    //       // }

    //             // Получение заголовков
    // // const headersRes = response.headers;

    // // Вывод заголовков в консоль (пример)
    // // headersRes.forEach((value, name) => {
    // //   console.log(`${name}: ${value}`);
    // // });

    //       return response.json();
    //     })
    //     .then(data => {
    //       // Обработка данных
    //       console.log('Response data:', data);
    //     })
    //     .catch(error => {
    //       console.error('There has been a problem with your fetch operation:', error);
    //     });
  
    const fetchData = async () => {
      try {
        const response = await axios.get('https://185.25.118.208/user', {
          withCredentials: true, // Включаем передачу cookies
        });
    
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    
    fetchData();
  }, [])

  return (
    <></>
  )
}

export default TestPage;
