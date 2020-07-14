import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import CalendarList from "../../components/calendar/CalendarList";
import TeamDropDown from "../../components/teamDropDown/TeamDropDown";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
    container: {
        width: "90%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        margin: "40px auto 0 auto",
        maxWidth: 1000,
    },
    columnContainer: {
        width: "47%",
    },
    avatar: {
        height: 120,
        width: 120,
    },
});

const events = [
    {
        id: 1,
        type: "Game",
        name: "Away @ Surrey",
        date: "Sun, 31 Dec 1899 00:00:00 GMT",
        address: "123 ubc ave",
        going: [1,2,3,4,5,6,7,8,15,16,17],
        notGoing: [9,10,11],
        notResponded: [12,13,14],
    },
    {
        id: 2,
        type: "Game",
        name: "Home @ North Van",
        date: "Sun, 31 Dec 2012 00:00:00 GMT",
        address: "123 thunderbird ave",
        going: [1,2,3,4,5,6,7],
        notGoing: [9,10,11,8],
        notResponded: [12,13,14,15,16,17,18,19,20,21,22],
    },
    {
        id: 3,
        type: "Practice",
        name: "Training",
        date: "Sun, 31 Dec 1899 00:00:00 GMT",
        address: "456 ubc ave",
        going: [1,2,3,4,5,6,7,8],
        notGoing: [9,10,11],
        notResponded: [12,13,14],
    },
    {
        id: 4,
        type: "Game",
        name: "Home @ Burnaby",
        date: "Sun, 31 Dec 1899 00:00:00 GMT",
        address: "123 ubc ave",
        going: [1,2,3,4,5,6,7,8],
        notGoing: [9,10,11],
        notResponded: [12,13,14],
    },
    {
        id: 5,
        type: "Event",
        name: "Year end party",
        date: "Sun, 31 Dec 1899 00:00:00 GMT",
        address: "123 ubc ave",
        going: [1,2,3,4,5,6,7,8],
        notGoing: [9,10,11],
        notResponded: [12,13,14],
    },
];

function CalendarPage() {
    const classes = useStyles();

    return (
        <div className="App">
            <br></br>
            <br></br>
            <div className={classes.container}>
                <div className={classes.columnContainer}>
                    <h2>Richmond FC</h2>
                </div>
                <div className={classes.columnContainer} align="right">
                        <TeamDropDown />

                </div>
            </div>
            <div className={classes.container}>
                <CalendarList eventList={events} />
            </div>
        </div>
    );
}

export default CalendarPage;
