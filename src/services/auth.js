import api from '.';

export const AuthService = {
  login: (username, password) => {
    return api.post('/jwt-auth/v1/token', {
      username,
      password
    })
  },
  register: ({
    email,
    username,
    password,
    nickname
  }) => {
    return api.post('/wp/v2/users/register', {
      email,
      username,
      password,
      nickname
    })
  }
}

// Webservices, Endpoint