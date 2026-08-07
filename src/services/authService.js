import api from "../api/axios";

export const login = async (loginData) => {
  return await api.post("/auth/login", loginData);
};
export const register = async (user) => {
  return await api.post("/auth/register", user);
};
