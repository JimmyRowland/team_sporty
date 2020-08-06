import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import CalendarList from "./CalendarList";
import TeamDropDown from "../../components/teamDropDown/TeamDropDown";
import Typography from "@material-ui/core/Typography";
import { useSelector } from "react-redux";
import { selectTeamState } from "./CalendarPageSlicer";

const useStyles = makeStyles({
    body: {
        paddingTop: 50,
        width: "100%",
        height: "100%",
        margin: "auto",
    },
    container: {
        width: "90%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        margin: "40px auto 0 auto",
        maxWidth: 1000,
    },
    container2: {
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
    teamDropDownDiv: {
        verticalAlign: "right",
        align: "right",
        float: "right"
    }
});

function CalendarPage() {
    const classes = useStyles();
    const team = useSelector(selectTeamState);

    return (
        <div className={classes.body}>
            <div className={classes.container}>
                <div className={classes.columnContainer}>
                    <h1>{team.name}</h1>
                </div>
                <div className={classes.columnContainer}>
                    <br />
                    <div className={classes.teamDropDownDiv}>
                        <TeamDropDown />
                    </div>
                </div>
            </div>
            <div className={classes.container2}>
                <CalendarList />
            </div>
        </div>
    );
}

export default CalendarPage;
