const API_URL = 'http://localhost:8000/api';

export const getUsers = async () => {
  return await fetch(`${API_URL}/users/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const getUserById = async (id: number) => {
  return await fetch(`${API_URL}/users/${id}/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
};
