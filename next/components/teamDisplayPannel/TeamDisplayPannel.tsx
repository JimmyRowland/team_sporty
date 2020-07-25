import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { Avatar, Card, Typography } from "@material-ui/core";
//import { EventList } from "../eventList/EventList";
import Link from "next/link";
import React from "react";
import List from "@material-ui/core/List";
import PersonalCalendarItem from "../PersonalPage/PersonalCalendarItem";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        leftCard: {
            height: "100%",
            borderRadius: "15px",
        },
        leftInnerContainer: {
            height: "100%",
            width: "100%",
            padding: "1em",
            align: "center",
        },
        calendarContainer: {
            marginTop: theme.spacing(1),
            display: "block",
            padding: "1em",
            height: "60%",
            align: "center",
        },
        teamContainer: {
            margin: "1em",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
        },
        avatar: {
            height: 120,
            width: 120,
            marginBottom: theme.spacing(1),
        },
        eventButtonContainer: {
            position: "absolute",
            bottom: theme.spacing(1),
            left: "50%",
            transform: "translateX(-50%)",
            textAlign: "center",
        },
        eventButton: {
            margin: "auto",
        },
    }),
);

export default function TeamDisplayPannel({
    isCoach,
    imgUrl,
    name,
    events,
    id,
    description,
}: {
    isCoach: boolean;
    imgUrl: string;
    name: string;
    events: any;
    id: string;
    description: string;
}) {
    const classes = useStyles();
    const TeamMangementPortal = (tid) => {
        return isCoach ? (
            <Link href="/addEvent/[tid]" as={`/addEvent/${tid.tid}`}>
                <Button className={classes.eventButton}> Create Event </Button>
            </Link>
        ) : null;
    };

    return (
        <Card raised={true} className={classes.leftCard}>
            <div className={classes.leftInnerContainer}>
                <div className={classes.teamContainer}>
                    <Avatar className={classes.avatar} src={imgUrl} />
                    <Typography variant={"h4"}> {name} </Typography>
                    <Typography variant={"subtitle1"}>{description}</Typography>
                </div>
                <br></br>
                <div className={classes.calendarContainer}>
                    <Typography variant={"h6"} align="center">
                        Upcoming Events
                    </Typography>
                    <div>
                        <List>
                            {events.map((c: any) => (
                                <PersonalCalendarItem
                                    key={c._id}
                                    name={c.name}
                                    date={c.startDate}
                                    address={c.address}
                                />
                            ))}
                        </List>
                        {/* <EventList /> */}
                    </div>
                </div>
                <div className={classes.eventButtonContainer}>
                    <TeamMangementPortal tid={id} />
                </div>
            </div>
        </Card>
    );
}
