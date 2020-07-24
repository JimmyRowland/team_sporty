import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { Avatar, Card, Typography } from "@material-ui/core";
import { EventList } from "../eventList/EventList";
import Link from "next/link";
import React from "react";

const useStyles = makeStyles((Theme: Theme) =>
    createStyles({
        leftCard: {
            height: "100%",
            borderRadius: "15px",
        },
        leftInnerContainer: {
            height: "100%",
            width: "100%",
            padding: "1em",
        },
        calendarContainer: {
            display: "block",
            padding: "1em",
            height: "60%",
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
        },
        eventContainer: {
            height: "90%",
            overflowY: "scroll",
        },
        teammanageContainer: {
            position: "absolute",
            width: "100%",
            bottom: "1em",
        },
        teammanageButton: {
            display: "block",
            width: "60%",
            maxWidth: "200px",
            margin: "auto",
        },
    }),
);

export default function TeamDisplayPannel({
    isCoach,
    imgUrl,
    name,
}: {
    isCoach: boolean;
    imgUrl: string;
    name: string;
}) {
    const classes = useStyles();
    const TeamMangementPortal = () => {
        return isCoach ? (
            <Link href="/teammanage">
                <Button className={classes.teammanageButton}> Team Management </Button>
            </Link>
        ) : null;
    };

    return (
        <Card raised={true} className={classes.leftCard}>
            <div className={classes.leftInnerContainer}>
                <div className={classes.teamContainer}>
                    <Avatar className={classes.avatar} src={imgUrl} />
                    <Typography variant={"h4"}> {name} </Typography>
                    <Typography variant={"subtitle1"}>something</Typography>
                </div>
                <div className={classes.calendarContainer}>
                    <Typography variant={"h5"}>UPCOMING...</Typography>
                    <div className={classes.eventContainer}>
                        <EventList />
                    </div>
                </div>
                <div className={classes.teammanageContainer}>
                    <TeamMangementPortal />
                </div>
            </div>
        </Card>
    );
}
