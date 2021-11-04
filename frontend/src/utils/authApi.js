// export const BASE_URL = 'http://localhost:3000';
export const BASE_URL = 'https://api.mesto-jane21fox.nomoredomains.xyz';

const handleResponse = (res) => {
    if(res.ok) {
        return res.json();
    } 
    return Promise.reject(`Ошибка: ${res.message}`);
}

export const register = (password, email) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({password, email})
  })
  .then(handleResponse);
};

export const authorize = (password, email) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({password, email})
  })
  .then(handleResponse)
};

export const checkToken = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  })
  .then(handleResponse)
}

