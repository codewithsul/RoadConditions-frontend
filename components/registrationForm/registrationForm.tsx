"use client";
import React from "react";
import registerImage from "../../app/images/registerImage.jpg";
import Image from "next/image";
import { useState } from "react";

const RegistrationForm: React.FC = () => {
  const [showRegister, setShowRegister] = useState<boolean>(false);

  const handleShowRegister = () => {
    setShowRegister(true);
  };

  const closeShowRegister = () => {
    setShowRegister(!showRegister);
  };
  return (
    <div>
      <div>
        <button
          className="absolute top-18 right-14 w-32 h-10 rounded-3xl bg-yellow-500 shadow-lg text-white font-medium hover:bg-yellow-600 hover:cursor-pointer transition-all ease-in"
          onClick={handleShowRegister}
        >
          Register now
        </button>
      </div>
      {showRegister && (
        <div className="absolute flex flex-row top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2/3 h-2/3 bg-gray-100 rounded-lg shadow-lg z-50 ">
          <div className="flex justify-center h-full w-1/2 bg-blue-500 py-14">
            <div
              className="absolute left-7 top-5 text-white hover:bg-white w-9 h-9 rounded-3xl flex items-center justify-center hover:cursor-pointer hover:shadow-lg hover:text-black transition-all ease-in-out"
              onClick={closeShowRegister}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="size-7"
              >
                <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
              </svg>
            </div>
            <div className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="First name"
                className="w-64 h-11 rounded-md bg-gray-200 text-sm text-black px-3 outline-none focus:border-cyan-300 focus:border"
              />
              <input
                type="text"
                placeholder="Second name"
                className="w-64 h-11 rounded-md bg-gray-200 text-sm text-black px-3 outline-none focus:border-cyan-300 focus:border"
              />
              <input
                type="email"
                placeholder="Email address"
                className="w-64 h-11 rounded-md bg-gray-200 text-sm text-black px-3 outline-none focus:border-cyan-300 focus:border"
              />
              <input
                type="password"
                placeholder="Password"
                className="w-64 h-11 rounded-md bg-gray-200 text-sm text-black px-3 outline-none focus:border-cyan-300 focus:border"
              />
              <input
                type="password"
                placeholder="Confirm password"
                className="w-64 h-11 rounded-md bg-gray-200 text-sm text-black px-3 outline-none focus:border-cyan-300 focus:border"
              />
              <input
                type="text"
                placeholder="Address (City)"
                className="w-64 h-11 rounded-md bg-gray-200 text-sm text-black px-3 outline-none focus:border-cyan-300 focus:border"
              />
              <input
                type="submit"
                value="Register"
                className="w-32 h-11 mt-5 font-medium bg-white text-black rounded-3xl cursor-pointer hover:bg-slate-200 transition-all ease-in-out"
              />
            </div>
          </div>
          <div className="flex flex-col items-center h-full w-1/2 bg-white">
            <div className="mt-14">
              <Image src={registerImage} alt="register" className="w-64 h-64" />
            </div>
            <div className="flex">
              <p className="text-sm text-gray-800">we make you move fast</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegistrationForm;
