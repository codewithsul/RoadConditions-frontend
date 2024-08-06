import { axiosInstance } from "../controller/controller";

export const getSensorData = async () => {
  try {
    const response = await axiosInstance.get("/sensors");
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
