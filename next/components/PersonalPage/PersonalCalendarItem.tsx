import React from "react";
import Typography from "@material-ui/core/Typography";
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { DateAvatar } from "../PersonalPage/DateAvatarNew";


export default function CalendarItem(props: {
    key: React.ReactNode;
    name: React.ReactNode;
    type: React.ReactNode;
    date: Date;
    address: React.ReactNode;
    event: React.ReactNode;
    refetch: React.ReactNode;
}) {

    const eventDate = new Date(props.date);
    function formatAMPM(date: Date) {
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        if (minutes < 10){
            return hours + ':0' + minutes + ' ' + ampm;
        } else {
            return hours + ':' + minutes + ' ' + ampm;
        }
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