import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

interface User {
  email: string;
  firstName: string;
  lastName: string;
  userId: string;
  token: string; // Autentikációs token
}

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  isLoggedOut: boolean;
  login: (user: User) => void;
  logout: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isLoggedOut, setIsLoggedOut] = useState<boolean>(true);
  const [userDataFetched, setUserDataFetched] = useState<boolean>(false); // Figyelmeztető változó
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchUserData();
    } else {
      setIsLoggedOut(true);
    }
  }, [isLoggedIn]); // `isLoggedIn` állapot változásaira reagálás

  const fetchUserData = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setIsLoggedOut(true);
      navigate('/login');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/user', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data: User = await response.json();
        setUser(data);
        setIsLoggedIn(true);
        setIsLoggedOut(false);
        setUserDataFetched(true); // Figyelmeztető változó beállítása
      } else {
        setIsLoggedOut(true);
        localStorage.removeItem('token');
        navigate('/login');
      }
    } catch (err) {
      setIsLoggedOut(true);
      localStorage.removeItem('token');
      navigate('/login');
    }
  };

 // Bejelentkezés
const login = (userData: User) => {
  console.log('Bejelentkezési állapot változott: true');
  setUser(userData);
  setIsLoggedIn(true);
  setIsLoggedOut(false);
  localStorage.setItem('token', userData.token); // Felhasználó tokenjét mentjük
  navigate('/profile');
};

// Kijelentkezés
const logout = () => {
  console.log('Bejelentkezési állapot változott: false');
  setUser(null);
  setIsLoggedIn(false);
  setIsLoggedOut(true);
  localStorage.removeItem('token'); // Token törlése a kijelentkezéskor
  navigate('/login');
};

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, isLoggedOut, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export { AuthProvider };
