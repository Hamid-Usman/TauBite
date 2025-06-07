import * as Yup from 'yup';

export const AuthSchema = Yup.object().shape({
    email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
    password: Yup.string()
        .min(1, 'Password must be at least 1 character')
        .required('Password is required'),
})