"use client";
import React, { useState } from "react";

const Login: React.FC = () => {
  const [showLogin, setShowLogin] = useState<boolean>(false);
  const [showHelp, setShowHelp] = useState<boolean>(false);

  //handle show login
  const handleShowLogin = () => {
    setShowLogin(!showLogin);
  };

  //handle close login
  const handleShowHelp = () => {
    setShowHelp(!showHelp);
  };

  return (
    <div>
      <div>
        <button
          className={
            !showLogin
              ? "absolute top-6 right-14 w-24 h-10 rounded-3xl bg-blue-500 shadow-lg text-white font-medium hover:bg-blue-600 hover:cursor-pointer"
              : "absolute top-6 right-14 w-24 h-10 rounded-3xl bg-blue-500 shadow-lg text-white font-medium hover:bg-blue-600 hover:cursor-pointer cursor-not-allowed pointer-events-none"
          }
          onClick={handleShowLogin}
        >
          Log in
        </button>
      </div>
      <div>
        <button
          className="absolute top-6 right-40 w-10 h-10 rounded-3xl bg-gray-100 shadow-lg text-black font-medium flex justify-center items-center hover:bg-gray-200 hover:cursor-pointer hover:border-white"
          onClick={handleShowHelp}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="size-5"
          >
            <path d="M10 3a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM10 8.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM11.5 15.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0Z" />
          </svg>
        </button>
        {showHelp && (
          <div className=" absolute w-48 h-28 bg-gray-100 top-18 right-40 rounded-md shadow-md">
            <ul className=" py-5 flex flex-col gap-1 text-sm ">
              <li className="px-3 py-2 hover:cursor-pointer hover:bg-slate-200 hover:rounded-md w-3/4 h-9 ml-2">
                Help center
              </li>
              <li className="px-3 py-2 hover:cursor-pointer hover:bg-slate-200 hover:rounded-md w-3/4 h-9 ml-2">
                Report an issue
              </li>
            </ul>
          </div>
        )}
      </div>
      {showLogin && (
        <div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2/3 h-2/3 bg-gray-100 rounded-lg shadow-lg">
            <div
              className="absolute left-7 top-5 text-black hover:bg-white w-9 h-9 rounded-3xl flex items-center justify-center hover:cursor-pointer hover:shadow-lg"
              onClick={handleShowLogin}
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

            <div className="relative flex justify-center mt-21">
              <div className="border w-3/4 "></div>
            </div>
            <div className="flex justify-center">
              <div className=" flex flex-col justify-center mt-28 text-sm">
                <div className="flex justify-center">
                  <div className="text-black font-medium">
                    <label>Sign in with username or password</label>
                  </div>
                </div>
                <div className="flex flex-row mt-11">
                  <div className="flex gap-3">
                    <input
                      type="text"
                      placeholder="Username"
                      className="w-64 h-11 rounded-md bg-gray-200 text-sm text-black px-3 outline-none focus:border-cyan-300 focus:border"
                    />
                    <input
                      type="text"
                      placeholder="Password"
                      className="w-64 h-11 rounded-md bg-gray-200 text-sm text-black px-3 outline-none focus:border-cyan-300 focus:border"
                    />
                    <input
                      type="submit"
                      value="Sign in"
                      className="w-21 h-11 bg-blue-500 text-white rounded-3xl hover:bg-blue-600 hover:cursor-pointer font-bold"
                    />
                  </div>
                </div>
                <div className="flex justify-center mt-5">
                  <div className="text-gray-500 text-xs">
                    <label>forgot your password ?</label>
                  </div>
                </div>
                <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex justify-center">
                  <div className="text-gray-500 text-xs">
                    <label>
                      This site is protected by reCAPCHA and GOOGLE{" "}
                      <text className="text-blue-600">privacy policy</text> .
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
