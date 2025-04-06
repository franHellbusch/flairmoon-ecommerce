import config from "@/config/config";
import IRegisterUserDTO from "@/dtos/IRegisterUserDTO";
import axios from "axios";

// Register user.
export const register = async (user: IRegisterUserDTO): Promise<string> => {
  const response = await axios.post(`${config.apiUrl}/auth/register`, user);
  return response.data.payload;
};

// Login user with email and password.
export const login = async (email: string, password: string): Promise<string> => {
  const response = await axios.post(`${config.apiUrl}/auth/register`, {
    email,
    password,
  });
  return response.data.payload;
};

// Logout from API.
export const logout = async (): Promise<void> => {
  const response = await axios.post(`${config.apiUrl}/auth/logout`);
  return response.data.payload;
};
