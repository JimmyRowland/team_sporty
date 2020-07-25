import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { DateAvatar } from "../PersonalPage/DateAvatarNew";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: "100%",
            borderRadius: "1rem",
            minHeight: 414,
        },
        media: {
            height: 0,
            paddingTop: "56.25%", // 16:9
        },
        inline: {
            display: "inline",
        },
    }),
);

export default function CalendarItem(props: { name: string; date: string; address: string }) {
    const classes = useStyles();

    const eventDate = new Date(props.date);
    function formatAMPM(date: Date) {
        let hours = date.getHours();
        const minutes = date.getMinutes();
        const ampm = hours >= 12 ? "pm" : "am";
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        const minutesString = minutes < 10 ? "0" + minutes : minutes;
        const strTime = hours + ":" + minutesString + " " + ampm;
        return strTime;
    }
    const timeString = formatAMPM(eventDate);

    return (
        <div>
            <ListItem alignItems="flex-start">
                <DateAvatar date={props.date} />
                <ListItemText
                    primary={props.name}
                    secondary={
                        <React.Fragment>
                            <Typography>{timeString}</Typography>
                            <Typography>{props.address}</Typography>
                        </React.Fragment>
                    }
                />
            </ListItem>
        </div>
    );
}
