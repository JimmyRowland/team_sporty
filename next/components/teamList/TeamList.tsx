import React from "react";
import TeamItem from "./TeamItem";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import CardPersonalPage from "../cardPersonalPage/CardPersonalPage";
import List from "@material-ui/core/List";
import { useGetMyTeamListQuery } from "../../generated/graphql";

const useStyles = makeStyles({
    root: {
        width: "100%",
        maxWidth: 360,
    },
});

function TeamList() {
    const classes = useStyles();
    const { data, loading, error } = useGetMyTeamListQuery({});
    return (
        <CardPersonalPage title="&nbsp; Your Teams">
            <List className={classes.root}>
                {loading
                    ? "loading"
                    : data?.getMyTeams.map((team, index) => {
                          return <TeamItem key={index} name={team.name} _id={team._id} record={"4-7-11"} />;
                      })}
            </List>
        </CardPersonalPage>
    );
}
export default TeamList;
