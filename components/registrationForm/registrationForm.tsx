"use client";
import React, { useEffect } from "react";
import registerImage from "../../app/images/registerImage.jpg";
import Image from "next/image";
import { useState } from "react";
import { createUser } from "../../Utils/userController/userController";
import { toast } from "react-toastify";

export interface Registration {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  address: string;
}

const InitialRegistration: Registration = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
  address: "",
};

const RegistrationForm: React.FC = () => {
  const [showRegister, setShowRegister] = useState<boolean>(false);

  const [registration, setRegistration] =
    useState<Registration>(InitialRegistration);

  const [token, setToken] = useState<string | null>(null);

  const handleFormInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setRegistration({ ...registration, [name]: value });
  };

  const handleShowRegister = () => {
    setShowRegister(true);
  };

  const closeShowRegister = () => {
    setShowRegister(!showRegister);
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const user = {
      firstName: registration.firstName,
      lastName: registration.lastName,
      email: registration.email,
      password: registration.password,
      address: registration.address,
    };

    if (registration.password !== registration.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (!registration.password || registration.password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    if (!registration.email || !registration.email.includes("@")) {
      toast.error("Invalid email address");
      return;
    }

    if (!registration.firstName || registration.firstName.length < 3) {
      toast.error("First name must be at least 2 characters long");
      return;
    }

    await createUser(user)
      .then(() => {
        setShowRegister(!showRegister);
        setRegistration(InitialRegistration);
      })
      .catch((error) => {
        if (
          error.response &&
          error.response.status === 400 &&
          error.response.data === "User already exists"
        ) {
          toast.error("User already exists");
          return;
        }
      });
    toast.success("registered successfully");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setToken(token);
    } else {
      setToken(null);
    }
  }, [token]);

  return (
    <div>
      <div>
        {!token ? (
          <button
            className="absolute flex top-6 right-52 w-10 h-10 rounded-3xl bg-gray-100 shadow-lg text-black font-medium hover:bg-gray-200 hover:cursor-pointer hover:border-white transition-all ease-in justify-center items-center"
            onClick={handleShowRegister}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z"
              />
            </svg>
          </button>
        ) : (
          ""
        )}
      </div>
      {showRegister && (
        <form onSubmit={handleFormSubmit}>
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
                  name="firstName"
                  required
                  onChange={handleFormInputChange}
                  className="w-64 h-11 rounded-md bg-gray-200 text-sm text-black px-3 outline-none focus:border-cyan-300 focus:border"
                />
                <input
                  type="text"
                  placeholder="Last name"
                  name="lastName"
                  required
                  onChange={handleFormInputChange}
                  className="w-64 h-11 rounded-md bg-gray-200 text-sm text-black px-3 outline-none focus:border-cyan-300 focus:border"
                />
                <input
                  type="email"
                  placeholder="Email address"
                  name="email"
                  required
                  onChange={handleFormInputChange}
                  className="w-64 h-11 rounded-md bg-gray-200 text-sm text-black px-3 outline-none focus:border-cyan-300 focus:border"
                />
                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  required
                  onChange={handleFormInputChange}
                  className="w-64 h-11 rounded-md bg-gray-200 text-sm text-black px-3 outline-none focus:border-cyan-300 focus:border"
                />
                <input
                  type="password"
                  placeholder="Confirm password"
                  name="confirmPassword"
                  required
                  onChange={handleFormInputChange}
                  className="w-64 h-11 rounded-md bg-gray-200 text-sm text-black px-3 outline-none focus:border-cyan-300 focus:border"
                />
                <input
                  type="text"
                  placeholder="Address (City)"
                  name="address"
                  required
                  onChange={handleFormInputChange}
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
                <Image
                  src={registerImage}
                  alt="register"
                  className="w-64 h-64"
                />
              </div>
              <div className="flex">
                <p className="text-sm text-gray-800">we make you move fast</p>
              </div>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default RegistrationForm;
