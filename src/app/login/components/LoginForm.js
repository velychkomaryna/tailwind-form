'use client'

import { Form, Formik } from "formik";
import * as Yup from "yup";
import { useMutation } from 'react-query'; 
import { FormikTextInput, FormikErrors, createHandleSubmit } from "@/components/FormikFields"
import { ButtonSubmit, Button } from '@/components/Button';
import { login, USER_KEY } from "@/app/api.js";

const LoginSchema = Yup.object().shape({
    email: Yup.string().email("Wrong email").required("Required"),
    password: Yup.string().label("Password").label("Password").required(),
  });

export default function LoginForm() {
    const mutation = useMutation(login)

    async function handleSubmit(values, formikHelpers) {
        const handle = createHandleSubmit({
          mutation,
          onSuccess: (user) => {
            localStorage.setItem(USER_KEY, user.email);
            alert("Login successful")
          },
        });
        handle(values, formikHelpers);
      }

    return (
        <div className="bg-white p-12 rounded-lg shadow-md w-full max-w-md border border-gray-300">
          <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={LoginSchema}
            onSubmit={handleSubmit}
          >
            <Form>
            <FormikTextInput name="email" placeholder="Email" type="email" />
            <FormikTextInput placeholder="Password" name="password" type="password" />
            <FormikErrors className="mt-2"/>
            <div className="mt-6">
                <ButtonSubmit> Sign In </ButtonSubmit>
            </div>

            <div className="mt-4">
                <Button> Request Access </Button>
            </div>
            </Form>
          </Formik>
      </div>
    );
}