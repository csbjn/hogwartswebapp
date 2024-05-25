// passwordValidator.ts

const passwordValidator = (value: string | undefined): boolean => {
    if (!value) return false;
    return (
        value.length >= 8 &&
        /[a-z]/.test(value) && // Check for at least one lowercase letter
        /[A-Z]/.test(value) && // Check for at least one uppercase letter
        /\d/.test(value) && // Check for at least one number
        /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(value) // Check for at least one special character
    );
};

export default passwordValidator;
