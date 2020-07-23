import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Avatar, Card, IconButton, Typography } from "@material-ui/core";
import { EventList } from "../eventList/EventList";
import Link from "next/link";
import React from "react";
import { isCoach } from "../../../server/src/middleware/isCoach";
import CardActionArea from "@material-ui/core/CardActionArea";

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

export default function TeamDisplayPannel({ data }: { data: any }) {
    const classes = useStyles();
    const team = data?.getTeam.team;
    const TeamMangementPortal = () => {
        return team.isCoach ? (
            <Link href="/teammanage">
                <Button className={classes.teammanageButton}> Team Management </Button>
            </Link>
        ) : null;
    };

    return data ? (
        <Card raised={true} className={classes.leftCard}>
            <div className={classes.leftInnerContainer}>
                <div className={classes.teamContainer}>
                    <Avatar className={classes.avatar} src={team.imgUrl} />
                    <Typography variant={"h4"}> {team.name} </Typography>
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
    ) : null;
}
