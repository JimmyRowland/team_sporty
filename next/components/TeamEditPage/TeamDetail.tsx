import React, { useState, Fragment } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/styles";
import { Card, CardHeader, CardContent, CardActions, Divider, Grid, Button, TextField } from "@material-ui/core";
import { Controller, useForm } from "react-hook-form";
import { MutationUpdateTeamArgs, useUpdateTeamMutation } from "../../generated/graphql";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { useRouter } from "next/router";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import { Color } from "@material-ui/lab";
const useStyles = makeStyles(() => ({
    root: {},
}));
function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const TeamDetails = ({
    name,
    description,
    teamID,
    sport,
    imgUrl,
}: {
    name: string;
    description: string;
    teamID: string;
    sport: string;
    imgUrl: string;
}) => {
    const router = useRouter();
    const [editTeam] = useUpdateTeamMutation();
    const defaultValues = { name, description, sport, teamID };
    const { handleSubmit, register, reset, control, watch, setValue, errors } = useForm<MutationUpdateTeamArgs>({
        defaultValues: { name, description, sport, teamID },
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
    const submit = ({ name, description, sport }: MutationUpdateTeamArgs) => {
        editTeam({
            variables: {
                name: name,
                description: description,
                sport: sport,
                teamID: teamID,
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
                                    name={"name"}
                                    as={
                                        <TextField
                                            fullWidth
                                            label="Team Name"
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
                                    name={"description"}
                                    as={
                                        <TextField
                                            fullWidth
                                            label="Description"
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

export default TeamDetails;
