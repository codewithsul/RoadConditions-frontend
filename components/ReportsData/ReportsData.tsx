"use client";
import React from "react";
import { useState, useEffect } from "react";
import { getAllReports } from "../../Utils/reportController/reportController";
import { getSensorData } from "../../Utils/sensorController/sensorController";
import { useMapLocations } from "../../Utils/contextProvider/ContextProvider";

interface SensorData {
  id: number;
  road_id: number;
  num_cars: number;
  image_path: string;
  timestamp: string;
}

const Report: React.FC = () => {
  const [sensorData, setSensorData] = useState<SensorData[]>([]);
  const [reports, setReports] = useState<Report[]>([]);
  const [token, setToken] = useState<string | null>(null);
  const { locations } = useMapLocations();

  console.log("dataLocations:", locations);

  const handleGetSensorData = async () => {
    try {
      const response = await getSensorData();
      const sensorDataRes: SensorData[] = response[0];
      setSensorData(sensorDataRes);
    } catch (error) {
      console.error("Error fetching sensor data:", error);
    }
  };

  useEffect(() => {
    handleGetSensorData();
  }, []);

  console.log({ token });

  // handle get reports
  const getReports = async () => {
    try {
      const response = await getAllReports();
      console.log("reportResponse:", response);

      // Access the first item in the response array
      const reportData = response[0];

      // Set the reports state
      setReports(reportData);

      console.log("reportData:", reportData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    setToken(token);

    if (token) {
      getReports();
    }
  }, []);

  return (
    <div>
      {token ? (
        <div className="w-96 h-64 rounded-lg bg-gray-100 shadow-lg absolute top-24 right-14 flex flex-col items-center">
          <label className="w-full flex justify-center font-bold text-lg mt-2 text-black">
            Road Report Updates
          </label>
          <div className="w-full h-48 overflow-y-auto mx-3 py-3">
            {reports
              ? reports.map((report: any) => (
                  <div
                    key={report.id}
                    className="flex flex-col gap-2 py-5 items-center bg-gray-200 hover:cursor-pointer"
                  >
                    {/* <label
                    className={
                      report.reportType === "A"
                        ? "text-black font-light text-sm bg-red-200 px-4 py-5 w-72 rounded-md hover:cursor-pointer"
                        : report.reportType === "B"
                        ? "text-black font-light text-sm bg-orange-100 px-4 py-5 w-72 rounded-md hover:cursor-pointer"
                        : "text-black font-light text-sm bg-green-100 px-4 py-5 w-72 rounded-md hover:cursor-pointer"
                    }
                  >
                    Type: {""} {report.reportType}
                  </label> */}
                    <label className="text-black font-light text-sm bg-gray-100 px-4 py-5 w-72 rounded-md hover:cursor-pointer">
                      {report.reportName}
                    </label>
                    <label className="text-black font-light text-sm bg-gray-100 px-4 py-5 w-72 h-28 rounded-md hover:cursor-pointer">
                      Desc: {report.reportDescription}
                    </label>
                  </div>
                ))
              : null}
          </div>
        </div>
      ) : null}
      <div className="w-96 h-28 rounded-lg bg-gray-100 shadow-lg absolute top-96 right-14 flex flex-col px-5 py-3">
        <div>
          <p className="text-black font-bold">Map codes</p>
        </div>
        <div className="flex flex-row gap-2 items-center mt-2">
          <label className="w-4 h-4 rounded-lg bg-red-500 "></label>
          <p className="text-black text-sm">High traffic</p>
        </div>
        <div className="flex flex-row gap-2 items-center mt-2">
          <label className="w-4 h-4 rounded-lg bg-green-500 "></label>
          <p className="text-black text-sm">Low traffic</p>
        </div>
      </div>
      {locations.DestinationLng !== null && (
        <div className="w-96 h-28 rounded-lg bg-gray-100 shadow-lg absolute bottom-60 right-14 flex flex-col px-5 py-3">
          <div>
            <p className="text-black font-bold">Car count</p>
          </div>
          <div className="flex flex-row gap-2 items-center mt-2">
            <label className="w-4 h-4 rounded-lg bg-red-500 "></label>
            <p className="text-black text-sm">{sensorData[0]?.num_cars}</p>
          </div>
          <div className="flex flex-row gap-2 items-center mt-2">
            <label className="w-4 h-4 rounded-lg bg-green-500 "></label>
            <p className="text-black text-sm">{sensorData[1]?.num_cars}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Report;
