"use client";
import { useState, useContext } from "react";
import LeftNavigatioMenu from "../components/LeftBurgerMenu/LeftNavigationMenu";
import {
  MapLocations,
  MapLocationsContext,
  MapLocationsProvider,
} from "@/Utils/contextProvider/ContextProvider";
import { Inter } from "next/font/google";
import "./globals.css";
import dynamic from "next/dynamic";

const DynamicMap = dynamic(() => import("../components/Map/Map"), {
  ssr: false,
});

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="relative h-full overflow-hidden">
        <div className="relative h-full">
          <div className="absolute inset-0 z-10">
            <MapLocationsProvider>
              <DynamicMap />
              <LeftNavigatioMenu />
            </MapLocationsProvider>
          </div>
          <div
            className={`absolute inset-0 z-20 pointer-events-none ${inter.className}`}
          >
            <div className="pointer-events-auto">{children}</div>
          </div>
        </div>
      </body>
    </html>
  );
}
