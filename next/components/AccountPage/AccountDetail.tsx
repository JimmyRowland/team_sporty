import React, { Fragment, useState } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/styles";
import { Button, Card, CardActions, CardContent, CardHeader, Divider, Grid, TextField } from "@material-ui/core";
import { Controller, useForm } from "react-hook-form";
import { EditProfileInput, useEditProfileMutation } from "../../generated/graphql";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import { Color } from "@material-ui/lab";

const useStyles = makeStyles(() => ({
    root: {},
}));
function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const AccountDetails = ({ firstName, lastName, email, address, phone, introduction, sport }: EditProfileInput) => {
    const [editProfile] = useEditProfileMutation();
    const { handleSubmit, register, reset, control, watch, setValue, errors } = useForm<EditProfileInput>({
        defaultValues: { firstName, lastName, email, address, phone, introduction, sport },
    });
    const [open, setOpen] = React.useState(false);
    const [severity, setSeverity] = useState<Color>("error");

    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === "clickaway") {
            return;
        }

        setOpen(false);
    };
    const [errorMessage, setErrorMessage] = React.useState([""]);
    const submit = ({ firstName, lastName, sport, email, address, phone, introduction }: EditProfileInput) => {
        editProfile({
            variables: {
                firstName: firstName,
                lastName: lastName,
                email: email,
                address: address,
                phone: phone,
                introduction: introduction,
                sport: sport,
            },
        })
            .then(() => {
                setSeverity("success");
                setOpen(true);
                setErrorMessage(["Updated"]);
            })
            .catch((e) => {
                setSeverity("error");
                setOpen(true);
                setErrorMessage(
                    e.graphQLErrors.map(({ extensions: { exception: { validationErrors } } }, i) =>
                        Object.values(validationErrors[0].constraints).join("\n"),
                    ),
                );
            });
    };
    const classes = useStyles();
    const options = ["football", "cricket", "basketball", "others"];
    return (
        <Fragment>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={severity}>
                    {errorMessage.join("\n")}
                </Alert>
            </Snackbar>
            <Card className={clsx(classes.root)}>
                <form
                    onSubmit={handleSubmit((testResult) => {
                        submit(testResult);
                    })}
                >
                    <CardHeader subheader="The information can be edited" title="Profile" />
                    <Divider />
                    <CardContent>
                        <Grid container spacing={3}>
                            <Grid item md={6} xs={12}>
                                <Controller
                                    control={control}
                                    name={"firstName"}
                                    as={
                                        <TextField
                                            fullWidth
                                            label="First name"
                                            margin="dense"
                                            required
                                            variant="outlined"
                                        />
                                    }
                                />
                            </Grid>
                            <Grid item md={6} xs={12}>
                                <Controller
                                    control={control}
                                    name={"lastName"}
                                    as={
                                        <TextField
                                            fullWidth
                                            label="Last name"
                                            margin="dense"
                                            required
                                            variant="outlined"
                                        />
                                    }
                                />
                            </Grid>
                            <Grid item md={6} xs={12}>
                                <Controller
                                    control={control}
                                    name={"email"}
                                    as={
                                        <TextField fullWidth label="Email" margin="dense" required variant="outlined" />
                                    }
                                />
                            </Grid>
                            <Grid item md={6} xs={12}>
                                <Controller
                                    control={control}
                                    name={"phone"}
                                    as={
                                        <TextField fullWidth label="Phone" margin="dense" required variant="outlined" />
                                    }
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Controller
                                    control={control}
                                    name={"address"}
                                    as={
                                        <TextField
                                            fullWidth
                                            label="Address"
                                            margin="dense"
                                            required
                                            variant="outlined"
                                        />
                                    }
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Controller
                                    control={control}
                                    name={"introduction"}
                                    as={
                                        <TextField
                                            fullWidth
                                            label="Introduction"
                                            margin="dense"
                                            required
                                            variant="outlined"
                                        />
                                    }
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Controller
                                    as={
                                        <Autocomplete
                                            options={options}
                                            getOptionLabel={(option) => option}
                                            renderInput={(params) => (
                                                <TextField {...params} label="Choose a sport" variant="outlined" />
                                            )}
                                        />
                                    }
                                    onChange={([, data]) => data}
                                    name="sport"
                                    control={control}
                                />
                            </Grid>
                        </Grid>
                    </CardContent>
                    <Divider />
                    <CardActions>
                        <Button color="primary" variant="contained" type="submit">
                            Save details
                        </Button>
                    </CardActions>
                </form>
            </Card>
        </Fragment>
    );
};

export default AccountDetails;
