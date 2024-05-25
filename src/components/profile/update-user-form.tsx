import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { Button, ButtonGroup } from '@chakra-ui/react';

interface User {
    email: string;
    firstName: string;
    lastName: string;
    userId: string;
}

const UpdateUserForm: React.FC = () => {
    const [user, setUser] = useState<User | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
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

    const formik = useFormik({
        initialValues: {
            firstName: user?.firstName || '',
            lastName: user?.lastName || '',
        },
        enableReinitialize: true,
        validationSchema: Yup.object({
            firstName: Yup.string().required('Kötelező mező'),
            lastName: Yup.string().required('Kötelező mező'),
        }),
        onSubmit: async (values) => {
            setError(null);
            setSuccess(null);
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/login');
                return;
            }

            try {
                const response = await fetch('http://localhost:5000/user', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                    body: JSON.stringify(values),
                });

                if (response.ok) {
                    const data: User = await response.json();
                    setUser(data);
                    setSuccess('Adatok sikeresen frissítve!');
                    setTimeout(() => {
                        navigate('/profile');
                    }, 3000);
                } else {
                    const errorData = await response.json();
                    switch (response.status) {
                        case 400:
                            throw new Error(errorData.message || 'A bevitt adatok érvénytelenek.');
                        case 401:
                            throw new Error(errorData.message || 'Hiányzó vagy érvénytelen token.');
                        default:
                            throw new Error(errorData.message || 'Ismeretlen hiba történt.');
                    }
                }
            } catch (err) {
                if (err instanceof Error) {
                    if (err.message === 'Hiányzó vagy érvénytelen token.') {
                        localStorage.removeItem('token');
                        navigate('/login');
                    } else {
                        setError(err.message);
                    }
                } else {
                    setError('Ismeretlen hiba történt.');
                }
            }
        },
    });

    return (
        <div style={{ maxWidth: '400px', margin: 'auto', padding: '20px', border: '1px solid #ccc', borderRadius: '5px' }}>
            <h2 style={{ textAlign: 'center' }}>Adatok módosítása</h2>
            <form onSubmit={formik.handleSubmit}>
                <div style={{ marginBottom: '15px' }}>
                    <input
                        type="text"
                        name="firstName"
                        placeholder="Keresztnév"
                        value={formik.values.firstName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', color: 'black', backgroundColor: '#e0e0e0' }}
                    />
                    {formik.touched.firstName && formik.errors.firstName && (
                        <div style={{ color: 'red' }}>{formik.errors.firstName}</div>
                    )}
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <input
                        type="text"
                        name="lastName"
                        placeholder="Vezetéknév"
                        value={formik.values.lastName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', color: 'black', backgroundColor: '#e0e0e0' }}
                    />
                    {formik.touched.lastName && formik.errors.lastName && (
                        <div style={{ color: 'red' }}>{formik.errors.lastName}</div>
                    )}
                </div>
                {error && <p style={{ color: 'red', textAlign: 'center', marginTop: '10px' }}>{error}</p>}
                {success && <p style={{ color: 'green', textAlign: 'center', marginTop: '10px' }}>{success}</p>}
                <ButtonGroup>
                    <Button type="submit" colorScheme="green" width="100%" isDisabled={!formik.isValid || formik.isSubmitting}>
                        Mentés
                    </Button>
                </ButtonGroup>
            </form>
        </div>
    );
};

export default UpdateUserForm;
