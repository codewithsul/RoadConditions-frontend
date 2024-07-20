import React, { createContext, useContext, useState, ReactNode } from "react";

// Define the type for map locations
export type MapLocations = {
  OriginLat: number | null;
  OriginLng: number | null;
  DestinationLat: number | null;
  DestinationLng: number | null;
};

// Create a context with the default value
export const MapLocationsContext = createContext<{
  locations: MapLocations;
  setLocations: React.Dispatch<React.SetStateAction<MapLocations>>;
}>({
  locations: {
    OriginLat: null,
    OriginLng: null,
    DestinationLat: null,
    DestinationLng: null,
  },
  setLocations: () => {},
});

// Create a custom hook to use the context
export const useMapLocations = () => useContext(MapLocationsContext);

export const MapLocationsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [locations, setLocations] = useState<MapLocations>({
    OriginLat: null,
    OriginLng: null,
    DestinationLat: null,
    DestinationLng: null,
  });

  return (
    <MapLocationsContext.Provider value={{ locations, setLocations }}>
      {children}
    </MapLocationsContext.Provider>
  );
};
