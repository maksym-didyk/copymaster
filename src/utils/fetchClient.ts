// const API_KEY = process.env.REACT_APP_STRAPI_API_TOKEN;
// const API_URL = process.env.REACT_APP_STRAPI_API_URL;
const API_URL = 'https://copymaster.com.ua';

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
    // credentials: 'include', // Это важно для отправки куки
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
      'Cookie': cookies,
      // 'Authorization': `Bearer ${API_KEY}`,
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

      const cookies = response.headers.get('Set-Cookie');

      // Делаем что-то с cookies
      console.log('Cookies:', cookies);

      return response.text();
    })
    .then(text => {
      return text ? JSON.parse(text) : null;
    });
}

export const client = {
  get: <T>(url: string) => request<T>(url),
  post: <T>(url: string, data: any) => request<T>(url, 'POST', data),
  patch: <T>(url: string, data: any) => request<T>(url, 'PATCH', data),
  delete: (url: string) => request(url, 'DELETE'),
};
