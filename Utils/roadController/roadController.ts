import { axiosInstance } from "../controller/controller";

export const registerRoad = async (data: any) => {
  try {
    const response = await axiosInstance.post("/roads", data);
    return response.data;
  } catch (error) {
    console.error("Error registering road:", error);
    throw error;
  }
};

export const getRoadData = async () => {
  try {
    const response = await axiosInstance.get("/roads");
    return response.data;
  } catch (error) {
    console.error("Error getting road data:", error);
    throw error;
  }
};
