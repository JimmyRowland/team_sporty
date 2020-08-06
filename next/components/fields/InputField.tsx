import { FieldProps } from "formik";
import React, { DetailedHTMLProps, InputHTMLAttributes } from "react";
import { TextField, Theme } from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/core/styles";
type InputProps = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        fieldContainer: {
            width: "80%",
            margin: "auto",
        },
        field: {
            marginTop: theme.spacing(5),
            width: "100%",
            margin: "auto",
        },
    }),
);

export const InputField = ({
    field,
    form: { errors, touched },
    type,
    label,
}: FieldProps & InputProps & { label: string }) => {
    const errorMessage = touched[field.name] && errors[field.name];
    const classes = useStyles();
    return (
        <div className={classes.fieldContainer}>
            <TextField {...field} type={type} label={label} variant="outlined" className={classes.field} />
            {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
        </div>
    );
};
