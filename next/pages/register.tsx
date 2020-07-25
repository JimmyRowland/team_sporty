import { Field, Formik } from "formik";
import Router from "next/router";
import React from "react";
import { InputField } from "../components/fields/InputField";
import { useRegisterMutation } from "../generated/graphql";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { Card } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Link from "next/link";

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

export default function registerPage() {
    const classes = useStyles();
    const [register] = useRegisterMutation();
    return (
        // <Layout title="Register page">
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
                        <Field name="FirstName" placeholder="FirstName*" component={InputField} />
                        <Field name="LastName" placeholder="LastName*" component={InputField} />
                        <Field name="Email" placeholder="Email*" component={InputField} />
                        <Field name="Password" placeholder="Password*" type="password" component={InputField} />
                        <Button type="submit" variant="contained" color="secondary" className={classes.signup}>
                            SIGN UP
                        </Button>
                    </form>
                )}
            </Formik>
            <div className={classes.footerContainer}>
                <Link href={"/login"}>
                    <Button color="primary">{"Already have an account? Sign in"}</Button>
                </Link>
            </div>
        </Card>
        // </Layout>
    );
}
