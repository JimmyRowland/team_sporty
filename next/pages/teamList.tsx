import Layout from "../components/layouts/index/Layout";
import React from "react";
import { useGetMyTeamListQuery } from "../generated/graphql";
import ClubDisplayTab from "../components/ClubDisplayTab/ClubDisplayTabs";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles({
    body: {
        paddingTop: 70,
        width: "100%",
        height: "100%",
        margin: "auto",
    },
    container: {
        width: "90%",
        flexDirection: "row",
        justifyContent: "space-between",
        margin: "40px auto 0 auto",
        maxWidth: 1000,
    },
    teamtabContainer: {
        margin: "2em",
    },
});

function TeamListPage() {
    const classes = useStyles();
    const { data, loading, error } = useGetMyTeamListQuery({});
    const TeamDisplay = (team) => {
        return (
            <ClubDisplayTab
                teamimage={team.team.imgUrl}
                name={team.team.name}
                description={team.team.description}
                numberMembers={team.team.numberMembers}
                sport={team.team.sport}
                teamID={team.team._id}
                isMember={true}
                isDisplayOnly={false}
                isPending={false}
            />
        );
    };
    return (
        <Layout title="TeamList">
            <div className={classes.body}>
                <div className={classes.container}>
                    <h1>My Teams</h1>
                </div>
                <div className={classes.container}>
                    {data?.getMyTeams.map((team, index) => {
                        return (
                            <div key={index} className={classes.teamtabContainer}>
                                <TeamDisplay team={team} />
                            </div>
                        );
                    })}
                </div>
            </div>
        </Layout>
    );
}

export default TeamListPage;
