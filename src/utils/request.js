// const API_URL = import.meta.env.VITE_API_URL || 'http://5.129.215.5'
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

export function request(path, method, data) {
  const apiPath = path.startsWith('/api') ? path : `/api${path}`;

  return fetch(`${API_URL}${apiPath}`, {
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    method: method || 'GET',
    body: data ? JSON.stringify(data) : undefined,
  }).then((res) => {
    if (!res.ok) {
      return res.json().then(errorData => {
        throw new Error(errorData.message || 'Ошибка сервера');
      });
    }
    return res.json();
  });
}