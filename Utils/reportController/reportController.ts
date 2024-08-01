import { axiosInstance } from "../controller/controller";

//create report
export const createReport = async (report: any) => {
  try {
    const response = await axiosInstance.post("/reports", report);
    return response.data;
  } catch (error) {
    throw error;
  }
};

//get all reports
export const getAllReports = async () => {
  try {
    const response = await axiosInstance.get("/reports");
    return response.data;
  } catch (error) {
    throw error;
  }
};
