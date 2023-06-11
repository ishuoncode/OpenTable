'use client';
import { useFormik } from 'formik';
import { reservationValidation } from './FormValidate';
import useReservation from '@/hooks/useReservation';
import { CircularProgress } from '@mui/material';
import { useState } from 'react';

const initialValues = () => {
  return {
    bookerEmail: '',
    bookerFirstName: '',
    bookerLastName: '',
    bookerPhone: '',
    bookerOccasion: '',
    bookerRequest: '',
  };
};
export default function Form({
  slug,
  date,
  partySize,
}: {
  slug: string;
  date: string;
  partySize: string;
}) {
  const { didBook, loading, createReservation } = useReservation();

  const [day, time] = date.split('T');

  const {
    errors,
    handleBlur,
    handleSubmit,
    values,
    handleChange,
    isValid,
    touched,
  } = useFormik({
    initialValues: initialValues(),
    validationSchema: reservationValidation,
    onSubmit: (values, action) => {
      createReservation({
        slug,
        partySize,
        day,
        time,
        bookerEmail: values.bookerEmail,
        bookerFirstName: values.bookerFirstName,
        bookerLastName: values.bookerLastName,
        bookerPhone: values.bookerPhone,
        bookerOccasion: values.bookerOccasion,
        bookerRequest: values.bookerRequest,
      });

      action.resetForm();
    },
  });
  return (
    <>
    {didBook ? <div className='mt-10'>
      <h1>You are all booked up</h1>
      <p>Enjoy your reservation</p>
    </div> : ( <form onSubmit={handleSubmit}>
      <div className="mt-10 flex flex-wrap justify-between w-[660px]">
        <div className="my-3 flex justify-between text-sm flex-col w-[49%]">
          <input
            type="text"
            id="bookerFirstName"
            name="bookerFirstName"
            autoComplete="off"
            value={values.bookerFirstName}
            onChange={handleChange}
            onBlur={handleBlur}
            className="border rounded p-3 w-80 mb-4"
            placeholder="First name"
          />
          {errors.bookerFirstName && touched.bookerFirstName ? (
            <p className="text-red-700">{errors.bookerFirstName}</p>
          ) : null}
        </div>
        <div className="my-3 flex justify-between text-sm flex-col w-[49%]">
          <input
            type="text"
            id="bookerLastName"
            name="bookerLastName"
            autoComplete="off"
            value={values.bookerLastName}
            onChange={handleChange}
            onBlur={handleBlur}
            className="border rounded p-3 w-80 mb-4"
            placeholder="Last name"
          />
          {errors.bookerLastName && touched.bookerLastName ? (
            <p className="text-red-700">{errors.bookerLastName}</p>
          ) : null}
        </div>
        <div className="my-3 flex justify-between text-sm flex-col w-[49%]">
          <input
            type="text"
            id="bookerPhone"
            autoComplete="off"
            name="bookerPhone"
            value={values.bookerPhone}
            onChange={handleChange}
            onBlur={handleBlur}
            className="border rounded p-3 w-80 mb-4"
            placeholder="Phone number"
          />
          {errors.bookerPhone && touched.bookerPhone ? (
            <p className="text-red-700">{errors.bookerPhone}</p>
          ) : null}
        </div>
        <div className="my-3 flex justify-between text-sm flex-col w-[49%]">
          <input
            type="text"
            id="bookerEmail"
            name="bookerEmail"
            value={values.bookerEmail}
            onChange={handleChange}
            onBlur={handleBlur}
            className="border rounded p-3 w-80 mb-4"
            placeholder="Email"
          />
          {errors.bookerEmail && touched.bookerEmail ? (
            <p className="text-red-700">{errors.bookerEmail}</p>
          ) : null}
        </div>
        <div className="my-3 flex justify-between text-sm flex-col w-[49%]">
          <input
            type="text"
            id="bookerOccasion"
            name="bookerOccasion"
            value={values.bookerOccasion}
            onChange={handleChange}
            onBlur={handleBlur}
            className="border rounded p-3 w-80 mb-4"
            placeholder="Occasion (optional)"
          />
          {errors.bookerOccasion && touched.bookerOccasion ? (
            <p className="text-red-700">{errors.bookerOccasion}</p>
          ) : null}
        </div>
        <div className="my-3 flex justify-between text-sm flex-col w-[49%]">
          <input
            type="text"
            id="bookerRequest"
            name="bookerRequest"
            value={values.bookerRequest}
            onChange={handleChange}
            onBlur={handleBlur}
            className="border rounded p-3 w-80 mb-4"
            placeholder="Requests (optional)"
          />
          {errors.bookerRequest && touched.bookerRequest ? (
            <p className="text-red-700">{errors.bookerRequest}</p>
          ) : null}
        </div>
        <button
          type="submit"
          disabled={!isValid || loading}
          className="bg-red-600 w-full p-3 text-white font-bold rounded disabled:bg-gray-300"
        >
          {loading ? (
            <CircularProgress color="inherit" />
          ) : (
            'Complete reservation'
          )}
        </button>
        <p className="mt-4 text-sm">
          By clicking “Complete reservation” you agree to the OpenTable Terms
          of Use and Privacy Policy. Standard text message rates may apply. You
          may opt out of receiving text messages at any time.
        </p>
      </div>
    </form>)}
   
    </>
  );
}
