"use client";
import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_ACCESS_TOKEN_MAPBOX || "";

const Map = () => {
  const mapContainerRef = useRef(null);

  useEffect(() => {
    if (typeof window !== "undefined" && mapContainerRef.current) {
      const map = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: "mapbox://styles/mapbox/streets-v11",
        center: [39.2083, -6.7924], // Coordinates for Dar es Salaam, Tanzania
        zoom: 15,
      });

      return () => map.remove();
    }
  }, []);

  return <div className="absolute h-screen w-full" ref={mapContainerRef} />;
};

export default Map;
