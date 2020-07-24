import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import { useGetEventsAsCoachOrMemberQuery, EventUserResEnum, useMeQuery } from "../../generated/graphql";
import PersonalCalendarItem from '../PersonalPage/PersonalCalendarItem'
import { Typography } from "@material-ui/core";

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
    })
);

function PersonalCalendar({ children, title, link }: { children?: ReactNode; title: string; link?: string }) {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

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

    let events: any = [];
    for (const team of data.getTeamsAsMemberOrCoach) {
        events = team.team.events ? events.concat(team.team.events) : events;
    }
    const condensedList = events.slice(0, 3);
    console.log(condensedList);
    return (
        <Card className={classes.root}>
            <CardHeader className={classes.heading}
                avatar={
                    <CalendarTodayIcon />

                }
                action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon />
                    </IconButton>
                }
                titleTypographyProps={{variant:'h5' }}
                title="Your Upcoming Events"
            />
            <CardContent>
                <List className={classes.root}>
                    {condensedList.map((c) => (
                        <PersonalCalendarItem
                            key={c._id}
                            name={c.name}
                            type={c.eventType}
                            date={c.startDate}
                            address={c.address}
                            event={c.event}
                            refetch={refetch}
                        />
                    ))}
                </List>
            </CardContent>
        </Card>
    );
}
export default PersonalCalendar;
