import React from "react";
import ReportsData from "../../components/ReportsData/ReportsData";
import Login from "../../components/Login/Login";

const page: React.FC = () => {
  return (
    <div>
      <div>
        <Login />
        <ReportsData />
      </div>
    </div>
  );
};

export default page;
