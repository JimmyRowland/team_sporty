import React from "react";
import { createStyles, makeStyles, Theme, withStyles } from "@material-ui/core/styles";
import CalendarItem from "./CalendarItem";
import { EventUserResEnum, useGetAllTeamsAndEventsQuery, useMeQuery } from "../../generated/graphql";
import { useSelector } from "react-redux";
import { selectTeamState } from "./CalendarPageSlicer";
import { Avatar } from "@material-ui/core";
import { ErrorComponent } from "../Error/Error";
import Tooltip from "@material-ui/core/Tooltip";

//styles
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
        avatar: {
            marginRight: theme.spacing(1),
        },
        eventContainer: {
            marginBottom: "1em",
            marginLeft: "2em",
            marginRight: "2em",
        },
    }),
);

//tooltip for avatars
const BlackTooltip = withStyles((theme: Theme) => ({
    tooltip: {
        backgroundColor: theme.palette.common.black,
        fontWeight: "lighter",
    },
}))(Tooltip);

export default function ControlledExpansionPanels() {
    const classes = useStyles();
    // graphql
    const { data, error, refetch } = useGetAllTeamsAndEventsQuery();
    const selectedTeam = useSelector(selectTeamState);
    const mequery = useMeQuery();

    if (error) {
        return <ErrorComponent />;
    }

    if (
        !data ||
        !data.getTeamsAsMemberOrCoach ||
        !data.getTeamsAsMemberOrCoach[0] ||
        !mequery.data ||
        !mequery.data.me
    ) {
        return null;
    }

    let events = data.getTeamsAsMemberOrCoach[0].team.events.slice(0, 0);
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

    //sorting events by earliest date
    events.sort((event1, event2) => new Date(event1.startDate).getTime() - new Date(event2.startDate).getTime());

    return (
        <div className={classes.root}>
            {events.map((event, index: number) => {
                let isGoing = 2;
                const usersNotGoing = [];
                const usersGoing = [];
                const usersNoResponse = [];
                for (const response of event.usersResponse) {
                    if (response.isGoing === EventUserResEnum.NoResponse) {
                        usersNoResponse.push(
                            <BlackTooltip title={response.user.name} placement="top" key={response.user._id}>
                                <Avatar className={classes.avatar} src={response.user.avatarUrl}>
                                    {response.user.name[0].toUpperCase()}
                                </Avatar>
                            </BlackTooltip>,
                        );
                    } else if (response.isGoing === EventUserResEnum.Going) {
                        usersGoing.push(
                            <BlackTooltip title={response.user.name} placement="top" key={response.user._id}>
                                <Avatar className={classes.avatar} src={response.user.avatarUrl}>
                                    {response.user.name[0].toUpperCase()}
                                </Avatar>
                            </BlackTooltip>,
                        );
                        if (mequery.data && mequery.data.me && mequery.data.me._id === response.user._id) {
                            isGoing = 1;
                        }
                    } else {
                        usersNotGoing.push(
                            <BlackTooltip title={response.user.name} placement="top" key={response.user._id}>
                                <Avatar className={classes.avatar} src={response.user.avatarUrl}>
                                    {response.user.name[0].toUpperCase()}
                                </Avatar>
                            </BlackTooltip>,
                        );
                        if (mequery.data && mequery.data.me && mequery.data.me._id === response.user._id) {
                            isGoing = 0;
                        }
                    }
                }
                return (
                    <div className={classes.eventContainer} key={index}>
                        <CalendarItem
                            name={event.name}
                            type={event.eventType}
                            date={event.startDate}
                            address={event.address}
                            event={event}
                            isGoing={isGoing}
                            usersNotGoing={usersNotGoing}
                            usersGoing={usersGoing}
                            usersNoResponse={usersNoResponse}
                            refetch={refetch}
                        />
                    </div>
                );
            })}
            <br />
            <br />
            <br />
        </div>
    );
}
