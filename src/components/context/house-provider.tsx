import { ReactNode, useState } from "react";
import { HouseContext } from "./house-context";

interface HouseProviderProps {
    children: ReactNode;
  }
  
  export const HouseProvider: React.FC<HouseProviderProps> = ({ children }) => {
    const [userHouse, setUserHouse] = useState<string>("");
  
    return (
      <HouseContext.Provider value={{ userHouse, setUserHouse }}>
        {children}
      </HouseContext.Provider>
    );
  };
  