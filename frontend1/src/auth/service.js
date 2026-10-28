import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

export const register = async (username, email, mobile, password) => {
  const response = await api.post("/api/auth/register", {
    username,
    email,
    mobile,
    password,
  });

  return response;
};
