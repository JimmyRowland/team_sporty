import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import SearchBar from "../components/SearchBar/SearchBar";
import ClubDisplayTab from "../components/ClubDisplayTab/ClubDisplayTabs";
import CreateTeamModal from "../components/CreateTeamModal/CreateTeamModal";
import Layout from "../components/Layout";
import { useGetEventsLazyQuery, useGetTeamsLazyQuery, useGetTeamsQuery } from "../generated/graphql";

const useStyles = makeStyles({
    body: {
        paddingTop: 90,
        width: "100%",
        height: "100%",
        margin: "auto",
    },
    searchbarContainer: {
        width: "80%",
        height: "20%",
        margin: "auto",
    },
    teamContainer: {
        marginTop: "5%",
        width: "100%",
        height: "600px",
        overflowY: "scroll",
    },
    teamtabContainer: {
        margin: "2em",
    },
    createteamContainer: {
        marginTop: "5%",
    },
});

function TeamSearchPage() {
    const classes = useStyles();
    // TODO fix lazy load
    // const [getTeams, { loading, error, data }] = useGetTeamsLazyQuery();
    // const [teams, setTeams] = useState(data?.getTeams);
    //
    // if (data && data.getTeams) {
    //     setTeams(data.getTeams);
    // }
    //
    // // useEffect(() => {
    // //     for (let i = 0; i < 5; i++) {
    // //         try {
    // //             getTeams();
    // //         } catch (e) {
    // //             console.log(e);
    // //         }
    // //     }
    // // }, []);
    // useEffect(() => {
    //     console.log("data", data);
    // }, [loading]);
    const { data, loading, error } = useGetTeamsQuery();
    if (loading || !data || !data.getTeams) {
        return "loading";
    } else {
        return (
            <Layout title={"Teams"}>
                <div className={classes.body}>
                    <div className={classes.searchbarContainer}>
                        <SearchBar />
                    </div>
                    <div className={classes.teamContainer}>
                        {data.getTeams.map((team, index) => {
                            return (
                                <div key={index} className={classes.teamtabContainer}>
                                    <ClubDisplayTab
                                        name={team.team.name}
                                        description={team.team.description}
                                        numberMembers={team.team.numberMembers}
                                        sport={team.team.sport}
                                        teamID={team.team._id}
                                        isMember={team.isMember}
                                    />
                                </div>
                            );
                        })}
                    </div>
                    <div className={classes.createteamContainer}>
                        <CreateTeamModal />
                    </div>
                </div>
            </Layout>
        );
    }
}

export default TeamSearchPage;
