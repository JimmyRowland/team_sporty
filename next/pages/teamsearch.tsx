import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import SearchBar from "../components/SearchBar/SearchBar";
import ClubDisplayTab from "../components/ClubDisplayTab/ClubDisplayTabs";
import CreateTeamModal from "../components/CreateTeamModal/CreateTeamModal";
import Layout from "../components/layouts/index/Layout";
import { useGetEventsLazyQuery, useGetTeamsLazyQuery, useGetTeamsQuery } from "../generated/graphql";
import { TextField } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import theme from "../assets/theme";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles({
    body: {
        paddingTop: 90,
        width: "100%",
        height: "100%",
        margin: "auto",
    },
    searchbarContainer: {
        width:"fit-content",
        minWidth:"750px",
        height: "30%",
        margin: "auto",
        textAlign:"center",
        padding:theme.spacing(1),
    },
    searchbar:{
        width:"600px"
    },
    teamContainer: {
        marginTop: theme.spacing(5),
        width: "100%",
        height: "800px",
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
    const [search, setSearch] = useState("");

    const handleSearch = (e) => {
        setSearch(e.target.value);
    };

    if (loading || !data || !data.getTeams) {
        return "loading";
    } else {
        return (
            <Layout title={"Teams"}>
                <div className={classes.body}>
                    <Card className={classes.searchbarContainer}>
                        <IconButton aria-label="menu">
                            <MenuIcon />
                        </IconButton>
                        <InputBase
                            className={classes.searchbar}
                            placeholder="Search Team"
                            onChange={(e)=>handleSearch(e)}
                        />
                        <IconButton type="submit" aria-label="search">
                            <SearchIcon />
                        </IconButton>
                    </Card>
                    <div className={classes.teamContainer}>
                        {data.getTeams.map((team, index) => {
                            if (team.team.name.includes(search) || team.team.sport.includes(search))
                                return (
                                    <div key={index} className={classes.teamtabContainer}>
                                        <ClubDisplayTab
                                            teamimage={team.team.imgUrl}
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
                </div>
            </Layout>
        );
    }
}

export default TeamSearchPage;
