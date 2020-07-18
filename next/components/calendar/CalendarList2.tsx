import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import CalendarItem2 from "./CalendarItem2";
import { useGetEventsQuery, Event } from "../../generated/graphql";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: "100%",
        },
        heading: {
            fontSize: theme.typography.pxToRem(15),
            flexBasis: "33.33%",
            flexShrink: 0,
        },
        secondaryHeading: {
            fontSize: theme.typography.pxToRem(15),
            color: theme.palette.text.secondary,
        },
    }),
);

export default function ControlledExpansionPanels(props: { eventList: any[] }) {
    const classes = useStyles();
    // graphql
    const { data, loading, error } = useGetEventsQuery({
        variables: {
            teamID: "5f0d712db3addc027b9fab0a",
        },
    });
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
            {data?.getTeam?.team?.events?.map((event, index: number) => {
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
