import React from "react";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
// import red from "@material-ui/core/colors/red";
import { grey } from '@material-ui/core/colors';

// const secondary = red[500];
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        avatar: {
            width: "60px",
            height: "60px",
            margin: "7px 20px 0px 0px",
            color: theme.palette.getContrastText(grey[500]),
            backgroundColor: grey[400],
        },
        container: {
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
        },
        month: {
            color: "black",
            fontSize: "0.7rem",
            justifyContent: "center",
            display: "flex",
        },
        date: {
            fontSize: "1.5rem",
            color: "black",
            fontWeight: 900,
            justifyContent: "center",
            display: "flex",
        },
    }),
);

export function DateAvatar(props: { date: string }) {
    const classes = useStyles();

    const eventDate = new Date(props.date);
    const eventDateString = eventDate.toDateString();
    const eventMonth = eventDateString.slice(4, 8);
    const eventDay = eventDateString.slice(8, 11);

    return (
        <Avatar className={classes.avatar} variant="rounded">
            <div className={classes.container}>
                <div className={classes.month}>
                    <Typography variant={"h6"} component={"p"} className={classes.month}>
                        {eventMonth}
                    </Typography>
                </div>
                <div className={classes.date}>
                    <Typography variant={"h6"} component={"p"} className={classes.date}>
                        {eventDay}
                    </Typography>
                </div>
            </div>
        </Avatar>
    );
}
