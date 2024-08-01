import { axiosInstance } from "../controller/controller";

//create user
export const createUser = async (user: any) => {
  try {
    const response = await axiosInstance.post("/users/register", user);
    return response.data;
  } catch (error) {
    throw error;
  }
};

//login user
export const loginUser = async (user: any) => {
  try {
    const response = await axiosInstance.post("/users/login", user);
    return response.data;
  } catch (error) {
    throw error;
  }
};

//get user by id
export const getUserById = async (id: number) => {
  try {
    const response = await axiosInstance.get(`/users/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

//get users
export const getUsers = async (users: any) => {
  try {
    const response = await axiosInstance.get("/users", users);
    return response.data;
  } catch (error) {
    throw error;
  }
};
