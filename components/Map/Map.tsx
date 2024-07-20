import React, { useEffect, useRef, useContext } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useMapLocations } from "../../Utils/contextProvider/ContextProvider";
mapboxgl.accessToken = process.env.NEXT_PUBLIC_ACCESS_TOKEN_MAPBOX || "";

const Map = () => {
  const mapContainerRef = useRef(null);

  const { locations } = useMapLocations();

  console.log("LocationsMap:", locations);

  useEffect(() => {
    if (typeof window !== "undefined" && mapContainerRef.current) {
      const map = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: "mapbox://styles/mapbox/streets-v11",
        center: [
          locations.OriginLng ?? 39.2083,
          locations.OriginLat ?? -6.7924,
        ],
        zoom: 17,
      });

      return () => map.remove();
    }
  }, [locations]);

  return <div className="absolute h-screen w-full" ref={mapContainerRef} />;
};

export default Map;
