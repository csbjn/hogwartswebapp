import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@chakra-ui/react';

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
