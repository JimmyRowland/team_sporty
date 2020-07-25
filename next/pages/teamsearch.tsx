import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import ClubDisplayTab from "../components/ClubDisplayTab/ClubDisplayTabs";
import Layout from "../components/layouts/index/Layout";
import { useGetSearchTeamsQuery, useGetTeamsQuery } from "../generated/graphql";
import Card from "@material-ui/core/Card";
import theme from "../assets/theme";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { Add } from "@material-ui/icons";
import Link from "next/link";

const useStyles = makeStyles({
    body: {
        paddingTop: 90,
        width: "100%",
        height: "100%",
        margin: "auto",
    },
    searchbarContainer: {
        width: "fit-content",
        minWidth: "750px",
        height: "30%",
        margin: "auto",
        textAlign: "center",
        padding: theme.spacing(1),
    },
    searchbar: {
        width: "600px",
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
    const { data, loading, error } = useGetSearchTeamsQuery();
    const [search, setSearch] = useState("");

    const handleSearch = (e) => {
        setSearch(e.target.value);
    };

    if (loading || !data || !data.getTeams) {
        return "loading";
    } else if (error) {
        return "error";
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
                            onChange={(e) => handleSearch(e)}
                        />
                        <Link href={"/createTeam"}>
                            <IconButton type="submit" aria-label="add">
                                <Add />
                            </IconButton>
                        </Link>
                    </Card>
                    <div className={classes.teamContainer}>
                        {data.getTeams.map((team, index: number) => {
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
                                            isMember={team.isMember || team.isCoach}
                                            isPending={team.isPending}
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
