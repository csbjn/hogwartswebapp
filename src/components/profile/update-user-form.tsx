import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { Button, ButtonGroup } from '@chakra-ui/react';

interface Address {
    name: string;
    country: string;
    city: string;
    street: string;
    zip: string;
}

interface User {
    email: string;
    firstName: string;
    lastName: string;
    userId: string;
    homeAddress: Address;
    notificationAddress: Address;
}

const UpdateUserForm: React.FC = () => {
    const [user, setUser] = useState<User | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [sameAsHomeAddress, setSameAsHomeAddress] = useState(false);
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
            homeAddress: user?.homeAddress || { name: '', country: '', city: '', street: '', zip: '' },
            notificationAddress: user?.notificationAddress || { name: '', country: '', city: '', street: '', zip: '' },
        },
        enableReinitialize: true,
        validationSchema: Yup.object({
            firstName: Yup.string().required('Kötelező mező'),
            lastName: Yup.string().required('Kötelező mező'),
            homeAddress: Yup.object({
                name: Yup.string().required('Kötelező mező'),
                country: Yup.string().required('Kötelező mező'),
                city: Yup.string().required('Kötelező mező'),
                street: Yup.string().required('Kötelező mező'),
                zip: Yup.string().required('Kötelező mező'),
            }),
            notificationAddress: Yup.object({
                name: Yup.string().required('Kötelező mező'),
                country: Yup.string().required('Kötelező mező'),
                city: Yup.string().required('Kötelező mező'),
                street: Yup.string().required('Kötelező mező'),
                zip: Yup.string().required('Kötelező mező'),
            }),
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

    useEffect(() => {
        if (sameAsHomeAddress) {
            formik.setFieldValue('notificationAddress', formik.values.homeAddress);
        } else {
            formik.setFieldValue('notificationAddress', {
                name: '',
                country: '',
                city: '',
                street: '',
                zip: '',
            });
        }
    }, [sameAsHomeAddress]);

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

                <h3>Otthoni cím</h3>
                <div style={{ marginBottom: '15px' }}>
                    <input
                        type="text"
                        name="homeAddress.name"
                        placeholder="Név"
                        value={formik.values.homeAddress.name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', color: 'black', backgroundColor: '#e0e0e0' }}
                    />
                    {formik.touched.homeAddress?.name && formik.errors.homeAddress?.name && (
                        <div style={{ color: 'red' }}>{formik.errors.homeAddress.name}</div>
                    )}
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <input
                        type="text"
                        name="homeAddress.country"
                        placeholder="Ország"
                        value={formik.values.homeAddress.country}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', color: 'black', backgroundColor: '#e0e0e0' }}
                    />
                    {formik.touched.homeAddress?.country && formik.errors.homeAddress?.country && (
                        <div style={{ color: 'red' }}>{formik.errors.homeAddress.country}</div>
                    )}
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <input
                        type="text"
                        name="homeAddress.city"
                        placeholder="Város"
                        value={formik.values.homeAddress.city}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', color: 'black', backgroundColor: '#e0e0e0' }}
                    />
                    {formik.touched.homeAddress?.city && formik.errors.homeAddress?.city && (
                        <div style={{ color: 'red' }}>{formik.errors.homeAddress.city}</div>
                    )}
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <input
                        type="text"
                        name="homeAddress.street"
                        placeholder="Utca"
                        value={formik.values.homeAddress.street}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', color: 'black', backgroundColor: '#e0e0e0' }}
                    />
                    {formik.touched.homeAddress?.street && formik.errors.homeAddress?.street && (
                        <div style={{ color: 'red' }}>{formik.errors.homeAddress.street}</div>
                    )}
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <input
                        type="text"
                        name="homeAddress.zip"
                        placeholder="Irányítószám"
                        value={formik.values.homeAddress.zip}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', color: 'black', backgroundColor: '#e0e0e0' }}
                    />
                    {formik.touched.homeAddress?.zip && formik.errors.homeAddress?.zip && (
                        <div style={{ color: 'red' }}>{formik.errors.homeAddress.zip}</div>
                    )}
                </div>

                <h3>Értesítési cím</h3>
                <div style={{ marginBottom: '15px' }}>
                    <label>
                        <input
                            type="checkbox"
                            checked={sameAsHomeAddress}
                            onChange={(e) => setSameAsHomeAddress(e.target.checked)}
                        />
                        Ugyanaz, mint az otthoni cím
                    </label>
                </div>
                {!sameAsHomeAddress && (
                    <>
                        <div style={{ marginBottom: '15px' }}>
                            <input
                                type="text"
                                name="notificationAddress.name"
                                placeholder="Név"
                                value={formik.values.notificationAddress.name}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', color: 'black', backgroundColor: '#e0e0e0' }}
                            />
                            {formik.touched.notificationAddress?.name && formik.errors.notificationAddress?.name && (
                                <div style={{ color: 'red' }}>{formik.errors.notificationAddress.name}</div>
                            )}
                        </div>
                        <div style={{ marginBottom: '15px' }}>
                            <input
                                type="text"
                                name="notificationAddress.country"
                                placeholder="Ország"
                                value={formik.values.notificationAddress.country}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', color: 'black', backgroundColor: '#e0e0e0' }}
                            />
                            {formik.touched.notificationAddress?.country && formik.errors.notificationAddress?.country && (
                                <div style={{ color: 'red' }}>{formik.errors.notificationAddress.country}</div>
                            )}
                        </div>
                        <div style={{ marginBottom: '15px' }}>
                            <input
                                type="text"
                                name="notificationAddress.city"
                                placeholder="Város"
                                value={formik.values.notificationAddress.city}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', color: 'black', backgroundColor: '#e0e0e0' }}
                            />
                            {formik.touched.notificationAddress?.city && formik.errors.notificationAddress?.city && (
                                <div style={{ color: 'red' }}>{formik.errors.notificationAddress.city}</div>
                            )}
                        </div>
                        <div style={{ marginBottom: '15px' }}>
                            <input
                                type="text"
                                name="notificationAddress.street"
                                placeholder="Utca"
                                value={formik.values.notificationAddress.street}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', color: 'black', backgroundColor: '#e0e0e0' }}
                            />
                            {formik.touched.notificationAddress?.street && formik.errors.notificationAddress?.street && (
                                <div style={{ color: 'red' }}>{formik.errors.notificationAddress.street}</div>
                            )}
                        </div>
                        <div style={{ marginBottom: '15px' }}>
                            <input
                                type="text"
                                name="notificationAddress.zip"
                                placeholder="Irányítószám"
                                value={formik.values.notificationAddress.zip}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', color: 'black', backgroundColor: '#e0e0e0' }}
                            />
                            {formik.touched.notificationAddress?.zip && formik.errors.notificationAddress?.zip && (
                                <div style={{ color: 'red' }}>{formik.errors.notificationAddress.zip}</div>
                            )}
                        </div>
                    </>
                )}

                {error && <div style={{ color: 'red', marginBottom: '15px' }}>{error}</div>}
                {success && <div style={{ color: 'green', marginBottom: '15px' }}>{success}</div>}

                <ButtonGroup spacing="6">
                    <Button type="submit" colorScheme="teal">
                        Mentés
                    </Button>
                    <Button type="button" colorScheme="gray" onClick={() => navigate('/profile')}>
                        Mégse
                    </Button>
                </ButtonGroup>
            </form>
        </div>
    );
};

export default UpdateUserForm;
