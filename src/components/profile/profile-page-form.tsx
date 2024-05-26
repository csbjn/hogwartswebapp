import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@chakra-ui/react';
import { TokenContext } from '../context/token-context';
import { HouseContext } from '../context/house-context';

interface User {
    email: string;
    firstName: string;
    lastName: string;
    userId: string;
}

const Profile: React.FC = () => {
    const [user, setUser] = useState<User | null>(null);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const context = useContext(TokenContext);
    if (!context) {
      throw new Error("MyComponent must be used within a UserProvider");
    }
    const { authToken, setAuthToken } = context;

    const houseContext = useContext(HouseContext);
    if (!houseContext) {
        throw new Error("MyComponent must be used within a UserProvider");
    }
    const { userHouse, setUserHouse } = houseContext;

    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
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
                } else {
                    console.log("ide");
                    localStorage.removeItem('token');
                    navigate('/login');
                }
            } catch (err) {
                setError('Hiba történt az adatok lekérése során.');
                localStorage.removeItem('token');
                navigate('/login');
            }
        };

        fetchUserData();
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
        setAuthToken("");
        setUserHouse("");
    };

    const handleUpdate = () => {
        navigate('/update');
    };

    const handleChangePassword = () => {
        navigate('/change-password');
    };

    if (error) {
        return <p>{error}</p>;
    }

    if (!user) {
        return <p>Adatok betöltése...</p>;
    }

    return (
        <div style={{ maxWidth: '400px', margin: 'auto', padding: '20px', border: '1px solid #ccc', borderRadius: '5px' }}>
            <h2 style={{ textAlign: 'center' }}>Profil Oldal</h2>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Keresztnév:</strong> {user.firstName}</p>
            <p><strong>Vezetéknév:</strong> {user.lastName}</p>
            <Button colorScheme="blue" width="100%" onClick={handleUpdate} style={{ marginBottom: '10px' }}>
                Adatok Módosítása
            </Button>
            <Button colorScheme="blue" width="100%" onClick={handleChangePassword} style={{ marginBottom: '10px' }}>
                Jelszó Módosítása
            </Button>
            <Button colorScheme="red" width="100%" onClick={handleLogout}>
                Kilépés
            </Button>
        </div>
    );
};

export default Profile;
