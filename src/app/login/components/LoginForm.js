'use client'

import { Form, Formik } from "formik";
import * as Yup from "yup";
import { FormikTextInput, FormikErrors, createHandleSubmit } from "@/components/FormikFields";
import { useRouter } from "next/navigation";
import { useLoginUserMutation } from '@/lib/features/api/apiSlice';
import { ButtonSubmit, Button } from '@/components/Button';

const LoginSchema = Yup.object().shape({
    email: Yup.string().email("Wrong email").required("Required"),
    password: Yup.string().label("Password").label("Password").required(),
  });

export default function LoginForm() {
    const [loginUser, { isLoading, error }] = useLoginUserMutation();
    const router = useRouter();

    async function handleSubmit(values, formikHelpers) {
      const handle = createHandleSubmit({
        asyncFunc: async (values) => loginUser(values).unwrap(),
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
                <ButtonSubmit disabled={isLoading}>
                  {isLoading ? "Signing In..." : "Sign In"}
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