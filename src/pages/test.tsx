import { useEffect } from 'react';

export const TestPage = () => { 
  // const corsAnywhereUrl = 'https://cors-anywhere.herokuapp.com/';
  const apiUrl = 'https://185.25.118.208/';

  useEffect(() => {
      // fetch(corsAnywhereUrl + apiUrl, {
      fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Другие заголовки, если необходимо
        },
        body: JSON.stringify({
          // Ваш запрос тело
          j_login: 'maxim',
          j_password: 'maxim',
          // 'remember-me': true,
        }),
        credentials: 'include', // Важно установить этот параметр для передачи cookies
      })
        .then(response => {
          // Обработка ответа
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }

          console.log(response);

          return response.json();
        })
        .then(data => {
          // Обработка данных
          console.log('Response data:', data);
        })
        .catch(error => {
          console.error('There has been a problem with your fetch operation:', error);
        });
  }, [])

  return (
    <></>
  )
}

export default TestPage;
