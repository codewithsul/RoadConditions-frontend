import React from "react";
import { ToastContainer } from "react-toastify";
import Login from "../components/Login/Login";

import RegistrationForm from "../components/registrationForm/registrationForm";
import "react-toastify/dist/ReactToastify.css";

const page: React.FC = () => {
  return (
    <div className="text-black">
      <ToastContainer />
      <Login />
      <RegistrationForm />
    </div>
  );
};

export default page;
