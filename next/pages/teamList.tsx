import Layout from "../components/layouts/index/Layout";
import React from "react";
import { useGetMyTeamListQuery } from "../generated/graphql";
import TeamItem from "../components/teamList/TeamItem";
import ClubDisplayTab from "../components/ClubDisplayTab/ClubDisplayTabs";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import {Typography} from "@material-ui/core";

const useStyles = makeStyles(() =>
    createStyles({
        body: {
            paddingTop: 90,
            width: "100%",
            height: "100%",
            margin: "auto",
        },
        title:{
            marginLeft:"10%",
        },
        teamtabContainer: {
            margin: "2em",
        },

    }),
);

const TeamListPage = () => {
    const { data, loading, error } = useGetMyTeamListQuery({});
    const classes = useStyles();
    const TeamDisplay = (team) => {
        console.log(team);
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
                <Typography variant="h4" className={classes.title}> My Teams </Typography>
                {data?.getMyTeams.map((team) => {
                    return (
                        <div className={classes.teamtabContainer}>
                            <TeamDisplay team={team} />
                        </div>
                    );
                })}
            </div>
        </Layout>
    );
};
export default TeamListPage;
