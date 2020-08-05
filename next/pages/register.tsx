import { Field, Formik } from "formik";
import Router from "next/router";
import React from "react";
import { InputField } from "../components/fields/InputField";
import { useRegisterMutation } from "../generated/graphql";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Card } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Link from "next/link";
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
            marginTop: theme.spacing(5),
        },
        form: {
            width: "100%",
        },
        field: {
            marginTop: "1em",
            width: "100%",
            margin: "auto",
        },
        signup: {
            marginTop: theme.spacing(5),
            marginBottom: theme.spacing(2),
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
            marginBottom: theme.spacing(1),
        },
        footerButton: {
            width: "80%",
            margin: "auto",
        },
    }),
);

const SignupSchema = Yup.object().shape({
    firstName: Yup.string().min(1, "Too Short!").max(50, "Too Long!").required("Required"),
    lastName: Yup.string().min(1, "Too Short!").max(50, "Too Long!").required("Required"),
    email: Yup.string().email("Please enter a valid email").required("Required"),
    password: Yup.string()
        .min(16, "Password must be at least 16 characters")
        .max(50, "Password is too long")
        .required("Required"),
});

export default function registerPage() {
    const classes = useStyles();
    const [register] = useRegisterMutation();
    return (
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
                Sign up{" "}
            </Typography>
            <Formik
                validateOnBlur={false}
                validateOnChange={false}
                validationSchema={SignupSchema}
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
                    firstName: "",
                    lastName: "",
                }}
            >
                {({ handleSubmit }) => (
                    <form onSubmit={handleSubmit} className={classes.form}>
                        <Field name="firstName" label="First Name *" component={InputField} />
                        <Field name="lastName" label="Last Name *" component={InputField} />
                        <Field name="email" label="Email *" component={InputField} />
                        <Field name="password" label="Password *" type="password" component={InputField} />
                        <Button type="submit" variant="contained" color="secondary" className={classes.signup}>
                            SIGN UP
                        </Button>
                    </form>
                )}
            </Formik>
            <div className={classes.footerContainer}>
                <Link href={"/login"}>
                    <Button color="secondary">{"Already have an account? Sign in"}</Button>
                </Link>
            </div>
        </Card>
    );
}
