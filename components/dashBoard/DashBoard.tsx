"use client";
import React from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const DashBoard: React.FC = () => {
  const [userName, setUserName] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const firstName = localStorage.getItem("firstName");

    if (firstName !== null) {
      setUserName(firstName);
    } else {
      setUserName("");
    }

    if (!token) {
      router.push("/home");
    }
  }, []);
  return (
    <div>
      <div className="bg-red-200 w-full h-screen flex justify-center items-center">
        Hello World
      </div>
    </div>
  );
};

export default DashBoard;
