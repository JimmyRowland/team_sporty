import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import { DateAvatar } from "../PersonalPage/DateAvatarNew";
import { useGetEventsAsCoachOrMemberQuery, EventUserResEnum, useMeQuery } from "../../generated/graphql";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: "100%",
            borderRadius: "1rem",
            minHeight: 414,
        },
        media: {
            height: 0,
            paddingTop: "56.25%" // 16:9
        },
        inline: {
            display: 'inline',
        },
    })
);

export default function CalendarItem(props: {
    key: React.ReactNode;
    name: React.ReactNode;
    type: React.ReactNode;
    date: React.ReactNode;
    address: React.ReactNode;
    event: React.ReactNode;
    refetch: React.ReactNode;
}) {
    const classes = useStyles();
    // console.log(props.date);
    // const month = props.date.slice(5,7);
    // console.log(month);
    // const day = props.date.slice(8,10);
    // console.log(day);

    const eventDate = new Date(props.date);
    function formatAMPM(date: Date) {
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0' + minutes : minutes;
        var strTime = hours + ':' + minutes + ' ' + ampm;
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
                            <Typography>
                                {timeString}
                            </Typography>
                            <Typography>
                                {props.address}
                            </Typography>

                        </React.Fragment>
                    }
                />
            </ListItem>
        </div>
    );
}