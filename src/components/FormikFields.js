"use client"

import { useField, useFormikContext } from "formik";
import _ from "lodash";

export function getErrors(error) {
    if (error?.response?.status === 400) {
      let { nonFieldErrors, ...fieldErrors } = error?.response?.data;

      if (_.isEmpty(fieldErrors)) fieldErrors = undefined;
      return { fieldErrors, nonFieldErrors };
    } else {
      const genericError = error?.message;
      return { genericError };
    }
  }

export function getFormAndFieldErrors(error) {
    const { fieldErrors, nonFieldErrors, genericError } = getErrors(error);
    if (fieldErrors || nonFieldErrors) {
        const errors = {};
        if (fieldErrors) errors.fieldErrors = fieldErrors;
        if (nonFieldErrors) errors.formErrors = nonFieldErrors;
        return errors;
    } else return { formErrors: [genericError] };
}

export function createHandleSubmit({ asyncFunc, onSuccess = () => {}, throwError = false }) {
    return async function handleSubmit(values, { setErrors, setStatus }) {
      setStatus(null);
      try {
        const data = await asyncFunc(values);
        onSuccess(data);
      } catch (error) {
        const { fieldErrors, formErrors } = getFormAndFieldErrors(error);
        
        setErrors(fieldErrors);
        setStatus({ formErrors });
        if (throwError) throw error;
      }
    };
}

export function FormikTextInput({ label, ...props }) {
    const [field, meta] = useField(props);

    return (
    <div className="mb-4">
        <label htmlFor={props.id || props.name} className="block text-sm font-medium text-gray-500">
            {label}
        </label>
        <input
            {...field}
            {...props}
            className={`mt-1 block w-full px-3 py-2 border ${meta.touched && meta.error ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500`}
        />
        {meta.touched && meta.error ? (
            <p className="mt-1 text-sm text-red-600">{meta.error}</p>
        ) : null}
    </div>
    );
};

export function FormikErrors({className}) {
    const { status } = useFormikContext();
    if (status?.formErrors) {
    return (
      <div className={className}>
        {status.formErrors.map((error, index) => (
          <Error key={index}>{error}</Error>
        ))}
      </div>
    );
  }
}

export function Error({ children }) {
    return children && <p className="text-red-600 font-semibold">{children}</p>;
}
