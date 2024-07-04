import React from "react";
import LeftNavigatioMenu from "../../components/LeftBurgerMenu/LeftNavigationMenu";
import Login from "../../components/Login/Login";

const page: React.FC = () => {
  return (
    <div className="text-black">
      <LeftNavigatioMenu />
      <Login />
    </div>
  );
};

export default page;
