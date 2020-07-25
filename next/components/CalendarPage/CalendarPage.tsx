import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import CalendarList from "./CalendarList";
import TeamDropDown from "../../components/teamDropDown/TeamDropDown";
import Typography from "@material-ui/core/Typography";
import { useSelector } from "react-redux";
import { selectTeamState } from "./CalendarPageSlicer";

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

function CalendarPage() {
    const classes = useStyles();
    const team = useSelector(selectTeamState);

    return (
        <div className="App">
            <br></br>
            <br></br>
            <div className={classes.container}>
                <div className={classes.columnContainer}>
                    <h2>{team.name}</h2>
                </div>
                <div className={classes.columnContainer}>
                    <Typography align="right">
                        <TeamDropDown />
                    </Typography>
                </div>
            </div>
            <div className={classes.container}>
                <CalendarList />
            </div>
        </div>
    );
}

export default CalendarPage;
