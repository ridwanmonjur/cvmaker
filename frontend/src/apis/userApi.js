import api from "./serverApi";

export const loginApi = (authData) => {
  return api.post("/users/login", authData);
};

export const getOneUserByUserName = (username) => {
  const data= api.get(`/users/user/${encodeURI(username)}`);
  return data;
};

export const getUsersByUserIdApi = () => {
  return api.get(`/users/byUser`);
};

export const signUpOneUser = (data) => {
  return api.post('/users/signup', data);
};

export const updateUserApi = (userId, user) => {
  return api.put(`/users/${userId}`, user);
};
