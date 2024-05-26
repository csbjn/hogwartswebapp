import React, { useState, useEffect, useContext } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate, useLocation } from 'react-router-dom'; // useLocation importálása
import { Button, ButtonGroup } from '@chakra-ui/react';
import { TokenContext } from '../context/token-context';

const LoginForm: React.FC = () => {
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    const location = useLocation(); // useLocation használata

    const context = useContext(TokenContext);
    if (!context) {
        throw new Error("MyComponent must be used within a UserProvider");
    }
    const { authToken, setAuthToken } = context;

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            navigate("/profile");
        }
    }, [navigate, location]);

    const validationSchema = Yup.object({
        username: Yup.string().email('Érvénytelen email cím').required('Kötelező mező'),
        password: Yup.string()
            .min(8, 'A jelszónak legalább 8 karakter hosszúnak kell lennie')
            .matches(/\d/, 'A jelszónak tartalmaznia kell legalább egy számot')
            .matches(/[a-z]/, 'A jelszónak tartalmaznia kell legalább egy kisbetűt')
            .required('Kötelező mező'),
    });

    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
        },
        validationSchema,
        onSubmit: async (values) => {
            setError(null);
            try {
                const response = await fetch('http://localhost:5000/user/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(values),
                });

                if (response.ok) {
                    const data = await response.json();
                    localStorage.setItem('token', data.accessToken);
                    setAuthToken(data.accessToken);
                    navigate('/');
                } else {
                    const errorData = await response.json();
                    switch (response.status) {
                        case 400:
                            throw new Error(errorData.message || 'A bevitt adatok érvénytelenek.');
                        case 401:
                            throw new Error(errorData.message || 'Hibás felhasználónév vagy jelszó.');
                        default:
                            throw new Error(errorData.message || 'Ismeretlen hiba történt.');
                    }
                }
            } catch (err) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError('Ismeretlen hiba történt.');
                }
            }
        },
    });

    return (
        <div style={{ maxWidth: '400px', margin: 'auto', padding: '20px', border: '1px solid #ccc', borderRadius: '5px' }}>
            <h2 style={{ textAlign: 'center' }}>Belépés</h2>
            <form onSubmit={formik.handleSubmit}>
                <div style={{ marginBottom: '15px' }}>
                    <input
                        type="email"
                        name="username"
                        placeholder="Felhasználónév"
                        value={formik.values.username}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', color: 'black', backgroundColor: '#e0e0e0' }}
                    />
                    {formik.touched.username && formik.errors.username && (
                        <div style={{ color: 'red' }}>{formik.errors.username}</div>
                    )}
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <input
                        type="password"
                        name="password"
                        placeholder="Jelszó"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', color: 'black', backgroundColor: '#e0e0e0' }}
                    />
                    {formik.touched.password && formik.errors.password && (
                        <div style={{ color: 'red' }}>{formik.errors.password}</div>
                    )}
                </div>
                {error && <p style={{ color: 'red', textAlign: 'center', marginTop: '10px' }}>{error}</p>}
                <ButtonGroup>
                    <Button type="submit" colorScheme="green" width="100%" isDisabled={!formik.isValid || formik.isSubmitting}>
                        Belépés
                    </Button>
                </ButtonGroup>
                <p style={{ textAlign: 'center', marginTop: '10px' }}>
                    Nincs fiókod? <a href="/register">Regisztráció</a>
                </p>
            </form>
        </div>
    );
};

export default LoginForm;
