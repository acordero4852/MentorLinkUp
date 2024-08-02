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

export const getMatchedMentors = async (token: string) => {
  return await fetch(`${API_URL}/users/mentor_match`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    },
  });
} 
