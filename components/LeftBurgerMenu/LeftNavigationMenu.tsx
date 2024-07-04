"use client";
import React from "react";
import { useState } from "react";

const LeftNavigatioMenu: React.FC = () => {
  const [openNavigation, setOpenNavigation] = useState(true);

  const handleNavigation = () => {
    setOpenNavigation(!openNavigation);
  };

  return (
    <>
      <div
        className="text-black absolute top-7 left-7 w-11 h-11 rounded-xl bg-gray-100 flex items-center justify-center hover:cursor-pointer hover:bg-gray-200 shadow-lg"
        onClick={handleNavigation}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="size-8"
        >
          <path
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 0 1 2.75 4h14.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 4.75ZM2 10a.75.75 0 0 1 .75-.75h14.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 10Zm0 5.25a.75.75 0 0 1 .75-.75h14.5a.75.75 0 0 1 0 1.5H2.75a.75.75 0 0 1-.75-.75Z"
            clipRule="evenodd"
          />
        </svg>
      </div>

      {!openNavigation && (
        <div
          className="bg-gray-500 opacity-40 h-screen w-full absolute top-0 left-0"
          onClick={handleNavigation}
        ></div>
      )}

      <div
        className={`absolute h-screen w-72 bg-gray-100 shadow-lg left-0 top-0 transition-transform ease-in-out duration-300 ${
          openNavigation ? "-translate-x-full" : "translate-x-0"
        }`}
      >
        {!openNavigation && (
          <div className="relative">
            <div className="text-lg text-black w-full px-5 py-5 border-b border-slate-150 font-bold flex flex-row gap-26">
              {" "}
              DIRECTIONS{" "}
              <div onClick={handleNavigation}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="size-7 hover:cursor-pointer"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.72 9.47a.75.75 0 0 0 0 1.06l4.25 4.25a.75.75 0 1 0 1.06-1.06L6.31 10l3.72-3.72a.75.75 0 1 0-1.06-1.06L4.72 9.47Zm9.25-4.25L9.72 9.47a.75.75 0 0 0 0 1.06l4.25 4.25a.75.75 0 1 0 1.06-1.06L11.31 10l3.72-3.72a.75.75 0 0 0-1.06-1.06Z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
            <div className="flex flex-col gap-2 w-full px-5 border-b py-5">
              <div className="flex flex-row">
                <div className="text-sm text-gray-600 px-3 ">
                  Show traffic jams
                </div>
                <label className="relative inline-flex items-center cursor-pointer ml-14">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 rounded-full peer-checked:bg-blue-500 dark:bg-gray-400 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                </label>
              </div>
              <div className="flex flex-row">
                <div className="text-sm text-gray-600 px-3 ">Show reports</div>
                <label className="relative inline-flex items-center cursor-pointer ml-21">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 rounded-full peer-checked:bg-blue-500 dark:bg-gray-400 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                </label>
              </div>
            </div>
            <ul className=" w-full border-b px-5 py-5 flex flex-col gap-3">
              <li className="text-sm text-gray-600 px-3">About us</li>
              <li className="text-sm text-gray-600 px-3">Partners</li>
              <li className="text-sm text-gray-600 px-3">Support</li>
            </ul>
          </div>
        )}
      </div>
    </>
  );
};

export default LeftNavigatioMenu;
