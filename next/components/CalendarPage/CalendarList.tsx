import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import CalendarItem from "./CalendarItem";
import { useGetEventsAsCoachOrMemberQuery, EventUserResEnum, useMeQuery } from "../../generated/graphql";
import { useSelector } from "react-redux";
import { selectTeamState } from "./CalendarPageSlicer";
import { Avatar } from "@material-ui/core";

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
    }),
);

export default function ControlledExpansionPanels() {
    const classes = useStyles();
    // graphql
    const { data, loading, error, refetch } = useGetEventsAsCoachOrMemberQuery();
    const selectedTeam = useSelector(selectTeamState);
    const mequery = useMeQuery();

    if (loading || mequery.loading) {
        return <div>loading...</div>;
    }

    if (error) {
        console.log(error);
        return <div>err</div>;
    }

    if (!data || !data.getTeamsAsMemberOrCoach || !mequery.data || !mequery.data.me) {
        return <div>no data</div>;
    }

    let events: any = [];
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
            {events.map((event: any, index: number) => {
                let isGoing = 2;
                const usersNotGoing = [];
                const usersGoing = [];
                const usersNoResponse = [];
                for (const response of event.usersResponse) {
                    if (response.isGoing === EventUserResEnum.NoResponse) {
                        usersNoResponse.push(
                            <Avatar className={classes.avatar} src={response.user.avatarUrl}>
                                {response.user.name[0].toUpperCase()}
                            </Avatar>,
                        );
                    } else if (response.isGoing === EventUserResEnum.Going) {
                        usersGoing.push(
                            <Avatar className={classes.avatar} src={response.user.avatarUrl}>
                                {response.user.name[0].toUpperCase()}
                            </Avatar>,
                        );
                        if (mequery.data && mequery.data.me && mequery.data.me._id === response.user._id) {
                            isGoing = 1;
                        }
                    } else {
                        usersNotGoing.push(
                            <Avatar className={classes.avatar} src={response.user.avatarUrl}>
                                {response.user.name[0].toUpperCase()}
                            </Avatar>,
                        );
                        if (mequery.data && mequery.data.me && mequery.data.me._id === response.user._id) {
                            isGoing = 0;
                        }
                    }
                }
                return (
                    <CalendarItem
                        key={index}
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
                );
            })}
            <br></br>
            <br></br>
            <br></br>
        </div>
    );
}
