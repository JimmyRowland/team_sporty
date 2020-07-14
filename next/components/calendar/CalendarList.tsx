import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import CalendarItem2 from "./CalendarItem";
import { useEventsQuery } from "../../generated/graphql";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: "100%",
        },
    }),
);

export default function ControlledExpansionPanels(props: { eventList: any[] }) {
    const classes = useStyles();
    // graphql
    const { data, loading, error } = useEventsQuery();
    if (loading) {
        return <div>loading...</div>;
    }

    if (error) {
        console.log(error);
        return <div>err</div>;
    }

    if (!data) {
        return <div>no data</div>;
    }
    return (
        <div className={classes.root}>
            {props.eventList.map((c) => (
                <CalendarItem2
                    key={c.id}
                    name={c.name}
                    type={c.type}
                    date={c.date}
                    address={c.address}
                    going={c.going}
                    notGoing={c.notGoing}
                    notResponded={c.notResponded}
                />
            ))}
            {/* <CalendarItem2 /> */}
            {data.events.map((event, index) => {
                // graphql
                return (
                    <CalendarItem2
                        key={index}
                        name={event.name}
                        type={"Game"}
                        date={event.startDate.toString}
                        address={event.description}
                        going={3}
                        notGoing={3}
                        notResponded={3}
                    />
                );
            })}
            <br></br>
            <br></br>
            <br></br>
        </div>
    );
}
