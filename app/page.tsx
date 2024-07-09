import React from "react";
import { ToastContainer } from "react-toastify";
import LeftNavigatioMenu from "../components/LeftBurgerMenu/LeftNavigationMenu";
import Login from "../components/Login/Login";
import "react-toastify/dist/ReactToastify.css";

const page: React.FC = () => {
  return (
    <div className="text-black">
      <ToastContainer />
      <Login />
      <LeftNavigatioMenu />
    </div>
  );
};

export default page;
