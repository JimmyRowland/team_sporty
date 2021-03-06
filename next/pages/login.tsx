import { Field, Formik } from "formik";
import Router from "next/router";
import React, { useState, Fragment } from "react";
import { InputField } from "../components/fields/InputField";
import { useLoginMutation, MeQuery, MeDocument } from "../generated/graphql";
import { setAccessToken } from "../lib/accessToken";
import { Card, Button, Theme, Snackbar } from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Link from "next/link";
import FormHelperText from "@material-ui/core/FormHelperText";
import * as Yup from "yup";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        body: {
            position: "absolute",
            top: "46%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            width: "80%",
            maxWidth: "700px",
            margin: "auto",
            borderRadius: "15px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
        },
        signinText: {
            marginTop: theme.spacing(3),
        },
        form: {
            width: "100%",
        },
        login: {
            marginTop: theme.spacing(5),
            marginBottom: theme.spacing(1),
            textAlign: "center",
            display: "flex",
            margin: "auto",
            borderRadius: 20,
            width: "80%",
            height: 40,
        },
        image: {
            height: "250px",
        },
        footerContainer: {
            width: "80%",
            marginBottom: theme.spacing(2),
        },
        footerButtonL: {
            display: "inline-block",
            float: "left",
        },
        footerButtonR: {
            display: "inline-block",
            float: "right",
        },
    }),
);

const LoginSchema = Yup.object().shape({
    email: Yup.string().email("Please use a valid email").required("Required"),
    password: Yup.string().required("Required"),
});

const LoginPage = () => {
    const classes = useStyles();
    const [login, { error }] = useLoginMutation();
    const [helperText, setHelperText] = useState("");
    return (
        <Fragment>
            <Card className={classes.body}>
                <CardMedia
                    component="img"
                    alt="Cover"
                    title="Cover"
                    image={
                        "https://res.cloudinary.com/df51z9s92/image/upload/v1595542836/FC_Cincinnati_Concept_BowlRendering_web_cjvelr.jpg"
                    }
                    className={classes.image}
                />
                <Typography variant="h5" className={classes.signinText}>
                    {" "}
                    Log in{" "}
                </Typography>
                <Formik
                    validateOnBlur={false}
                    validateOnChange={false}
                    validationSchema={LoginSchema}
                    onSubmit={async (data, { setErrors }) => {
                        try {
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
                            if (res && res.data) {
                                setAccessToken(res.data.login.accessToken);
                            }
                            if (res && res.data && !res.data.login) {
                                setErrors({
                                    email: "invalid login",
                                });
                                setHelperText("invalid login");
                                return;
                            }

                            Router.push("/profile");
                        } catch (e) {
                            setErrors({
                                email: "Invalid password or Email",
                            });
                            return;
                        }
                    }}
                    initialValues={{
                        email: "",
                        password: "",
                    }}
                >
                    {({ handleSubmit }) => (
                        <form onSubmit={handleSubmit} className={classes.form}>
                            <Field name="email" label="Email" component={InputField} />
                            <Field name="password" label="Password" type="password" component={InputField} />
                            <FormHelperText>{helperText}</FormHelperText>
                            <Button type="submit" color="secondary" variant="contained" className={classes.login}>
                                Log in
                            </Button>
                        </form>
                    )}
                </Formik>
                <div className={classes.footerContainer}>
                    <Link href={"/register"}>
                        <Button color="secondary" className={classes.footerButtonL}>
                            {"Forgot password?"}
                        </Button>
                    </Link>
                    <Link href={"/register"}>
                        <Button color="secondary" className={classes.footerButtonR}>
                            {"Don't have an account? Sign Up"}
                        </Button>
                    </Link>
                </div>
            </Card>
        </Fragment>
    );
};
export default LoginPage;
