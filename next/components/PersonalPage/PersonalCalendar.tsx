import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import { CircularProgress } from "@material-ui/core";
import { useGetEventsOfAllTeamsQuery } from "../../generated/graphql";
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

    const { data } = useGetEventsOfAllTeamsQuery({ variables: { skip: 0, limit: 3 } });

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
                <List className={classes.root}>
                    {data?.getEventsOfAllTeams?.map((c) => (
                        <PersonalCalendarItem key={c._id} name={c.name} date={c.startDate} address={c.address} />
                    ))}
                </List>
            </CardContent>
        </Card>
    );
}
export default PersonalCalendar;
