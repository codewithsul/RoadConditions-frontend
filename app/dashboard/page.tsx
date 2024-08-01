import React from "react";
import DashBoard from "../../components/dashBoard/DashBoard";
import Login from "../../components/Login/Login";
import { ToastContainer } from "react-toastify";

const page: React.FC = () => {
  return (
    <div>
      <ToastContainer />
      {/* <DashBoard /> */}
      <Login />
    </div>
  );
};

export default page;
