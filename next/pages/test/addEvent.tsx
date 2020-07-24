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

const useStyles = makeStyles((theme) => ({}));

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

    const submit = ({ eventType, startDate, endDate, team, description, name, address, isPrivate }: formData) => {
        addEvent({
            variables: {
                startDate: startDate.toDate(),
                endDate: endDate.toDate(),
                name,
                description,
                address,
                teamID: team._id,
                isPrivate,
                eventType,
            },
        })
            .then(() => {
                router.push("/event");
            })
            .catch((e) => {
                console.log(e);
            });
    };
    if (!loading && data && data.getTeamsAsCoach && data.getTeamsAsCoach.length > 0) {
        return (
            <form
                onSubmit={handleSubmit((testResult) => {
                    setData(testResult);
                    submit(testResult);
                })}
                className="form"
            >
                <div className="container">
                    <section>
                        <Controller
                            control={control}
                            name={"description"}
                            as={<TextField label="Description" multiline rows={8} variant="outlined" />}
                        />
                    </section>
                    <section>
                        <Controller
                            control={control}
                            name={"address"}
                            as={<TextField id="outlined-multiline-static" label="Address" variant="outlined" />}
                        />
                    </section>
                    <section>
                        <Controller
                            control={control}
                            name={"name"}
                            as={<TextField id="outlined-multiline-static" label="Name" variant="outlined" />}
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
                                    />
                                }
                                control={control}
                            />
                        </section>

                        <section>
                            <Controller
                                name={"endDate"}
                                as={
                                    <KeyboardDateTimePicker
                                        variant="inline"
                                        ampm={false}
                                        label="End Date"
                                        value={endDate}
                                        onChange={(e, date) => {
                                            setValue("endDate", date ? moment(date) : moment());
                                        }}
                                        disablePast
                                    />
                                }
                                control={control}
                            />
                        </section>
                    </MuiPickersUtilsProvider>

                    <section>
                        <label>Private</label>
                        <Controller as={Checkbox} name="isPrivate" control={control} />
                    </section>
                    <section>
                        <label>Event Type</label>
                        <Controller
                            as={
                                <RadioGroup aria-label="Event Type">
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

                    <section>
                        <label>Pick a team</label>
                        <Controller
                            as={
                                <Autocomplete
                                    options={data.getTeamsAsCoach}
                                    getOptionLabel={(option) => option.name}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Choose a team"
                                            variant="outlined"
                                            error={Boolean(errors?.team)}
                                            helperText={errors?.team?._id.message}
                                        />
                                    )}
                                />
                            }
                            onChange={([, data]) => data}
                            name="team"
                            control={control}
                        />
                    </section>
                </div>
                <button className="button buttonBlack" type="button">
                    Reset Form
                </button>
                <button className="button">submit</button>
            </form>
        );
    } else if (error) {
        return <TeamNotFound />;
    } else {
        return <LoadingMembers />;
    }
}
