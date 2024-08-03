const API_URL = 'http://localhost:8000/api';

// Interface for login data
interface ILogin {
  email?: string;
  password?: string;
}

// Interface for registration data
interface IRegister {
  first_name?: string;
  last_name?: string;
  email?: string;
  password?: string;
  is_mentor?: boolean | null;
}

// Interface for profile update data
interface IUpdate {
  schools?: number[];
  degrees?: number[];
  classes?: number[];
  clubs?: number[];
  bio?: string;
}

// Function to login a user
export const loginUser = async (data: ILogin) => {
  const { email, password } = data;
  return await fetch(`${API_URL}/users/login/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });
}

// Function to register a user
export const registerUser = async (data: IRegister) => {
  const { first_name, last_name, email, password, is_mentor } = data;
  return await fetch(`${API_URL}/users/register/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ first_name, last_name, email, password, is_mentor }),
  });
}

// Function to get user profile
export const getUserProfile = async (token: string) => {
  return await fetch(`${API_URL}/users/self/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    },
  });
}

// Function to update user profile
export const updateUserProfile = async (token: string, data: IUpdate) => {
  const { schools, degrees, classes, clubs, bio } = data;
  return await fetch(`${API_URL}/users/self/update/`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify({ schools, degrees, classes, clubs, bio }),
  })
}
