import React from "react";
import TeamItem from "./TeamItem";
import { makeStyles } from "@material-ui/core/styles";
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
    if (error) {
        console.log(error);
    }
    return (
        <CardPersonalPage title="&nbsp; Your Teams">
            <List className={classes.root}>
                {loading
                    ? "loading"
                    : data?.getMyTeams.map((team, index) => {
                          return (
                              <TeamItem
                                  key={index}
                                  name={team.name}
                                  _id={team._id}
                                  record={"0-0-0"}
                                  imgUrl={team.imgUrl}
                              />
                          );
                      })}
            </List>
        </CardPersonalPage>
    );
}
export default TeamList;
