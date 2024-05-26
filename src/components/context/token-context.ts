import React, { createContext } from 'react';

interface TokenContext {
  authToken: string;
  setAuthToken: (authToken: string) => void;
}

export const TokenContext = createContext<TokenContext | null>(null);