import { FieldProps } from "formik";
import React, { DetailedHTMLProps, InputHTMLAttributes } from "react";
import { TextField } from "@material-ui/core";
type InputProps = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

export const InputField = ({ field, form: { errors, touched }, type }: FieldProps & InputProps) => {
    const errorMessage = touched[field.name] && errors[field.name];
    return (
        <div>
            <TextField {...field} type={type} label={field.name} variant="outlined" />
            {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
        </div>
    );
};
