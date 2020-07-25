import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import { useGetEventsAsCoachOrMemberQuery, useMeQuery } from "../../generated/graphql";
import PersonalCalendarItem from "../PersonalPage/PersonalCalendarItem";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: "100%",
            borderRadius: "1rem",
            minHeight: 300,
        },
        heading: {
            fontSize: theme.typography.pxToRem(15),
            flexBasis: "33.33%",
            flexShrink: 0,
        },
    }),
);

function PersonalCalendar() {
    const classes = useStyles();

    const { data, loading, error, refetch } = useGetEventsAsCoachOrMemberQuery();
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
    return (
        <Card className={classes.root}>
            <CardHeader
                className={classes.heading}
                avatar={<CalendarTodayIcon />}
                action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon />
                    </IconButton>
                }
                titleTypographyProps={{ variant: "h5" }}
                title="Your Upcoming Events"
            />
            <CardContent>
                {[1].map((value) => {
                    if (data.getTeamsAsMemberOrCoach.length > 0) {
                        let events = data.getTeamsAsMemberOrCoach[0].team.events;
                        for (const team of data.getTeamsAsMemberOrCoach) {
                            events = team.team.events === events ? events : events.concat(team.team.events);
                        }
                        events.sort(
                            (event1, event2) =>
                                new Date(event2.startDate).getTime() - new Date(event1.startDate).getTime(),
                        );
                        const condensedList = events.slice(0, 3);
                        return (
                            <List className={classes.root}>
                                {condensedList.map((c) => (
                                    <PersonalCalendarItem
                                        key={c._id}
                                        name={c.name}
                                        date={c.startDate}
                                        address={c.address}
                                    />
                                ))}
                            </List>
                        );
                    } else {
                        return null;
                    }
                })}
            </CardContent>
        </Card>
    );
}
export default PersonalCalendar;
