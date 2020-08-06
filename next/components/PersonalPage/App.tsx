import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import PersonalInfoTab from "../../components/PersonalInfoTab/PersonalInfoTab";
import PersonalCalendar from "../../components/PersonalPage/PersonalCalendar";
import PersonalTeamList from "../../components/PersonalPage/PersonalTeam";

//styles
const useStyles = makeStyles((theme) => ({
    container: {
        width: "90%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        margin: "40px auto 0 auto",
        maxWidth: 1000,
        [theme.breakpoints.down("sm")]: {
            flexDirection: "column",
        },
    },
    columnContainer: {
        width: "47%",
        [theme.breakpoints.down("sm")]: {
            width: "100%",
            margin: "0 auto 40px auto",
        },
    },
}));

//profile page
function PersonalPage() {
    const classes = useStyles();
    return (
        <div>
            <PersonalInfoTab />
            <div className={classes.container}>
                <div className={classes.columnContainer}>
                    <PersonalCalendar />
                </div>
                <div className={classes.columnContainer}>
                    <PersonalTeamList />
                </div>
            </div>
        </div>
    );
}

export default PersonalPage;
