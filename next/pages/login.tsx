import { Field, Formik } from "formik";
import Router from "next/router";
import React from "react";
import { InputField } from "../components/fields/InputField";
import Layout from "../components/Layout";
import { useLoginMutation, MeQuery, MeDocument } from "../generated/graphql";
import { setAccessToken } from "../lib/accessToken";

const LoginPage = () => {
    const [login] = useLoginMutation();
    return (
        <Layout title="Login page">
            <Formik
                validateOnBlur={false}
                validateOnChange={false}
                onSubmit={async (data, { setErrors }) => {
                    const res = await login({
                        variables: data,
                        update: (store, { data }) => {
                            if (!data) {
                                return null;
                            }

                            store.writeQuery<MeQuery>({
                                query: MeDocument,
                                data: {
                                    me: data.login.user,
                                },
                            });
                        },
                    });

                    console.log(res);

                    if (res && res.data) {
                        setAccessToken(res.data.login.accessToken);
                    }
                    console.log(res);
                    if (res && res.data && !res.data.login) {
                        setErrors({
                            email: "invalid login",
                        });
                        return;
                    }

                    Router.push("/");
                }}
                initialValues={{
                    email: "",
                    password: "",
                }}
            >
                {({ handleSubmit }) => (
                    <form onSubmit={handleSubmit}>
                        <Field name="email" placeholder="email" component={InputField} />
                        <Field name="password" placeholder="password" type="password" component={InputField} />
                        <button type="submit">submit</button>
                    </form>
                )}
            </Formik>
        </Layout>
    );
};
export default LoginPage;
