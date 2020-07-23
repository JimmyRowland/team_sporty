import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import CalendarItem from "./CalendarItem";
import { useGetEventsAsCoachOrMemberQuery, Event } from "../../generated/graphql";
import { useSelector } from "react-redux";
import { selectTeamState } from "./CalendarPageSlicer";

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
    const { data, loading, error } = useGetEventsAsCoachOrMemberQuery();
    const selectedTeam = useSelector(selectTeamState);
    if (loading) {
        return <div>loading...</div>;
    }

    if (error) {
        console.log(error);
        return <div>err</div>;
    }

    if (!data || !data.getTeamsAsMemberOrCoach) {
        return <div>no data</div>;
    }

    let events: Pick<Event, "name" | "_id" | "startDate" | "endDate" | "description" | "eventType" | "address">[] = [];
    if (selectedTeam.name === "All") {
        for (const team of data.getTeamsAsMemberOrCoach) {
            events = team.team.events ? events.concat(team.team.events) : events;
        }
    } else {
        const team = data.getTeamsAsMemberOrCoach.find((value) => {
            return value.team._id === selectedTeam._id;
        });
        events = team && team.team.events ? team.team.events : [];
    }
    return (
        <div className={classes.root}>
            {events.map((event, index: number) => {
                console.log(event);
                return (
                    <CalendarItem
                        key={index}
                        name={event.name}
                        type={event.eventType}
                        date={event.startDate}
                        address={event.address}
                        event={event}
                    />
                );
            })}
            <br></br>
            <br></br>
            <br></br>
        </div>
    );
}
