"use client";

import { createContext, useContext } from "react";

export const RegionContext = createContext<string>("CA");

export function useRegion() {
  return useContext(RegionContext);
}
