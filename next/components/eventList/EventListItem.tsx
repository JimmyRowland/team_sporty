import React, { useState } from "react";
import { ColoredPaper } from "../components/coloredPaper/ColoredPaper";
import { DateAvatar } from "../DateAvatar/DateAvatar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { EventListItemType, monthArray } from "../../interface/Interface";
const useStyles = makeStyles({
    container: {
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
    },
    descriptionContainer: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
    },
    titleContainer: {
        display: "flex",
        justifyContent: "flex-end",
    },
    detailContainer: {
        display: "flex",
        justifyContent: "center",
    },
    title: {
        fontWeight: 700,
        paddingRight: 16,
    },
    detail: {
        fontSize: "0.9rem",
        paddingLeft: "2vw",
    },
});
export function EventListItem({ event }: { event: EventListItemType }) {
    const classes = useStyles();
    const date = event.date.getDate();
    const month: string = monthArray[event.date.getMonth()];
    const getColor = () => {
        const today = new Date().getTime();
        const eventTime = event.date.getTime();
        const duration = eventTime - today;
        const threeDay = 259200000;
        const sevenDay = 604800000;
        const twoWeek = 1209600000;
        if (duration < threeDay) {
            return "red";
        } else if (duration < sevenDay) {
            return "green";
        } else if (duration < twoWeek) {
            return "blue";
        } else {
            return "indigo";
        }
    };
    const color = getColor();
    return (
        <ColoredPaper color={color}>
            <div className={classes.container}>
                <div>
                    <DateAvatar date={date} month={month} />
                </div>
                <div className={classes.descriptionContainer}>
                    <div className={classes.titleContainer}>
                        <Typography variant={"h5"} component={"p"} className={classes.title}>
                            {event.title}
                        </Typography>
                    </div>
                    <div className={classes.detailContainer}>
                        <Typography variant={"subtitle1"} className={classes.detail}>
                            {event.body}
                        </Typography>
                    </div>
                </div>
            </div>
        </ColoredPaper>
    );
}
