import React, { createContext } from 'react';

interface HouseContext {
  userHouse: string;
  setUserHouse: (house: string) => void;
}

export const HouseContext = createContext<HouseContext | null>(null);