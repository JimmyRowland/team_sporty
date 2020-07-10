import { Field, Formik } from "formik";
import Router from "next/router";
import React from "react";
import { InputField } from "../components/fields/InputField";
import Layout from "../components/Layout";
import { useRegisterMutation } from "../generated/graphql";

export default function registerPage() {
    const [register] = useRegisterMutation();
    return (
        // <Layout title="Register page">
        <Formik
            validateOnBlur={false}
            validateOnChange={false}
            onSubmit={async (data, { setErrors }) => {
                try {
                    const response = await register({
                        variables: data,
                    });
                    console.log(response);
                    Router.push("/login");
                } catch (err) {
                    const errors: { [key: string]: string } = {};
                    err.graphQLErrors[0].validationErrors.forEach((validationErr: any) => {
                        Object.values(validationErr.constraints).forEach((message: any) => {
                            errors[validationErr.property] = message;
                        });
                    });
                    setErrors(errors);
                }
            }}
            initialValues={{
                email: "",
                password: "",
                name: "",
            }}
        >
            {({ handleSubmit }) => (
                <form onSubmit={handleSubmit}>
                    <Field name="name" placeholder="name" component={InputField} />
                    <Field name="email" placeholder="email" component={InputField} />
                    <Field name="password" placeholder="password" type="password" component={InputField} />
                    <button type="submit">submit</button>
                </form>
            )}
        </Formik>
        // </Layout>
    );
}
