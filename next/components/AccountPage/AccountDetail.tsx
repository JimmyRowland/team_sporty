import React, { useState } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import { Card, CardHeader, CardContent, CardActions, Divider, Grid, Button, TextField } from "@material-ui/core";
import { Controller, useForm } from "react-hook-form";
import { EditProfileInput, useEditProfileMutation } from "../../generated/graphql";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { useRouter } from "next/router";

const useStyles = makeStyles(() => ({
    root: {},
}));
const AccountDetails = ({ firstName, lastName, email, address, phone, introduction, sport }: EditProfileInput) => {
    const router = useRouter();
    const [editProfile] = useEditProfileMutation();
    const defaultValues = { firstName, lastName, email, address, phone, introduction, sport };
    const { handleSubmit, register, reset, control, watch, setValue, errors } = useForm<EditProfileInput>({
        defaultValues: { firstName, lastName, email, address, phone, introduction, sport },
    });
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
        }).catch((e) => {
            console.log(e);
        });
    };
    const classes = useStyles();
    const options = ["football", "cricket", "basketball"];
    return (
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
                                    <TextField fullWidth label="Last name" margin="dense" required variant="outlined" />
                                }
                            />
                        </Grid>
                        <Grid item md={6} xs={12}>
                            <Controller
                                control={control}
                                name={"email"}
                                as={<TextField fullWidth label="Email" margin="dense" required variant="outlined" />}
                            />
                        </Grid>
                        <Grid item md={6} xs={12}>
                            <Controller
                                control={control}
                                name={"phone"}
                                as={<TextField fullWidth label="Phone" margin="dense" required variant="outlined" />}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Controller
                                control={control}
                                name={"address"}
                                as={<TextField fullWidth label="Address" margin="dense" required variant="outlined" />}
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
    );
};

export default AccountDetails;
