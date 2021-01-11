import api from '.';

export const UserService = {
  getUserById: (userId) => api.get(`/wp/v2/users/${userId}`)
}