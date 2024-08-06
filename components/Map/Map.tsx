import React, { useEffect, useRef, useContext, useState, use } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useMapLocations } from "../../Utils/contextProvider/ContextProvider";
mapboxgl.accessToken = process.env.NEXT_PUBLIC_ACCESS_TOKEN_MAPBOX || "";
import { getSensorData } from "../../Utils/sensorController/sensorController";

interface SensorData {
  id: number;
  road_id: number;
  num_cars: number;
  image_path: string;
  timestamp: string;
}
const Map = () => {
  const [sensorData, setSensorData] = useState<SensorData[]>([]);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const { locations } = useMapLocations();

  console.log("sensorData:", sensorData);

  const handleGetSensorData = async () => {
    try {
      const response = await getSensorData();
      const sensorDataRes: SensorData[] = response[0];
      setSensorData(sensorDataRes);
    } catch (error) {
      console.error("Error fetching sensor data:", error);
    }
  };

  useEffect(() => {
    handleGetSensorData();
  }, []);

  const getColorForRoad = (roadId: number) => {
    const roadData = sensorData.find((data) => data.road_id === roadId);
    if (roadData) {
      return roadData.num_cars > 5 ? "red" : "green";
    }
    return "blue";
  };

  useEffect(() => {
    if (typeof window !== "undefined" && mapContainerRef.current) {
      const map = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: "mapbox://styles/mapbox/streets-v11",
        center: [
          locations.OriginLng ?? 39.2557,
          locations.OriginLat ?? -6.8011,
        ],
        zoom: 16,
      });

      const fetchRoutes = async () => {
        const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${locations.OriginLng},${locations.OriginLat};${locations.DestinationLng},${locations.DestinationLat}?alternatives=true&geometries=geojson&access_token=${mapboxgl.accessToken}`;

        try {
          const response = await fetch(url);
          const data = await response.json();

          if (data.routes && data.routes.length > 0) {
            data.routes.slice(0, 2).forEach((route: any, index: number) => {
              const roadId = index === 0 ? 1 : 2; // Assume road_id 2 for first route and road_id 3 for second route
              const color = getColorForRoad(roadId);

              // Add a source for the route
              if (!map.getSource(`route${index}`)) {
                map.addSource(`route${index}`, {
                  type: "geojson",
                  data: {
                    type: "Feature",
                    properties: {},
                    geometry: route.geometry,
                  },
                });
              }

              // Add a layer for the route
              if (!map.getLayer(`route${index}`)) {
                const lineWidth = index === 0 ? 10 : 7; // Make the first route thicker

                map.addLayer({
                  id: `route${index}`,
                  type: "line",
                  source: `route${index}`,
                  layout: {
                    "line-cap": "round",
                    "line-join": "round",
                  },
                  paint: {
                    "line-color": color,
                    "line-width": lineWidth,
                  },
                });
              }
            });
          }
        } catch (error) {
          console.error("Error fetching routes:", error);
        }
      };

      map.on("load", () => {
        fetchRoutes();

        if (locations.OriginLng !== null && locations.OriginLat !== null) {
          new mapboxgl.Marker({ color: "green" })
            .setLngLat([locations.OriginLng, locations.OriginLat])
            .setPopup(
              new mapboxgl.Popup({ offset: 25 }) // add popups
                .setHTML("<h3 style='color: black;'>Origin</h3>")
            )
            .addTo(map);
        }

        if (
          locations.DestinationLng !== null &&
          locations.DestinationLat !== null
        ) {
          new mapboxgl.Marker({ color: "red" })
            .setLngLat([locations.DestinationLng, locations.DestinationLat])
            .setPopup(
              new mapboxgl.Popup({ offset: 25 }) // add popups
                .setHTML("<h3 style='color: black;'>Destination</h3>")
            )
            .addTo(map);
        }
      });

      return () => map.remove();
    }
  }, [locations, sensorData]);

  return <div className="absolute h-screen w-full" ref={mapContainerRef} />;
};

export default Map;
