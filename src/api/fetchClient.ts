import { toast } from "react-toastify";

export const API_URL = process.env.REACT_APP_API_URL;
// const API_URL = 'https://copymaster.com.ua';
// const API_URL = 'https://185.25.118.208';
// const API_URL = 'http://localhost';

type RequestMethod = 'GET' | 'POST' | 'PATCH' | 'DELETE';

function request<T>(
  url: string,
  method: RequestMethod = 'GET',
  data: any = null,
): Promise<T> {
  const options: RequestInit = { 
    method,
    // mode: 'no-cors', // Установите режим no-cors
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      // 'Authorization': `Bearer ${API_KEY}`,
    },
   };

  if (data) {
    options.body = JSON.stringify(data);
  }

  return fetch(url, options)
    .then((response) => {
      if (!response.ok) {
        // throw new Error();
        toast.error('Error response fetch');
      }

      return response.text();
    })
    .then(text => {
      return text ? JSON.parse(text) : null;
    });
}

export const client = {
  get: <T>(url: string) => request<T>(url),
  post: <T>(url: string, data: any = null) => request<T>(url, 'POST', data),
  patch: <T>(url: string, data: any) => request<T>(url, 'PATCH', data),
  delete: (url: string) => request(url, 'DELETE'),
};
