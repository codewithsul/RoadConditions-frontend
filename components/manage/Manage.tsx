"use client";
import React, { useEffect, useState } from "react";
import {
  getUsers,
  deleteUser,
} from "../../Utils/userController/userController";
import {
  createReport,
  getAllReports,
} from "../../Utils/reportController/reportController";
import {
  registerRoad,
  getRoadData,
} from "../../Utils/roadController/roadController";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
}

interface Road {
  id: string;
  roadName: string;
}

interface RoadName {
  id: string;
  roadName: string;
}

interface Report {
  reportName: string;
  reportDescription: string;
  reportType: string;
  reportDate: string;
  reportPath: string;
}

interface LoggedUser {
  firstName: string;
  lastName: string;
  email: string;
}

const LoggedUser: LoggedUser = {
  firstName: "",
  lastName: "",
  email: "",
};

const initialReport: Report = {
  reportName: "",
  reportDescription: "",
  reportType: "",
  reportDate: "",
  reportPath: "",
};

const InitialUser: User[] = [
  { id: "", firstName: "", lastName: "", email: "", phone: "", address: "" },
];

const initialRoad: Road = {
  id: "",
  roadName: "",
};

const Manage: React.FC = () => {
  const [users, setUsers] = useState<User[]>(InitialUser);
  const [loggedUser, setloggedUser] = useState<LoggedUser>(LoggedUser);
  const [RoadReports, setRoadReports] = useState<Report>(initialReport);
  const [reports, setReports] = useState<Report[]>([]);
  const [Road, setRoad] = useState<Road>(initialRoad);
  const [RoadName, setRoadNameData] = useState<Road[]>([]);

  console.log({ reports });

  const router = useRouter();

  const [switches, setSwitches] = useState({
    user: true,
    report: false,
    road: false,
    preference: false,
  });

  console.log({ switches });

  //handle user fetching
  const hanldeFetchUsers = async () => {
    try {
      const response = await getUsers(users);
      setUsers(response);
      console.log({ response });
    } catch (error) {
      console.log(error);
    }
  };

  //fetch all users each time page is reloaded
  useEffect(() => {
    hanldeFetchUsers();
  }, []);

  //get logged in user data
  useEffect(() => {
    const user = localStorage.getItem("user");
    setloggedUser(user ? JSON.parse(user) : []);
  }, []);

  //toggle navigation switch
  const handleToggle = (name: keyof typeof switches) => {
    setSwitches((prevState) => ({
      user: false,
      report: false,
      road: false,
      preference: false,
      [name]: !prevState[name],
    }));
  };

  const handleBackHome = () => {
    router.push("/dashboard");
  };

  //handle report input change
  const handleReportInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setRoadReports({ ...RoadReports, [name]: value });
  };

  //handle report select change
  const handleReportSelectChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.currentTarget;
    setRoadReports({ ...RoadReports, [name]: value });
  };

  //handle report TextArea change
  const handleReportTextAreaChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = e.currentTarget;
    setRoadReports({ ...RoadReports, [name]: value });
  };

  //handle road input change
  const handleRoadInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setRoad({ ...Road, [name]: value });
  };

  //handle form submit
  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const report = {
      reportName: RoadReports.reportName,
      reportDescription: RoadReports.reportDescription,
      reportType: RoadReports.reportType,
      reportDate: RoadReports.reportDate,
      reportPath: RoadReports.reportPath,
    };

    if (!report.reportName || !report.reportDescription) {
      toast.error("Please fill in all fields");
      return;
    }

    await createReport(report)
      .then(() => {
        setRoadReports(initialReport);
      })
      .catch((error) => {
        if (
          error.response &&
          error.response.status === 400 &&
          error.response.data === "Failed to created report"
        ) {
          toast.error("Failed to created report");
          return;
        }
      });

    toast.success("Report created successfully");
  };

  // handle get reports
  const getReports = async () => {
    try {
      const response = await getAllReports();
      console.log("reportResponse:", response);

      // Access the first item in the response array
      const reportData = response[0];

      // Set the reports state
      setReports(reportData);
    } catch (error) {
      console.log(error);
    }
  };

  //handle get road data
  const getRoadName = async () => {
    try {
      const response = await getRoadData();
      console.log("RoadResponse:", response);

      const roadData = response[0];

      setRoadNameData(roadData);
    } catch (error) {
      console.log(error);
    }
  };

  //handle delete user
  const deleteUsers = async (id: number) => {
    try {
      const response = await deleteUser(id);
      console.log("deleteResponse:", response);
      router.push("/dashboard/manage");
    } catch (error) {
      console.log(error);
    }
  };

  console.log({ RoadName });

  //handle getRoadReport when page refreshes
  useEffect(() => {
    getRoadName();
  }, [registerRoad]);

  //handle getReports when page refreshes
  useEffect(() => {
    getReports();
  }, [createReport]);

  //handle road form
  const handleRegisterRoad = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const road = {
      roadName: Road.roadName,
    };

    if (!road.roadName) {
      toast.error("Please fill in all fields");
      return;
    }

    await registerRoad(road)
      .then(() => {
        setRoad(initialRoad);
      })

      .catch((error) => {
        if (
          error.response &&
          error.response.status === 400 &&
          error.response.data === "Failed to register road"
        ) {
          toast.error("Failed to register road");
          return;
        }
      });
    toast.success("Road registered successfully");
  };

  return (
    <div>
      <div className="w-full h-screen bg-white">
        <div className="flex absolute left-14 top-12 bg-gray-100 shadow-sm rounded-lg h-1/2 w-96">
          <ul className="flex flex-col gap-2 px-4 py-7 text-gray-600 text-sm">
            <li
              className="px-2 py-3 rounded-md hover:bg-gray-200 hover:cursor-pointer transition-all ease-in-out"
              onClick={() => {
                hanldeFetchUsers;
                handleToggle("user");
              }}
            >
              Users
            </li>
            <li
              className="px-2 py-3 rounded-md hover:bg-gray-200 hover:cursor-pointer transition-all ease-in-out"
              onClick={() => {
                handleToggle("report");
              }}
            >
              Reports
            </li>
            <li
              className="px-2 py-3 rounded-md hover:bg-gray-200 hover:cursor-pointer transition-all ease-in-out"
              onClick={() => {
                handleToggle("road");
              }}
            >
              Roads
            </li>
            <li
              className="px-2 py-3 rounded-md hover:bg-gray-200 hover:cursor-pointer transition-all ease-in-out"
              onClick={() => {
                handleToggle("preference");
              }}
            >
              Preferences
            </li>
          </ul>
        </div>
        <div className="flex flex-col gap-3 absolute right-12 top-12 w-2/3 h-1/2 bg-gray-100 shadow-sm rounded-lg text-gray-600 py-7 px-6 text-sm">
          {switches.user === true ? (
            <div className="h-full">
              <div className="flex w-full">
                <label className="text-lg text-black font-bold">
                  All members
                </label>
              </div>

              <div className="flex overflow-y-auto mt-8 bg-white h-2/3">
                <table className="w-full">
                  <thead className="border  border-gray-200 py-2 bg-gray-200">
                    <tr>
                      <th className="w-1/6 text-center py-2">No</th>
                      <th className="w-1/6 text-center">First Name</th>
                      <th className="w-1/6 text-center">Last Name</th>
                      <th className="w-1/6 text-center">Email</th>
                      <th className="w-1/6 text-center">Address</th>
                      <th className="w-1/6 text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody className="border-b border-gray-200 py-2">
                    {users
                      ? users.map((user: any) => (
                          <tr
                            key={user.id}
                            className="w-full border-b border-gray-200 "
                          >
                            <td className="w-1/6 text-center py-2">
                              {user.id}
                            </td>
                            <td className="w-1/6 text-center">
                              {user.firstName}
                            </td>
                            <td className="w-1/6 text-center">
                              {user.lastName}
                            </td>
                            <td className="w-1/6 text-center">{user.email}</td>
                            <td className="w-1/6 text-center">
                              {user.address}
                            </td>
                            <td className="w-1/6 text-center">
                              <button
                                className=" text-black rounded-md py-1 px-2 hover:cursor-pointer"
                                onClick={() => deleteUsers(user.id)}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth="1.5"
                                  stroke="currentColor"
                                  className="size-6"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                                  />
                                </svg>
                              </button>
                            </td>
                          </tr>
                        ))
                      : null}
                  </tbody>
                </table>
              </div>
            </div>
          ) : null}
          {switches.report === true ? (
            <div>
              <form onSubmit={handleFormSubmit}>
                <h2 className="font-bold text-lg text-black">Road reports</h2>

                <div className="absolute flex mt-2">
                  <button
                    type="submit"
                    className="w-32 h-9 border border-blue-200 text-white rounded-md bg-blue-500 shadow-sm hover:text-gray-600 hover:bg-blue-200 hover:cursor-pointer transition-all ease-in"
                  >
                    Submit report
                  </button>
                </div>
                <div className="flex flex-row gap-0 mt-11">
                  <div className="flex flex-col w-full">
                    <div className="flex flex-row gap-2">
                      <div className="flex flex-col gap-2 w-2/3 bg-gray-200 rounded-lg h-72 mt-4 px-4 py-5">
                        <div>
                          <input
                            type="text"
                            name="reportName"
                            value={RoadReports.reportName}
                            required
                            className="flex w-72 rounded-md h-9 px-4 border border-blue-200 bg-gray-100 outline-none focus:border focus:border-blue-500 transition-all ease-in"
                            placeholder="Report name"
                            onChange={handleReportInputChange}
                          />
                        </div>
                        <div className="relative w-28">
                          <select
                            name="reportType"
                            value={RoadReports.reportType}
                            required
                            className="appearance-none h-9 px-4 pr-8 bg-gray-100 w-full outline-none rounded-md border border-blue-200"
                            onChange={handleReportSelectChange}
                          >
                            <option value="">Priority</option>
                            <option value="A">A</option>
                            <option value="B">B</option>
                            <option value="C">C</option>
                          </select>
                          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-700">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              className="size-4 absolute right-7 top-3"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="m19.5 8.25-7.5 7.5-7.5-7.5"
                              />
                            </svg>
                          </div>
                        </div>
                        <div>
                          <input
                            type="date"
                            name="reportDate"
                            value={RoadReports.reportDate}
                            required
                            className="flex w-72 rounded-md h-9 border border-blue-200 px-4 bg-gray-100 outline-none focus:border focus:border-blue-500 transition-all ease-in"
                            onChange={handleReportInputChange}
                          />
                        </div>
                        <div>
                          <textarea
                            name="reportDescription"
                            required
                            value={RoadReports.reportDescription}
                            onChange={handleReportTextAreaChange}
                            placeholder="Report description"
                            className="flex w-96 h-24 rounded-md px-5 border border-blue-200 py-7 outline-none bg-gray-100 focus:focus:border-blue-500 transition-all ease-in"
                          />
                        </div>
                      </div>
                      <div className="flex items-baseline absolute w-44 h-14 top-14 right-40 ">
                        <h2 className="absolute bottom-0 font-bold text-lg text-black ">
                          Report list
                        </h2>
                      </div>
                      <div className="flex flex-col w-1/3 bg-gray-200 rounded-lg h-72 mt-4 overflow-y-auto ">
                        {reports ? (
                          reports.map((report: any) => (
                            <div
                              key={report.id}
                              className="flex flex-col gap-2 py-5 items-center hover:cursor-pointer"
                            >
                              <label
                                className={
                                  report.reportType === "A"
                                    ? "text-black font-light text-sm bg-red-200 px-4 py-5 w-72 rounded-md hover:cursor-pointer"
                                    : report.reportType === "B"
                                    ? "text-black font-light text-sm bg-orange-100 px-4 py-5 w-72 rounded-md hover:cursor-pointer"
                                    : "text-black font-light text-sm bg-green-100 px-4 py-5 w-72 rounded-md hover:cursor-pointer"
                                }
                              >
                                Type: {""} {report.reportType}
                              </label>
                              <label className="text-black font-light text-sm bg-gray-100 px-4 py-5 w-72 rounded-md hover:cursor-pointer">
                                Name: {report.reportName}
                              </label>
                              <label className="text-black font-light text-sm bg-gray-100 px-4 py-5 w-72 h-28 rounded-md hover:cursor-pointer">
                                Desc: {report.reportDescription}
                              </label>
                            </div>
                          ))
                        ) : (
                          <div className="flex flex-col gap-2 px-4 py-5 hover:cursor-pointer">
                            <label className="text-black font-light text-sm bg-gray-100 px-4 py-5 w-72 rounded-md hover:cursor-pointer">
                              {"reports type"}
                            </label>
                            <label className="text-black font-light text-sm bg-gray-100 px-4 py-5 w-72 rounded-md hover:cursor-pointer">
                              {"reports name"}
                            </label>
                            <label className="text-black font-light text-sm bg-gray-100 px-4 py-5 w-72 h-32 rounded-md hover:cursor-pointer">
                              {"reports description"}
                            </label>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          ) : null}
          {switches.road === true ? (
            <div>
              <h2 className="font-bold text-lg text-black">Roads</h2>

              <form
                onSubmit={(e) => {
                  handleRegisterRoad(e);
                }}
              >
                <div className="flex flex-row gap-0 mt-11">
                  <div className="flex flex-col w-full">
                    <div className="flex flex-row gap-2">
                      <div className="flex flex-col gap-2 w-1/3 bg-gray-200 rounded-lg h-72 mt-4 px-4 py-5">
                        <input
                          type="text"
                          name="roadName"
                          value={Road.roadName}
                          required
                          className="flex w-72 rounded-md h-9 px-4 border border-blue-200 bg-gray-100 outline-none focus:border focus:border-blue-500 transition-all ease-in"
                          placeholder="Road name"
                          onChange={handleRoadInputChange}
                        />
                        <div className="flex mt-2">
                          <button
                            type="submit"
                            className="w-32 h-9 rounded-md border text-white border-blue-200 bg-blue-500 font-md  shadow-sm hover:text-gray-600 hover:bg-blue-200 hover:cursor-pointer transition-all ease-in"
                          >
                            Register road
                          </button>
                        </div>
                      </div>
                      <div className="flex items-baseline absolute w-44 h-14 top-14 left-80 ">
                        <h2 className="absolute bottom-0 left-9 font-bold text-lg text-black ">
                          Road lists
                        </h2>
                      </div>
                      <div className="flex flex-col relative w-2/3 bg-gray-200 rounded-lg h-72 mt-4 overflow-y-auto px-4 py-5">
                        <div>
                          <input
                            type="text"
                            name="RoadSearch"
                            className="flex w-full rounded-md h-9 px-4 border border-gray-300 bg-gray-100 outline-none focus:border focus:border-blue-500 transition-all ease-in"
                            placeholder="Search road"
                          />
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="size-7 absolute right-7 top-6 text-gray-500 hover:cursor-pointer hover:text-blue-500 transition-all ease-in"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                            />
                          </svg>
                        </div>
                        <div className="py-4 overflow-y-auto px-4">
                          {RoadName.map((road: any, index) => (
                            <ul
                              key={road.id}
                              className={`flex flex-row gap-2 py-1 items-center hover:cursor-pointer border ${
                                index === RoadName.length - 1
                                  ? "border-b border-gray-300"
                                  : "border-b-0 border-gray-300"
                              }`}
                            >
                              <li className="px-4">{road.road_id}.</li>
                              <li> {road.road_name}</li>
                            </ul>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          ) : null}
        </div>
        <div className="flex absolute bottom-12 right-12 w-2/3 h-80 bg-gray-100 shadow-sm rounded-lg text-gray-600 py-7 px-6 text-sm">
          <div className="flex flex-col gap-2">
            <h2 className="font-semibold">Analytics</h2>
            <div className="flex flex-row items-center">
              <div className="h-3 w-3 rounded-lg bg-blue-500"></div>
              <h3 className="ml-2">User growth</h3>
            </div>
          </div>
          <div className="flex absolute right-32">
            <div className="flex flex-row w-32 h-11 rounded-3xl border border-blue-200 bg-white shadow-sm text-gray-600 hover:bg-gray-200 hover:cursor-pointer transition-all ease-in">
              <button className="absolute left-7 top-3">Today</button>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-4 absolute right-7 top-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m19.5 8.25-7.5 7.5-7.5-7.5"
                />
              </svg>
            </div>
          </div>
        </div>
        <div className="flex absolute left-14 bottom-12 bg-gray-100 shadow-sm rounded-lg h-80 w-96">
          <div className="flex flex-col w-full justify-center items-center absolute text-sm text-gray-500 bottom-14">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-14"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
            </svg>

            <ul className="px-7 flex items-center flex-col">
              <li className="flex flex-row gap-1 font-bold">
                {`${loggedUser.firstName} ${loggedUser.lastName}`}
              </li>
              <li className="flex flex-row gap-1 text-sm">
                {loggedUser.email}
              </li>
            </ul>
          </div>
          <button
            className="flex flex-row absolute bottom-0 left-7 w-24 h-10 text-gray-600 hover:text-blue-600 transition-all ease-in-out"
            onClick={handleBackHome}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18"
              />
            </svg>
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default Manage;
