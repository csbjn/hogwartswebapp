import * as Yup from 'yup';
import passwordValidator from './passwordValidator';

const addressSchema = Yup.object().shape({
  name: Yup.string().required('Kötelező mező'),
  country: Yup.string().required('Kötelező mező'),
  city: Yup.string().required('Kötelező mező'),
  street: Yup.string().required('Kötelező mező'),
  zip: Yup.string().required('Kötelező mező'),
});

const optionalAddressSchema = Yup.object().shape({
  name: Yup.string(),
  country: Yup.string(),
  city: Yup.string(),
  street: Yup.string(),
  zip: Yup.string(),
}).test(
  'isValidOptionalAddress',
  'A címmezők közül legalább egy kitöltése kötelező, ha bármelyik meg van adva.',
  (value) => {
    if (!value) return true;
    const { name, country, city, street, zip } = value;
    const hasAnyField = name || country || city || street || zip;
    const allFieldsFilled = !!(name && country && city && street && zip);
    return !hasAnyField || allFieldsFilled;
  }
);

const validationSchema = Yup.object({
  username: Yup.string()
    .email('Érvénytelen email cím')
    .required('Kötelező mező'),
  password: Yup.string()
    .test(
      'password-test',
      'A jelszónak legalább 8 karakter hosszúnak kell lennie, és tartalmaznia kell legalább egy kisbetűt, egy nagybetűt, egy számot és egy speciális karaktert.',
      (value) => passwordValidator(value)
    )
    .required('Kötelező mező'),
  passwordConfirm: Yup.string()
    .oneOf([Yup.ref('password')], 'A két jelszó nem egyezik meg')
    .required('Kötelező mező'),
  firstName: Yup.string().required('Kötelező mező'),
  lastName: Yup.string().required('Kötelező mező'),
  homeAddress: addressSchema,
  notificationAddress: optionalAddressSchema,
});

export default validationSchema;
