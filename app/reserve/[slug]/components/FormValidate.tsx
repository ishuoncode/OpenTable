import { object, string } from 'yup';

export const reservationValidation = object({
  bookerFirstName: string()
    .trim()
    .min(2)
    .max(25)
    .required('Please enter your firstname'),
  bookerLastName: string()
    .trim()
    .min(2)
    .max(25)
    .required('Please enter your lastname'),
  bookerEmail: string().email().required('Please enter your email'),
  bookerPhone: string()
    .matches(/^[0-9]{10}$/, 'Phone number is not valid')
    .required('Phone number is required'),
  bookerOccasion: string()
    .optional()
    .min(2, 'occassion must be more than 1 characters long')
    .max(50, 'occassion must be less than 50 characters long'),
  bookerRequest: string()
    .optional()
    .min(2, 'occassion must be more than 1 characters long')
    .max(255, 'occassion must be less than 255 characters long'),
});
