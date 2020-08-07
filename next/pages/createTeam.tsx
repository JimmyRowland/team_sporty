import React from "react";
import { useForm, Controller } from "react-hook-form";
import { TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { GetMyTeamListDocument, useNewTeamMutation } from "../generated/graphql";
import moment from "moment";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { useRouter } from "next/router";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import IconButton from "@material-ui/core/IconButton";

type formData = {
    name: string;
    sport: string;
};

const defaultValues = {
    eventType: "training",
    startDate: moment(),
    endDate: moment(),
    team: { name: "", _id: "" },
    description: "",
    name: "",
    address: "",
    isPrivate: false,
};

const useStyles = makeStyles((theme) => ({
    paper: {
        position: "absolute",
        top: "46%",
        left: "50%",
        transform: "translate(-50%,-50%)",
        width: "80%",
        maxWidth: "700px",
        minWidth: "500px",
        margin: "auto",
        borderRadius: "15px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    back: {
        position: "absolute",
        left: "0",
        margin: theme.spacing(2),
    },
    title: {
        marginTop: theme.spacing(3),
    },
    container: {
        display: "block",
        width: "80%",
        marginTop: theme.spacing(2),
    },
    field: {
        width: "100%",
        margin: theme.spacing(1),
    },
    buttonContainer: {
        width: "80%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        margin: "auto",
    },

    button: {
        margin: theme.spacing(2),
        textAlign: "center",
        display: "flex",
        borderRadius: 15,
        width: 200,
        height: 30,
    },
}));

export default function App() {
    const classes = useStyles();
    const router = useRouter();
    const { handleSubmit, register, reset, control, watch, setValue, errors } = useForm<formData>({ defaultValues });
    const [newTeam] = useNewTeamMutation();
    const submit = ({ name, sport }: formData) => {
        newTeam({
            variables: {
                name: name,
                sport: sport ? sport : "",
            },
            refetchQueries: [{ query: GetMyTeamListDocument, variables: {} }],
        })
            .then(() => {
                router.back();
            })
            .catch((e) => {
                console.log(e);
            });
    };
    const back = () => {
        router.back();
    };
    const options = ["football", "cricket", "basketball", "others"];

    return (
        <Paper className={classes.paper}>
            <IconButton className={classes.back} onClick={() => back()}>
                <ArrowBackIcon />
            </IconButton>
            <Typography variant={"h6"} className={classes.title}>
                {" "}
                New Team
            </Typography>
            <form
                onSubmit={handleSubmit((testResult) => {
                    submit(testResult);
                })}
                className={classes.container}
            >
                <div>
                    <section>
                        <Controller
                            control={control}
                            name={"name"}
                            as={<TextField label="Team Name" variant="outlined" />}
                            className={classes.field}
                        />
                    </section>
                </div>
                <section>
                    <Controller
                        as={
                            <Autocomplete
                                options={options}
                                getOptionLabel={(option) => option}
                                renderInput={(params) => (
                                    <TextField
                                        className={classes.field}
                                        {...params}
                                        label="Choose a sport"
                                        variant="outlined"
                                    />
                                )}
                            />
                        }
                        onChange={([, data]) => data}
                        name="sport"
                        control={control}
                    />
                </section>
                <div className={classes.buttonContainer}>
                    <Button className={classes.button} variant="contained" color="secondary" type="submit">
                        submit
                    </Button>
                </div>
            </form>
        </Paper>
    );
}
