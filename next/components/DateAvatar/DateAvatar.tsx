import React, { ReactNode } from "react";
import Avatar from "@material-ui/core/Avatar";
import { Colors } from "../../interfaces/Interface";
import classnames from "classnames";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import red from "@material-ui/core/colors/red";
const secondary = red[500];
const useStyles = makeStyles({
    avatar: {
        width: "70px",
        height: "70px",
        backgroundColor: "white",
        margin: "7px 0 7px 7px",
    },
    container: {
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
    },
    month: {
        fontSize: "0.7rem",
        color: secondary,
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
});
// TODO: Find a dateTime object.
export function DateAvatar({ date, month }: { date: number; month: string }) {
    const classes = useStyles();
    return (
        <Avatar className={classes.avatar}>
            <div className={classes.container}>
                <div className={classes.month}>
                    <Typography variant={"h6"} component={"p"} className={classes.month}>
                        {month}
                    </Typography>
                </div>
                <div className={classes.date}>
                    <Typography variant={"h6"} component={"p"} className={classes.date}>
                        {date}
                    </Typography>
                </div>
            </div>
        </Avatar>
    );
}
