"use client";
import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import process from "process";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_ACCESS_TOKEN_MAPBOX || "";

const Map: React.FC = () => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && mapContainerRef.current) {
      const map = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: "mapbox://styles/mapbox/streets-v11",
        center: [-0.09, 51.505],
        zoom: 13,
      });

      return () => {
        map.remove();
      };
    }
  }, []);

  return <div className="h-screen w-full" ref={mapContainerRef} />;
};

export default Map;
