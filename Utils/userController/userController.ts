import { axiosInstance } from "../controller/controller";

//create user
export const createUser = async (user: any) => {
  try {
    const response = await axiosInstance.post("/users/register", user);
    return response.data;
  } catch (error) {
    console.error("Error creating user:", error);
  }
};

//login user
export const loginUser = async (user: any) => {
  try {
    const response = await axiosInstance.post("/users/login", user);
    return response.data;
  } catch (error) {
    console.error("Error logging in user:", error);
  }
};

//get user by id
export const getUserById = async (id: number) => {
  try {
    const response = await axiosInstance.get(`/users/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error getting user by id:", error);
  }
};
