import React from "react";
import { Grid, makeStyles } from "@material-ui/core";
import TeamDetail from "./TeamDetail";
import { MutationUpdateTeamArgs, useGetTeamEditPageQuery } from "../../generated/graphql";
import { LoadingMembers } from "../components/loadingComponents/LoadingMembers";

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(4),
    },
}));

const Team = ({ teamID }: { teamID: string }) => {
    const classes = useStyles();
    const { data, loading, error } = useGetTeamEditPageQuery({ variables: { teamID: teamID } });
    if (loading || error || !data || !data.getTeam) {
        return <LoadingMembers />;
    }
    const { name, imgUrl, description, sport } = data.getTeam.team;
    const defaultValues: MutationUpdateTeamArgs = {
        name: name,
        description: description,
        sport: sport,
        teamID: teamID,
    };

    return (
        <div className={classes.root}>
            <Grid container spacing={4}>
                <Grid item xs={12}>
                    <TeamDetail imgUrl={imgUrl} {...defaultValues} />
                </Grid>
            </Grid>
        </div>
    );
};

export default Team;
