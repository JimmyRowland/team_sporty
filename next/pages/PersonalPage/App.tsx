import React from "react";
import logo from "../../logo.svg";
import { Counter } from "../../components/counter/Counter";
import { ColoredPaper } from "../../components/components/coloredPaper/ColoredPaper";
import { DateAvatar } from "../../components/DateAvatar/DateAvatar";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { EventList } from "../../components/eventList/EventList";
import { EventListItemType, monthArray } from "../../interface/Interface";
import PersonalInfoTab from "../../components/PersonalInfoTab/PersonalInfoTab";
import TeamList from "../../components/teamList/TeamList";
import CardPersonalPage from "../../components/cardPersonalPage/CardPersonalPage";
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
});
const teamlist = [
    { id: 1, name: "Richmond FC", record: "4-7-11" },
    { id: 2, name: "Richmond Raiders", record: "3-2-1" },
    { id: 3, name: "Richmond CSGO", record: "9-2-0" },
];

function PersonalPage() {
    const classes = useStyles();
    // const events = [];
    // for (let i = 0; i < 3; i++) {
    //   const date = new Date();
    //   date.setDate(date.getDate() + i * 4);
    //   const title = `Event ${i}`;
    //   const detail = `sdofhsepohgr;kdznfbo ${i}`;
    //   const event: EventListItemType = { date: date, title: title, detail: detail };
    //   events.push(event);
    // }
    return (
        <div>
            <PersonalInfoTab />
            <div className={classes.container}>
                <div className={classes.columnContainer}>
                    <CardPersonalPage title="UPCOMING...">
                        <EventList />
                    </CardPersonalPage>
                </div>
                <div className={classes.columnContainer}>
                    <TeamList teamlist={teamlist} />
                </div>
            </div>
        </div>
    );
}

export default PersonalPage;
