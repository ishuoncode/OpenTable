import { useFormik } from 'formik';
import { SignInValidation, SignUpValidation } from './AuthValidation';
import useAuth from '@/hooks/useAuth';

const initialValues = (Signin: boolean) => {
  return {
    Email: '',
    password: '',
    firstname: '',
    lastname: '',
    confirmpassword: '',
    city: '',
    phone: '',
  };
};
export default function AuthModalInput({
  isSignin,
  close,
}: {
  isSignin: boolean;
  close: () => void;
}) {
  const { signin, signup } = useAuth();

  const validation = isSignin ? SignInValidation : SignUpValidation;
  const {
    errors,
    handleBlur,
    handleSubmit,
    values,
    handleChange,
    isValid,
    touched,
  } = useFormik({
    initialValues: initialValues(isSignin),
    validationSchema: validation,
    onSubmit: (values, action) => {
      // console.log(values);
      if (isSignin) {
        signin({ email: values.Email, password: values.password }, close);
      } else {
        signup(
          {
            email: values.Email,
            password: values.password,
            firstname: values.firstname,
            lastname: values.lastname,
            city: values.city,
            phone: values.phone,
          },
          close
        );
      }

      action.resetForm();
    },
  });

  return (
    <form onSubmit={handleSubmit}>
      {!isSignin && (
        <div className="my-3 flex justify-between text-sm">
          <div className="my-3 flex justify-between text-sm flex-col w-[49%]">
            <input
              type="text"
              id="firstname"
              name="firstname"
              placeholder="First Name"
              autoComplete="off"
              value={values.firstname}
              onChange={handleChange}
              onBlur={handleBlur}
              className="border rounded p-2 py-3 "
            />
            {errors.firstname && touched.firstname ? (
              <p className="text-red-700">{errors.firstname}</p>
            ) : null}
          </div>

          <div className="my-3 flex justify-between text-sm flex-col w-[49%]">
            <input
              type="text"
              id="lastname"
              placeholder="Last Name"
              autoComplete="off"
              name="lastname"
              value={values.lastname}
              onChange={handleChange}
              onBlur={handleBlur}
              className="border rounded p-2 py-3 "
            />
            {errors.lastname && touched.lastname ? (
              <p className="text-red-700">{errors.lastname}</p>
            ) : null}
          </div>
        </div>
      )}
      <div className="my-3 flex justify-between text-sm flex-col">
        <input
          type="text"
          id="email"
          placeholder="Email"
          autoComplete="off"
          name="Email"
          value={values.Email}
          onChange={handleChange}
          onBlur={handleBlur}
          className="border rounded p-2 py-3 w-full "
        />
        {errors.Email && touched.Email ? (
          <p className="text-red-700">{errors.Email}</p>
        ) : null}
      </div>
      {!isSignin && (
        <div className="my-3 flex justify-between text-sm">
          <div className="my-3 flex justify-between text-sm flex-col w-[49%]">
            <input
              type="text"
              id="phone"
              placeholder="Phone"
              autoComplete="off"
              name="phone"
              value={values.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              className="border rounded p-2 py-3 "
            />
            {errors.phone && touched.phone ? (
              <p className="text-red-700">{errors.phone}</p>
            ) : null}
          </div>
          <div className="my-3 flex justify-between text-sm flex-col w-[49%]">
            <input
              type="text"
              id="city"
              autoComplete="off"
              name="city"
              value={values.city}
              onChange={handleChange}
              onBlur={handleBlur}
              className="border rounded p-2 py-3 "
              placeholder="City"
            />
            {errors.city && touched.city ? (
              <p className="text-red-700">{errors.city}</p>
            ) : null}
          </div>
        </div>
      )}
      <div className="my-3 flex justify-between text-sm flex-col">
        <input
          type="password"
          id="password"
          placeholder="Password"
          autoComplete="off"
          name="password"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
          className="border rounded p-2 py-3 w-full"
        />
        {errors.password && touched.password ? (
          <p className="text-red-700">{errors.password}</p>
        ) : null}
      </div>

      {!isSignin && (
        <div className="my-3 flex justify-between text-sm flex-col">
          <input
            type="password"
            id="confirmPassword"
            placeholder="Confirm Password"
            autoComplete="off"
            name="confirmpassword"
            value={values.confirmpassword}
            onChange={handleChange}
            onBlur={handleBlur}
            className="border rounded p-2 py-3 w-full"
          />
          {errors.confirmpassword && touched.confirmpassword ? (
            <p className="text-red-700">{errors.confirmpassword}</p>
          ) : null}
        </div>
      )}

      <button
        type="submit"
        disabled={!isValid}
        className="uppercase bg-red-600 w-full text-white p-3 rounded text-sm mb-5 disabled:bg-gray-400"
      >
        {isSignin ? ' Sign In' : 'Create Account'}
      </button>
    </form>
  );
}
