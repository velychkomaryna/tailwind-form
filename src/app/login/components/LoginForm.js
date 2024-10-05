'use client'

import { Form, Formik } from "formik";
import * as Yup from "yup";
import { useSelector } from 'react-redux';
import { FormikTextInput, FormikErrors, createHandleSubmit } from "@/components/FormikFields";
import { useDispatch } from 'react-redux';
import { useRouter } from "next/navigation";
import { loginUser, selectLoading } from  '@/features/user/userSlice';
import { ButtonSubmit, Button } from '@/components/Button';

const LoginSchema = Yup.object().shape({
    email: Yup.string().email("Wrong email").required("Required"),
    password: Yup.string().label("Password").label("Password").required(),
  });

export default function LoginForm() {
    const dispatch = useDispatch();
    const loading = useSelector(selectLoading);
    const router = useRouter();

    async function handleSubmit(values, formikHelpers) {
      const handle = createHandleSubmit({
        asyncFunc: async (values) => dispatch(loginUser(values)),
        onSuccess: () => router.push("/profile")
      });
      
      handle(values, formikHelpers);  // Call the created handle function
    };

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
                <ButtonSubmit disabled={loading}>
                  {loading ? "Signing In..." : "Sign In"}
                </ButtonSubmit>
            </div>

            <div className="mt-4">
                <Button fullWidth> Request Access </Button>
            </div>
            </Form>
          </Formik>
      </div>
    );
}