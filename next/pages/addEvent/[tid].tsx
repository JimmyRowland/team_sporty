import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { TextField, Checkbox, RadioGroup, FormControlLabel, Radio, createMuiTheme } from "@material-ui/core";
import { KeyboardDateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { eventTypeList } from "../../interfaces/Interface";
import { makeStyles } from "@material-ui/core/styles";
import DateFnsUtils from "@date-io/moment";
import { Team, useAddEventMutation, useGetTeamListAsCoachQuery } from "../../generated/graphql";
import { TeamNotFound } from "../../components/Error/TeamNotFound";
import { LoadingMembers } from "../../components/components/loadingComponents/LoadingMembers";
import moment from "moment";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { useRouter } from "next/router";
import Card from "@material-ui/core/Card";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import { AST_ClassExpression } from "terser";
import Typography from "@material-ui/core/Typography";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import IconButton from "@material-ui/core/IconButton";

type formData = {
    eventType: string;
    startDate: moment.Moment;
    endDate: moment.Moment;
    team: Pick<Team, "name" | "_id">;
    description: string;
    name: string;
    address: string;
    isPrivate: boolean;
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
    leftPadding: {
        paddingLeft: "9px",
    },
}));

export default function App() {
    const classes = useStyles();
    const router = useRouter();
    const { handleSubmit, register, reset, control, watch, setValue, errors } = useForm<formData>({ defaultValues });
    const [testResult, setData] = useState<any>(null);
    const stateDate = watch("startDate");
    const endDate = watch("startDate");
    const { data, loading, error } = useGetTeamListAsCoachQuery();
    const [addEvent] = useAddEventMutation();
    useEffect(() => {
        register("team", {
            validate: (value) => true || "This is required.",
        });
    }, [register]);
    const tid = router.query;
    const submit = ({ eventType, startDate, endDate, description, name, address, isPrivate }: formData) => {
        addEvent({
            variables: {
                startDate: startDate.toDate(),
                endDate: startDate.toDate(),
                name,
                description,
                address,
                teamID: tid.tid.toString(),
                isPrivate: false,
                eventType,
            },
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
    if (!loading && data && data.getTeamsAsCoach && data.getTeamsAsCoach.length > 0) {
        return (
            <Paper className={classes.paper}>
                <IconButton className={classes.back} onClick={() => back()}>
                    <ArrowBackIcon />
                </IconButton>
                <Typography variant={"h6"} className={classes.title}>
                    {" "}
                    New event
                </Typography>
                <form
                    onSubmit={handleSubmit((testResult) => {
                        setData(testResult);
                        submit(testResult);
                    })}
                    className={classes.container}
                >
                    <div>
                        <section>
                            <Controller
                                control={control}
                                name={"name"}
                                as={<TextField id="outlined-multiline-static" label="Event Title" variant="outlined" />}
                                className={classes.field}
                            />
                        </section>
                        <section>
                            <Controller
                                control={control}
                                name={"address"}
                                as={<TextField id="outlined-multiline-static" label="Address" variant="outlined" />}
                                className={classes.field}
                            />
                        </section>
                        <section>
                            <Controller
                                control={control}
                                name={"description"}
                                as={<TextField label="Description" multiline rows={8} variant="outlined" />}
                                className={classes.field}
                            />
                        </section>

                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <section>
                                <Controller
                                    name={"startDate"}
                                    as={
                                        <KeyboardDateTimePicker
                                            variant="inline"
                                            ampm={false}
                                            label="Start Date"
                                            value={stateDate}
                                            onChange={(e, date) => {
                                                setValue("startDate", date ? moment(date) : moment());
                                            }}
                                            disablePast
                                            className={classes.field}
                                        />
                                    }
                                    control={control}
                                />
                            </section>
                            <br></br>
                        </MuiPickersUtilsProvider>

                        <section className={classes.leftPadding}>
                            <label>Event Type</label>
                            <Controller
                                as={
                                    <RadioGroup aria-label="Event Type" className={classes.field}>
                                        {eventTypeList.map((eventType: string, index) => (
                                            <FormControlLabel
                                                key={index}
                                                value={eventType}
                                                control={<Radio />}
                                                label={eventType}
                                            />
                                        ))}
                                    </RadioGroup>
                                }
                                name="eventType"
                                control={control}
                            />
                        </section>
                    </div>
                    <div className={classes.buttonContainer}>
                        <Button className={classes.button} variant="contained" color="secondary" type="submit">
                            submit
                        </Button>
                    </div>
                </form>
            </Paper>
        );
    } else if (error) {
        return <TeamNotFound />;
    } else {
        return <LoadingMembers />;
    }
}