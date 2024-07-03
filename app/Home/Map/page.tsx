import React from "react";
import dynamic from "next/dynamic";

// Dynamically import the Map component to ensure it only runs on the client side
const DynamicMap = dynamic(() => import("../../../components/Map/Map"), {
  ssr: false,
});

const page: React.FC = () => {
  return (
    <div className="w-full h-screen">
      <DynamicMap />
    </div>
  );
};

export default page;
