// const API_URL = process.env.REACT_APP_STRAPI_API_URL;
const API_URL = 'https://copymaster.com.ua';
// const API_URL = 'https://185.25.118.208';

type RequestMethod = 'GET' | 'POST' | 'PATCH' | 'DELETE';

// Чтение куков из document.cookie
const cookies = document.cookie;

function request<T>(
  url: string,
  method: RequestMethod = 'GET',
  data: any = null,
): Promise<T> {
  const options: RequestInit = { 
    method,
    // mode: 'no-cors', // Установите режим no-cors
    // credentials: 'include', // Это важно для отправки куки
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
      'Cookie': cookies,
      // 'Accept-Encoding': 'gzip, deflate, br',
      // 'Accept': '*/*',
      // 'Authorization': `Bearer ${API_KEY}`,
      // 'Access-Control-Allow-Origin': 'https://copymaster.netlify.app/',
    },
   };

  if (data) {
    options.body = JSON.stringify(data);
  }

  return fetch(API_URL + url, options)
    .then((response) => {
      if (!response.ok) {
        throw new Error();
      }

      // const cookies = response.headers.get('set-cookie');

      // // Делаем что-то с cookies
      // console.log('Cookies:', cookies);
      // console.log(response.headers);

      return response.text();
    })
    .then(text => {
      return text ? JSON.parse(text) : null;
    });
}

export const client = {
  get: <T>(url: string) => request<T>(url),
  post: <T>(url: string, data: any = null) => request<T>(url, 'POST', data),
  // post: <T>(url: string) => request<T>(url, 'POST'),
  patch: <T>(url: string, data: any) => request<T>(url, 'PATCH', data),
  delete: (url: string) => request(url, 'DELETE'),
};