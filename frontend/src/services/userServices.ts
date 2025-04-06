import config from "@/config/config";
import IUpdateUserDTO from "@/dtos/IUpdateUserDTO";
import IUser from "@/interfaces/IUser";
import axios from "axios";

// Fetches all users from the API.
export const getCurrentUser = async (): Promise<IUser> => {
  const response = await axios.get(`${config.apiUrl}/users/current`);
  return response.data.payload;
};

// Updates an existing user in the API.
export const updateUser = async (id: string, updatedInfo: IUpdateUserDTO): Promise<string> => {
  const response = await axios.put(`${config.apiUrl}/users/${id}`, updatedInfo);
  return response.data.payload;
};
