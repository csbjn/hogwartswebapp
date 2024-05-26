import { ReactNode, useState } from "react";
import { TokenContext } from "./token-context";

interface TokenProviderProps {
    children: ReactNode;
  }
  
  export const TokenProvider: React.FC<TokenProviderProps> = ({ children }) => {
    const [authToken, setAuthToken] = useState<string>("");
  
    return (
      <TokenContext.Provider value={{ authToken, setAuthToken }}>
        {children}
      </TokenContext.Provider>
    );
  };