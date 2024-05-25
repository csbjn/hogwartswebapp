import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { Button, ButtonGroup } from '@chakra-ui/react';
import validationSchema from '../password/validationSchema';

interface Address {
  name: string;
  country: string;
  city: string;
  street: string;
  zip: string;
}

interface FormValues {
  username: string;
  password: string;
  passwordConfirm: string;
  firstName: string;
  lastName: string;
  homeAddress: Address;
  notificationAddress: Address;
}

const RegistrationForm: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [sameAsHomeAddress, setSameAsHomeAddress] = useState(false);
  const navigate = useNavigate();

  const formik = useFormik<FormValues>({
    initialValues: {
      username: '',
      password: '',
      passwordConfirm: '',
      firstName: '',
      lastName: '',
      homeAddress: {
        name: '',
        country: '',
        city: '',
        street: '',
        zip: '',
      },
      notificationAddress: {
        name: '',
        country: '',
        city: '',
        street: '',
        zip: '',
      },
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      setError(null);
      setSuccess(null);
      try {
        const response = await fetch('http://localhost:5000/user', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        });

        if (response.ok) {
          const data = await response.json();
          setSuccess('Sikeres regisztráció!');
          resetForm();
          setTimeout(() => {
            navigate('/login');
          }, 3000);
        } else {
          const errorData = await response.json();
          switch (response.status) {
            case 400:
              throw new Error(errorData.message || 'A bevitt adatok érvénytelenek.');
            case 409:
              throw new Error(errorData.message || 'A felhasználó már létezik.');
            default:
              throw new Error(errorData.message || 'Ismeretlen hiba történt.');
          }
        }
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
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
    <div style={{ maxWidth: '400px', maxHeight: '80vh', overflowY: 'auto', margin: 'auto', padding: '20px', border: '1px solid #ccc', borderRadius: '5px' }}>
      <h2 style={{ textAlign: 'center' }}>Regisztrációs űrlap</h2>
      <form onSubmit={formik.handleSubmit}>
        {/* username input */}
        <div style={{ marginBottom: '15px' }}>
          <input
            type="email"
            name="username"
            placeholder="Felhasználónév"
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
          />
          {formik.touched.username && formik.errors.username && (
            <div style={{ color: 'red' }}>{formik.errors.username}</div>
          )}
        </div>

        {/* password input */}
        <div style={{ marginBottom: '15px' }}>
          <input
            type="password"
            name="password"
            placeholder="Jelszó"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
          />
          {formik.touched.password && formik.errors.password && (
            <div style={{ color: 'red' }}>{formik.errors.password}</div>
          )}
        </div>

        {/* passwordConfirm input */}
        <div style={{ marginBottom: '15px' }}>
          <input
            type="password"
            name="passwordConfirm"
            placeholder="Jelszó megerősítése"
            value={formik.values.passwordConfirm}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
          />
          {formik.touched.passwordConfirm && formik.errors.passwordConfirm && (
            <div style={{ color: 'red' }}>{formik.errors.passwordConfirm}</div>
          )}
        </div>

        {/* firstName input */}
        <div style={{ marginBottom: '15px' }}>
          <input
            type="text"
            name="firstName"
            placeholder="Keresztnév"
            value={formik.values.firstName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
          />
          {formik.touched.firstName && formik.errors.firstName && (
            <div style={{ color: 'red' }}>{formik.errors.firstName}</div>
          )}
        </div>

        {/* lastName input */}
        <div style={{ marginBottom: '15px' }}>
          <input
            type="text"
            name="lastName"
            placeholder="Vezetéknév"
            value={formik.values.lastName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
          />
          {formik.touched.lastName && formik.errors.lastName && (
            <div style={{ color: 'red' }}>{formik.errors.lastName}</div>
          )}
        </div>

        <h3>Otthoni cím</h3>
        {/* homeAddress inputs */}
        <div style={{ marginBottom: '15px' }}>
          <input
            type="text"
            name="homeAddress.name"
            placeholder="Név"
            value={formik.values.homeAddress.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
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
            style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
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
            style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
          />
          {formik.touched.homeAddress?.city && formik.errors.homeAddress?.city && (
            <div style={{ color: 'red' }}>{formik.errors.homeAddress.city}</div>
          )}
        </div>
        <div style={{ marginBottom: '15px' }}>
          <input
            type="text"
            name="homeAddress.street"
            placeholder="Utca, házszám"
            value={formik.values.homeAddress.street}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
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
            style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
          />
          {formik.touched.homeAddress?.zip && formik.errors.homeAddress?.zip && (
            <div style={{ color: 'red' }}>{formik.errors.homeAddress.zip}</div>
          )}
        </div>

        <label>
          <input
            type="checkbox"
            checked={sameAsHomeAddress}
            onChange={(e) => setSameAsHomeAddress(e.target.checked)}
          />
          Az értesítési cím megegyezik a lakcímmel
        </label>

        <h3>Értesítési cím</h3>
        {/* notificationAddress inputs */}
        <div style={{ marginBottom: '15px' }}>
          <input
            type="text"
            name="notificationAddress.name"
            placeholder="Név"
            value={formik.values.notificationAddress.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={sameAsHomeAddress}
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '5px',
              border: '1px solid #ccc',
              backgroundColor: sameAsHomeAddress ? '#f0f0f0' : 'white'
            }}
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
            disabled={sameAsHomeAddress}
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '5px',
              border: '1px solid #ccc',
              backgroundColor: sameAsHomeAddress ? '#f0f0f0' : 'white'
            }}
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
            disabled={sameAsHomeAddress}
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '5px',
              border: '1px solid #ccc',
              backgroundColor: sameAsHomeAddress ? '#f0f0f0' : 'white'
            }}
          />
          {formik.touched.notificationAddress?.city && formik.errors.notificationAddress?.city && (
            <div style={{ color: 'red' }}>{formik.errors.notificationAddress.city}</div>
          )}
        </div>
        <div style={{ marginBottom: '15px' }}>
          <input
            type="text"
            name="notificationAddress.street"
            placeholder="Utca, házszám"
            value={formik.values.notificationAddress.street}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={sameAsHomeAddress}
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '5px',
              border: '1px solid #ccc',
              backgroundColor: sameAsHomeAddress ? '#f0f0f0' : 'white'
            }}
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
            disabled={sameAsHomeAddress}
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '5px',
              border: '1px solid #ccc',
              backgroundColor: sameAsHomeAddress ? '#f0f0f0' : 'white'
            }}
          />
          {formik.touched.notificationAddress?.zip && formik.errors.notificationAddress?.zip && (
            <div style={{ color: 'red' }}>{formik.errors.notificationAddress.zip}</div>
          )}
        </div>

        {error && <p style={{ color: 'red', textAlign: 'center', marginTop: '10px' }}>{error}</p>}
        {success && <p style={{ color: 'green', textAlign: 'center', marginTop: '10px' }}>{success}</p>}

        <ButtonGroup>
          <Button type="submit" colorScheme="green" width="100%" isDisabled={!formik.isValid || formik.isSubmitting}>
            Regisztráció
          </Button>
          <Button type="button" colorScheme="red" width="100%" onClick={() => formik.resetForm()}>
            Mégsem
          </Button>
        </ButtonGroup>
      </form>
    </div>
  );
};

export default RegistrationForm;
