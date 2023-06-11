import { object, string, ref } from 'yup';

export const SignUpValidation = object({
  firstname: string()
    .trim()
    .min(2)
    .max(25)
    .required('Please enter your firstname'),
  lastname: string()
    .trim()
    .min(2)
    .max(25)
    .required('Please enter your lastname'),
  Email: string().email().required('Please enter your email'),
  phone: string()
    .matches(/^[0-9]{10}$/, 'Phone number is not valid')
    .required('Phone number is required'),
  city: string()
    .min(2, 'City name must be at least 2 characters')
    .max(50, 'City name must be at most 50 characters')
    .required('City name is required'),
  password: string()
    .required('Please enter your password')
    .matches(
      /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
      'Password must contain at least 8 characters, one uppercase, one number and one special case character'
    ),
  confirmpassword: string()
    .required('Please confirm your password')
    .oneOf([ref('password')], "Passwords don't match."),
});

export const SignInValidation = object({
  Email: string().email().required('Please enter your email'),
  password: string()
    .required('Please enter your password')
    .matches(
      /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
      'Password must contain at least 8 characters, one uppercase, one number and one special case character'
    ),
});
