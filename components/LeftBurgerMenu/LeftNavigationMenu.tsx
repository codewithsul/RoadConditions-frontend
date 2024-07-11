"use client";
import React from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import { GoogleMap, useLoadScript, Autocomplete } from "@react-google-maps/api";

type Library = "places";

const libraries: Library[] = ["places"];

const LeftNavigatioMenu: React.FC = () => {
  const [openNavigation, setOpenNavigation] = useState<boolean>(true);
  const [signInToShowPages, setSignInToShowPages] = useState<boolean>(false);
  const [Logged, setLogged] = useState<boolean>(false);

  const [autocomplete, setAutocomplete] =
    useState<google.maps.places.Autocomplete | null>(null);

  const [Origin, setOrigin] = useState<google.maps.places.PlaceResult | null>(
    null
  );

  const [Destination, setDestination] =
    useState<google.maps.places.PlaceResult | null>(null);

  console.log("origin:", Origin);
  console.log("Destination:", Destination);

  const onLoad = (autocompleteInstance: google.maps.places.Autocomplete) => {
    setAutocomplete(autocompleteInstance);
  };

  const onOriginChanged = () => {
    if (autocomplete !== null) {
      const place = autocomplete.getPlace();
      setOrigin(place);
      console.log("place : ", place);
    } else {
      console.log("Autocomplete is not loaded yet!");
    }
  };

  const onDestinationChanged = () => {
    if (autocomplete !== null) {
      const place = autocomplete.getPlace();
      setDestination(place);
      console.log("place : ", place);
    } else {
      console.log("Autocomplete is not loaded yet!");
    }
  };

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY || "",
    libraries,
  });

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading Maps...</div>;

  console.log("origin:", Origin);
  console.log("destination:", Destination);

  const handleNavigation = () => {
    setOpenNavigation(!openNavigation);
  };

  const handlesignInToShowPages = () => {
    setSignInToShowPages(true);
  };

  const handleToastError = () => {
    if (Logged === false) {
      toast.error("please log in in to access this feature");
    }
  };

  // const handleOriginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setOrigin(e.target.value);
  // };

  // const handleDestinationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setDestination(e.target.value);
  // };

  return (
    <div>
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
      <div className="w-96 h-56 rounded-lg bg-gray-100 shadow-lg absolute top-7 left-20 flex flex-col items-center">
        <label className="w-full flex justify-center font-bold text-lg mt-2">
          Route Directions
        </label>
        <Autocomplete
          onPlaceChanged={onOriginChanged}
          onLoad={onLoad}
          className="w-10/12"
        >
          <input
            type="text"
            placeholder="Choose starting point"
            className="w-full h-10 bg-gray-200 rounded-lg mt-4 px-3 outline-none focus:border-cyan-300 focus:border text-sm"
            onClick={handlesignInToShowPages}
          />
        </Autocomplete>

        <Autocomplete
          onPlaceChanged={onDestinationChanged}
          onLoad={onLoad}
          className="w-10/12"
        >
          <input
            type="text"
            className="w-full h-10 bg-gray-200 rounded-lg mt-4 px-3 outline-none focus:border-cyan-300 focus:border text-sm"
            placeholder="Choose destination"
            onClick={handlesignInToShowPages}
          />
        </Autocomplete>

        <div className="w-full h-10 flex mt-3 justify-center">
          <input
            type="submit"
            value="Search Route"
            className="w-1/2 rounded-2xl bg-blue-500 text-white text-md h-10 hover:cursor-pointer hover:bg-blue-600 transition-all ease-in"
          />
        </div>
      </div>
      {signInToShowPages && (
        <div className="w-96 h-14 rounded-lg bg-gray-100 shadow-lg absolute left-20 top-64 flex flex-row items-center gap-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="size-5 text-blue-500 ml-8"
          >
            <path
              fillRule="evenodd"
              d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401Z"
              clipRule="evenodd"
            />
          </svg>

          <label className="text-blue-500 text-sm">
            Sign in to see your saved pages
          </label>
        </div>
      )}

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
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    onChange={handleToastError}
                  />
                  <div className="w-11 h-6 bg-gray-200 rounded-full peer-checked:bg-blue-500 dark:bg-gray-400 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                </label>
              </div>
              <div className="flex flex-row">
                <div className="text-sm text-gray-600 px-3 ">Show reports</div>
                <label className="relative inline-flex items-center cursor-pointer ml-21">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    onChange={handleToastError}
                  />
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
    </div>
  );
};

export default LeftNavigatioMenu;
